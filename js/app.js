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
  loader: null,
  lastUIClick: 0,  // Timestamp of last UI button click
  isStartingSession: false,  // Flag to prevent duplicate session starts
  placementAllowed: true,  // NEW: Explicit flag for placement permission
  lastTouchX: 0,  // Last touch X coordinate
  lastTouchY: 0   // Last touch Y coordinate
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
  UI.finishSessionBtn = document.getElementById('finish-session-btn');
  UI.summaryScreen = document.getElementById('summary-screen');
  UI.summaryStats = document.getElementById('summary-stats');
  UI.summaryList = document.getElementById('summary-list');
  UI.newSessionBtn = document.getElementById('new-session-btn');
  UI.closeSummaryBtn = document.getElementById('close-summary-btn');
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
    // Preserve isFallback flag when cloning
    if (STATE.modelCache[type].userData.isFallback) {
      cloned.userData.isFallback = true;
      debugLog('  ⚠️ Cloned fallback - preserving flag');
    }
    callback(cloned);
    return;
  }

  // If GLTFLoader not available, use fallback immediately
  if (!APP.loader) {
    debugLog('  ⚠️ No GLTFLoader, using fallback');
    const fallback = createFallbackMesh(type);
    // Don't cache the original - it will be cloned later
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

  // Allow placement even without surface (for wall mode)
  if (STATE.currentMode !== 'place') {
    debugLog('  ❌ Cannot place: mode=' + STATE.currentMode);
    return;
  }

  if (!APP.surfaceFound) {
    debugLog('  ⚠️ No surface detected - will use fixed distance placement');
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

    // Position at reticle OR at fixed distance if looking at wall
    const position = new THREE.Vector3();

    // Check if reticle is visible (hit test found surface)
    if (APP.reticle.visible && APP.surfaceFound) {
      // Use hit test result
      position.setFromMatrixPosition(APP.reticle.matrix);
      position.y += config.yOffset;
      debugLog('  📍 Using reticle position (floor)');
    } else {
      // No surface found - place at fixed distance from camera (for walls)
      // Get camera position and direction
      const camera = APP.camera;
      const cameraPos = new THREE.Vector3();
      const cameraDir = new THREE.Vector3();

      camera.getWorldPosition(cameraPos);
      camera.getWorldDirection(cameraDir);

      // Place 1.5m in front of camera
      position.copy(cameraPos).add(cameraDir.multiplyScalar(1.5));
      debugLog('  🎯 No surface - placing at fixed distance (wall mode)');
    }

    debugLog('  Position: ' + position.x.toFixed(2) + ', ' + position.y.toFixed(2) + ', ' + position.z.toFixed(2));

    mesh.position.copy(position);

    // Save isFallback flag before userData is overwritten
    const isFallback = mesh.userData.isFallback || false;

    // Apply default scale (but not for fallback cubes - they're already sized)
    const scale = isFallback ? 1.0 : config.defaultScale;
    mesh.scale.set(scale, scale, scale);
    debugLog('  Scale: ' + scale + (isFallback ? ' (fallback - no scaling)' : ''));

    // Store metadata - preserve isFallback flag
    mesh.userData = {
      id: id,
      type: type,
      name: name,
      isSecurityItem: true,
      isFallback: isFallback
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
 * Check if a touch point is over a VISIBLE UI element
 */
function isTouchOverUI(x, y) {
  const element = document.elementFromPoint(x, y);
  if (!element) return false;

  // Check if we're over any UI panel - BUT ONLY IF VISIBLE
  const uiSelectors = [
    '#catalog-panel',
    '#inspector-panel',
    '#list-panel',
    '#summary-screen',
    '.catalog-item',
    '#toggle-list-btn',
    '#finish-session-btn'
  ];

  for (const selector of uiSelectors) {
    const uiElement = element.matches(selector) ? element : element.closest(selector);
    if (uiElement) {
      // CRITICAL: Check if element is actually VISIBLE (not hidden)
      if (uiElement.classList.contains('hidden')) {
        debugLog(`  ⏭️ UI element ${selector} is HIDDEN, ignoring`);
        continue;
      }
      debugLog(`  🎯 Touch over VISIBLE UI element: ${selector}`);
      return true;
    }
  }

  return false;
}

/**
 * Handle tap/touch events
 */
function onSelect(event) {
  debugLog('👆 TAP DETECTED! Mode: ' + STATE.currentMode + ', placementAllowed: ' + APP.placementAllowed);

  // Check if tap was on a UI element (button, panel, etc.)
  if (event && event.inputSource && event.inputSource.targetRayMode === 'screen') {
    debugLog('  📱 Screen tap detected (targetRayMode=screen)');
  }

  // NEW APPROACH: Use explicit flag instead of timing
  // If placement is blocked, allow it again after this tap (user tried to place)
  if (!APP.placementAllowed) {
    debugLog('  ⏭️ BLOCKED - Placement not allowed (UI button was clicked)');
    // Re-enable placement for next tap (user acknowledged the block)
    APP.placementAllowed = true;
    debugLog('  ✅ Placement re-enabled for next tap');
    return;
  }

  debugLog('  ✅ Placement allowed - proceeding');

  if (STATE.currentMode === 'place') {
    debugLog('  📍 Mode is PLACE - calling placeObject...');
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

    item.addEventListener('touchstart', (e) => {
      e.stopPropagation();
      APP.lastUIClick = Date.now();
    }, { passive: false });
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
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
  debugLog('🗑️ deleteSelectedObject called');

  const obj = STATE.getSelectedObject();
  if (!obj) {
    debugLog('  ❌ No object selected');
    return;
  }

  debugLog('  🗑️ Deleting: ' + obj.name + ' (' + obj.id + ')');

  // Remove from scene
  APP.scene.remove(obj.mesh);
  debugLog('  ✅ Removed from scene');

  // Remove from state
  STATE.removeObject(obj.id);
  debugLog('  ✅ Removed from state');

  // Close inspector
  deselectObject();
  debugLog('  ✅ Inspector closed');

  // Update list
  updateObjectsList();

  updateStatus(`🗑️ ${obj.name} deleted`);
  debugLog('🗑️ DELETE COMPLETE');
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
 * Show session summary
 */
function showSessionSummary() {
  debugLog('📊 Showing session summary');

  // Count objects by type
  const typeCounts = {};
  STATE.placedObjects.forEach(obj => {
    typeCounts[obj.type] = (typeCounts[obj.type] || 0) + 1;
  });

  // Generate stats
  const totalObjects = STATE.placedObjects.length;
  const objectTypes = Object.keys(typeCounts).length;

  UI.summaryStats.innerHTML = `
    <div class="stat-card">
      <span class="stat-number">${totalObjects}</span>
      <span class="stat-label">Total Items</span>
    </div>
    <div class="stat-card">
      <span class="stat-number">${objectTypes}</span>
      <span class="stat-label">Item Types</span>
    </div>
  `;

  // Generate list
  if (totalObjects === 0) {
    UI.summaryList.innerHTML = `
      <div style="text-align: center; padding: 20px; color: rgba(255,255,255,0.6);">
        No objects were placed in this session.
      </div>
    `;
  } else {
    UI.summaryList.innerHTML = '<h3 style="color: #fff; margin-bottom: 15px; font-size: 14px;">Placed Items:</h3>';

    STATE.placedObjects.forEach(obj => {
      const config = CONFIG.items[obj.type];
      const icon = config.label.split(' ')[0];
      const timestamp = new Date(obj.timestamp).toLocaleTimeString();

      UI.summaryList.innerHTML += `
        <div class="summary-item">
          <span class="summary-item-icon">${icon}</span>
          <div class="summary-item-details">
            <div class="summary-item-name">${obj.name}</div>
            <div class="summary-item-info">${config.label} • Placed at ${timestamp}</div>
          </div>
        </div>
      `;
    });

    // Add breakdown by type
    UI.summaryList.innerHTML += '<h3 style="color: #fff; margin: 20px 0 15px 0; font-size: 14px;">Breakdown by Type:</h3>';
    Object.entries(typeCounts).forEach(([type, count]) => {
      const config = CONFIG.items[type];
      const icon = config.label.split(' ')[0];
      UI.summaryList.innerHTML += `
        <div class="summary-item">
          <span class="summary-item-icon">${icon}</span>
          <div class="summary-item-details">
            <div class="summary-item-name">${config.label}</div>
            <div class="summary-item-info">${count} item${count > 1 ? 's' : ''}</div>
          </div>
        </div>
      `;
    });
  }

  // Show summary screen
  UI.summaryScreen.classList.remove('hidden');
  debugLog('✅ Summary displayed');
}

/**
 * End AR session
 */
function endARSession() {
  debugLog('🔴 Ending AR session');

  if (APP.xrSession) {
    APP.xrSession.end();
  }
}

/**
 * Start new session
 */
function startNewSession() {
  debugLog('🔄 Starting new session');

  // Clear all objects
  STATE.placedObjects.forEach(obj => {
    APP.scene.remove(obj.mesh);
  });
  STATE.clearAll();

  // Close summary
  UI.summaryScreen.classList.add('hidden');

  // End current XR session
  if (APP.xrSession) {
    APP.xrSession.end();
  }

  // Reset UI
  UI.startScreen.classList.remove('hidden');

  debugLog('✅ Ready for new session');
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
  debugLog('🔵 startARSession called! isStartingSession=' + APP.isStartingSession);

  // Prevent duplicate calls
  if (APP.isStartingSession) {
    debugLog('⏭️ Session already starting, ignoring duplicate call');
    return;
  }

  APP.isStartingSession = true;
  debugLog('✅ Flag set, proceeding with session start');

  try {
    // Get overlay BEFORE any UI updates to minimize delay
    const overlay = document.getElementById('xr-overlay');
    if (!overlay) {
      debugLog('❌ XR overlay container not found!');
      throw new Error('XR overlay container missing');
    }

    // CRITICAL: Call requestSession IMMEDIATELY to preserve user activation
    debugLog('🔧 Requesting XR session with DOM overlay...');
    APP.xrSession = await navigator.xr.requestSession('immersive-ar', {
      requiredFeatures: ['hit-test', 'local-floor'],
      optionalFeatures: ['dom-overlay', 'plane-detection'],
      domOverlay: { root: overlay }
    });

    debugLog('✅ WebXR AR session started with DOM overlay');

    // NOW we can do UI updates (after session is granted)
    UI.startScreen.classList.add('hidden');
    UI.loadingScreen.classList.remove('hidden');
    UI.loadingText.textContent = 'Initializing AR...';

    await setupXRSession();
    APP.renderer.xr.setSession(APP.xrSession);

    UI.loadingScreen.classList.add('hidden');

    // Show XR overlay (contains all AR UI)
    const xrOverlay = document.getElementById('xr-overlay');
    if (xrOverlay) {
      xrOverlay.classList.remove('hidden');
      debugLog('✅ XR overlay visible');
    }

    debugLog('📱 Showing catalog panel...');
    UI.catalogPanel.classList.remove('hidden');
    debugLog('✅ Catalog panel visible');

    // Show status overlay
    UI.statusOverlay.classList.remove('hidden');
    debugLog('✅ Status overlay visible');

    updateStatus('Tap green circle to place object');
    updateModeIndicator();

    // Reset flag after successful start
    APP.isStartingSession = false;

  } catch (error) {
    console.error('Failed to start AR session:', error);
    showError('Failed to start AR: ' + error.message);
    // Reset flag on error
    APP.isStartingSession = false;
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
  debugLog('✅ Event listeners attached (end, select)');

  // CRITICAL: Global touch tracker + direct button handler
  // Handle buttons IMMEDIATELY on touchstart to avoid race with XR select
  document.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      APP.lastTouchX = touch.clientX;
      APP.lastTouchY = touch.clientY;

      const element = document.elementFromPoint(touch.clientX, touch.clientY);
      if (!element) return;

      // Check for catalog item button
      const catalogItem = element.closest('.catalog-item');
      if (catalogItem && !UI.catalogPanel.classList.contains('hidden')) {
        const type = catalogItem.dataset.type;
        debugLog('👆 Catalog button TOUCHED: ' + type);
        // Execute selection IMMEDIATELY
        UI.catalogItems.forEach(b => b.classList.remove('active'));
        catalogItem.classList.add('active');
        STATE.setCatalogType(type);
        updateStatus('Selected: ' + type + ' - Tap to place');
        APP.placementAllowed = false; // Block this tap
        setTimeout(() => {
          APP.placementAllowed = true;
          debugLog('✅ Placement re-enabled after catalog selection');
        }, 100);
        return;
      }

      // Check for List button
      const listBtn = element.closest('#toggle-list-btn');
      if (listBtn && !UI.catalogPanel.classList.contains('hidden')) {
        debugLog('📋 List button TOUCHED');
        UI.listPanel.classList.toggle('hidden');
        APP.placementAllowed = false;
        setTimeout(() => {
          APP.placementAllowed = true;
          debugLog('✅ Placement re-enabled after List');
        }, 100);
        return;
      }

      // Check for Finish button
      const finishBtn = element.closest('#finish-session-btn');
      if (finishBtn && !UI.catalogPanel.classList.contains('hidden')) {
        debugLog('✅ Finish button TOUCHED');
        showSessionSummary();
        APP.placementAllowed = false;
        return;
      }

      // Check if touch is over ANY UI element
      const overUI = isTouchOverUI(touch.clientX, touch.clientY);
      if (overUI) {
        debugLog('👆 TOUCH DETECTED OVER UI - Blocking placement');
        APP.placementAllowed = false;
        setTimeout(() => {
          APP.placementAllowed = true;
          debugLog('✅ Placement re-enabled after UI touch');
        }, 500);
      }
    }
  }, { passive: true, capture: true });

  // Touch handler for object selection only
  // Note: XR session 'select' event already handles placement/move taps
  APP.renderer.domElement.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      // Only handle object selection - don't trigger placement here
      // XR session's 'select' event will handle placement
      handleObjectSelection(touch.clientX, touch.clientY);
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
          debugLog('🎯 SURFACE DETECTED! Reticle visible');
          updateStatus('Aim at wall/floor & tap to place');
        }
      }
    } else {
      APP.reticle.visible = false;
      if (APP.surfaceFound) {
        debugLog('⚠️ Surface lost');
        APP.surfaceFound = false;
      }
    }
  }

  APP.renderer.render(APP.scene, APP.camera);
}

