# 🎬 Guida Lottie - Animazioni Professionali stile VISIOTT

Questa guida ti spiega come creare animazioni Lottie professionali (come quelle di visiott.com) partendo dai tuoi PNG.

## 📋 Cosa Serve

### Software
- **After Effects CC 2020** o successivo
- **Bodymovin Plugin** (per export Lottie JSON)
- I tuoi **PNG trasparenti** esportati

### Alternative Gratuite
Se non hai After Effects:
- **Rive** (https://rive.app) - Editor online gratuito con export Lottie
- **Haiku Animator** - Alternativa semplificata

---

## 🚀 Processo Completo

### STEP 1: Esportare i PNG

1. Apri **`png-exporter.html`** nel browser
2. Scegli **vista Isometrica 30°** (come VISIOTT)
3. Risoluzione **1024x1024**
4. Background **Trasparente**
5. Click **"Esporta Tutti i PNG"**
6. Salva tutti i file in `images/components/`

✅ **Risultato**: 7 file PNG trasparenti (70000001.png - 70000010.png)

---

### STEP 2: Installare Bodymovin in After Effects

**Bodymovin** è il plugin che converte le animazioni After Effects in JSON Lottie.

#### Installazione:

1. **Scarica Bodymovin**:
   - Vai su: https://aescripts.com/bodymovin/
   - Oppure: https://github.com/airbnb/lottie-web/tree/master/build/extension
   - Download **ZXP Installer**: https://aescripts.com/learn/zxp-installer/

2. **Installa con ZXP Installer**:
   - Apri ZXP Installer
   - Trascina il file `.zxp` di Bodymovin
   - Riavvia After Effects

3. **Verifica installazione**:
   - In After Effects: `Window → Extensions → Bodymovin`
   - Deve apparire il pannello Bodymovin

---

### STEP 3: Creare la Composizione in After Effects

#### 3.1 Import PNG

1. `File → Import → Multiple Files...`
2. Seleziona **tutti** i tuoi PNG (70000001.png - 70000010.png)
3. Click **Import**

#### 3.2 Nuova Composizione

1. `Composition → New Composition` (Ctrl+N)
2. **Preset**: HDTV 1080 25 (o custom)
3. **Impostazioni**:
   ```
   Width: 1920px
   Height: 1080px
   Frame Rate: 30 fps
   Duration: 10 secondi (o come calcolato)
   Background: Trasparente (se necessario)
   ```
4. Nome: `Assembly_Animation`
5. Click **OK**

#### 3.3 Aggiungi PNG come Layers

1. Trascina **tutti** i PNG nella timeline
2. Ordina i layer **dal basso verso l'alto**:
   ```
   Layer 7: 70000010.png (in alto)
   Layer 6: 70000008.png
   Layer 5: 70000006.png
   Layer 4: 70000004.png
   Layer 3: 70000003.png
   Layer 2: 70000002.png
   Layer 1: 70000001.png (in basso)
   ```

3. **Centra tutti** i layer:
   - Seleziona tutti (Ctrl+A)
   - `Layer → Transform → Center Anchor Point in Layer Content`
   - Allinea al centro composizione

---

### STEP 4: Animare i Layer

Ora creiamo l'animazione di assemblaggio! Ogni componente entra nella posizione finale.

#### 4.1 Configurazione Base

Apri **`animation-2d-lottie-ready.html`** e scarica il **JSON configurazione**.
Questo file contiene i keyframe esatti da usare!

#### 4.2 Anima Manualmente (Esempio Layer 1)

**Tempistica**:
- 1 componente = 30 frame (1 sec @ 30fps)
- Pausa tra componenti = 6 frame (0.2 sec @ 30fps)

**Layer 1 - 70000001.png**:

1. Seleziona layer 70000001.png
2. Vai al **frame 0**
3. **Keyframe Iniziale** (posizione esplosa):
   - Click su cronometro ⏱ di **Position**
   - Sposta il layer **sotto** (es: Y = +400px)
   - Click su cronometro ⏱ di **Opacity**
   - Imposta Opacity = 0%

4. Vai al **frame 3**:
   - Imposta Opacity = 100%

5. Vai al **frame 30**:
   - **Keyframe Finale** (posizione assemblata)
   - Sposta layer al **centro** (Position originale)

**Layer 2 - 70000002.png**:

1. Seleziona layer 70000002.png
2. Vai al **frame 36** (30 + 6 pausa)
3. Keyframe iniziale: Position sinistra (X = -500), Opacity = 0
4. Frame 39: Opacity = 100%
5. Frame 66: Position centrale

**Continua così** per tutti i layer, spaziando di 36 frame (30 + 6).

#### 4.3 Applicare Easing

Seleziona **tutti i keyframes di Position**:
1. Tasto destro → `Keyframe Assistant → Easy Ease` (F9)
2. Oppure usa `Graph Editor` per curva custom:
   - `Window → Graph Editor`
   - Modifica curve per easing più marcato

---

### STEP 5: Export Lottie con Bodymovin

#### 5.1 Prepara Composizione

1. **Ottimizza layers**:
   - No effetti non supportati (ombre, blur 3D, etc.)
   - Solo: Position, Scale, Rotation, Opacity
   - Lottie supporta: maschere semplici, parenting, trim paths

2. **Pre-compose se necessario**:
   - Layer complessi → `Layer → Pre-compose`

#### 5.2 Export

1. Apri **Bodymovin Panel**:
   - `Window → Extensions → Bodymovin`

2. **Settings**:
   - Click icona ⚙️ Settings
   - ✅ Glyphs (se usi testo)
   - ✅ Hidden Layers
   - ❌ Demo (solo per test)

3. **Seleziona composizione**:
   - Spunta ✅ la tua composizione `Assembly_Animation`

4. **Destinazione**:
   - Click icona 📁
   - Scegli cartella output (es: `lottie-output/`)

5. **Render**:
   - Click **Render**
   - Aspetta completamento

✅ **Risultato**: File `data.json` nella cartella output

---

### STEP 6: Testare il Lottie

#### Opzione A: Lottie Web Player (Online)

1. Vai su: https://lottiefiles.com/preview
2. Trascina il tuo `data.json`
3. Preview immediata!

#### Opzione B: Integra nel Sito

```html
<!DOCTYPE html>
<html>
<head>
    <title>Test Lottie</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.12.2/lottie.min.js"></script>
</head>
<body>
    <div id="lottie-container" style="width: 800px; height: 600px;"></div>

    <script>
        const animation = lottie.loadAnimation({
            container: document.getElementById('lottie-container'),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'lottie-output/data.json' // Path al tuo JSON
        });
    </script>
</body>
</html>
```

#### Opzione C: React / Vue / Angular

```javascript
// React con lottie-react
import Lottie from 'lottie-react';
import animationData from './lottie-output/data.json';

function App() {
    return <Lottie animationData={animationData} loop={true} />;
}
```

---

## 🎨 Tips Avanzati

### 1. Ottimizzare Dimensione File

**Problema**: JSON troppo grande (>500KB)

**Soluzioni**:
- Riduci risoluzione PNG (1024→512)
- Comprimi PNG prima dell'import (TinyPNG.com)
- Riduci keyframes (smooth interpolation)
- Usa `LottieFiles → Optimize` tool online

### 2. Effetti Supportati da Lottie

✅ **Supportati**:
- Position, Scale, Rotation, Opacity
- Parenting (parent-child layers)
- Maschere semplici (no feather complessi)
- Trim Paths (animazioni stroke)
- Fill/Stroke colors
- Linear/Radial gradients

❌ **NON Supportati**:
- Effetti 3D (luci, camere)
- Blur, Glow, Drop Shadow
- Time Remapping
- Expressions complessi
- Layer Styles

### 3. Performance

**Mobile Performance**:
- Max 50 layers
- Evita maschere complesse
- Preferisci `canvas` renderer per animazioni pesanti
- Usa `svg` renderer per qualità alta

**Codice**:
```javascript
lottie.loadAnimation({
    renderer: 'canvas', // canvas = più veloce, svg = qualità migliore
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
        progressiveLoad: true,
        hideOnTransparent: true
    }
});
```

### 4. Interattività

```javascript
const anim = lottie.loadAnimation({ ... });

// Play/Pause
anim.play();
anim.pause();

// Vai a frame specifico
anim.goToAndStop(50, true); // frame 50

// Velocità
anim.setSpeed(2); // 2x velocità

// Loop specifico
anim.playSegments([0, 150], true); // Loop frame 0-150

// Eventi
anim.addEventListener('complete', () => {
    console.log('Animazione completata!');
});
```

---

## 🆘 Troubleshooting

### "Bodymovin non esporta nulla"
- Controlla layers non supportati (3D, effetti)
- Verifica permessi cartella output
- Aggiorna Bodymovin all'ultima versione

### "Animazione non fluida"
- Aumenta frame rate (30→60 fps)
- Riduci numero keyframes
- Usa easing appropriato

### "PNG non appaiono"
- Path corretto nel JSON?
- PNG nello stesso dominio (CORS)?
- Verifica trasparenza PNG (alpha channel)

### "File JSON troppo grande"
- Comprimi PNG prima dell'import
- Riduci risoluzione
- Usa tool: https://lottiefiles.com/tools/lottie-compressor

---

## 📚 Risorse

### Documentazione
- **Lottie Official**: https://airbnb.io/lottie/
- **Bodymovin GitHub**: https://github.com/airbnb/lottie-web
- **LottieFiles Community**: https://lottiefiles.com/

### Esempi
- **VISIOTT** (ispirazione): https://www.visiott.com
- **LottieFiles Explore**: https://lottiefiles.com/featured
- **Animazioni Industriali**: https://lottiefiles.com/search?q=industrial

### Tutorial
- **After Effects + Bodymovin**: https://www.youtube.com/results?search_query=bodymovin+tutorial
- **Lottie Best Practices**: https://lottiefiles.com/blog/working-with-lottie/lottie-animation-best-practices

---

## ✅ Checklist Finale

Prima di pubblicare la tua animazione Lottie:

- [ ] PNG esportati con trasparenza corretta
- [ ] After Effects composizione @ 1920x1080, 30fps
- [ ] Layer ordinati correttamente (z-index)
- [ ] Keyframes con easing appropriato
- [ ] Nessun effetto non supportato
- [ ] Export Bodymovin completato
- [ ] Test su LottieFiles.com/preview
- [ ] File JSON < 500KB (ottimale < 200KB)
- [ ] Test su mobile (performance)
- [ ] Integrazione nel sito funzionante

---

**Buona animazione! 🎬✨**

Per domande o supporto, verifica:
1. [CLAUDE.md](CLAUDE.md) - Info progetto
2. [README.md](README.md) - Setup generale
3. File JSON configurazione da `animation-2d-lottie-ready.html`
