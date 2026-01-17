"""
Script Blender per Animazione Assemblaggio Astucciatrice
=========================================================

Come usare:
1. Apri Blender 4.x
2. Vai su "Scripting" (tab in alto)
3. Click "Open" e seleziona questo file
4. Click "Run Script" (triangolo play)
5. L'animazione viene creata automaticamente
6. Premi Spazio per vedere l'anteprima nella viewport
7. Per esportare video: Render -> Render Animation (Ctrl+F12)

Configurazione:
- Modifica EXPLODE_DISTANCE per cambiare quanto si separano i pezzi
- Modifica FRAMES_PER_COMPONENT per cambiare la durata dell'animazione
- Modifica EXPLODE_DIRECTIONS per cambiare da dove arrivano i pezzi
"""

import bpy
import os
import math

# ============================================================================
# CONFIGURAZIONE - Modifica questi valori secondo le tue esigenze
# ============================================================================

# Percorso dei file GLB (modifica se necessario)
GLB_FOLDER = "/home/alberto/Clienti/Mia Animazione"

# Componenti in ordine di assemblaggio
COMPONENTS = [
    "70000001.glb",
    "70000002.glb",
    "70000003.glb",
    "70000004.glb",
    "70000006.glb",
    "70000008.glb",
    "70000010.glb",
]

# Distanza di esplosione (quanto lontano partono i pezzi)
EXPLODE_DISTANCE = 500  # In unità del modello (probabilmente mm)

# Frame per ogni componente (30fps = 1 secondo)
FRAMES_PER_COMPONENT = 30

# Pausa tra i componenti (in frame)
PAUSE_BETWEEN = 10

# Direzioni di esplosione per ogni componente (x, y, z)
# Puoi personalizzare per ogni pezzo
EXPLODE_DIRECTIONS = [
    (0, 0, -1),   # Componente 1: arriva dal basso (Z negativo)
    (-1, 0, 0),   # Componente 2: arriva da sinistra
    (0, 0, 1),    # Componente 3: arriva dall'alto
    (1, 0, 0),    # Componente 4: arriva da destra
    (0, 1, 0),    # Componente 5: arriva dal davanti
    (0, 0, 1),    # Componente 6: arriva dall'alto
    (0, -1, 0),   # Componente 7: arriva da dietro
]

# ============================================================================
# FUNZIONI
# ============================================================================

def clear_scene():
    """Pulisce la scena corrente"""
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete(use_global=False)

    # Rimuovi anche le collection vuote
    for collection in bpy.data.collections:
        if collection.name != "Collection":
            bpy.data.collections.remove(collection)

def import_glb(filepath):
    """Importa un file GLB e ritorna gli oggetti importati"""
    # Salva gli oggetti esistenti
    existing_objects = set(bpy.data.objects)

    # Importa il GLB
    bpy.ops.import_scene.gltf(filepath=filepath)

    # Trova i nuovi oggetti
    new_objects = set(bpy.data.objects) - existing_objects

    return list(new_objects)

def get_object_center(obj):
    """Calcola il centro di un oggetto"""
    if obj.type == 'MESH':
        # Calcola il centro dalla bounding box
        local_bbox_center = 0.125 * sum((Vector(b) for b in obj.bound_box), Vector())
        global_bbox_center = obj.matrix_world @ local_bbox_center
        return global_bbox_center
    return obj.location.copy()

def setup_camera_and_lights(objects):
    """Configura camera e luci per la scena"""
    # Calcola il bounding box di tutti gli oggetti
    min_coord = [float('inf')] * 3
    max_coord = [float('-inf')] * 3

    for obj in objects:
        if obj.type == 'MESH':
            for v in obj.bound_box:
                world_v = obj.matrix_world @ Vector(v)
                for i in range(3):
                    min_coord[i] = min(min_coord[i], world_v[i])
                    max_coord[i] = max(max_coord[i], world_v[i])

    # Centro e dimensione della scena
    center = [(min_coord[i] + max_coord[i]) / 2 for i in range(3)]
    size = max(max_coord[i] - min_coord[i] for i in range(3))

    # Aggiungi camera
    bpy.ops.object.camera_add(
        location=(center[0] + size * 1.5, center[1] - size * 1.5, center[2] + size * 0.8)
    )
    camera = bpy.context.active_object
    camera.name = "Assembly_Camera"

    # Punta la camera verso il centro
    direction = Vector(center) - camera.location
    rot_quat = direction.to_track_quat('-Z', 'Y')
    camera.rotation_euler = rot_quat.to_euler()

    # Imposta come camera attiva
    bpy.context.scene.camera = camera

    # Aggiungi luce principale (Sun)
    bpy.ops.object.light_add(
        type='SUN',
        location=(center[0] + size, center[1] + size, center[2] + size * 2)
    )
    sun = bpy.context.active_object
    sun.name = "Main_Light"
    sun.data.energy = 3

    # Aggiungi luce di riempimento
    bpy.ops.object.light_add(
        type='AREA',
        location=(center[0] - size, center[1], center[2] + size * 0.5)
    )
    fill = bpy.context.active_object
    fill.name = "Fill_Light"
    fill.data.energy = 500
    fill.data.size = size * 0.5

    return center, size

