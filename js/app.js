/**
 * In situ Security - WebXR AR Application (Palier 1)
 *
 * Security system planner with multi-object placement
 */

// Debug logging function
function debugLog(message) {
  console.log(message);
  const debugPanel = document.getElementById('debug-log');
  if (debugPanel) {
    const time = new Date().toLocaleTimeString();
    debugPanel.innerHTML += `<div>[${time}] ${message}</div>`;
    debugPanel.parentElement.scrollTop = debugPanel.parentElement.scrollHeight;
  }
}

debugLog('🟢 app.js loaded');

// Global app state
const APP = {
  scene: null,
  camera: null,
  renderer: null,
  reticle: null,
  xrSession: null,
  xrRefSpace: null,
  xrHitTestSource: null,
  gl: null,
  surfaceFound: false,
  raycaster: new THREE.Raycaster(),
  loader: null
};

// UI Elements (will be initialized after DOM ready)
const UI = {};

/**
 * Initialize UI element references
 */
function initUIElements() {
  debugLog('🟢 initUIElements called');
  UI.startScreen = document.getElementById('start-screen');
  UI.startButton = document.getElementById('start-ar-button');
  debugLog('🟢 startButton: ' + (UI.startButton ? 'FOUND ✅' : 'NOT FOUND ❌'));
  UI.loadingScreen = document.getElementById('loading-screen');
  UI.loadingText = document.getElementById('loading-text');
  UI.errorMessage = document.getElementById('error-message');
  UI.errorText = document.getElementById('error-text');
  UI.reloadButton = document.getElementById('reload-button');
  UI.statusOverlay = document.getElementById('status-overlay');
  UI.statusText = document.getElementById('status-text');
  UI.modeIndicator = document.getElementById('mode-indicator');
  UI.catalogPanel = document.getElementById('catalog-panel');
  UI.catalogItems = document.querySelectorAll('.catalog-item');
  UI.toggleListBtn = document.getElementById('toggle-list-btn');
  UI.inspectorPanel = document.getElementById('inspector-panel');
  UI.objectNameInput = document.getElementById('object-name');
  UI.closeInspector = document.getElementById('close-inspector');
  UI.rotationSlider = document.getElementById('rotation-slider');
  UI.rotationValue = document.getElementById('rotation-value');
  UI.scaleSlider = document.getElementById('scale-slider');
  UI.scaleValue = document.getElementById('scale-value');
  UI.moveBtn = document.getElementById('move-btn');
  UI.duplicateBtn = document.getElementById('duplicate-btn');
  UI.deleteBtn = document.getElementById('delete-btn');
  UI.listPanel = document.getElementById('list-panel');
  UI.closeList = document.getElementById('close-list');
  UI.objectsList = document.getElementById('objects-list');
  UI.objectCount = document.getElementById('object-count');
  UI.clearAllBtn = document.getElementById('clear-all-btn');
}

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
 * Update mode indicator
 */
function updateModeIndicator() {
  UI.modeIndicator.textContent = `MODE: ${STATE.currentMode.toUpperCase()}`;
}

/**
 * Initialize three.js scene
 */
function initThreeJS() {
  try {
    debugLog('🔧 Checking THREE availability...');
    if (typeof THREE === 'undefined') {
      debugLog('❌ THREE is not defined! CDN not loaded');
      showError('THREE.js library failed to load from CDN');
      return;
    }
    debugLog('✅ THREE is available');

    debugLog('🔧 Creating scene...');
    APP.scene = new THREE.Scene();
    debugLog('✅ Scene created');

    debugLog('🔧 Creating camera...');
    APP.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.01,
      20
    );
    debugLog('✅ Camera created');

    debugLog('🔧 Creating WebGL renderer...');
    APP.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      xrCompatible: true
    });
    debugLog('✅ Renderer created');

    debugLog('🔧 Configuring renderer...');
    APP.renderer.setSize(window.innerWidth, window.innerHeight);
    APP.renderer.setPixelRatio(window.devicePixelRatio);
    APP.renderer.xr.enabled = true;
    debugLog('✅ Renderer configured');

    debugLog('🔧 Appending canvas to DOM...');
    document.getElementById('ar-container').appendChild(APP.renderer.domElement);
    debugLog('✅ Canvas appended');

    debugLog('🔧 Adding lights...');
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    APP.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(1, 2, 1);
    APP.scene.add(directionalLight);
    debugLog('✅ Lights added');

    debugLog('🔧 Creating reticle...');
    createReticle();
    debugLog('✅ Reticle created');

    debugLog('🔧 Checking GLTFLoader...');
    if (typeof THREE.GLTFLoader === 'undefined') {
      debugLog('⚠️ GLTFLoader not available, will use fallback');
      APP.loader = null;
    } else {
      APP.loader = new THREE.GLTFLoader();
      debugLog('✅ GLTFLoader initialized');
    }

    debugLog('✅ three.js initialization complete');
  } catch (error) {
    debugLog('❌ Error in initThreeJS: ' + error.message);
    showError('Failed to initialize 3D engine: ' + error.message);
  }
}

