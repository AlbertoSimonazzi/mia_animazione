/**
 * ESEMPI DI CONFIGURAZIONE ANIMAZIONI PNG
 *
 * Questo file contiene esempi di tutte le possibili configurazioni
 * per le animazioni 2D PNG. Copia e incolla gli esempi che ti servono.
 *
 * NOTA: Questo è un file di riferimento, NON viene importato nell'applicazione.
 */

// =============================================================================
// SEZIONE 1: ESEMPI BASE - MOVIMENTI SEMPLICI (FUNZIONALITÀ ATTUALI)
// =============================================================================

const ESEMPI_BASE = [
    // Esempio 1: Movimento da DESTRA
    {
        filename: '1.png',
        name: 'Arriva da Destra',
        explodeDirection: { x: 500, y: 0 },    // 500px a destra
        scale: 1.0,
        rotation: 0,
        zIndex: 1,
        opacity: 1
        // Il componente parte da 500px a destra e si muove verso il centro
    },

    // Esempio 2: Movimento da SINISTRA
    {
        filename: '2.png',
        name: 'Arriva da Sinistra',
        explodeDirection: { x: -500, y: 0 },   // 500px a sinistra
        scale: 1.0,
        rotation: 0,
        zIndex: 2,
        opacity: 1
        // Il componente parte da 500px a sinistra e si muove verso il centro
    },

    // Esempio 3: Movimento dall'ALTO
    {
        filename: '3.png',
        name: 'Arriva dall\'Alto',
        explodeDirection: { x: 0, y: -400 },   // 400px in alto
        scale: 1.0,
        rotation: 0,
        zIndex: 3,
        opacity: 1
        // Il componente parte da 400px sopra e scende verso il centro
    },

    // Esempio 4: Movimento dal BASSO
    {
        filename: '4.png',
        name: 'Arriva dal Basso',
        explodeDirection: { x: 0, y: 400 },    // 400px in basso
        scale: 1.0,
        rotation: 0,
        zIndex: 4,
        opacity: 1
        // Il componente parte da 400px sotto e sale verso il centro
    },

    // Esempio 5: Movimento DIAGONALE (alto-destra)
    {
        filename: '5.png',
        name: 'Arriva Diagonale Alto-Destra',
        explodeDirection: { x: 400, y: -300 }, // Diagonale
        scale: 1.0,
        rotation: 0,
        zIndex: 5,
        opacity: 1
        // Il componente parte da alto-destra e si muove verso il centro
    },

    // Esempio 6: Movimento DIAGONALE (basso-sinistra)
    {
        filename: '6.png',
        name: 'Arriva Diagonale Basso-Sinistra',
        explodeDirection: { x: -400, y: 300 }, // Diagonale opposta
        scale: 1.0,
        rotation: 0,
        zIndex: 6,
        opacity: 1
        // Il componente parte da basso-sinistra e si muove verso il centro
    }
];

// =============================================================================
// SEZIONE 2: ESEMPI CON SCALA E ROTAZIONE (FUNZIONALITÀ ATTUALI)
// =============================================================================

