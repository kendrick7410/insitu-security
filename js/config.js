/**
 * In situ Security - Configuration
 *
 * WebXR AR Configuration
 */

const CONFIG = {
  // 3D Model configuration
  model: {
    path: 'models/avocado-plant.glb', // Path to your 3D model
    scale: 0.3,                        // Scale of the model
    rotationY: 0                       // Initial Y rotation (radians)
  },

  // Reticle configuration (visual indicator for surface placement)
  reticle: {
    color: 0x00ff00,            // Green color
    size: 0.3,                  // Size in meters
    opacity: 0.8
  },

  // Shadow plane configuration
  shadow: {
    enabled: true,
    size: 2,                    // Size in meters
    opacity: 0.3,
    color: 0x000000
  },

  // UI configuration
  ui: {
    instructionsTimeout: 5000,  // Hide instructions after 5 seconds
    showFPS: false              // Show FPS counter (for debugging)
  }
};

// Export for ES6 modules (if needed)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}
