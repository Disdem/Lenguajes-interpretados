import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { SkeletonUtils } from 'three/examples/jsm/Addons.js';

interface ModelData {
  model: THREE.Group;
  mixer: THREE.AnimationMixer;
  hideAction: THREE.AnimationAction;
  showAction: THREE.AnimationAction;
  shown: boolean;
}

function DoThree() {
  // Crear la escena, cámara y renderizador
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 15;

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  scene.background = new THREE.Color(0.7, 0.4, 0.9);

  // Agregar luces
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);
  const directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  const controls = new OrbitControls(camera, renderer.domElement);
  const loader = new GLTFLoader();
  const mixers: THREE.AnimationMixer[] = [];
  const models: ModelData[] = [];

  let modelsInShowCount = 0;
  let allModelsShownOnce = false;

  loader.load('models/animationsAndInstancing/modelo.gltf', (gltf) => {
    const clips = gltf.animations;
    const initialPosition = 5;

    for (let i = 0; i < 12; i++) {
      const model = SkeletonUtils.clone(gltf.scene) as THREE.Group;
      model.position.set(
        initialPosition * Math.sin((i * 2 * Math.PI) / 12),
        initialPosition * Math.cos((i * 2 * Math.PI) / 12),
        0
      );

      const mixer = new THREE.AnimationMixer(model);
      const hideClip = THREE.AnimationClip.findByName(clips, 'Hide');
      const showClip = THREE.AnimationClip.findByName(clips, 'Show');

      if (!hideClip || !showClip) {
        console.error("Animaciones 'Hide' o 'Show' no encontradas en el modelo.");
        return;
      }

      const hideAction = mixer.clipAction(hideClip);
      hideAction.setLoop(THREE.LoopRepeat, Infinity);
      hideAction.play();

      const showAction = mixer.clipAction(showClip);
      showAction.setLoop(THREE.LoopRepeat, Infinity);

      models.push({
        model,
        mixer,
        hideAction,
        showAction,
        shown: false,
      });
      mixers.push(mixer);
      scene.add(model);
    }
  });

  const clock = new THREE.Clock();

  function handleMouseMove(event: MouseEvent) {
    const mouse = new THREE.Vector2(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    );

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(models.map(m => m.model), true);

    models.forEach((modelObj) => {
      const distance = intersects.length > 0 ? modelObj.model.position.distanceTo(intersects[0].point) : Infinity;
      const hoverThreshold = 2;// Profe si le cuesta el cambiar la animacion, cambie este valor, en cada Browser es diferente :)
      const isHovered = distance < hoverThreshold;

      if (isHovered) {
        if (!modelObj.shown) {
          modelObj.hideAction.stop();
          modelObj.showAction.reset().play();
          modelObj.shown = true;
          modelsInShowCount++;

          if (modelsInShowCount === models.length) {
            allModelsShownOnce = true;
          }
        }
      }
    });

    if (allModelsShownOnce && intersects.length === 0) {

      models.forEach((modelObj) => {
        modelObj.showAction.stop();
        modelObj.hideAction.reset().play();
        modelObj.shown = false;
      });
      modelsInShowCount = 0;
      allModelsShownOnce = false;
    }
  }

  function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    controls.update();
    mixers.forEach(mixer => mixer.update(delta));
    renderer.render(scene, camera);
  }

  window.addEventListener('mousemove', handleMouseMove);
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

DoThree();

const App = () => {
  return (
    <div></div>
  );
};

export default App;
