import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { ASSEMBLY_CONFIG, CAMERA_CONFIG, LIGHTING_CONFIG } from './config.js';
import { ModelLoader } from './loader.js';
import { AnimationController } from './animation.js';

class AssemblyViewer {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.animationController = null;

        this.init();
    }

    async init() {
        this.setupScene();
        this.setupLighting();
        this.setupControls();

        // Carica modelli
        await this.loadModels();

        // Nascondi overlay di caricamento
        document.getElementById('loading-overlay').style.display = 'none';

        // Configura UI
        this.setupUI();

        // Avvia render loop
        this.animate();
    }

    setupScene() {
        // Scena
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x1a1a2e);

        // Camera con range molto ampio per modelli CAD
        const aspect = window.innerWidth / window.innerHeight;
        this.camera = new THREE.PerspectiveCamera(
            CAMERA_CONFIG.fov,
            aspect,
            0.001,  // Near molto piccolo
            1000000 // Far molto grande per modelli CAD
        );
        this.camera.position.set(
            CAMERA_CONFIG.position.x,
            CAMERA_CONFIG.position.y,
            CAMERA_CONFIG.position.z
        );

        // Renderer
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            powerPreference: 'high-performance'
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1;

        document.getElementById('canvas-container').appendChild(this.renderer.domElement);

        // Gestisci resize
        window.addEventListener('resize', () => this.onResize());

        // Piano di base
        const groundGeometry = new THREE.PlaneGeometry(100, 100);
        const groundMaterial = new THREE.MeshStandardMaterial({
            color: 0x2a2a3e,
            roughness: 0.8
        });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -5;
        ground.receiveShadow = true;
        this.scene.add(ground);

        // Griglia helper (opzionale)
        const gridHelper = new THREE.GridHelper(50, 50, 0x444466, 0x333355);
        gridHelper.position.y = -4.99;
        this.scene.add(gridHelper);
    }

    setupLighting() {
        // Luce ambientale MOLTO forte per vedere sempre i modelli
        const ambient = new THREE.AmbientLight(0xffffff, 2.5);
        this.scene.add(ambient);

        // Luce direzionale principale (senza ombre per performance)
        const directional = new THREE.DirectionalLight(0xffffff, 1.5);
        directional.position.set(1000, 2000, 1000);
        this.scene.add(directional);

        // Luce di riempimento
        const fillLight = new THREE.DirectionalLight(0x4488ff, 0.8);
        fillLight.position.set(-1000, 500, -1000);
        this.scene.add(fillLight);

        // Luce posteriore
        const backLight = new THREE.DirectionalLight(0xffffff, 0.8);
        backLight.position.set(0, 500, -1500);
        this.scene.add(backLight);

        // Hemisphere light per illuminazione naturale
        const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.8);
        this.scene.add(hemiLight);
    }

    setupControls() {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.target.set(
            CAMERA_CONFIG.target.x,
            CAMERA_CONFIG.target.y,
            CAMERA_CONFIG.target.z
        );
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.minDistance = 5;
        this.controls.maxDistance = 100;
        this.controls.maxPolarAngle = Math.PI / 2 + 0.3; // Permette di vedere leggermente dal basso
        this.controls.update();
    }

    async loadModels() {
        const loader = new ModelLoader();
        const progressFill = document.getElementById('progress-fill');
        const progressText = document.getElementById('progress-text');
        const loadingText = document.getElementById('loading-text');

        const models = await loader.loadAll(
            ASSEMBLY_CONFIG.components,
            (progress) => {
                const percent = Math.round(progress * 100);
                progressFill.style.width = `${percent}%`;
                progressText.textContent = `${percent}%`;
            },
            (filename, model) => {
                loadingText.textContent = `Caricato: ${filename}`;
            }
        );

        loadingText.textContent = 'Inizializzazione scena...';

        // Aggiungi modelli alla scena
        models.forEach((model, filename) => {
            this.scene.add(model);
        });

        // Crea controller animazione
        this.animationController = new AnimationController(
            ASSEMBLY_CONFIG.components,
            models
        );

        // IMPOSTA VISTA PRIMA DI CALCOLARE LA CAMERA
        // Inizia in vista assemblata per vedere i modelli
        this.animationController.setAssembledView();

        // Ora adatta camera ai modelli nella posizione corretta
        this.fitCameraToScene();

        // Mostra lista componenti
        this.updateComponentList();
    }

    fitCameraToScene() {
        // Calcola bounding box di tutti i modelli
        const box = new THREE.Box3();
        this.scene.traverse((child) => {
            if (child.isMesh) {
                box.expandByObject(child);
            }
        });

        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);

        // Debug: mostra info sulla scena
        console.log('Bounding Box:', {
            center: center,
            size: size,
            maxDim: maxDim
        });

        // Aggiorna limiti camera in base alla dimensione della scena
        this.camera.near = maxDim * 0.001;
        this.camera.far = maxDim * 100;
        this.camera.updateProjectionMatrix();

        // Aggiorna limiti OrbitControls
        this.controls.minDistance = maxDim * 0.1;
        this.controls.maxDistance = maxDim * 10;

        // Posiziona camera per inquadrare la scena - FIX: usa tan invece di sin
        const fov = this.camera.fov * (Math.PI / 180);
        const distance = maxDim / (2 * Math.tan(fov / 2)) * 1.5; // 1.5x per margine

        this.camera.position.set(
            center.x + distance * 0.8,
            center.y + distance * 0.6,
            center.z + distance * 0.8
        );

        this.controls.target.copy(center);
        this.controls.update();

        // Debug: mostra posizione camera
        console.log('Camera position:', this.camera.position);
        console.log('Camera target:', this.controls.target);
    }

    updateComponentList() {
        const componentInfo = document.getElementById('component-info');
        let html = '<strong>Componenti:</strong><br>';

        ASSEMBLY_CONFIG.components.forEach((config, index) => {
            html += `<div class="component-item" id="component-${index}">${index + 1}. ${config.name}</div>`;
        });

        componentInfo.innerHTML = html;
    }

    setupUI() {
        const btnPlay = document.getElementById('btn-play');
        const btnReset = document.getElementById('btn-reset');
        const btnExplode = document.getElementById('btn-explode');
        const btnAssembled = document.getElementById('btn-assembled');
        const speedSlider = document.getElementById('speed-slider');
        const speedValue = document.getElementById('speed-value');
        const statusText = document.getElementById('status-text');

        btnPlay.addEventListener('click', () => {
            if (this.animationController) {
                statusText.textContent = 'Animazione in corso...';

                // Reset stile componenti
                ASSEMBLY_CONFIG.components.forEach((_, index) => {
                    const el = document.getElementById(`component-${index}`);
                    if (el) {
                        el.classList.remove('active', 'completed');
                    }
                });

                this.animationController.playAssemblyAnimation(
                    () => {
                        statusText.textContent = 'Assemblaggio completato!';
                    },
                    (index, name) => {
                        statusText.textContent = `Assemblando: ${name}`;
                        const el = document.getElementById(`component-${index}`);
                        if (el) {
                            el.classList.add('active');
                            el.classList.remove('completed');
                        }
                    },
                    (index) => {
                        const el = document.getElementById(`component-${index}`);
                        if (el) {
                            el.classList.remove('active');
                            el.classList.add('completed');
                        }
                    }
                );
            }
        });

        btnReset.addEventListener('click', () => {
            if (this.animationController) {
                this.animationController.setExplodedView();
                statusText.textContent = 'Reset - Vista esplosa';

                // Reset stile componenti
                ASSEMBLY_CONFIG.components.forEach((_, index) => {
                    const el = document.getElementById(`component-${index}`);
                    if (el) {
                        el.classList.remove('active', 'completed');
                    }
                });
            }
        });

        btnExplode.addEventListener('click', () => {
            if (this.animationController) {
                this.animationController.setExplodedView();
                statusText.textContent = 'Vista esplosa';
            }
        });

        btnAssembled.addEventListener('click', () => {
            if (this.animationController) {
                this.animationController.setAssembledView();
                statusText.textContent = 'Vista assemblata';

                // Segna tutti come completati
                ASSEMBLY_CONFIG.components.forEach((_, index) => {
                    const el = document.getElementById(`component-${index}`);
                    if (el) {
                        el.classList.remove('active');
                        el.classList.add('completed');
                    }
                });
            }
        });

        speedSlider.addEventListener('input', (e) => {
            const speed = parseFloat(e.target.value);
            speedValue.textContent = `${speed}x`;
            if (this.animationController) {
                this.animationController.setSpeed(speed);
            }
        });
    }

    onResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // Aggiorna controlli
        this.controls.update();

        // Render
        this.renderer.render(this.scene, this.camera);
    }
}

// Inizializza applicazione
new AssemblyViewer();