const ESEMPI_SCALA_ROTAZIONE = [
    // Esempio 7: Componente PIÙ PICCOLO (scale < 1)
    {
        filename: '7.png',
        name: 'Componente Piccolo',
        explodeDirection: { x: 300, y: 0 },
        scale: 0.5,        // 50% della dimensione normale
        rotation: 0,
        zIndex: 7,
        opacity: 1
        // Il componente appare sempre al 50% della dimensione originale
    },

    // Esempio 8: Componente PIÙ GRANDE (scale > 1)
    {
        filename: '8.png',
        name: 'Componente Grande',
        explodeDirection: { x: -300, y: 0 },
        scale: 1.5,        // 150% della dimensione normale
        rotation: 0,
        zIndex: 8,
        opacity: 1
        // Il componente appare sempre al 150% della dimensione originale
    },

    // Esempio 9: Componente RUOTATO (rotation)
    {
        filename: '9.png',
        name: 'Componente Ruotato 45°',
        explodeDirection: { x: 0, y: -300 },
        scale: 1.0,
        rotation: 45,      // Ruotato di 45 gradi in senso orario
        zIndex: 9,
        opacity: 1
        // Il componente rimane sempre ruotato di 45° durante tutta l'animazione
    },

    // Esempio 10: Componente RUOTATO 90°
    {
        filename: '10.png',
        name: 'Componente Ruotato 90°',
        explodeDirection: { x: 300, y: -200 },
        scale: 1.0,
        rotation: 90,      // Ruotato di 90 gradi
        zIndex: 10,
        opacity: 1
        // Utile per componenti che devono apparire in orientamento diverso
    },

    // Esempio 11: COMBINAZIONE (scala + rotazione + movimento)
    {
        filename: '11.png',
        name: 'Piccolo e Ruotato',
        explodeDirection: { x: 400, y: 300 },
        scale: 0.7,        // 70% dimensione
        rotation: -30,     // Ruotato di -30° (senso antiorario)
        zIndex: 11,
        opacity: 1
        // Combina scala, rotazione e movimento diagonale
    }
];

// =============================================================================
// SEZIONE 3: ESEMPI CON OPACITÀ E ZINDEX (FUNZIONALITÀ ATTUALI)
// =============================================================================

const ESEMPI_OPACITY_ZINDEX = [
    // Esempio 12: Componente SEMI-TRASPARENTE
    {
        filename: '12.png',
        name: 'Semi-Trasparente',
        explodeDirection: { x: 0, y: 300 },
        scale: 1.0,
        rotation: 0,
        zIndex: 1,
        opacity: 0.5       // 50% opacità - appare semitrasparente
        // Utile per componenti di sfondo o elementi decorativi
    },

    // Esempio 13: Componente MOLTO TRASPARENTE
    {
        filename: '13.png',
        name: 'Molto Trasparente',
        explodeDirection: { x: -200, y: 0 },
        scale: 1.0,
        rotation: 0,
        zIndex: 0,
        opacity: 0.2       // 20% opacità - appare molto trasparente
        // Utile per watermark o elementi fantasma
    },

    // Esempio 14: ZINDEX ALTO (sopra tutti)
    {
        filename: '14.png',
        name: 'Sopra Tutti',
        explodeDirection: { x: 0, y: -200 },
        scale: 1.0,
        rotation: 0,
        zIndex: 999,       // Numero alto = appare sopra tutti gli altri
        opacity: 1
        // Questo componente appare sempre sopra a tutti gli altri
    },

    // Esempio 15: ZINDEX BASSO (sotto tutti)
    {
        filename: '15.png',
        name: 'Sotto Tutti',
        explodeDirection: { x: 200, y: 200 },
        scale: 1.0,
        rotation: 0,
        zIndex: 0,         // Numero basso = appare sotto tutti gli altri
        opacity: 1
        // Questo componente appare sempre sotto a tutti gli altri
    }
];

// =============================================================================
// SEZIONE 4: ESEMPI COMPLESSI (FUNZIONALITÀ ATTUALI)
// =============================================================================

const ESEMPI_COMPLESSI = [
    // Esempio 16: MOVIMENTO LUNGO + SCALA + ROTAZIONE
    {
        filename: '16.png',
        name: 'Movimento Complesso',
        explodeDirection: { x: 600, y: -400 }, // Movimento lungo diagonale
        scale: 0.8,
        rotation: 15,
        zIndex: 5,
        opacity: 0.9
        // Combina tutte le proprietà per un effetto complesso
    },

    // Esempio 17: MOVIMENTO BREVE (distanza piccola)
    {
        filename: '17.png',
        name: 'Movimento Corto',
        explodeDirection: { x: 50, y: 50 },    // Solo 50px di distanza
        scale: 1.0,
        rotation: 0,
        zIndex: 6,
        opacity: 1
        // Utile per piccoli aggiustamenti o animazioni sottili
    },

    // Esempio 18: NESSUN MOVIMENTO (componente già in posizione)
    {
        filename: '18.png',
        name: 'Sempre Visibile',
        explodeDirection: { x: 0, y: 0 },      // Nessun movimento
        scale: 1.0,
        rotation: 0,
        zIndex: 0,
        opacity: 1
        // Il componente è già nella posizione finale, nessuna animazione
        // NOTA: Con il sistema attuale questo componente non si muove
    }
];

