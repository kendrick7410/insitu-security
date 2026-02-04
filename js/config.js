/**
 * In situ Security - Configuration
 * Security system planner for WebXR AR
 */

const CONFIG = {
  // Security item catalog
  items: {
    camera: {
      label: '📹 Camera',
      modelPath: 'models/camera.glb',
      defaultScale: 0.15,
      yOffset: 0,
      description: 'Security camera'
    },
    sensor: {
      label: '🚪 Sensor',
      modelPath: 'models/sensor.glb',
      defaultScale: 0.1,
      yOffset: 0,
      description: 'Door/Window sensor'
    },
    hub: {
      label: '🏠 Hub',
      modelPath: 'models/hub.glb',
      defaultScale: 0.2,
      yOffset: 0,
      description: 'Central unit'
    },
    siren: {
      label: '🔊 Siren',
      modelPath: 'models/siren.glb',
      defaultScale: 0.15,
      yOffset: 0,
      description: 'Alarm siren'
    },
    keypad: {
      label: '🔢 Keypad',
      modelPath: 'models/keypad.glb',
      defaultScale: 0.12,
      yOffset: 0,
      description: 'Control keypad'
    }
  },

  // Reticle configuration
  reticle: {
    color: 0x00ff00,
    size: 0.3,
    opacity: 0.8
  },

  // Shadow plane configuration
  shadow: {
    enabled: true,
    size: 2,
    opacity: 0.3,
    color: 0x000000
  },

  // UI configuration
  ui: {
    instructionsTimeout: 5000,
    showFPS: false
  },

  // Transform constraints
  transform: {
    scaleMin: 0.5,
    scaleMax: 2.0,
    rotationStep: 5 // degrees
  }
};

// Export for ES6 modules (if needed)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}
