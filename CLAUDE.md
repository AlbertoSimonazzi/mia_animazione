# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Industrial machinery (astucciatrice) assembly visualization system with two main components:
1. **Web Viewer**: Three.js-based interactive 3D viewer for browser-based assembly animations
2. **Blender Script**: Python script for creating animated assembly sequences in Blender

## Running the Application

### Web Viewer

The application runs without a build step using ES modules via CDN.

```bash
# Using Python (any directory will work)
python3 -m http.server 8000
# or
python -m http.server 8000

# Then open: http://localhost:8000
```

Alternatively, since this is in a XAMPP environment (c:\xampp\htdocs\mia_animazione), access via:
```
http://localhost/mia_animazione
```

### Blender Animation Script

1. Open Blender 4.x
2. Switch to **Scripting** tab
3. Open [assembly_animation.py](assembly_animation.py)
4. Update `GLB_FOLDER` path (line 29) to match your system
5. Click **Run Script** (play button)
6. Preview with Spacebar
7. Export: **Render → Render Animation** (Ctrl+F12)

## Code Architecture

### Web Viewer Structure

Modular ES6 architecture with clear separation of concerns:

- **[main.js](js/main.js)**: Entry point, `AssemblyViewer` class orchestrates scene setup, model loading, and UI controls
- **[config.js](js/config.js)**: Centralized configuration for assembly sequence, timing, camera, and lighting
- **[loader.js](js/loader.js)**: `ModelLoader` class handles GLB loading with progress tracking using Three.js GLTFLoader
- **[animation.js](js/animation.js)**: `AnimationController` manages position interpolation and sequential assembly animations
- **[index.html](index.html)**: Main HTML with import map for Three.js CDN modules (v0.160.0)

**Key Design Patterns**:
- ES6 modules with CDN imports (no bundler required)
- Promise-based async loading with progress callbacks
- RequestAnimationFrame-based animation loop with easing functions
- Position-based animation (stores exploded/final positions per component)

### Configuration System

All assembly behavior is controlled via [config.js](js/config.js):

```javascript
ASSEMBLY_CONFIG = {
  animationDuration: 1500,  // Per-component duration (ms)
  delayBetween: 300,        // Pause between components (ms)
  explodeDistance: 200,     // Default explosion distance
  components: [...]         // Array defining sequence and directions
}
```

Each component specifies:
- `filename`: GLB file to load
- `name`: Display name in UI
- `explodeDirection`: {x, y, z} vector for explosion direction
- `explodeDistance`: (optional) Override default distance

**Changing Assembly Order**: Reorder the `components` array in [config.js](js/config.js)

**Changing Directions**: Modify `explodeDirection` for each component:
- `y: -1` (from below), `y: 1` (from above)
- `x: -1` (from left), `x: 1` (from right)
- `z: -1` (from behind), `z: 1` (from front)

### Blender Script Architecture

Single-file Python script with clear functional sections:

1. **Configuration** (lines 24-61): Editable constants for paths, timing, and explosion directions
2. **Scene Setup** (lines 67-151): Camera/lighting auto-configuration based on model bounding boxes
3. **Animation** (lines 153-204): Keyframe-based position animation with Bezier easing
4. **Render Config** (lines 206-228): Eevee engine setup for MP4 export

**Key Variables**:
- `GLB_FOLDER`: Path to models (update for your system)
- `COMPONENTS`: List of GLB files in assembly order
- `EXPLODE_DISTANCE`: How far components start from assembled position
- `FRAMES_PER_COMPONENT`: Animation duration per component (30fps = 1 second)
- `EXPLODE_DIRECTIONS`: Per-component (x,y,z) direction tuples

## 3D Model Files

8 component files + 1 complete assembly:
- `70000001.glb` through `70000010.glb`: Individual components (note: skips 70000005, 70000007, 70000009)
- `70000104.glb`: Complete assembled machine

GLB format (glTF 2.0 binary) contains embedded geometry, materials, and textures. Cannot be edited as text - use Blender or glTF tools for modifications.

## Technology Stack

- **Frontend**: Vanilla JavaScript (ES6 modules), Three.js r160
- **3D Loading**: GLTFLoader from Three.js addons
- **Animation**: Custom position interpolation with easeInOutQuad
- **Blender Integration**: Python 3 with Blender 4.x bpy API
- **Server**: Python HTTP server or XAMPP/Apache

## Important Notes

- **No build process**: Application uses import maps to load Three.js from CDN
- **Browser requirements**: Must support ES modules and import maps (Chrome 89+, Firefox 108+, Safari 16.4+)
- **Coordinate system**: Models use industrial CAD scale (likely millimeters), explode distances ~200-350 units
- **Camera adaptation**: [main.js](js/main.js:171-216) auto-calculates camera position based on model bounding boxes
- **Windows paths**: Blender script uses Unix-style paths; update `GLB_FOLDER` for Windows (use forward slashes or raw strings)
