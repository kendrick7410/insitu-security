import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

type PlacedObject = {
  id: string;
  productId: string;
  name: string;
  position: THREE.Vector3;
  rotation: number;
  mesh?: THREE.Mesh;
};

export function useWebXR() {
  const [isSupported, setIsSupported] = useState<boolean | null>(null);
  const [isActive, setIsActive] = useState(false);
  const sessionRef = useRef<any>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const reticleRef = useRef<THREE.Mesh | null>(null);
  const hitTestSourceRef = useRef<any>(null);

  useEffect(() => {
    checkSupport();
    return () => {
      cleanup();
    };
  }, []);

  const checkSupport = async () => {
    if ('xr' in navigator) {
      try {
        const supported = await (navigator as any).xr?.isSessionSupported('immersive-ar');
        setIsSupported(!!supported);
      } catch {
        setIsSupported(false);
      }
    } else {
      setIsSupported(false);
    }
  };

  const initThreeJS = (canvas: HTMLCanvasElement) => {
    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.01,
      20
    );
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.xr.enabled = true;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current = renderer;

    // Lumières
    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    light.position.set(0.5, 1, 0.25);
    scene.add(light);

    // Reticle (curseur de placement)
    const reticleGeometry = new THREE.RingGeometry(0.15, 0.2, 32).rotateX(-Math.PI / 2);
    const reticleMaterial = new THREE.MeshBasicMaterial({ color: 0xF5A000 });
    const reticle = new THREE.Mesh(reticleGeometry, reticleMaterial);
    reticle.matrixAutoUpdate = false;
    reticle.visible = false;
    scene.add(reticle);
    reticleRef.current = reticle;

    return { scene, camera, renderer };
  };

  const startSession = async (canvas: HTMLCanvasElement, onPlaced?: (obj: PlacedObject) => void) => {
    if (!isSupported) {
      console.error('WebXR not supported');
      return null;
    }

    try {
      console.log('1. Initializing Three.js...');
      const { scene, camera, renderer } = initThreeJS(canvas);
      console.log('2. Three.js initialized');

      const overlayRoot = document.getElementById('ar-overlay');
      console.log('3. Overlay root:', overlayRoot);

      console.log('4. Requesting AR session...');
      const session = await (navigator as any).xr.requestSession('immersive-ar', {
        requiredFeatures: ['hit-test'],
        optionalFeatures: ['dom-overlay'],
        domOverlay: overlayRoot ? { root: overlayRoot } : undefined
      });
      console.log('5. AR session granted');

      sessionRef.current = session;
      await renderer.xr.setSession(session);
      console.log('6. Renderer XR session set');

      // Hit test source
      const viewerSpace = await session.requestReferenceSpace('viewer');
      hitTestSourceRef.current = await session.requestHitTestSource({ space: viewerSpace });
      console.log('7. Hit test source created');

      console.log('8. Setting isActive to true');
      setIsActive(true);
      console.log('9. isActive set to true');

      // Animation loop
      renderer.setAnimationLoop((time: number, frame: any) => {
        if (frame && hitTestSourceRef.current) {
          const referenceSpace = renderer.xr.getReferenceSpace();
          const hitTestResults = frame.getHitTestResults(hitTestSourceRef.current);

          if (hitTestResults.length > 0 && reticleRef.current) {
            const hit = hitTestResults[0];
            const pose = hit.getPose(referenceSpace);

            if (pose) {
              reticleRef.current.visible = true;
              reticleRef.current.matrix.fromArray(pose.transform.matrix);
            }
          } else if (reticleRef.current) {
            reticleRef.current.visible = false;
          }
        }

        renderer.render(scene, camera);
      });

      session.addEventListener('end', () => {
        setIsActive(false);
        cleanup();
      });

      return session;
    } catch (error) {
      console.error('Erreur démarrage WebXR:', error);
      return null;
    }
  };

  const placeObject = (productId: string, name: string, color: string): PlacedObject | null => {
    if (!reticleRef.current || !reticleRef.current.visible || !sceneRef.current) {
      return null;
    }

    // Créer un objet 3D simple (box colorée)
    const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    const material = new THREE.MeshStandardMaterial({ color });
    const mesh = new THREE.Mesh(geometry, material);

    // Position depuis le reticle
    const position = new THREE.Vector3();
    position.setFromMatrixPosition(reticleRef.current.matrix);
    mesh.position.copy(position);

    sceneRef.current.add(mesh);

    const placedObject: PlacedObject = {
      id: Date.now().toString(),
      productId,
      name,
      position,
      rotation: 0,
      mesh,
    };

    return placedObject;
  };

  const removeObject = (object: PlacedObject) => {
    if (object.mesh && sceneRef.current) {
      sceneRef.current.remove(object.mesh);
      object.mesh.geometry.dispose();
      (object.mesh.material as THREE.Material).dispose();
    }
  };

  const cleanup = () => {
    if (sessionRef.current) {
      sessionRef.current.end();
      sessionRef.current = null;
    }
    if (rendererRef.current) {
      rendererRef.current.dispose();
      rendererRef.current = null;
    }
    hitTestSourceRef.current = null;
    sceneRef.current = null;
    cameraRef.current = null;
    reticleRef.current = null;
  };

  return {
    isSupported,
    isActive,
    startSession,
    placeObject,
    removeObject,
  };
}
