import { ASSEMBLY_CONFIG } from './config.js';

/**
 * Funzione di easing quadratica
 */
function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

/**
 * Controller per le animazioni di assemblaggio
 */
export class AnimationController {
    constructor(components, models) {
        this.components = components;
        this.models = models;
        this.animations = [];
        this.isPlaying = false;
        this.speedMultiplier = 1;
        this.currentAnimationIndex = -1;

        // Memorizza posizioni originali e di esplosione
        this.positions = new Map();
        this.initializePositions();
    }

    /**
     * Calcola e memorizza le posizioni originali e di esplosione
     */
    initializePositions() {
        this.components.forEach(config => {
            const model = this.models.get(config.filename);
            if (!model) return;

            // Posizione finale (posizione originale del modello)
            const finalPos = {
                x: model.position.x,
                y: model.position.y,
                z: model.position.z
            };

            // Calcola posizione esplosa
            const distance = config.explodeDistance ?? ASSEMBLY_CONFIG.explodeDistance;
            const dir = config.explodeDirection;
            const explodedPos = {
                x: finalPos.x + (dir.x * distance),
                y: finalPos.y + (dir.y * distance),
                z: finalPos.z + (dir.z * distance)
            };

            this.positions.set(config.filename, {
                final: finalPos,
                exploded: explodedPos
            });
        });
    }

    /**
     * Imposta vista esplosa (istantanea)
     */
    setExplodedView() {
        this.stopAll();
        this.components.forEach(config => {
            const model = this.models.get(config.filename);
            const pos = this.positions.get(config.filename);
            if (model && pos) {
                model.position.set(pos.exploded.x, pos.exploded.y, pos.exploded.z);
                model.visible = true;
            }
        });
    }

    /**
     * Imposta vista assemblata (istantanea)
     */
    setAssembledView() {
        this.stopAll();
        this.components.forEach(config => {
            const model = this.models.get(config.filename);
            const pos = this.positions.get(config.filename);
            if (model && pos) {
                model.position.set(pos.final.x, pos.final.y, pos.final.z);
                model.visible = true;
            }
        });
    }

    /**
     * Avvia l'animazione di assemblaggio sequenziale
     * @param {Function} onComplete - Chiamata quando l'animazione termina
     * @param {Function} onComponentStart - Chiamata all'inizio di ogni componente (index, name)
     * @param {Function} onComponentComplete - Chiamata al completamento di ogni componente (index)
     */
    playAssemblyAnimation(onComplete, onComponentStart, onComponentComplete) {
        this.stopAll();
        this.setExplodedView();
        this.isPlaying = true;
        this.currentAnimationIndex = 0;

        this.animateNextComponent(onComplete, onComponentStart, onComponentComplete);
    }

    /**
     * Anima il prossimo componente nella sequenza
     */
    animateNextComponent(onComplete, onComponentStart, onComponentComplete) {
        if (this.currentAnimationIndex >= this.components.length) {
            this.isPlaying = false;
            if (onComplete) onComplete();
            return;
        }

        const config = this.components[this.currentAnimationIndex];
        const model = this.models.get(config.filename);
        const pos = this.positions.get(config.filename);

        if (!model || !pos) {
            this.currentAnimationIndex++;
            this.animateNextComponent(onComplete, onComponentStart, onComponentComplete);
            return;
        }

        if (onComponentStart) {
            onComponentStart(this.currentAnimationIndex, config.name);
        }

        const duration = ASSEMBLY_CONFIG.animationDuration / this.speedMultiplier;
        const startPos = { ...pos.exploded };
        const endPos = pos.final;
        const startTime = performance.now();

        const animate = (currentTime) => {
            if (!this.isPlaying) return;

            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeInOutQuad(progress);

            // Interpola posizione
            model.position.x = startPos.x + (endPos.x - startPos.x) * eased;
            model.position.y = startPos.y + (endPos.y - startPos.y) * eased;
            model.position.z = startPos.z + (endPos.z - startPos.z) * eased;

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                // Animazione componente completata
                model.position.set(endPos.x, endPos.y, endPos.z);

                if (onComponentComplete) {
                    onComponentComplete(this.currentAnimationIndex);
                }

                // Passa al prossimo componente dopo una breve pausa
                this.currentAnimationIndex++;
                const delay = ASSEMBLY_CONFIG.delayBetween / this.speedMultiplier;

                setTimeout(() => {
                    this.animateNextComponent(onComplete, onComponentStart, onComponentComplete);
                }, delay);
            }
        };

        requestAnimationFrame(animate);
    }

    /**
     * Ferma tutte le animazioni
     */
    stopAll() {
        this.isPlaying = false;
        this.currentAnimationIndex = -1;
    }

    /**
     * Imposta moltiplicatore velocità
     * @param {number} multiplier
     */
    setSpeed(multiplier) {
        this.speedMultiplier = multiplier;
    }

    /**
     * Restituisce lo stato corrente
     */
    getState() {
        return {
            isPlaying: this.isPlaying,
            currentIndex: this.currentAnimationIndex,
            totalComponents: this.components.length
        };
    }
}
