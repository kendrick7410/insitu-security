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
  gl: null,
  selectedObjectType: 'cube' // Default object type
};

// UI Elements
const UI = {
  startScreen: document.getElementById('start-screen'),
  startButton: document.getElementById('start-ar-button'),
  objectSelector: document.getElementById('object-selector'),
  loadingScreen: document.getElementById('loading-screen'),
  instructions: document.getElementById('instructions'),
  errorMessage: document.getElementById('error-message'),
  errorText: document.getElementById('error-text'),
  statusText: document.getElementById('status-text'),
  tapHint: document.getElementById('tap-hint'),
  resetButton: document.getElementById('reset-button'),
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
      showError('Failed to load 3D model: ' + error.message);
    }
  );
}

/**
 * Create stylized cactus
 */
function createCactus() {
  const group = new THREE.Group();

  // Main body
  const bodyGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.3, 16);
  const bodyMaterial = new THREE.MeshStandardMaterial({
    color: 0x2d5016,
    roughness: 0.8
  });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.position.y = 0.15;
  group.add(body);

  // Left arm
  const armGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.15, 16);
  const leftArm = new THREE.Mesh(armGeometry, bodyMaterial);
  leftArm.position.set(-0.1, 0.2, 0);
  leftArm.rotation.z = Math.PI / 4;
  group.add(leftArm);

  // Right arm
  const rightArm = new THREE.Mesh(armGeometry, bodyMaterial);
  rightArm.position.set(0.1, 0.18, 0);
  rightArm.rotation.z = -Math.PI / 4;
  group.add(rightArm);

  return group;
}

/**
 * Create stylized unicorn
 */
function createUnicorn() {
  const group = new THREE.Group();

  // Body
  const bodyGeometry = new THREE.SphereGeometry(0.12, 16, 16);
  const bodyMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.3,
    metalness: 0.2
  });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.scale.set(1, 0.8, 1.3);
  body.position.y = 0.12;
  group.add(body);

  // Head
  const headGeometry = new THREE.SphereGeometry(0.08, 16, 16);
  const head = new THREE.Mesh(headGeometry, bodyMaterial);
  head.position.set(0, 0.2, 0.15);
  head.scale.set(0.8, 0.9, 1);
  group.add(head);

  // Horn (cone on top of head)
  const hornGeometry = new THREE.ConeGeometry(0.02, 0.12, 8);
  const hornMaterial = new THREE.MeshStandardMaterial({
    color: 0xffd700,
    roughness: 0.2,
    metalness: 0.8
  });
  const horn = new THREE.Mesh(hornGeometry, hornMaterial);
  horn.position.set(0, 0.32, 0.15);
  horn.rotation.z = -0.2;
  group.add(horn);

  // Ears (small cones)
  const earGeometry = new THREE.ConeGeometry(0.02, 0.05, 8);
  const leftEar = new THREE.Mesh(earGeometry, bodyMaterial);
  leftEar.position.set(-0.05, 0.27, 0.15);
  group.add(leftEar);

  const rightEar = new THREE.Mesh(earGeometry, bodyMaterial);
  rightEar.position.set(0.05, 0.27, 0.15);
  group.add(rightEar);

  // Legs (4 cylinders)
  const legGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.1, 8);
  const positions = [
    [-0.07, 0.05, 0.05],
    [0.07, 0.05, 0.05],
    [-0.07, 0.05, -0.05],
    [0.07, 0.05, -0.05]
  ];

  positions.forEach(pos => {
    const leg = new THREE.Mesh(legGeometry, bodyMaterial);
    leg.position.set(...pos);
    group.add(leg);
  });

  // Mane (colorful spheres)
  const maneColors = [0xff69b4, 0x9370db, 0x87ceeb];
  for (let i = 0; i < 3; i++) {
    const maneGeometry = new THREE.SphereGeometry(0.03, 8, 8);
    const maneMaterial = new THREE.MeshStandardMaterial({
      color: maneColors[i],
      roughness: 0.5
    });
    const mane = new THREE.Mesh(maneGeometry, maneMaterial);
    mane.position.set(-0.02 + i * 0.02, 0.24, 0.08 - i * 0.04);
    group.add(mane);
  }

  // Tail (small spheres in arc)
  const tailMaterial = new THREE.MeshStandardMaterial({
    color: 0xff69b4,
    roughness: 0.5
  });
  for (let i = 0; i < 3; i++) {
    const tailPart = new THREE.Mesh(
      new THREE.SphereGeometry(0.02, 8, 8),
      tailMaterial
    );
    tailPart.position.set(
      0,
      0.13 - i * 0.03,
      -0.15 - i * 0.02
    );
    group.add(tailPart);
  }

  return group;
}

/**
 * Create stylized palm tree
 */
