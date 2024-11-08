import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { useEffect, useState } from 'react';

function DoThreeJs(setRemainingItems: (items: string[]) => void, resetGame: () => void, onComplete: () => void) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const objectsToFind = ["AgavePlant", "Controller", "cuboTorcido", "Mesa", "TV", "Almohada", "CactusPlant"];
  let foundItems = new Set<string>();

  setRemainingItems(objectsToFind);

  scene.background = new THREE.Color('skyblue');
  const ambientLight = new THREE.AmbientLight(0x99aaff, 1);
  scene.add(ambientLight);

  const renderer = new THREE.WebGLRenderer();
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.85;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  const controls = new OrbitControls(camera, renderer.domElement);
  document.body.appendChild(renderer.domElement);

  const jpgloader = new THREE.TextureLoader();
  jpgloader.load('environments/christmas_photo_studio_07.jpg', (texturajpg) => {
    texturajpg.mapping = THREE.EquirectangularRefractionMapping;
    scene.background = texturajpg;
  });

  const loader = new RGBELoader();
  loader.load('environments/wildflower_field_2k.hdr', (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = texture;
  });

  const etiquetasRenderer = new CSS2DRenderer();
  etiquetasRenderer.setSize(window.innerWidth, window.innerHeight);
  etiquetasRenderer.domElement.style.position = 'absolute';
  etiquetasRenderer.domElement.style.top = '0px';
  document.body.appendChild(etiquetasRenderer.domElement);
  etiquetasRenderer.domElement.style.pointerEvents = 'none';

  const tooltip = document.createElement('p');
  tooltip.className = 'tooltip';
  tooltip.style.fontSize = '14px';
  tooltip.style.padding = '5px';
  tooltip.style.color = '#ffffff';
  tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  tooltip.style.borderRadius = '5px';
  tooltip.style.pointerEvents = 'none';
  const tooltipCSSObject = new CSS2DObject(tooltip);
  scene.add(tooltipCSSObject);

  const correctSound = new THREE.Audio(new THREE.AudioListener());
  camera.add(correctSound.listener);
  const incorrectSound = new THREE.Audio(correctSound.listener);

  const audioLoader = new THREE.AudioLoader();
  audioLoader.load('audio/wineGlassClink.wav', (buffer) => {
    incorrectSound.setBuffer(buffer);
    incorrectSound.setLoop(false);
  });

  const gltfLoader = new GLTFLoader();
  gltfLoader.load('HouseModel/coolHouse.gltf', (gltfCompleto) => {
    gltfCompleto.scene.name = "House";
    scene.add(gltfCompleto.scene);
  });

  camera.position.z = 5;
  controls.update();

  const mousePosition = new THREE.Vector2();
  const rayCaster = new THREE.Raycaster();

  window.addEventListener('click', (e) => {
    mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
    mousePosition.y = -(e.clientY / window.innerHeight) * 2 + 1;
    rayCaster.setFromCamera(mousePosition, camera);
    const intersects = rayCaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
      const intersectedObject = intersects[0].object;
      const name = intersectedObject.name;

      tooltip.textContent = name;
      tooltipCSSObject.position.copy(intersectedObject.position).add(new THREE.Vector3(0, 1, 0));

      if (objectsToFind.includes(name) && !foundItems.has(name)) {
        foundItems.add(name);
        correctSound.play();
      } else {
        if (incorrectSound.isPlaying) {
          incorrectSound.stop();
        }
        incorrectSound.play();
      }

      setRemainingItems(objectsToFind.filter((item) => !foundItems.has(item)));

      if (foundItems.size === objectsToFind.length) {
        foundItems.clear();
        setRemainingItems(objectsToFind);
        onComplete(); 
        resetGame();
      }
    }
  });

  function animate() {
    requestAnimationFrame(animate);
    etiquetasRenderer.render(scene, camera);
    renderer.render(scene, camera);
  }

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    etiquetasRenderer.setSize(window.innerWidth, window.innerHeight);
  });

  animate();
}

function Tarea() {
  const [remainingItems, setRemainingItems] = useState<string[]>([]);
  const [messageVisible, setMessageVisible] = useState(false);

  const resetGame = () => {};

  const showCompleteMessage = () => {
    setMessageVisible(true);
    setTimeout(() => setMessageVisible(false), 1000); 
  };

  useEffect(() => {
    DoThreeJs(setRemainingItems, resetGame, showCompleteMessage);
  }, []);

  return (
    <>
      <div style={{ 
        position: "absolute", 
        top: 20, 
        left: 20, 
        color: "white", 
        backgroundColor: "purple", 
        padding: "20px"
      }}>
        <h2>Objetos por encontrar:</h2>
        <ul>
          {remainingItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      {messageVisible && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "20%",
          backgroundColor: "black",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "24px",
          zIndex: 1000,
        }}>
          Encontraste todo
        </div>
      )}
    </>
  );
}

export default Tarea;
