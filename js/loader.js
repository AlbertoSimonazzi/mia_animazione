import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

/**
 * Carica tutti i file GLB con tracciamento del progresso
 */
export class ModelLoader {
    constructor() {
        this.gltfLoader = new GLTFLoader();
        this.loadedModels = new Map();
        this.totalFiles = 0;
        this.loadedFiles = 0;
    }

    /**
     * Carica tutti i componenti definiti nella configurazione
     * @param {Array} components - Array di configurazioni componenti
     * @param {Function} onProgress - Callback progresso (0-1)
     * @param {Function} onFileLoaded - Callback per ogni file caricato (filename, model)
     * @returns {Promise<Map>} Map di filename -> modello caricato
     */
    async loadAll(components, onProgress, onFileLoaded) {
        this.totalFiles = components.length;
        this.loadedFiles = 0;

        const loadPromises = components.map(config =>
            this.loadModel(config.filename)
                .then(model => {
                    this.loadedFiles++;
                    onProgress(this.loadedFiles / this.totalFiles);
                    if (onFileLoaded) {
                        onFileLoaded(config.filename, model);
                    }
                    return { filename: config.filename, model };
                })
        );

        const results = await Promise.all(loadPromises);

        results.forEach(({ filename, model }) => {
            this.loadedModels.set(filename, model);
        });

        return this.loadedModels;
    }

    /**
     * Carica un singolo file GLB
     * @param {string} filename - Nome del file GLB
     * @returns {Promise<THREE.Object3D>}
     */
    loadModel(filename) {
        return new Promise((resolve, reject) => {
            this.gltfLoader.load(
                filename,
                (gltf) => {
                    const model = gltf.scene;

                    // Abilita ombre e migliora materiali
                    model.traverse((child) => {
                        if (child.isMesh) {
                            child.castShadow = true;
                            child.receiveShadow = true;

                            // Migliora rendering PBR
                            if (child.material) {
                                child.material.envMapIntensity = 1;
                            }
                        }
                    });

                    resolve(model);
                },
                (xhr) => {
                    // Progresso caricamento singolo file (opzionale)
                },
                (error) => {
                    console.error(`Errore caricamento ${filename}:`, error);
                    reject(error);
                }
            );
        });
    }

    /**
     * Carica un file aggiuntivo (es. macchina completa)
     * @param {string} filename
     * @returns {Promise<THREE.Object3D>}
     */
    async loadAdditional(filename) {
        const model = await this.loadModel(filename);
        this.loadedModels.set(filename, model);
        return model;
    }
}