/**
 * Create reticle for surface placement
 */
function createReticle() {
  try {
    debugLog('  📍 Creating reticle geometry...');
    const geometry = new THREE.RingGeometry(
      CONFIG.reticle.size * 0.85,
      CONFIG.reticle.size,
      32
    );
    debugLog('  📍 Creating reticle material...');
    const material = new THREE.MeshBasicMaterial({
      color: CONFIG.reticle.color,
      opacity: CONFIG.reticle.opacity,
      transparent: true,
      side: THREE.DoubleSide
    });

    debugLog('  📍 Creating reticle mesh...');
    APP.reticle = new THREE.Mesh(geometry, material);
    APP.reticle.matrixAutoUpdate = false;
    APP.reticle.visible = false;
    debugLog('  📍 Adding reticle to scene...');
    APP.scene.add(APP.reticle);
    debugLog('  ✅ Reticle complete');
  } catch (error) {
    debugLog('  ❌ Error creating reticle: ' + error.message);
    throw error;
  }
}

/**
 * Load or get cached model
 */
function loadSecurityItem(type, callback) {
  const config = CONFIG.items[type];

  debugLog('🔧 loadSecurityItem: ' + type);

  // Check cache
  if (STATE.modelCache[type]) {
    debugLog('  ✅ Found in cache');
    const cloned = STATE.modelCache[type].clone();
    callback(cloned);
    return;
  }

  // If GLTFLoader not available, use fallback immediately
  if (!APP.loader) {
    debugLog('  ⚠️ No GLTFLoader, using fallback');
    const fallback = createFallbackMesh(type);
    STATE.modelCache[type] = fallback; // Cache it
    callback(fallback);
    return;
  }

  // Load model
  debugLog('  📥 Loading GLB model...');
  updateStatus(`Loading ${config.label}...`);

  APP.loader.load(
    config.modelPath,
    (gltf) => {
      debugLog('  ✅ Model loaded');
      STATE.modelCache[type] = gltf.scene;
      const cloned = gltf.scene.clone();
      callback(cloned);
    },
    undefined,
    (error) => {
      debugLog('  ❌ Error loading model: ' + error.message);
      // Fallback to simple geometry
      const fallback = createFallbackMesh(type);
      STATE.modelCache[type] = fallback;
      callback(fallback);
    }
  );
}

/**
 * Create fallback mesh if model fails to load
 * Making them BIG and BRIGHT so they're clearly visible!
 */
