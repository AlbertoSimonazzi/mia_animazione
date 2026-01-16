/**
 * CONFIGURAZIONE ASSEMBLAGGIO ASTUCCIATRICE
 *
 * Modifica questo file per cambiare:
 * 1. Ordine di assemblaggio (riordina l'array components)
 * 2. Direzione da cui arrivano i pezzi (explodeDirection)
 * 3. Distanza di esplosione (explodeDistance)
 * 4. Timing animazione
 */

export const ASSEMBLY_CONFIG = {
    // Impostazioni animazione
    animationDuration: 1500,     // Durata per componente in millisecondi
    delayBetween: 300,           // Pausa tra animazioni sequenziali

    // Distanza base per vista esplosa (proporzionale ai modelli ~800 unità)
    explodeDistance: 200,

    /**
     * SEQUENZA DI ASSEMBLAGGIO
     *
     * Ordine: I componenti si animano nell'ordine dell'array (primo = primo ad animarsi)
     *
     * Per ogni componente:
     * - filename: Nome del file GLB
     * - name: Nome visualizzato nell'UI
     * - explodeDirection: Direzione da cui arriva {x, y, z}
     *   - y: -1 = dal basso, y: 1 = dall'alto
     *   - x: -1 = da sinistra, x: 1 = da destra
     *   - z: -1 = da dietro, z: 1 = dal davanti
     * - explodeDistance: (opzionale) distanza specifica per questo pezzo
     */
    components: [
        {
            filename: '70000001.glb',
            name: 'Componente 1',
            explodeDirection: { x: 0, y: -1, z: 0 },  // Arriva dal basso
            explodeDistance: 300
        },
        {
            filename: '70000002.glb',
            name: 'Componente 2',
            explodeDirection: { x: -1, y: 0, z: 0 },  // Arriva da sinistra
        },
        {
            filename: '70000003.glb',
            name: 'Componente 3',
            explodeDirection: { x: 0, y: 1, z: 0 },   // Arriva dall'alto
            explodeDistance: 350
        },
        {
            filename: '70000004.glb',
            name: 'Componente 4',
            explodeDirection: { x: 1, y: 0, z: 0 },   // Arriva da destra
        },
        {
            filename: '70000006.glb',
            name: 'Componente 5',
            explodeDirection: { x: 0, y: 0, z: 1 },   // Arriva dal davanti
        },
        {
            filename: '70000008.glb',
            name: 'Componente 6',
            explodeDirection: { x: 0, y: 1, z: 0 },   // Arriva dall'alto
        },
        {
            filename: '70000010.glb',
            name: 'Componente 7',
            explodeDirection: { x: 0, y: 0, z: -1 },  // Arriva da dietro
            explodeDistance: 300
        }
    ],

    // File della macchina completa (mostrato opzionalmente a fine animazione)
    completeAssembly: '70000104.glb'
};

// Impostazioni camera (valori iniziali, verranno adattati automaticamente)
export const CAMERA_CONFIG = {
    fov: 45,
    near: 0.01,
    far: 100000,  // Aumentato per modelli CAD grandi
    position: { x: 15, y: 10, z: 15 },
    target: { x: 0, y: 0, z: 0 }
};

// Impostazioni illuminazione
export const LIGHTING_CONFIG = {
    ambientIntensity: 0.5,
    directionalIntensity: 0.8,
    directionalPosition: { x: 10, y: 20, z: 10 }
};
