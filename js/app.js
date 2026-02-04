/**
 * In situ Security - WebXR AR Application (Palier 1)
 *
 * Security system planner with multi-object placement
 */

console.log('🟢 app.js loaded');

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
  console.log('🟢 initUIElements called');
  UI.startScreen = document.getElementById('start-screen');
  UI.startButton = document.getElementById('start-ar-button');
  console.log('🟢 startButton:', UI.startButton);
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
  // Scene
  APP.scene = new THREE.Scene();

  // Camera
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

  // Create reticle
  createReticle();

  // Initialize GLTF loader
  APP.loader = new THREE.GLTFLoader();

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
 * Load or get cached model
 */
function loadSecurityItem(type, callback) {
  const config = CONFIG.items[type];

  // Check cache
  if (STATE.modelCache[type]) {
    const cloned = STATE.modelCache[type].clone();
    callback(cloned);
    return;
  }

  // Load model
  updateStatus(`Loading ${config.label}...`);

  APP.loader.load(
    config.modelPath,
    (gltf) => {
      STATE.modelCache[type] = gltf.scene;
      const cloned = gltf.scene.clone();
      callback(cloned);
    },
    undefined,
    (error) => {
      console.error(`Error loading ${type}:`, error);
      // Fallback to simple geometry
      const fallback = createFallbackMesh(type);
      callback(fallback);
    }
  );
}

/**
 * Create fallback mesh if model fails to load
 */
function createFallbackMesh(type) {
  const config = CONFIG.items[type];
  const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
  const material = new THREE.MeshStandardMaterial({
    color: 0x4a90e2,
    metalness: 0.3,
    roughness: 0.7
  });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
}

/**
 * Place object at reticle position
 */
function placeObject() {
  if (!APP.surfaceFound || STATE.currentMode !== 'place') return;

  const type = STATE.currentCatalogType;
  const config = CONFIG.items[type];

  loadSecurityItem(type, (mesh) => {
    // Get ID and name
    const id = STATE.getNextId(type);
    const name = STATE.getNextName(type);

    // Position at reticle
    const position = new THREE.Vector3();
    position.setFromMatrixPosition(APP.reticle.matrix);
    position.y += config.yOffset;

    mesh.position.copy(position);

    // Apply default scale
    const scale = config.defaultScale;
    mesh.scale.set(scale, scale, scale);

    // Store metadata
    mesh.userData = {
      id: id,
      type: type,
      name: name,
      isSecurityItem: true
    };

    // Add to scene
    APP.scene.add(mesh);

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

    // Update UI
    updateObjectsList();
    updateStatus(`✅ ${name} placed`);

    console.log(`Placed ${name} at`, position);
  });
}

/**
 * Handle tap/touch events
 */
function onSelect(event) {
  if (STATE.currentMode === 'place') {
    // Place new object
    placeObject();
  } else if (STATE.currentMode === 'move') {
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
  console.log('🔵 startARSession called!');
  alert('Start button clicked!'); // Temporary debug alert
  UI.startScreen.classList.add('hidden');
  UI.loadingScreen.classList.remove('hidden');
  UI.loadingText.textContent = 'Initializing AR...';

  try {
    APP.xrSession = await navigator.xr.requestSession('immersive-ar', {
      requiredFeatures: ['hit-test', 'local-floor']
    });

    console.log('WebXR AR session started');

    await setupXRSession();
    APP.renderer.xr.setSession(APP.xrSession);

    UI.loadingScreen.classList.add('hidden');
    UI.catalogPanel.classList.remove('hidden');

    updateStatus('Scanning for surfaces...');
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

  const viewerSpace = await APP.xrSession.requestReferenceSpace('viewer');
  APP.xrHitTestSource = await APP.xrSession.requestHitTestSource({
    space: viewerSpace
  });

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

  console.log('WebXR session configured');
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
          updateStatus('Tap to place');
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
  console.log('🟢 setupUIListeners called');

  // Start button
  console.log('🟢 Setting up start button listener');
  if (UI.startButton) {
    UI.startButton.addEventListener('click', () => {
      console.log('🔵 Start button clicked!');
      startARSession();
    });
    console.log('🟢 Start button listener added');
  } else {
    console.error('❌ Start button not found!');
  }

  // Catalog items
  UI.catalogItems.forEach(btn => {
    btn.addEventListener('click', () => {
      UI.catalogItems.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      STATE.setCatalogType(btn.dataset.type);
    });
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
  console.log('In situ Security - WebXR AR Planner (Palier 1)');

  // Initialize UI element references first
  initUIElements();

  // Check WebXR support
  const support = await checkWebXRSupport();
  if (!support.supported) {
    showError(support.message);
    return;
  }

  console.log('WebXR AR is supported');

  // Initialize three.js
  initThreeJS();

  // Setup UI listeners
  setupUIListeners();

  console.log('Ready to start AR');
}

// Event listeners
window.addEventListener('resize', onWindowResize);

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