def create_assembly_animation(imported_groups, center):
    """Crea l'animazione di assemblaggio"""
    current_frame = 1

    for i, (component_name, objects) in enumerate(imported_groups):
        if i >= len(EXPLODE_DIRECTIONS):
            direction = (0, 0, 1)  # Default: dall'alto
        else:
            direction = EXPLODE_DIRECTIONS[i]

        # Calcola offset di esplosione
        offset = [d * EXPLODE_DISTANCE for d in direction]

        for obj in objects:
            if obj.type != 'MESH':
                continue

            # Posizione finale (originale)
            final_location = obj.location.copy()

            # Posizione iniziale (esplosa)
            start_location = final_location.copy()
            start_location.x += offset[0]
            start_location.y += offset[1]
            start_location.z += offset[2]

            # Frame iniziale: posizione esplosa
            obj.location = start_location
            obj.keyframe_insert(data_path="location", frame=current_frame)

            # Frame finale: posizione originale
            end_frame = current_frame + FRAMES_PER_COMPONENT
            obj.location = final_location
            obj.keyframe_insert(data_path="location", frame=end_frame)

            # Imposta interpolazione smooth
            if obj.animation_data and obj.animation_data.action:
                for fcurve in obj.animation_data.action.fcurves:
                    for keyframe in fcurve.keyframe_points:
                        keyframe.interpolation = 'BEZIER'
                        keyframe.easing = 'EASE_IN_OUT'

        # Passa al prossimo componente
        current_frame = end_frame + PAUSE_BETWEEN
        print(f"Componente {i+1} ({component_name}): frame {current_frame - FRAMES_PER_COMPONENT - PAUSE_BETWEEN} -> {end_frame}")

    # Imposta la durata dell'animazione
    bpy.context.scene.frame_start = 1
    bpy.context.scene.frame_end = current_frame
    bpy.context.scene.frame_current = 1

    return current_frame

def setup_render_settings():
    """Configura le impostazioni di render per l'output video"""
    scene = bpy.context.scene

    # Risoluzione
    scene.render.resolution_x = 1920
    scene.render.resolution_y = 1080
    scene.render.resolution_percentage = 100

    # Frame rate
    scene.render.fps = 30

    # Output
    scene.render.image_settings.file_format = 'FFMPEG'
    scene.render.ffmpeg.format = 'MPEG4'
    scene.render.ffmpeg.codec = 'H264'
    scene.render.ffmpeg.constant_rate_factor = 'HIGH'
    scene.render.filepath = os.path.join(GLB_FOLDER, "assembly_animation.mp4")

    # Usa Eevee per render veloce
    scene.render.engine = 'BLENDER_EEVEE_NEXT' if bpy.app.version >= (4, 2, 0) else 'BLENDER_EEVEE'

    print(f"Output video: {scene.render.filepath}")

# ============================================================================
# MAIN
# ============================================================================

from mathutils import Vector

def main():
    print("\n" + "="*60)
    print("SCRIPT ANIMAZIONE ASSEMBLAGGIO ASTUCCIATRICE")
    print("="*60 + "\n")

    # Pulisci la scena
    print("Pulizia scena...")
    clear_scene()

    # Importa tutti i componenti
    imported_groups = []
    all_objects = []

    for glb_file in COMPONENTS:
        filepath = os.path.join(GLB_FOLDER, glb_file)
        if os.path.exists(filepath):
            print(f"Importazione: {glb_file}")
            objects = import_glb(filepath)
            imported_groups.append((glb_file, objects))
            all_objects.extend(objects)
        else:
            print(f"ATTENZIONE: File non trovato: {filepath}")

    if not all_objects:
        print("ERRORE: Nessun oggetto importato!")
        return

    print(f"\nImportati {len(all_objects)} oggetti da {len(imported_groups)} file")

    # Setup camera e luci
    print("\nConfigurazione camera e luci...")
    center, size = setup_camera_and_lights(all_objects)
    print(f"Centro scena: {center}")
    print(f"Dimensione scena: {size}")

    # Crea animazione
    print("\nCreazione animazione...")
    total_frames = create_assembly_animation(imported_groups, center)
    print(f"Animazione creata: {total_frames} frame totali")

    # Setup render
    print("\nConfigurazione render...")
    setup_render_settings()

    # Vai al frame 1
    bpy.context.scene.frame_set(1)

    print("\n" + "="*60)
    print("FATTO!")
    print("="*60)
    print("\nProssimi passi:")
    print("1. Premi SPAZIO per vedere l'anteprima nella viewport")
    print("2. Usa la rotellina per zoomare se necessario")
    print("3. Per esportare il video: Render -> Render Animation (Ctrl+F12)")
    print(f"4. Il video sarà salvato in: {bpy.context.scene.render.filepath}")
    print("="*60 + "\n")

# Esegui lo script
if __name__ == "__main__":
    main()
