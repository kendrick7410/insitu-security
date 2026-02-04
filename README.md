# In situ Security - WebXR AR Proof of Concept

A WebAR application using WebXR Device API and three.js for surface placement and world tracking.

## Features

- **WebXR Immersive AR** - Native browser AR support
- **Hit Test** - Real-time surface detection
- **Tap-to-Place** - Place a 3D object on detected surfaces
- **three.js Rendering** - 3D graphics with glTF/GLB model support
- **Shadow Plane** - Realistic shadow rendering under placed objects
- **Mobile-First** - Optimized for Android Chrome with ARCore

## Requirements

- **Android device** with ARCore installed
- **Chrome browser** (version 79+)
- **HTTPS hosting** (required for WebXR camera access)
- **ARCore** app installed from Google Play Store

### Checking ARCore

To check if ARCore is installed on your device:
1. Open Google Play Store
2. Search for "Google Play Services for AR"
3. Install or update if needed

## Setup

### 1. Add a 3D Model (Optional)

A test model (`object.glb`) is already included. To use your own:
- Place your `.glb` or `.gltf` file in the `models/` directory
- Update the model path in `js/config.js` (line 10)
- Keep model size under 2MB and polygon count under 50k for optimal performance

### 2. Configure Model Settings

Open `js/config.js` to adjust:
```javascript
model: {
  path: 'models/object.glb',  // Model path
  scale: 0.5,                  // Size (0.5 = half size)
  rotationY: 0                 // Rotation in radians
}
```

### 3. Host with HTTPS

WebXR requires HTTPS (except for localhost). Options:

**For local development:**
```bash
# Option 1: Python with HTTPS
python3 -m http.server 8080

# Option 2: Node.js
npx http-server -p 8080

# Then use a tunnel for HTTPS:
npx localtunnel --port 8080
# or
ngrok http 8080
```

**For production:**
- Deploy to any static hosting service with HTTPS:
  - GitHub Pages
  - Netlify
  - Vercel
  - Firebase Hosting

## Project Structure

```
insitu-security/
├── index.html          # Main HTML page
├── css/
│   └── style.css       # Styles
├── js/
│   ├── config.js       # Configuration
│   └── app.js          # WebXR application logic
├── models/
│   └── object.glb      # 3D model
└── README.md
```

## Usage

### Desktop Testing (Limited)
1. Open the HTTPS URL in Chrome on your computer
2. You'll see a message that AR is not supported (WebXR AR requires mobile)

### Android Testing (Full AR Experience)
1. Open the HTTPS URL in Chrome on your Android device
2. Click "Start AR" button
3. Grant camera permissions when prompted
4. Move your device to scan horizontal surfaces
5. A green reticle will appear on detected surfaces
6. Tap the screen to place the 3D object
7. The object will appear with a shadow

## Technologies

- **WebXR Device API** - Native browser AR capabilities
- **three.js** (v0.160.0) - 3D rendering library
- **ARCore** - Google's AR platform for Android
- **glTF/GLB** - 3D model format

## Configuration Options

Edit `js/config.js` to customize:

```javascript
CONFIG = {
  model: {
    path: 'models/object.glb',   // Model file path
    scale: 0.5,                   // Scale factor
    rotationY: 0                  // Initial Y rotation
  },
  reticle: {
    color: 0x00ff00,              // Green indicator
    size: 0.3,                    // Size in meters
    opacity: 0.8
  },
  shadow: {
    enabled: true,                // Show shadow under object
    size: 2,                      // Shadow plane size
    opacity: 0.3,
    color: 0x000000
  },
  ui: {
    instructionsTimeout: 5000,    // Hide instructions after 5s
    showFPS: false
  }
}
```

## Troubleshooting

### "WebXR not supported"
- Make sure you're using Chrome on Android (not iOS Safari)
- Update Chrome to the latest version
- Check that ARCore is installed

### "AR not supported on this device"
- Install "Google Play Services for AR" from Play Store
- Some older Android devices don't support ARCore
- Check ARCore supported devices: https://developers.google.com/ar/devices

### Camera permission denied
- Go to Chrome Settings > Site Settings > Camera
- Allow camera access for your site

### Model doesn't load
- Check browser console (chrome://inspect on desktop)
- Verify model path in `config.js`
- Ensure model is a valid `.glb` or `.gltf` file
- Try with the included test model first

### HTTPS certificate errors with tunnel
- Use `--local` flag with localtunnel to bypass
- With ngrok, use the provided https:// URL directly

## Performance Tips

- **Model optimization:**
  - Keep polygon count under 50k triangles
  - Use compressed textures (< 1024x1024)
  - Prefer `.glb` format (binary, smaller than `.gltf`)

- **Texture optimization:**
  - Use PNG or JPG compression
  - Keep texture resolution reasonable (512x512 or 1024x1024)

- **Lighting:**
  - Current setup uses ambient + directional light
  - Shadow plane adds realism without heavy computation

## Browser Support

| Browser | Platform | Support |
|---------|----------|---------|
| Chrome 79+ | Android | ✅ Full support |
| Chrome | Desktop | ⚠️ No AR (for dev only) |
| Safari | iOS | ❌ No WebXR AR support |
| Firefox | Any | ❌ No WebXR AR support |

## Notes

- This is a frontend-only application (no backend)
- No data persistence - objects disappear on page reload
- Single object placement (tap again won't place a second object)
- Designed for proof-of-concept and testing purposes
- No analytics or tracking services

## Free 3D Model Resources

- **glTF Sample Models**: https://github.com/KhronosGroup/glTF-Sample-Models
- **Sketchfab**: https://sketchfab.com/features/gltf (filter "Downloadable")
- **Poly Haven**: https://polyhaven.com/models
- **Quaternius**: https://quaternius.com/ (low-poly, great for mobile)

## Deployment Example

### GitHub Pages
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/insitu-security.git
git push -u origin main

# Enable GitHub Pages in repository settings
# Select "main" branch as source
# Access at: https://username.github.io/insitu-security/
```

### Netlify
1. Drag and drop the project folder to Netlify
2. Automatic HTTPS deployment
3. Get shareable URL immediately

## License

MIT

## Author

JME - 2026
