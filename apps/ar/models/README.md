# 3D Models Directory

Place your `.glb` or `.gltf` 3D models in this directory.

## Where to Get Free 3D Models

### glTF Sample Models (Official)
- https://github.com/KhronosGroup/glTF-Sample-Models
- Free, well-optimized glTF models for testing

### Sketchfab
- https://sketchfab.com/features/gltf
- Filter by "Downloadable" and select glTF format
- Many free models with Creative Commons licenses

### Poly Haven (formerly Poly by Google)
- https://polyhaven.com/models
- Free CC0 models (no attribution required)
- High-quality assets

### Quaternius
- https://quaternius.com/
- Free low-poly 3D models
- Great for mobile WebAR performance

### CGTrader
- https://www.cgtrader.com/free-3d-models
- Filter by glTF/GLB format
- Mix of free and paid models

## Model Requirements

- **Format**: `.glb` (preferred) or `.gltf`
- **Size**: Keep under 10MB for fast loading on mobile
- **Optimization**: Use compressed textures and low poly counts for better performance
- **Orientation**: Models should be upright (Y-up coordinate system)

## Testing Your Model

1. Place your model file (e.g., `object.glb`) in this directory
2. Update the model path in `js/config.js`:
   ```javascript
   model: {
     path: 'models/object.glb',  // Change to your filename
     scale: 0.5,                  // Adjust scale as needed
     rotationY: 0                 // Adjust rotation if needed
   }
   ```
3. Test in the browser

## Optimization Tips

- Use tools like [gltf-pipeline](https://github.com/CesiumGS/gltf-pipeline) to compress models
- Remove unnecessary animations, materials, or textures
- Use power-of-2 texture dimensions (256x256, 512x512, etc.)
- Consider using Draco compression for geometry
