/**
 * In situ Security - WebXR AR Application
 *
 * Main application logic using WebXR Device API and three.js
 */

// Global state
const APP = {
  scene: null,
  camera: null,
  renderer: null,
  reticle: null,
  placedObject: null,
  shadowPlane: null,
  surfaceFound: false,
  objectPlaced: false,
  xrSession: null,
  xrRefSpace: null,
  xrHitTestSource: null,
  gl: null
};

// UI Elements
const UI = {
  startScreen: document.getElementById('start-screen'),
  startButton: document.getElementById('start-ar-button'),
  loadingScreen: document.getElementById('loading-screen'),
  instructions: document.getElementById('instructions'),
  errorMessage: document.getElementById('error-message'),
  errorText: document.getElementById('error-text'),
  statusText: document.getElementById('status-text'),
  tapHint: document.getElementById('tap-hint'),
  reloadButton: document.getElementById('reload-button')
};

/**
 * Show error message
 */
function showError(message) {
  UI.errorText.textContent = message;
  UI.errorMessage.classList.remove('hidden');
  UI.loadingScreen.classList.add('hidden');
  UI.startScreen.classList.add('hidden');
  console.error('AR Error:', message);
}

/**
 * Update status text
 */
function updateStatus(text) {
  UI.statusText.textContent = text;
}

/**
 * Initialize three.js scene
 */
function initThreeJS() {
  // Scene
  APP.scene = new THREE.Scene();

  // Camera (will be controlled by WebXR)
  APP.camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.01,
    20
  );

  // Renderer with XR support
  APP.renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    xrCompatible: true
  });
  APP.renderer.setSize(window.innerWidth, window.innerHeight);
  APP.renderer.setPixelRatio(window.devicePixelRatio);
  APP.renderer.xr.enabled = true;

  document.getElementById('ar-container').appendChild(APP.renderer.domElement);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  APP.scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
  directionalLight.position.set(1, 2, 1);
  APP.scene.add(directionalLight);

  // Create reticle (placement indicator)
  createReticle();

  // Create shadow plane
  if (CONFIG.shadow.enabled) {
    createShadowPlane();
  }

  console.log('three.js initialized');
}

/**
 * Create reticle for surface placement
 */
function createReticle() {
  const geometry = new THREE.RingGeometry(
    CONFIG.reticle.size * 0.85,
    CONFIG.reticle.size,
    32
  );
  const material = new THREE.MeshBasicMaterial({
    color: CONFIG.reticle.color,
    opacity: CONFIG.reticle.opacity,
    transparent: true,
    side: THREE.DoubleSide
  });

  APP.reticle = new THREE.Mesh(geometry, material);
  APP.reticle.matrixAutoUpdate = false;
  APP.reticle.visible = false;
  APP.scene.add(APP.reticle);
}

/**
 * Create shadow plane
 */
function createShadowPlane() {
  const geometry = new THREE.PlaneGeometry(CONFIG.shadow.size, CONFIG.shadow.size);
  geometry.rotateX(-Math.PI / 2);

  const material = new THREE.ShadowMaterial({
    color: CONFIG.shadow.color,
    opacity: CONFIG.shadow.opacity
  });

  APP.shadowPlane = new THREE.Mesh(geometry, material);
  APP.shadowPlane.receiveShadow = true;
  APP.shadowPlane.visible = false;
  APP.scene.add(APP.shadowPlane);
}

/**
 * Load 3D model
 */
function loadModel(callback) {
  const loader = new THREE.GLTFLoader();

  updateStatus('Loading 3D model...');

  loader.load(
    CONFIG.model.path,
    (gltf) => {
      console.log('Model loaded successfully');
      alert('Modèle chargé avec succès!');
      callback(gltf.scene);
    },
    (progress) => {
      if (progress.total > 0) {
        const percent = (progress.loaded / progress.total * 100).toFixed(0);
        console.log(`Loading model: ${percent}%`);
      }
    },
    (error) => {
      console.error('Error loading model:', error);
      alert('ERREUR chargement modèle: ' + error.message);
      showError('Failed to load 3D model. Check console for details.');
    }
  );
}

/**
 * Place object at reticle position
 */
function placeObject() {
  console.log('placeObject called!');
  alert('Placement du cube...');

  if (!APP.surfaceFound || APP.objectPlaced) return;

  updateStatus('Placing object...');

  try {
    // Create a simple THREE.js cube instead of loading GLB
    const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    const material = new THREE.MeshStandardMaterial({
      color: 0x00ff00,
      metalness: 0.3,
      roughness: 0.7
    });
    const cube = new THREE.Mesh(geometry, material);

    // Position at reticle location
    cube.position.setFromMatrixPosition(APP.reticle.matrix);
    cube.position.y += 0.1; // Lift slightly above surface

    // Add to scene
    APP.scene.add(cube);
    APP.placedObject = cube;
    APP.objectPlaced = true;

    // Position shadow plane under object
    if (APP.shadowPlane) {
      APP.shadowPlane.position.copy(cube.position);
      APP.shadowPlane.position.y -= 0.09; // Just below cube
      APP.shadowPlane.visible = true;
    }

    // Hide reticle
    APP.reticle.visible = false;

    // Update UI
    updateStatus('Cube placed!');
    UI.tapHint.classList.add('hidden');
    alert('Cube vert placé avec succès!');

    console.log('Cube placed at:', cube.position);
  } catch (error) {
    console.error('Error placing cube:', error);
    alert('ERREUR placement: ' + error.message);
  }
}

