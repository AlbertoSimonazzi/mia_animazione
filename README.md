# Animazione Assemblaggio Astucciatrice

Progetto per visualizzare l'animazione di assemblaggio di un'astucciatrice industriale usando modelli 3D GLB.

## Contenuto

- **8 modelli GLB** - Componenti dell'astucciatrice in formato glTF 2.0
- **Script Blender** - Per creare l'animazione di assemblaggio
- **Visualizzatore Web** - Applicazione Three.js per vedere i modelli nel browser

## Modelli 3D

| File | Descrizione |
|------|-------------|
| 70000001.glb | Componente 1 |
| 70000002.glb | Componente 2 |
| 70000003.glb | Componente 3 |
| 70000004.glb | Componente 4 |
| 70000006.glb | Componente 5 |
| 70000008.glb | Componente 6 |
| 70000010.glb | Componente 7 |
| 70000104.glb | Macchina completa |

## Utilizzo con Blender

1. Apri **Blender 4.x**
2. Vai alla tab **Scripting**
3. Apri `assembly_animation.py`
4. Click **Run Script**
5. L'animazione viene creata automaticamente
6. Per esportare video: **Render → Render Animation** (Ctrl+F12)

### Configurazione

Modifica le variabili all'inizio di `assembly_animation.py`:

```python
EXPLODE_DISTANCE = 500      # Distanza di esplosione
FRAMES_PER_COMPONENT = 30   # Durata animazione per pezzo
PAUSE_BETWEEN = 10          # Pausa tra i pezzi
```

## Visualizzatore Web (Three.js)

```bash
# Avvia server locale
python3 -m http.server 8000

# Apri nel browser
# http://localhost:8000
```

### Struttura

```
├── index.html          # Pagina principale
├── css/style.css       # Stili UI
├── js/
│   ├── main.js         # Entry point Three.js
│   ├── config.js       # Configurazione assemblaggio
│   ├── loader.js       # Caricamento GLB
│   └── animation.js    # Controller animazioni
```

## Requisiti

- **Blender 4.x** per l'animazione
- **Browser moderno** per il visualizzatore web (Chrome, Firefox, Edge)
- **Python 3** per il server locale

## Licenza

Progetto privato - Tutti i diritti riservati.