// =============================================================================
// SEZIONE 5: ESEMPI FUTURI - DA IMPLEMENTARE
// =============================================================================
// Questi esempi richiedono modifiche al codice in png-animation.js

const ESEMPI_FUTURI = [
    // Esempio F1: FADE-IN (da implementare)
    {
        filename: 'F1.png',
        name: 'Fade-In Puro',
        animationType: 'fade',           // ⚠️ DA IMPLEMENTARE
        explodeDirection: { x: 0, y: 0 }, // Non si muove
        fadeFrom: 0,                      // ⚠️ DA IMPLEMENTARE - parte invisibile
        fadeTo: 1,                        // ⚠️ DA IMPLEMENTARE - diventa visibile
        scale: 1.0,
        rotation: 0,
        zIndex: 1,
        opacity: 1
        // Il componente appare gradualmente dal nulla, rimanendo fermo
    },

    // Esempio F2: MOVIMENTO + FADE-IN
    {
        filename: 'F2.png',
        name: 'Movimento con Fade-In',
        animationType: 'move-fade',       // ⚠️ DA IMPLEMENTARE
        explodeDirection: { x: 300, y: 0 },
        fadeFrom: 0,                      // ⚠️ DA IMPLEMENTARE
        fadeTo: 1,                        // ⚠️ DA IMPLEMENTARE
        scale: 1.0,
        rotation: 0,
        zIndex: 2,
        opacity: 1
        // Il componente si muove E appare gradualmente
    },

    // Esempio F3: SCALE-IN (cresce da piccolo a grande)
    {
        filename: 'F3.png',
        name: 'Scale-In (Ingrandimento)',
        animationType: 'scale',           // ⚠️ DA IMPLEMENTARE
        explodeDirection: { x: 0, y: 0 },
        scaleFrom: 0,                     // ⚠️ DA IMPLEMENTARE - parte da 0
        scaleTo: 1.0,                     // ⚠️ DA IMPLEMENTARE - cresce a dimensione normale
        rotation: 0,
        zIndex: 3,
        opacity: 1
        // Il componente "cresce" dal nulla rimanendo al centro
    },

    // Esempio F4: ROTATE-IN (rotazione animata)
    {
        filename: 'F4.png',
        name: 'Rotate-In',
        animationType: 'rotate',          // ⚠️ DA IMPLEMENTARE
        explodeDirection: { x: 0, y: 0 },
        rotateFrom: -180,                 // ⚠️ DA IMPLEMENTARE - parte ruotato
        rotateTo: 0,                      // ⚠️ DA IMPLEMENTARE - arriva dritto
        scale: 1.0,
        zIndex: 4,
        opacity: 1
        // Il componente ruota durante l'apparizione (come una vite che si avvita)
    },

    // Esempio F5: MOVIMENTO + SCALE + FADE (combinazione totale)
    {
        filename: 'F5.png',
        name: 'Movimento + Scale + Fade',
        animationType: 'move-scale-fade', // ⚠️ DA IMPLEMENTARE
        explodeDirection: { x: 400, y: -300 },
        fadeFrom: 0,                      // ⚠️ DA IMPLEMENTARE
        fadeTo: 1,                        // ⚠️ DA IMPLEMENTARE
        scaleFrom: 0.5,                   // ⚠️ DA IMPLEMENTARE
        scaleTo: 1.0,                     // ⚠️ DA IMPLEMENTARE
        rotation: 0,
        zIndex: 5,
        opacity: 1
        // Effetto spettacolare: arriva da lontano, cresce e appare gradualmente
    },

    // Esempio F6: STATIC (sempre visibile, nessuna animazione)
    {
        filename: 'F6.png',
        name: 'Statico (Sfondo)',
        animationType: 'static',          // ⚠️ DA IMPLEMENTARE
        explodeDirection: { x: 0, y: 0 },
        scale: 1.0,
        rotation: 0,
        zIndex: -1,
        opacity: 1
        // Il componente è sempre visibile fin dall'inizio, nessuna animazione
    },

    // Esempio F7: DELAY CUSTOM (ritardo personalizzato)
    {
        filename: 'F7.png',
        name: 'Con Ritardo Custom',
        animationType: 'move',
        explodeDirection: { x: 200, y: 0 },
        startDelay: 500,                  // ⚠️ DA IMPLEMENTARE - attende 500ms prima di partire
        scale: 1.0,
        rotation: 0,
        zIndex: 6,
        opacity: 1
        // Permette di creare ritardi personalizzati tra componenti
    },

    // Esempio F8: BOUNCE-IN (effetto rimbalzo)
    {
        filename: 'F8.png',
        name: 'Bounce-In',
        animationType: 'move',
        explodeDirection: { x: 0, y: -300 },
        easing: 'easeOutBounce',          // ⚠️ DA IMPLEMENTARE questa curva di easing
        scale: 1.0,
        rotation: 0,
        zIndex: 7,
        opacity: 1
        // Il componente "rimbalza" quando arriva alla posizione finale
    }
];

