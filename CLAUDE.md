# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a 3D animation assets repository containing GLB (glTF 2.0 binary format) files. The directory serves as storage for compiled 3D models used by client applications.

## Asset Structure

- **Format:** GLB (glTF 2.0 binary) - industry standard for 3D content with embedded geometry, materials, textures, and animations
- **Naming Convention:** Numeric IDs (e.g., 70000001.glb, 70000002.glb) suggesting database-backed asset management
- **Organization:** Flat directory structure suitable for direct CDN delivery or asset server access

## Working with GLB Files

GLB files are binary and cannot be directly edited as text. To inspect or modify:

```bash
# View file metadata and size
ls -lh *.glb

# Validate GLB structure (requires gltf-validator)
gltf-validator <filename>.glb
```

## Integration Notes

These assets are consumed by external 3D applications/viewers using glTF-compatible renderers (Three.js, Babylon.js, native WebGL, etc.). Any changes to asset IDs must be coordinated with consuming applications.
