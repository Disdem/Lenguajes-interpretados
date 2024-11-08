import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader, SkeletonUtils } from 'three/examples/jsm/Addons.js';
import * as CANNON from 'cannon';

function DoThree() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
  scene.background = new THREE.Color('skyblue');
  const ambientLight = new THREE.AmbientLight(0x99aaff, 1);
  scene.add(ambientLight);

  const jpgLoader = new THREE.TextureLoader();
  jpgLoader.load('kloofendal_43d_clear_puresky.jpg', (texturaJpg) => {
    texturaJpg.mapping = THREE.EquirectangularRefractionMapping;
    scene.background = texturaJpg;
  });

  const loader = new RGBELoader();
  loader.load('kloofendal_43d_clear_puresky_4k.hdr', (textura) => {
    textura.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = textura;
  });

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(animate);
  document.body.appendChild(renderer.domElement);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.update();

  scene.fog = new THREE.Fog('skyblue', 50, 300);

  const world = new CANNON.World();
  world.gravity.set(0, -40, 0);

  const birdBody = new CANNON.Body({
    mass: 1,
    position: new CANNON.Vec3(-10, 0, 0),
    shape: new CANNON.Sphere(1)
  });
  world.addBody(birdBody);

  const birdScale = new THREE.Vector3(2, 2, 2);
  let birdMesh: THREE.Object3D<THREE.Object3DEventMap>;
  const gltfLoader = new GLTFLoader();
  gltfLoader.load('kirby/scene.gltf', (gltfCompleto) => {
    birdMesh = gltfCompleto.scene;
    birdMesh.scale.set(birdScale.x, birdScale.y, birdScale.z);
    scene.add(birdMesh);
  });

  const pipeScale = new THREE.Vector3(6, 20, 6);
  const gapSize = 210;
  const pipes: { upperPipe: THREE.Object3D<THREE.Object3DEventMap>; lowerPipe: THREE.Object3D<THREE.Object3DEventMap>; x: number; initialized: boolean; randomY: number; }[] = [];

  const pipeLoader = new GLTFLoader();
  pipeLoader.load('Pipes/Pipe.gltf', (gltf) => {
    const numPipes = Math.floor(window.innerWidth / 50);
    const initialXPosition = window.innerWidth / 7 + 10;
    const spacing = 70;

    for (let i = 0; i < numPipes; i++) {
      const upperPipe = SkeletonUtils.clone(gltf.scene);
      upperPipe.scale.set(pipeScale.x, pipeScale.y, pipeScale.z);
      upperPipe.rotation.x = Math.PI;
      scene.add(upperPipe);

      const lowerPipe = SkeletonUtils.clone(gltf.scene);
      lowerPipe.scale.set(pipeScale.x, pipeScale.y, pipeScale.z);
      scene.add(lowerPipe);

      const pipeBody = new CANNON.Body({
        mass: 0,
        position: new CANNON.Vec3(initialXPosition + i * spacing, 0, 0),
      });
      pipeBody.addShape(new CANNON.Box(new CANNON.Vec3(pipeScale.x / 2, pipeScale.y, pipeScale.z / 2)));
      world.addBody(pipeBody);

      pipes.push({
        upperPipe,
        lowerPipe,
        x: initialXPosition + i * spacing,
        initialized: false,
        randomY: Math.random() * (window.innerHeight / 20)
      });
    }
  });

  // Crear un AudioListener y añadirlo a la cámara
  const listener = new THREE.AudioListener();
  camera.add(listener);

  // Crear un arreglo de objetos de audio para el sonido de aleteo
  const flapSounds: THREE.Audio[] = [];
  const audioLoader = new THREE.AudioLoader();
  
  // Cargar el sonido de aleteo y crear múltiples instancias
  const loadFlapSound = () => {
    const flapSound = new THREE.Audio(listener);
    audioLoader.load('sounds/aleteo.mp3', function(buffer) {
      flapSound.setBuffer(buffer);
      flapSound.setVolume(0.5);
    });
    return flapSound;
  };

  for (let i = 0; i < 10; i++) { // Crear 10 instancias del sonido de aleteo
    flapSounds.push(loadFlapSound());
  }

  // Cargar música de fondo
  const sound = new THREE.Audio(listener);
  audioLoader.load('sounds/AdhesiveWombat - Night Shade ♫ NO COPYRIGHT 8-bit Music.mp3', function(buffer) {
    sound.setBuffer(buffer);
    sound.setLoop(true);
    sound.setVolume(0.3);
    sound.play();
  });

  // Nubes de fondo
  const clouds: THREE.Object3D<THREE.Object3DEventMap>[] = [];
  const cloudLoader = new GLTFLoader();
  cloudLoader.load('clouds/scene.gltf', (gltfCompleto) => {
    for (let i = 0; i < 10; i++) {
      const cloud = SkeletonUtils.clone(gltfCompleto.scene);
      cloud.scale.set(3, 3, 3);
      cloud.position.set(
        Math.random() * 400 - 100,
        Math.random() * 400 + 20,
        -100
      );
      scene.add(cloud);
      clouds.push(cloud);
    }
  });

  camera.position.z = 80;
  camera.position.x = -5;

  let isGameOver = false;
  let score = 0;
  let maxScore = parseInt(localStorage.getItem('maxScore') || '0', 10);
  const jumpStrength = 30;

  window.addEventListener('keydown', (event) => {
    if (event.code === 'Space' && !isGameOver) {
      birdBody.velocity.y = jumpStrength;
      // Reproducir un sonido de aleteo de una instancia disponible
      const availableFlapSound = flapSounds.find(sound => !sound.isPlaying);
      if (availableFlapSound) {
        availableFlapSound.play();
      }
    }
  });

  function updatePipePosition(pipe: { upperPipe: any; lowerPipe: any; x: any; initialized?: boolean; randomY: any; }) {
    pipe.randomY = pipe.randomY ?? Math.random() * (window.innerHeight - gapSize);
    pipe.upperPipe.position.set(pipe.x, pipe.randomY, 0);
    pipe.lowerPipe.position.set(pipe.x, pipe.randomY - gapSize - pipeScale.y * 2, 0);
  }

  function handlePipes() {
    pipes.forEach((pipe) => {
      pipe.x -= 0.85;
      if (pipe.x < -window.innerWidth / 16) {
        pipe.x += window.innerWidth;
        score++;
        if (score > maxScore) {
          maxScore = score;
          localStorage.setItem('maxScore', maxScore.toString());
        }
        pipe.initialized = false;
        updatePipePosition(pipe);
      }
      updatePipePosition(pipe);
    });
  }

  function moveClouds() {
    clouds.forEach((cloud) => {
      cloud.position.x -= 0.1;
      if (cloud.position.x < -150) {
        cloud.position.x = 150;
        cloud.position.y = Math.random() * 50 + 20;
      }
    });
  }

  const scoreElement = document.createElement('div');
  scoreElement.style.position = 'absolute';
  scoreElement.style.color = 'white';
  scoreElement.style.top = '10px';
  scoreElement.style.left = '10px';
  scoreElement.style.fontSize = '24px';
  scoreElement.innerHTML = `Score: ${score} | Max Score: ${maxScore}`;
  document.body.appendChild(scoreElement);

  const gameOverElement = document.createElement('div');
  gameOverElement.style.position = 'absolute';
  gameOverElement.style.color = 'red';
  gameOverElement.style.top = '50%';
  gameOverElement.style.left = '50%';
  gameOverElement.style.transform = 'translate(-50%, -50%)';
  gameOverElement.style.fontSize = '48px';
  gameOverElement.style.display = 'none';
  document.body.appendChild(gameOverElement);

  function gameOver() {
    isGameOver = true;
    gameOverElement.innerHTML = `Game Over! Score: ${score} | Max Score: ${maxScore}`;
    gameOverElement.style.display = 'block';
    setTimeout(() => {
      location.reload();
    }, 3000);
  }

  function checkCollision() {
    const birdY = birdBody.position.y;
    if (birdY < -window.innerHeight / 4 || birdY > window.innerHeight / 4) {
      gameOver();
    }
    pipes.forEach((pipe) => {
      const pipeX = pipe.x;
      const birdX = birdBody.position.x;
      if (
        Math.abs(pipeX - birdX) < 2 &&
        (birdY > pipe.randomY || birdY < pipe.randomY - gapSize)
      ) {
        gameOver();
      }
    });
  }

  function animate() {
    if (isGameOver) return;
    world.step(1 / 60);
    if (birdMesh) {
      birdMesh.position.copy(birdBody.position);
    }
    handlePipes();
    moveClouds();
    checkCollision();
    scoreElement.innerHTML = `Score: ${score} | Max Score: ${maxScore}`;
    controls.update();
    renderer.render(scene, camera);
  }

  window.addEventListener('resize', onWindowResize, false);
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
}

DoThree();

function App() {
  return <div></div>;
}

export default App;