/**
 * Handle tap/touch events for placement
 */
function onSelect() {
  console.log('onSelect called! surfaceFound:', APP.surfaceFound, 'objectPlaced:', APP.objectPlaced);
  alert('Tap détecté! Surface: ' + APP.surfaceFound);

  if (APP.surfaceFound && !APP.objectPlaced) {
    placeObject();
  }
}

/**
 * Check WebXR support
 */
async function checkWebXRSupport() {
  if (!navigator.xr) {
    return {
      supported: false,
      message: 'WebXR not supported. Please use Chrome on Android with ARCore installed.'
    };
  }

  try {
    const supported = await navigator.xr.isSessionSupported('immersive-ar');
    if (!supported) {
      return {
        supported: false,
        message: 'AR not supported on this device. Make sure ARCore is installed on Android.'
      };
    }
    return { supported: true };
  } catch (error) {
    return {
      supported: false,
      message: 'Error checking AR support: ' + error.message
    };
  }
}

/**
 * Start WebXR AR Session
 */
async function startARSession() {
  // Hide start screen, show loading
  UI.startScreen.classList.add('hidden');
  UI.loadingScreen.classList.remove('hidden');

  try {
    // Request AR session with required features
    APP.xrSession = await navigator.xr.requestSession('immersive-ar', {
      requiredFeatures: ['hit-test', 'local-floor']
    });

    console.log('WebXR AR session started');

    // Set up session
    await setupXRSession();

    // Start render loop
    APP.renderer.xr.setSession(APP.xrSession);

    // Hide loading, show instructions briefly
    UI.loadingScreen.classList.add('hidden');
    setTimeout(() => {
      UI.instructions.classList.add('hidden');
    }, CONFIG.ui.instructionsTimeout);

    updateStatus('Scanning for surfaces...');

  } catch (error) {
    console.error('Failed to start AR session:', error);
    showError('Failed to start AR: ' + error.message);
  }
}

/**
 * Setup WebXR session
 */
async function setupXRSession() {
  // Set up WebGL layer
  APP.gl = APP.renderer.getContext();

  // Ensure GL context is XR compatible
  await APP.gl.makeXRCompatible();

  await APP.xrSession.updateRenderState({
    baseLayer: new XRWebGLLayer(APP.xrSession, APP.gl)
  });

  // Get reference space
  APP.xrRefSpace = await APP.xrSession.requestReferenceSpace('local-floor');

  // Set up hit test source
  const viewerSpace = await APP.xrSession.requestReferenceSpace('viewer');
  APP.xrHitTestSource = await APP.xrSession.requestHitTestSource({
    space: viewerSpace
  });

  // Handle session end
  APP.xrSession.addEventListener('end', onSessionEnd);

  // Handle select (tap) events
  APP.xrSession.addEventListener('select', onSelect);

  // Add touch handler for mobile (fallback if 'select' doesn't work)
  APP.renderer.domElement.addEventListener('touchstart', (e) => {
    e.preventDefault();
    onSelect();
  }, { passive: false });

  // Set render loop
  APP.renderer.setAnimationLoop(render);

  console.log('WebXR session configured');
}

/**
 * Render loop
 */
function render(timestamp, frame) {
  if (!frame) return;

  // Get viewer pose
  const pose = frame.getViewerPose(APP.xrRefSpace);
  if (!pose) return;

  // Process hit test results
  if (APP.xrHitTestSource && !APP.objectPlaced) {
    const hitTestResults = frame.getHitTestResults(APP.xrHitTestSource);

    if (hitTestResults.length > 0) {
      const hit = hitTestResults[0];
      const hitPose = hit.getPose(APP.xrRefSpace);

      if (hitPose) {
        // Update reticle position
        APP.reticle.matrix.fromArray(hitPose.transform.matrix);
        APP.reticle.visible = true;

        if (!APP.surfaceFound) {
          APP.surfaceFound = true;
          updateStatus('Surface detected!');
          UI.tapHint.classList.remove('hidden');
        }
      }
    } else {
      APP.reticle.visible = false;
    }
  }

  // Render the scene
  APP.renderer.render(APP.scene, APP.camera);
}

/**
 * Handle session end
 */
function onSessionEnd() {
  APP.xrSession = null;
  APP.xrHitTestSource = null;
  APP.xrRefSpace = null;
  APP.surfaceFound = false;

  // Show start screen again
  UI.startScreen.classList.remove('hidden');
  UI.instructions.classList.add('hidden');
  UI.tapHint.classList.add('hidden');

  updateStatus('AR session ended');
  console.log('WebXR session ended');
}

/**
 * Initialize application
 */
async function init() {
  console.log('In situ Security - WebXR AR initializing...');

  // Check WebXR support
  const support = await checkWebXRSupport();
  if (!support.supported) {
    showError(support.message);
    return;
  }

  console.log('WebXR AR is supported');

  // Initialize three.js
  initThreeJS();

  // Set up start button
  UI.startButton.addEventListener('click', startARSession);

  console.log('Ready to start AR');
}

/**
 * Handle window resize
 */
function onWindowResize() {
  if (APP.camera && APP.renderer) {
    APP.camera.aspect = window.innerWidth / window.innerHeight;
    APP.camera.updateProjectionMatrix();
    APP.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}

/**
 * Event listeners
 */
UI.reloadButton.addEventListener('click', () => {
  window.location.reload();
});

window.addEventListener('resize', onWindowResize);

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
