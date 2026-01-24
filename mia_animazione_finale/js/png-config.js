/**
 * CONFIGURAZIONE ANIMAZIONE 2D PNG - MIA ANIMAZIONE FINALE
 *
 * Sequenza finale: 1.png, 3.png, 4.png, 4b.png, 5.png, 6.png, 7.png, 8.png
 */

export const PNG_ANIMATION_CONFIG = {
    // Percorso immagini
    imagePath: 'images/',

    // Impostazioni animazione
    animation: {
        duration: 1000,         // Durata animazione per componente (ms)
        delay: 200,             // Pausa tra componenti (ms)
        easing: 'easeInOutCubic' // Tipo di easing
    },

    // Sequenza di assemblaggio (ordine di animazione)
    components: [
        {
            filename: '1.png',
            name: 'Componente 1',
            explodeDirection: { x: 0, y: -500 },    // Arriva dal basso
            scale: 1.0,
            rotation: 0,
            zIndex: 1,
            opacity: 1
        },
        {
            filename: '3.png',
            name: 'Componente 3',
            explodeDirection: { x: -500, y: 0 },    // Arriva da sinistra
            scale: 1.0,
            rotation: 0,
            zIndex: 2,
            opacity: 1
        },
        {
            filename: '4.png',
            name: 'Componente 4',
            explodeDirection: { x: 500, y: 0 },     // Arriva da destra
            scale: 1.0,
            rotation: 0,
            zIndex: 3,
            opacity: 1
        },
        {
            filename: '4b.png',
            name: 'Componente 4b',
            explodeDirection: { x: 400, y: -300 },  // Diagonale basso-destra
            scale: 1.0,
            rotation: 0,
            zIndex: 4,
            opacity: 1
        },
        {
            filename: '5.png',
            name: 'Componente 5',
            explodeDirection: { x: 0, y: 400 },     // Arriva dall'alto
            scale: 1.0,
            rotation: 0,
            zIndex: 5,
            opacity: 1
        },
        {
            filename: '6.png',
            name: 'Componente 6',
            explodeDirection: { x: -400, y: -300 }, // Diagonale basso-sinistra
            scale: 1.0,
            rotation: 0,
            zIndex: 6,
            opacity: 1
        },
        {
            filename: '7.png',
            name: 'Componente 7',
            explodeDirection: { x: -400, y: 300 },  // Diagonale alto-sinistra
            scale: 1.0,
            rotation: 0,
            zIndex: 7,
            opacity: 1
        },
        {
            filename: '8.png',
            name: 'Componente 8',
            explodeDirection: { x: 400, y: 300 },   // Diagonale alto-destra
            scale: 1.0,
            rotation: 0,
            zIndex: 8,
            opacity: 1
        }
    ],

    // Impostazioni visualizzazione
    display: {
        maxWidth: '400px',
        maxHeight: '400px',
        containerBg: '#1a1a2e'
    }
};
