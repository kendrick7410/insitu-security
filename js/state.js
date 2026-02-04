/**
 * In situ Security - State Store
 * Centralized state management
 */

const STATE = {
  // Current mode: 'place' or 'move'
  currentMode: 'place',

  // Currently selected item type from catalog
  currentCatalogType: 'camera',

  // ID of currently selected placed object (null if none)
  selectedObjectId: null,

  // Array of placed objects
  // Each object: { id, type, name, mesh, position, rotation, scale, timestamp }
  placedObjects: [],

  // Model cache to avoid reloading same GLB
  modelCache: {},

  // Counters for naming objects
  counters: {
    camera: 0,
    sensor: 0,
    hub: 0,
    siren: 0,
    keypad: 0
  },

  // Get next ID for object type
  getNextId(type) {
    this.counters[type]++;
    return `${type}_${this.counters[type]}`;
  },

  // Get next name for object type
  getNextName(type) {
    const label = CONFIG.items[type].label.replace(/[^\w\s]/g, '').trim();
    return `${label} ${this.counters[type]}`;
  },

  // Add placed object
  addObject(object) {
    this.placedObjects.push(object);
    console.log(`Added object: ${object.name} (${object.id})`);
  },

  // Remove object by ID
  removeObject(id) {
    const index = this.placedObjects.findIndex(obj => obj.id === id);
    if (index !== -1) {
      const obj = this.placedObjects[index];
      this.placedObjects.splice(index, 1);
      console.log(`Removed object: ${obj.name} (${id})`);
      return obj;
    }
    return null;
  },

  // Get object by ID
  getObject(id) {
    return this.placedObjects.find(obj => obj.id === id);
  },

  // Clear all objects
  clearAll() {
    this.placedObjects = [];
    this.counters = {
      camera: 0,
      sensor: 0,
      hub: 0,
      siren: 0,
      keypad: 0
    };
    console.log('Cleared all objects');
  },

  // Select object
  selectObject(id) {
    this.selectedObjectId = id;
    console.log(`Selected object: ${id}`);
  },

  // Deselect object
  deselectObject() {
    this.selectedObjectId = null;
    console.log('Deselected object');
  },

  // Get selected object
  getSelectedObject() {
    return this.selectedObjectId ? this.getObject(this.selectedObjectId) : null;
  },

  // Set mode
  setMode(mode) {
    this.currentMode = mode;
    console.log(`Mode changed to: ${mode}`);
  },

  // Set catalog type
  setCatalogType(type) {
    this.currentCatalogType = type;
    console.log(`Catalog type changed to: ${type}`);
  }
};