/**
 * Handle session end
 */
function onSessionEnd() {
  debugLog('🔴 Session ended - resetting state');

  APP.xrSession = null;
  APP.xrHitTestSource = null;
  APP.xrRefSpace = null;
  APP.surfaceFound = false;
  APP.isStartingSession = false; // CRITICAL: Reset flag on session end

  UI.startScreen.classList.remove('hidden');

  // Hide XR overlay completely
  const xrOverlay = document.getElementById('xr-overlay');
  if (xrOverlay) {
    xrOverlay.classList.add('hidden');
  }

  UI.catalogPanel.classList.add('hidden');
  UI.inspectorPanel.classList.add('hidden');
  UI.listPanel.classList.add('hidden');
  UI.statusOverlay.classList.add('hidden');

  debugLog('✅ Ready for new session');
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
    // Use only click event - it works for both touch and mouse
    // Don't use preventDefault to preserve user activation
    UI.startButton.addEventListener('click', (e) => {
      debugLog('🔵 Start button CLICKED!');
      startARSession();
    });
    debugLog('🟢 Start button listener added (click only)');
  } else {
    debugLog('❌ Start button not found!');
  }

  // Catalog items - SIMPLIFIED
  debugLog('🟢 Setting up catalog item listeners: ' + UI.catalogItems.length + ' items');
  UI.catalogItems.forEach((btn, index) => {
    const selectItem = () => {
      debugLog('🔵 Catalog item selected: ' + btn.dataset.type);
      UI.catalogItems.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      STATE.setCatalogType(btn.dataset.type);
      updateStatus('Selected: ' + btn.dataset.type + ' - Tap to place');
      // Re-enable placement immediately
      setTimeout(() => {
        APP.placementAllowed = true;
        debugLog('  ✅ Placement re-enabled after catalog selection');
      }, 100);
    };

    // Use touchend - most reliable for touch devices
    btn.addEventListener('touchend', (e) => {
      debugLog('👆 Catalog button TOUCHED: ' + btn.dataset.type);
      selectItem();
    }, { passive: true });

    debugLog('  ✅ Listener ' + index + ': ' + btn.dataset.type);
  });

  // Toggle list - SIMPLIFIED
  UI.toggleListBtn.addEventListener('touchend', (e) => {
    debugLog('📋 List button TOUCHED');
    UI.listPanel.classList.toggle('hidden');
    setTimeout(() => {
      APP.placementAllowed = true;
      debugLog('✅ Placement re-enabled after List');
    }, 100);
  }, { passive: true });

  // Close list
  UI.closeList.addEventListener('touchstart', (e) => {
    e.stopPropagation();
    APP.lastUIClick = Date.now();
  }, { passive: false });
  UI.closeList.addEventListener('click', (e) => {
    e.stopPropagation();
    e.preventDefault();
    UI.listPanel.classList.add('hidden');
    // Re-enable placement after closing
    setTimeout(() => {
      APP.placementAllowed = true;
      debugLog('✅ Placement re-enabled after closing List');
    }, 300);
  });

  // Close inspector
  UI.closeInspector.addEventListener('touchstart', (e) => {
    e.stopPropagation();
    e.preventDefault();
    APP.lastUIClick = Date.now();
  }, { passive: false });
  UI.closeInspector.addEventListener('click', (e) => {
    e.stopPropagation();
    e.preventDefault();
    APP.lastUIClick = Date.now(); // Update again to extend protection window
    deselectObject();
    // Extra protection after closing
    setTimeout(() => {
      APP.lastUIClick = Date.now();
    }, 100);
  });

  // Object name change
  UI.objectNameInput.addEventListener('touchstart', (e) => {
    e.stopPropagation();
    APP.lastUIClick = Date.now();
  }, { passive: false });
  UI.objectNameInput.addEventListener('input', (e) => {
    const obj = STATE.getSelectedObject();
    if (obj) {
      obj.name = e.target.value;
      obj.mesh.userData.name = e.target.value;
      updateObjectsList();
    }
  });

  // Rotation slider - block all touch events
  UI.rotationSlider.addEventListener('touchstart', (e) => {
    e.stopPropagation();
    APP.lastUIClick = Date.now();
  }, { passive: false });
  UI.rotationSlider.addEventListener('touchmove', (e) => {
    e.stopPropagation();
  }, { passive: false });
  UI.rotationSlider.addEventListener('touchend', (e) => {
    e.stopPropagation();
  }, { passive: false });
  UI.rotationSlider.addEventListener('input', (e) => {
    const obj = STATE.getSelectedObject();
    if (obj) {
      const rotation = parseInt(e.target.value);
      obj.rotation = rotation;
      obj.mesh.rotation.y = THREE.MathUtils.degToRad(rotation);
      UI.rotationValue.textContent = `${rotation}°`;
    }
  });

  // Scale slider - block all touch events
  UI.scaleSlider.addEventListener('touchstart', (e) => {
    e.stopPropagation();
    APP.lastUIClick = Date.now();
  }, { passive: false });
  UI.scaleSlider.addEventListener('touchmove', (e) => {
    e.stopPropagation();
  }, { passive: false });
  UI.scaleSlider.addEventListener('touchend', (e) => {
    e.stopPropagation();
  }, { passive: false });
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
  UI.moveBtn.addEventListener('touchstart', (e) => {
    e.stopPropagation();
    APP.lastUIClick = Date.now();
  }, { passive: false });
  UI.moveBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    e.preventDefault();
    STATE.setMode('move');
    updateModeIndicator();
    updateStatus('Tap surface to move object');
    UI.inspectorPanel.classList.add('hidden');
  });

  // Duplicate button
  UI.duplicateBtn.addEventListener('touchstart', (e) => {
    e.stopPropagation();
    e.preventDefault();
    APP.lastUIClick = Date.now();
  }, { passive: false });
  UI.duplicateBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    e.preventDefault();
    APP.lastUIClick = Date.now(); // Update again to extend protection window
    duplicateSelectedObject();
  });

  // Delete button - use touchstart to catch BEFORE XR select
  UI.deleteBtn.addEventListener('touchstart', (e) => {
    e.stopPropagation();
    e.preventDefault();
    APP.lastUIClick = Date.now();
    debugLog('🔴 DELETE BUTTON TOUCHED - blocking placement for 1000ms');
  }, { passive: false });
  UI.deleteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    e.preventDefault();
    APP.lastUIClick = Date.now(); // Update again to extend protection window
    debugLog('🔴 DELETE BUTTON CLICKED');
    deleteSelectedObject();
    // Extra protection: set timestamp again after deletion
    setTimeout(() => {
      APP.lastUIClick = Date.now();
      debugLog('🔴 DELETE complete - extended protection window');
    }, 100);
  });

  // Clear all
  UI.clearAllBtn.addEventListener('touchstart', (e) => {
    e.stopPropagation();
    e.preventDefault();
    APP.lastUIClick = Date.now();
  }, { passive: false });
  UI.clearAllBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    e.preventDefault();
    APP.lastUIClick = Date.now(); // Update again to extend protection window
    clearAllObjects();
    // Extra protection after clearing
    setTimeout(() => {
      APP.lastUIClick = Date.now();
    }, 100);
  });

  // Reload button
  UI.reloadButton.addEventListener('click', () => {
    window.location.reload();
  });

  // Finish session button - SIMPLIFIED
  if (UI.finishSessionBtn) {
    UI.finishSessionBtn.addEventListener('touchend', (e) => {
      debugLog('✅ Finish button TOUCHED');
      showSessionSummary();
    }, { passive: true });
  }

  // New session button
  if (UI.newSessionBtn) {
    UI.newSessionBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      startNewSession();
    });
  }

  // Close summary button
  if (UI.closeSummaryBtn) {
    UI.closeSummaryBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      endARSession();
      UI.summaryScreen.classList.add('hidden');
      UI.startScreen.classList.remove('hidden');
    });
  }

  // GLOBAL PANEL EVENT BLOCKERS
  // Block all touch/click events on panels to prevent placement underneath

  // Inspector panel - block all touches
  UI.inspectorPanel.addEventListener('touchstart', (e) => {
    e.stopPropagation();
    APP.lastUIClick = Date.now();
  }, { passive: false });
  UI.inspectorPanel.addEventListener('touchmove', (e) => {
    e.stopPropagation();
  }, { passive: false });
  UI.inspectorPanel.addEventListener('touchend', (e) => {
    e.stopPropagation();
  }, { passive: false });
  UI.inspectorPanel.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  // Catalog panel - DON'T add event listeners on the panel itself!
  // The individual buttons inside have their own listeners
  // Adding listeners here blocks clicks on the buttons inside

  // List panel - block all touches
  UI.listPanel.addEventListener('touchstart', (e) => {
    e.stopPropagation();
    APP.lastUIClick = Date.now();
  }, { passive: false });
  UI.listPanel.addEventListener('touchmove', (e) => {
    e.stopPropagation();
  }, { passive: false });
  UI.listPanel.addEventListener('touchend', (e) => {
    e.stopPropagation();
  }, { passive: false });
  UI.listPanel.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  // Summary screen - block all touches
  if (UI.summaryScreen) {
    UI.summaryScreen.addEventListener('touchstart', (e) => {
      e.stopPropagation();
      APP.lastUIClick = Date.now();
    }, { passive: false });
    UI.summaryScreen.addEventListener('touchmove', (e) => {
      e.stopPropagation();
    }, { passive: false });
    UI.summaryScreen.addEventListener('touchend', (e) => {
      e.stopPropagation();
    }, { passive: false });
    UI.summaryScreen.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }

  debugLog('✅ Global panel event blockers added');
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