function createFallbackMesh(type) {
  const config = CONFIG.items[type];

  // Create a BIG cube - 30cm on each side
  const geometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);

  // Bright colors per type for easy identification
  const colors = {
    camera: 0xff0000,   // Red
    sensor: 0x00ff00,   // Green
    hub: 0x0000ff,      // Blue
    siren: 0xff00ff,    // Magenta
    keypad: 0xffff00    // Yellow
  };

  const material = new THREE.MeshStandardMaterial({
    color: colors[type] || 0xff0000,
    metalness: 0.1,
    roughness: 0.8,
    emissive: colors[type] || 0xff0000,
    emissiveIntensity: 0.3
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.userData.isFallback = true;

  debugLog('  📦 Created fallback cube: ' + type + ', size: 30cm, color: ' + colors[type]);

  return mesh;
}

/**
 * Place object at reticle position
 */
function placeObject() {
  debugLog('📦 placeObject called');
  debugLog('  Surface found: ' + APP.surfaceFound);
  debugLog('  Mode: ' + STATE.currentMode);

  if (!APP.surfaceFound || STATE.currentMode !== 'place') {
    debugLog('  ❌ Cannot place: surface=' + APP.surfaceFound + ', mode=' + STATE.currentMode);
    return;
  }

  const type = STATE.currentCatalogType;
  const config = CONFIG.items[type];
  debugLog('  Type: ' + type);

  loadSecurityItem(type, (mesh) => {
    debugLog('  ✅ Mesh received, placing...');

    // Get ID and name
    const id = STATE.getNextId(type);
    const name = STATE.getNextName(type);
    debugLog('  ID: ' + id + ', Name: ' + name);

    // Position at reticle
    const position = new THREE.Vector3();
    position.setFromMatrixPosition(APP.reticle.matrix);
    position.y += config.yOffset;
    debugLog('  Position: ' + position.x.toFixed(2) + ', ' + position.y.toFixed(2) + ', ' + position.z.toFixed(2));

    mesh.position.copy(position);

    // Apply default scale (but not for fallback cubes - they're already sized)
    const scale = mesh.userData.isFallback ? 1.0 : config.defaultScale;
    mesh.scale.set(scale, scale, scale);
    debugLog('  Scale: ' + scale + (mesh.userData.isFallback ? ' (fallback - no scaling)' : ''));

    // Store metadata
    mesh.userData = {
      id: id,
      type: type,
      name: name,
      isSecurityItem: true
    };

    // Add to scene
    APP.scene.add(mesh);
    debugLog('  ✅ Added to scene');

    // Add to state
    const objectData = {
      id: id,
      type: type,
      name: name,
      mesh: mesh,
      position: position.clone(),
      rotation: 0,
      scale: scale,
      timestamp: Date.now()
    };
    STATE.addObject(objectData);
    debugLog('  ✅ Added to state. Total objects: ' + STATE.placedObjects.length);

    // Update UI
    updateObjectsList();
    updateStatus(`✅ ${name} placed`);
    debugLog('✅ PLACEMENT COMPLETE!');

    // Show visual feedback - green flash
    const flash = document.getElementById('placement-flash');
    if (flash) {
      flash.classList.add('active');
      setTimeout(() => flash.classList.remove('active'), 200);
    }
  });
}

/**
 * Handle tap/touch events
 */
function onSelect(event) {
  debugLog('👆 TAP DETECTED! Mode: ' + STATE.currentMode);

  if (STATE.currentMode === 'place') {
    debugLog('  📍 Calling placeObject...');
    // Place new object
    placeObject();
  } else if (STATE.currentMode === 'move') {
    debugLog('  🚚 Moving object...');
    // Move selected object
    if (STATE.selectedObjectId) {
      const obj = STATE.getSelectedObject();
      if (obj && obj.mesh) {
        const position = new THREE.Vector3();
        position.setFromMatrixPosition(APP.reticle.matrix);
        position.y += CONFIG.items[obj.type].yOffset;

        obj.mesh.position.copy(position);
        obj.position = position.clone();

        updateStatus(`✅ ${obj.name} moved`);
        debugLog('  ✅ Object moved');

        // Exit move mode
        STATE.setMode('place');
        updateModeIndicator();
      }
    }
  }
}

/**
 * Handle object selection via raycast
 */
function handleObjectSelection(x, y) {
  // Only select in place mode
  if (STATE.currentMode !== 'place') return;

  // Normalize coordinates
  const mouse = new THREE.Vector2();
  mouse.x = (x / window.innerWidth) * 2 - 1;
  mouse.y = -(y / window.innerHeight) * 2 + 1;

  // Raycast
  APP.raycaster.setFromCamera(mouse, APP.camera);

  // Only check placed objects
  const placedMeshes = STATE.placedObjects.map(obj => obj.mesh);
  const intersects = APP.raycaster.intersectObjects(placedMeshes, true);

  if (intersects.length > 0) {
    let object = intersects[0].object;

    // Find root object with userData
    while (object.parent && !object.userData.isSecurityItem) {
      object = object.parent;
    }

    if (object.userData.isSecurityItem) {
      const id = object.userData.id;
      selectObject(id);
      return true;
    }
  }

  return false;
}

/**
 * Select object and show inspector
 */
function selectObject(id) {
  STATE.selectObject(id);
  const obj = STATE.getSelectedObject();

  if (obj) {
    // Update inspector
    UI.objectNameInput.value = obj.name;
    UI.rotationSlider.value = obj.rotation || 0;
    UI.rotationValue.textContent = `${obj.rotation || 0}°`;
    UI.scaleSlider.value = (obj.scale * 100) || 100;
    UI.scaleValue.textContent = `${obj.scale.toFixed(1)}x`;

    // Show inspector
    UI.inspectorPanel.classList.remove('hidden');

    // Highlight in list
    updateObjectsList();

    updateStatus(`Selected: ${obj.name}`);
  }
}

/**
 * Deselect object and hide inspector
 */
function deselectObject() {
  STATE.deselectObject();
  UI.inspectorPanel.classList.add('hidden');
  updateObjectsList();
  updateStatus('Scanning for surfaces...');
}

/**
 * Update objects list panel
 */
function updateObjectsList() {
  UI.objectCount.textContent = STATE.placedObjects.length;
  UI.objectsList.innerHTML = '';

  STATE.placedObjects.forEach(obj => {
    const item = document.createElement('div');
    item.className = 'object-list-item';
    if (obj.id === STATE.selectedObjectId) {
      item.classList.add('selected');
    }

    const config = CONFIG.items[obj.type];
    const icon = config.label.split(' ')[0]; // Get emoji

    item.innerHTML = `
      <div class="object-list-item-header">
        <span class="object-list-item-icon">${icon}</span>
        <span class="object-list-item-name">${obj.name}</span>
      </div>
      <div class="object-list-item-info">
        ${obj.type} • ${new Date(obj.timestamp).toLocaleTimeString()}
      </div>
    `;

    item.addEventListener('click', () => {
      selectObject(obj.id);
      UI.listPanel.classList.add('hidden');
    });

    UI.objectsList.appendChild(item);
  });
}

/**
 * Delete selected object
 */
function deleteSelectedObject() {
  const obj = STATE.getSelectedObject();
  if (!obj) return;

  // Remove from scene
  APP.scene.remove(obj.mesh);

  // Remove from state
  STATE.removeObject(obj.id);

  // Close inspector
  deselectObject();

  // Update list
  updateObjectsList();

  updateStatus(`🗑️ ${obj.name} deleted`);
}

/**
 * Duplicate selected object
 */
function duplicateSelectedObject() {
  const obj = STATE.getSelectedObject();
  if (!obj) return;

  const type = obj.type;
  const config = CONFIG.items[type];

  loadSecurityItem(type, (mesh) => {
    // Get new ID and name
    const id = STATE.getNextId(type);
    const name = STATE.getNextName(type);

    // Position slightly offset
    const position = obj.position.clone();
    position.x += 0.2;

    mesh.position.copy(position);
    mesh.rotation.copy(obj.mesh.rotation);
    mesh.scale.copy(obj.mesh.scale);

    mesh.userData = {
      id: id,
      type: type,
      name: name,
      isSecurityItem: true
    };

    APP.scene.add(mesh);

    const objectData = {
      id: id,
      type: type,
      name: name,
      mesh: mesh,
      position: position.clone(),
      rotation: obj.rotation,
      scale: obj.scale,
      timestamp: Date.now()
    };
    STATE.addObject(objectData);

    updateObjectsList();
    updateStatus(`📋 ${name} duplicated`);
  });
}

/**
 * Clear all objects
 */
function clearAllObjects() {
  if (STATE.placedObjects.length === 0) return;

  if (confirm('Clear all objects? This cannot be undone.')) {
    // Remove all meshes from scene
    STATE.placedObjects.forEach(obj => {
      APP.scene.remove(obj.mesh);
    });

    // Clear state
    STATE.clearAll();

    // Close panels
    deselectObject();
    UI.listPanel.classList.add('hidden');

    // Update UI
    updateObjectsList();
    updateStatus('🗑️ All objects cleared');
  }
}

/**
 * Check WebXR support
 */
async function checkWebXRSupport() {
  if (!navigator.xr) {
    return {
      supported: false,
      message: 'WebXR not supported. Please use Chrome on Android with ARCore.'
    };
  }

  try {
    const supported = await navigator.xr.isSessionSupported('immersive-ar');
    if (!supported) {
      return {
        supported: false,
        message: 'AR not supported. Make sure ARCore is installed on Android.'
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
  debugLog('🔵 startARSession called!');
  alert('Start button clicked!'); // Temporary debug alert
  UI.startScreen.classList.add('hidden');
  UI.loadingScreen.classList.remove('hidden');
  UI.loadingText.textContent = 'Initializing AR...';

  try {
    // Get existing overlay container from DOM
    const overlay = document.getElementById('xr-overlay');
    if (!overlay) {
      debugLog('❌ XR overlay container not found!');
      throw new Error('XR overlay container missing');
    }
    debugLog('✅ Found XR overlay container');

    debugLog('🔧 Requesting XR session with DOM overlay...');
    APP.xrSession = await navigator.xr.requestSession('immersive-ar', {
      requiredFeatures: ['hit-test', 'local-floor'],
      optionalFeatures: ['dom-overlay', 'plane-detection'],
      domOverlay: { root: overlay }
    });

    debugLog('✅ WebXR AR session started with DOM overlay');

    await setupXRSession();
    APP.renderer.xr.setSession(APP.xrSession);

    UI.loadingScreen.classList.add('hidden');

    debugLog('📱 Showing catalog panel...');
    UI.catalogPanel.classList.remove('hidden');
    debugLog('✅ Catalog panel visible');

    updateStatus('Tap green circle to place object');
    updateModeIndicator();

  } catch (error) {
    console.error('Failed to start AR session:', error);
    showError('Failed to start AR: ' + error.message);
  }
}

/**
 * Setup WebXR session
 */
async function setupXRSession() {
  APP.gl = APP.renderer.getContext();
  await APP.gl.makeXRCompatible();

  await APP.xrSession.updateRenderState({
    baseLayer: new XRWebGLLayer(APP.xrSession, APP.gl)
  });

  APP.xrRefSpace = await APP.xrSession.requestReferenceSpace('local-floor');

  // Use viewer space for center-screen hit testing
  const viewerSpace = await APP.xrSession.requestReferenceSpace('viewer');

  // Request hit test from viewer (center of screen, looking forward)
  APP.xrHitTestSource = await APP.xrSession.requestHitTestSource({
    space: viewerSpace,
    offsetRay: new XRRay() // Ray from viewer origin, pointing forward
  });

  debugLog('✅ Hit test configured for center-screen (walls & floor)');

  APP.xrSession.addEventListener('end', onSessionEnd);
  APP.xrSession.addEventListener('select', onSelect);

  // Touch handler for object selection
  APP.renderer.domElement.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      const selected = handleObjectSelection(touch.clientX, touch.clientY);

      // If no object selected, treat as placement/move tap
      if (!selected) {
        onSelect();
      }
    }
  }, { passive: true });

  APP.renderer.setAnimationLoop(render);

  debugLog('WebXR session configured');

  // Force catalog to stay visible after session setup
  setTimeout(() => {
    debugLog('🔧 Force showing catalog panel...');
    UI.catalogPanel.classList.remove('hidden');
    UI.catalogPanel.style.display = 'block';
    UI.catalogPanel.style.visibility = 'visible';
    debugLog('✅ Catalog forced visible');
  }, 500);
}

/**
 * Render loop
 */
function render(timestamp, frame) {
  if (!frame) return;

  const pose = frame.getViewerPose(APP.xrRefSpace);
  if (!pose) return;

  // Update camera for raycasting
  APP.camera = pose.views[0].camera || APP.camera;

  // Hit test for reticle
  if (APP.xrHitTestSource) {
    const hitTestResults = frame.getHitTestResults(APP.xrHitTestSource);

    if (hitTestResults.length > 0) {
      const hit = hitTestResults[0];
      const hitPose = hit.getPose(APP.xrRefSpace);

      if (hitPose) {
        APP.reticle.matrix.fromArray(hitPose.transform.matrix);
        APP.reticle.visible = true;

        if (!APP.surfaceFound) {
          APP.surfaceFound = true;
          updateStatus('Aim at wall/floor & tap to place');
        }
      }
    } else {
      APP.reticle.visible = false;
    }
  }

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

  UI.startScreen.classList.remove('hidden');
  UI.catalogPanel.classList.add('hidden');
  UI.inspectorPanel.classList.add('hidden');
  UI.listPanel.classList.add('hidden');

  console.log('WebXR session ended');
}

/**
 * Setup UI event listeners
 */
function setupUIListeners() {
  debugLog('🟢 setupUIListeners called');

  // Start button
  debugLog('🟢 Setting up start button listener');
  if (UI.startButton) {
    UI.startButton.addEventListener('click', () => {
      debugLog('🔵 Start button clicked!');
      startARSession();
    });
    debugLog('🟢 Start button listener added');
  } else {
    debugLog('❌ Start button not found!');
  }

  // Catalog items
  debugLog('🟢 Setting up catalog item listeners: ' + UI.catalogItems.length + ' items');
  UI.catalogItems.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      debugLog('🔵 Catalog item clicked: ' + btn.dataset.type);
      UI.catalogItems.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      STATE.setCatalogType(btn.dataset.type);
      updateStatus('Selected: ' + btn.dataset.type + ' - Tap to place');
    });
    debugLog('  ✅ Listener ' + index + ': ' + btn.dataset.type);
  });

  // Toggle list
  UI.toggleListBtn.addEventListener('click', () => {
    UI.listPanel.classList.toggle('hidden');
  });

  // Close list
  UI.closeList.addEventListener('click', () => {
    UI.listPanel.classList.add('hidden');
  });

  // Close inspector
  UI.closeInspector.addEventListener('click', () => {
    deselectObject();
  });

  // Object name change
  UI.objectNameInput.addEventListener('input', (e) => {
    const obj = STATE.getSelectedObject();
    if (obj) {
      obj.name = e.target.value;
      obj.mesh.userData.name = e.target.value;
      updateObjectsList();
    }
  });

  // Rotation slider
  UI.rotationSlider.addEventListener('input', (e) => {
    const obj = STATE.getSelectedObject();
    if (obj) {
      const rotation = parseInt(e.target.value);
      obj.rotation = rotation;
      obj.mesh.rotation.y = THREE.MathUtils.degToRad(rotation);
      UI.rotationValue.textContent = `${rotation}°`;
    }
  });

  // Scale slider
  UI.scaleSlider.addEventListener('input', (e) => {
    const obj = STATE.getSelectedObject();
    if (obj) {
      const scale = parseInt(e.target.value) / 100;
      obj.scale = scale;
      obj.mesh.scale.set(scale, scale, scale);
      UI.scaleValue.textContent = `${scale.toFixed(1)}x`;
    }
  });

  // Move button
  UI.moveBtn.addEventListener('click', () => {
    STATE.setMode('move');
    updateModeIndicator();
    updateStatus('Tap surface to move object');
    UI.inspectorPanel.classList.add('hidden');
  });

  // Duplicate button
  UI.duplicateBtn.addEventListener('click', () => {
    duplicateSelectedObject();
  });

  // Delete button
  UI.deleteBtn.addEventListener('click', () => {
    deleteSelectedObject();
  });

  // Clear all
  UI.clearAllBtn.addEventListener('click', () => {
    clearAllObjects();
  });

  // Reload button
  UI.reloadButton.addEventListener('click', () => {
    window.location.reload();
  });
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
 * Initialize application
 */
async function init() {
  debugLog('🚀 In situ Security - Initializing...');

  // Initialize UI element references first
  initUIElements();

  // Check WebXR support
  debugLog('🔍 Checking WebXR support...');
  const support = await checkWebXRSupport();
  if (!support.supported) {
    debugLog('❌ WebXR not supported: ' + support.message);
    showError(support.message);
    return;
  }

  debugLog('✅ WebXR AR is supported');

  // Initialize three.js
  debugLog('🎨 Initializing three.js...');
  initThreeJS();

  // Setup UI listeners
  setupUIListeners();

  debugLog('✅ Ready to start AR');
}

// Event listeners
window.addEventListener('resize', onWindowResize);

// Initialize when DOM is ready
debugLog('📄 Document state: ' + document.readyState);
if (document.readyState === 'loading') {
  debugLog('⏳ Waiting for DOMContentLoaded...');
  document.addEventListener('DOMContentLoaded', () => {
    debugLog('✅ DOMContentLoaded fired');
    init();
  });
} else {
  debugLog('✅ DOM already ready, calling init()');
  init();
}