function createPalmTree() {
  const group = new THREE.Group();

  // Trunk
  const trunkGeometry = new THREE.CylinderGeometry(0.05, 0.07, 0.4, 8);
  const trunkMaterial = new THREE.MeshStandardMaterial({
    color: 0x8b4513,
    roughness: 0.9
  });
  const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
  trunk.position.y = 0.2;
  group.add(trunk);

  // Leaves (spheres at top)
  const leafMaterial = new THREE.MeshStandardMaterial({
    color: 0x228b22,
    roughness: 0.7
  });

  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI * 2;
    const radius = 0.12;
    const leaf = new THREE.Mesh(
      new THREE.SphereGeometry(0.08, 8, 8),
      leafMaterial
    );
    leaf.position.set(
      Math.cos(angle) * radius,
      0.42,
      Math.sin(angle) * radius
    );
    leaf.scale.set(1.5, 0.3, 1);
    leaf.rotation.y = angle;
    group.add(leaf);
  }

  return group;
}

/**
 * Create 3D object based on selected type
 */
function createObject(type) {
  let geometry;
  const size = 0.2;

  // Handle special types
  if (type === 'cactus') {
    return createCactus();
  } else if (type === 'palm') {
    return createPalmTree();
  } else if (type === 'unicorn') {
    return createUnicorn();
  }

  // Handle geometric shapes
  switch (type) {
    case 'cube':
      geometry = new THREE.BoxGeometry(size, size, size);
      break;
    case 'sphere':
      geometry = new THREE.SphereGeometry(size / 2, 32, 32);
      break;
    case 'cylinder':
      geometry = new THREE.CylinderGeometry(size / 2, size / 2, size, 32);
      break;
    case 'cone':
      geometry = new THREE.ConeGeometry(size / 2, size, 32);
      break;
    case 'torus':
      geometry = new THREE.TorusGeometry(size / 2, size / 6, 16, 100);
      break;
    default:
      geometry = new THREE.BoxGeometry(size, size, size);
  }

  const material = new THREE.MeshStandardMaterial({
    color: 0x4a90e2,
    metalness: 0.5,
    roughness: 0.5
  });

  return new THREE.Mesh(geometry, material);
}

/**
 * Place object at reticle position
 */
function placeObject() {
  console.log('placeObject called!');

  if (!APP.surfaceFound || APP.objectPlaced) return;

  updateStatus('Placing object...');

  try {
    // If avocado plant, load the GLB model
    if (APP.selectedObjectType === 'avocado') {
      loadModel((model) => {
        finalizeObjectPlacement(model);
      });
      return;
    }

    // Create the selected 3D object (shapes or stylized plants)
    const object = createObject(APP.selectedObjectType);
    finalizeObjectPlacement(object);
  } catch (error) {
    console.error('Error placing object:', error);
    updateStatus('❌ Error: ' + error.message);
  }
}

/**
 * Finalize object placement in the scene
 */
function finalizeObjectPlacement(object) {
  try {

    // Position at reticle location
    object.position.setFromMatrixPosition(APP.reticle.matrix);
    object.position.y += 0.1; // Lift slightly above surface

    // Scale avocado model if needed
    if (APP.selectedObjectType === 'avocado') {
      object.scale.set(0.3, 0.3, 0.3);
    }

    // Add to scene
    APP.scene.add(object);
    APP.placedObject = object;
    APP.objectPlaced = true;

    // Position shadow plane under object
    if (APP.shadowPlane) {
      APP.shadowPlane.position.copy(object.position);
      APP.shadowPlane.position.y -= 0.09; // Just below object
      APP.shadowPlane.visible = true;
    }

    // Hide reticle and tap hint
    APP.reticle.visible = false;
    UI.tapHint.classList.add('hidden');

    // Show reset button
    UI.resetButton.classList.remove('hidden');

    // Update UI
    updateStatus('✅ Object placed successfully!');

    console.log('Object placed at:', object.position);
  } catch (error) {
    console.error('Error placing cube:', error);
    updateStatus('❌ Error: ' + error.message);
  }
}

/**
 * Handle tap/touch events for placement
 */
function onSelect() {
  console.log('onSelect called! surfaceFound:', APP.surfaceFound, 'objectPlaced:', APP.objectPlaced);

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
  // Save selected object type
  APP.selectedObjectType = UI.objectSelector.value;
  console.log('Starting AR with object type:', APP.selectedObjectType);

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
 * Reset placement - allow placing another object
 */
function resetPlacement() {
  console.log('🔄 RESET: Resetting placement');
  updateStatus('Resetting...');

  // Remove placed object from scene
  if (APP.placedObject) {
    APP.scene.remove(APP.placedObject);
    APP.placedObject = null;
  }

  // Hide shadow plane
  if (APP.shadowPlane) {
    APP.shadowPlane.visible = false;
  }

  // Reset state
  APP.objectPlaced = false;
  APP.reticle.visible = true;

  // Update UI
  UI.resetButton.classList.add('hidden');
  UI.tapHint.classList.remove('hidden');
  updateStatus('Tap to place another object');

  console.log('Ready to place another object');
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

UI.resetButton.addEventListener('click', resetPlacement);

UI.objectSelector.addEventListener('change', (e) => {
  APP.selectedObjectType = e.target.value;
  console.log('Selected object type:', APP.selectedObjectType);
});

window.addEventListener('resize', onWindowResize);

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
