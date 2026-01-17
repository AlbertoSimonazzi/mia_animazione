/**
 * PNG ANIMATION CONTROLLER
 *
 * Controller per animazioni 2D di immagini PNG.
 * Ottimizzato per performance con GPU acceleration.
 */

/**
 * Easing functions
 */
const EASING = {
    linear: t => t,

    easeInOutQuad: t => {
        return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    },

    easeInOutCubic: t => {
        return t < 0.5
            ? 4 * t * t * t
            : 1 - Math.pow(-2 * t + 2, 3) / 2;
    },

    easeOutElastic: t => {
        const c4 = (2 * Math.PI) / 3;
        return t === 0 ? 0 : t === 1 ? 1
            : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
    },

    easeOutBack: t => {
        const c1 = 1.70158;
        const c3 = c1 + 1;
        return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    }
};

/**
 * PNG Animation Controller Class
 */
export class PNGAnimationController {
    constructor(config) {
        this.config = config;
        this.components = [];
        this.isPlaying = false;
        this.speedMultiplier = 1;
        this.currentIndex = -1;

        // Valida easing
        this.easingFn = EASING[config.animation.easing] || EASING.easeInOutCubic;
    }

    /**
     * Inizializza i componenti HTML
     */
    init(container) {
        this.container = container;

        this.config.components.forEach((compConfig, index) => {
            const img = document.createElement('img');
            img.className = 'component-layer';
            img.src = this.config.imagePath + compConfig.filename;
            img.alt = compConfig.name;
            img.dataset.index = index;

            // Stili iniziali
            img.style.position = 'absolute';
            img.style.maxWidth = this.config.display.maxWidth;
            img.style.maxHeight = this.config.display.maxHeight;
            img.style.objectFit = 'contain';
            img.style.willChange = 'transform'; // GPU acceleration
            img.style.transform = 'translate3d(0, 0, 0)'; // Force GPU layer
            img.style.zIndex = compConfig.zIndex || index;
            img.style.opacity = compConfig.opacity || 1;

            if (compConfig.scale && compConfig.scale !== 1) {
                img.style.transform += ` scale(${compConfig.scale})`;
            }

            if (compConfig.rotation && compConfig.rotation !== 0) {
                img.style.transform += ` rotate(${compConfig.rotation}deg)`;
            }

            // Gestisci errori di caricamento
            img.onerror = () => {
                console.warn(`⚠ Immagine non trovata: ${compConfig.filename}`);
                img.style.display = 'none';
            };

            container.appendChild(img);

            this.components.push({
                element: img,
                config: compConfig,
                finalPosition: { x: 0, y: 0 },
                currentPosition: { x: 0, y: 0 },
                loaded: false
            });

            // Mark loaded
            img.onload = () => {
                this.components[index].loaded = true;
            };
        });
    }

    /**
     * Imposta la posizione di un componente
     */
    setPosition(component, x, y, animated = false) {
        component.currentPosition = { x, y };

        let transform = `translate3d(${x}px, ${y}px, 0)`;

        if (component.config.scale && component.config.scale !== 1) {
            transform += ` scale(${component.config.scale})`;
        }

        if (component.config.rotation && component.config.rotation !== 0) {
            transform += ` rotate(${component.config.rotation}deg)`;
        }

        component.element.style.transform = transform;

        if (animated) {
            component.element.style.transition = 'none';
        }
    }

    /**
     * Vista esplosa - tutti i componenti nelle posizioni iniziali
     */
    setExplodedView() {
        this.stopAnimation();
        this.components.forEach(comp => {
            const dir = comp.config.explodeDirection;
            this.setPosition(comp, dir.x, dir.y);
            comp.element.style.opacity = comp.config.opacity || 1;
        });
    }

    /**
     * Vista assemblata - tutti i componenti nella posizione finale
     */
    setAssembledView() {
        this.stopAnimation();
        this.components.forEach(comp => {
            this.setPosition(comp, 0, 0);
            comp.element.style.opacity = comp.config.opacity || 1;
        });
    }

    /**
     * Play animazione assemblaggio sequenziale
     */
    async playAnimation(onComplete, onComponentStart, onComponentComplete) {
        if (this.isPlaying) return;

        this.isPlaying = true;
        this.setExplodedView();

        for (let i = 0; i < this.components.length; i++) {
            if (!this.isPlaying) break;

            const comp = this.components[i];
            this.currentIndex = i;

            if (onComponentStart) {
                onComponentStart(i, comp.config.name);
            }

            await this.animateComponent(comp);

            if (onComponentComplete) {
                onComponentComplete(i);
            }

            // Pausa tra componenti
            await this.delay(this.config.animation.delay / this.speedMultiplier);
        }

        this.isPlaying = false;
        this.currentIndex = -1;

        if (onComplete) {
            onComplete();
        }
    }

    /**
     * Anima un singolo componente
     */
    animateComponent(comp) {
        return new Promise(resolve => {
            const startPos = { ...comp.currentPosition };
            const endPos = comp.finalPosition;
            const duration = this.config.animation.duration / this.speedMultiplier;
            const startTime = performance.now();

            const animate = (currentTime) => {
                if (!this.isPlaying) {
                    resolve();
                    return;
                }

                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = this.easingFn(progress);

                const x = startPos.x + (endPos.x - startPos.x) * eased;
                const y = startPos.y + (endPos.y - startPos.y) * eased;

                this.setPosition(comp, x, y, true);

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    this.setPosition(comp, endPos.x, endPos.y);
                    resolve();
                }
            };

            requestAnimationFrame(animate);
        });
    }

    /**
     * Ferma l'animazione
     */
    stopAnimation() {
        this.isPlaying = false;
        this.currentIndex = -1;
    }

    /**
     * Imposta la velocità dell'animazione
     */
    setSpeed(multiplier) {
        this.speedMultiplier = multiplier;
    }

    /**
     * Utility: delay
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Ottieni lo stato corrente
     */
    getState() {
        return {
            isPlaying: this.isPlaying,
            currentIndex: this.currentIndex,
            totalComponents: this.components.length,
            loadedComponents: this.components.filter(c => c.loaded).length
        };
    }

    /**
     * Cambia l'easing in runtime
     */
    setEasing(easingName) {
        if (EASING[easingName]) {
            this.easingFn = EASING[easingName];
            this.config.animation.easing = easingName;
            return true;
        }
        return false;
    }

    /**
     * Export configurazione corrente come JSON
     * (utile per Lottie export)
     */
    exportConfig() {
        return {
            config: this.config,
            positions: this.components.map(comp => ({
                name: comp.config.name,
                final: comp.finalPosition,
                exploded: comp.config.explodeDirection,
                current: comp.currentPosition
            })),
            timing: {
                duration: this.config.animation.duration,
                delay: this.config.animation.delay,
                easing: this.config.animation.easing
            }
        };
    }

    /**
     * Ricarica le immagini (se cambiate)
     */
    reload() {
        this.components.forEach(comp => {
            comp.element.src = this.config.imagePath + comp.config.filename + '?t=' + Date.now();
            comp.loaded = false;
            comp.element.onload = () => {
                comp.loaded = true;
            };
        });
    }
}

/**
 * Export easing functions per uso standalone
 */
export { EASING };
