/**
 * CONFIGURAZIONE ANIMAZIONE 2D PNG
 *
 * Questo file controlla come si animano i componenti nella versione 2D.
 * Modifica i valori per cambiare direzioni, velocità e ordine di assemblaggio.
 */

export const PNG_ANIMATION_CONFIG = {
    // Percorso immagini
    imagePath: 'images/components/',

    // Impostazioni animazione
    animation: {
        duration: 1000,         // Durata animazione per componente (ms)
        delay: 200,             // Pausa tra componenti (ms)
        easing: 'easeInOutCubic' // Tipo di easing
    },

    // Sequenza di assemblaggio
    // I componenti si animano nell'ordine dell'array (ORDINE INVERTITO)
    components: [
        {
            filename: '70000010.png',
            name: 'Componente 7',
            explodeDirection: { x: 0, y: -500 },    // Dal basso (primo)
            scale: 1.0,
            rotation: 0,
            zIndex: 1,  // INVERTITO: primo ad animare = sotto
            opacity: 1
        },
        {
            filename: '70000008.png',
            name: 'Componente 6',
            explodeDirection: { x: 400, y: -300 },  // Diagonale basso-destra
            scale: 1.0,
            rotation: 0,
            zIndex: 2,  // INVERTITO
            opacity: 1
        },
        {
            filename: '70000006.png',
            name: 'Componente 5',
            explodeDirection: { x: -400, y: -300 }, // Diagonale basso-sinistra
            scale: 1.0,
            rotation: 0,
            zIndex: 3,  // INVERTITO
            opacity: 1
        },
        {
            filename: '70000004.png',
            name: 'Componente 4',
            explodeDirection: { x: 500, y: 0 },   // Arriva da destra
            scale: 1.0,
            rotation: 0,
            zIndex: 4,  // INVERTITO
            opacity: 1
        },
        {
            filename: '70000003.png',
            name: 'Componente 3',
            explodeDirection: { x: 0, y: 400 },   // Arriva dall'alto
            scale: 1.0,
            rotation: 0,
            zIndex: 5,  // INVERTITO
            opacity: 1
        },
        {
            filename: '70000002.png',
            name: 'Componente 2',
            explodeDirection: { x: -500, y: 0 },  // Arriva da sinistra
            scale: 1.0,
            rotation: 0,
            zIndex: 6,  // INVERTITO
            opacity: 1
        },
        {
            filename: '70000001.png',
            name: 'Componente 1',
            // Posizione iniziale esplosa (in pixels dalla posizione finale)
            explodeDirection: { x: 0, y: -400 },  // Arriva dal basso (ultimo)
            scale: 1.0,        // Scala del componente (1.0 = 100%)
            rotation: 0,       // Rotazione in gradi
            zIndex: 7,         // INVERTITO: ultimo ad animare = sopra a tutti
            opacity: 1         // Opacità (0-1)
        }
    ],

    // Impostazioni visualizzazione
    display: {
        maxWidth: '400px',     // Larghezza massima componenti (ridotta)
        maxHeight: '400px',    // Altezza massima componenti (ridotta)
        containerBg: '#1a1a2e' // Colore sfondo container
    }
};

/**
 * GUIDA VELOCE:
 *
 * DIREZIONI ESPLOSIONE (explodeDirection):
 * - { x: 0, y: -400 }     → Arriva dal BASSO
 * - { x: 0, y: 400 }      → Arriva dall'ALTO
 * - { x: -400, y: 0 }     → Arriva da SINISTRA
 * - { x: 400, y: 0 }      → Arriva da DESTRA
 * - { x: -300, y: -300 }  → DIAGONALE (personalizza valori)
 *
 * ORDINE DI ASSEMBLAGGIO:
 * Riordina l'array 'components' per cambiare la sequenza
 *
 * Z-INDEX:
 * Componenti con zIndex più alto appaiono davanti agli altri
 * Utile per sovrapposizioni corrette
 *
 * EASING DISPONIBILI:
 * - 'linear'           → Velocità costante
 * - 'easeInOutQuad'    → Accelerazione e decelerazione dolce
 * - 'easeInOutCubic'   → Accelerazione e decelerazione marcata (default)
 * - 'easeOutElastic'   → Effetto "rimbalzo" alla fine
 * - 'easeOutBack'      → Leggero "overshoot" alla fine
 */