// =============================================================================
// CONFIGURAZIONE COMPLETA DI ESEMPIO
// =============================================================================

export const ESEMPIO_CONFIGURAZIONE_COMPLETA = {
    // Percorso immagini
    imagePath: 'images/',

    // Impostazioni animazione globali
    animation: {
        duration: 1000,         // Durata per componente (ms)
        delay: 200,             // Pausa tra componenti (ms)
        easing: 'easeInOutCubic' // Opzioni: linear, easeInOutQuad, easeInOutCubic, easeOutElastic, easeOutBack
    },

    // Sequenza completa con vari tipi di animazione
    components: [
        {
            filename: '1.png',
            name: 'Base - Da Destra',
            explodeDirection: { x: 500, y: 0 },
            scale: 1.0,
            rotation: 0,
            zIndex: 1,
            opacity: 1
        },
        {
            filename: '2.png',
            name: 'Piccolo e Ruotato',
            explodeDirection: { x: -400, y: -300 },
            scale: 0.7,
            rotation: 45,
            zIndex: 2,
            opacity: 1
        },
        {
            filename: '3.png',
            name: 'Semi-Trasparente',
            explodeDirection: { x: 0, y: 400 },
            scale: 1.0,
            rotation: 0,
            zIndex: 0,
            opacity: 0.6
        },
        {
            filename: '4.png',
            name: 'Grande Dall\'Alto',
            explodeDirection: { x: 0, y: -500 },
            scale: 1.5,
            rotation: 0,
            zIndex: 3,
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

// =============================================================================
// NOTE IMPORTANTI
// =============================================================================

/*
EASING FUNCTIONS DISPONIBILI (in png-animation.js):
- linear: Movimento costante
- easeInOutQuad: Accelerazione e decelerazione morbida
- easeInOutCubic: Accelerazione e decelerazione più pronunciata
- easeOutElastic: Effetto elastico (rimbalzo)
- easeOutBack: Supera leggermente il target e poi torna indietro

COORDINATE:
- X positivo = destra
- X negativo = sinistra
- Y positivo = basso
- Y negativo = alto

SCALA:
- scale < 1.0 = più piccolo (es: 0.5 = 50%)
- scale = 1.0 = dimensione normale
- scale > 1.0 = più grande (es: 1.5 = 150%)

ROTAZIONE:
- rotation positivo = senso orario
- rotation negativo = senso antiorario
- Valori in gradi (0-360)

OPACITÀ:
- opacity = 0 = completamente invisibile
- opacity = 0.5 = semi-trasparente
- opacity = 1 = completamente visibile

ZINDEX:
- Numeri bassi = dietro
- Numeri alti = davanti
- Usare valori negativi per elementi sempre dietro
*/
