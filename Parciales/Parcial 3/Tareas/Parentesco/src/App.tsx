import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

function DoThreeJS() {
  const factorRadianes = Math.PI / 180;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  scene.background = new THREE.Color('white');

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(animate);
  document.body.appendChild(renderer.domElement);
  renderer.shadowMap.enabled = true;

  const controls = new OrbitControls(camera, renderer.domElement);

  const conoLuz = new THREE.SpotLight(0xffffff, 1000);
  conoLuz.position.set(10, 10, 10);
  conoLuz.castShadow = true;
  scene.add(conoLuz);

  const planeG = new THREE.PlaneGeometry(20, 20, 10);
  const planeM = new THREE.MeshPhongMaterial({ color: 0x7D2181, side: THREE.DoubleSide });
  const plane = new THREE.Mesh(planeG, planeM);
  plane.receiveShadow = true;
  scene.add(plane);
  plane.position.y = -5;
  plane.rotateX(90 * factorRadianes);

  const cubeG = new THREE.BoxGeometry(2, 2, 2);
  const cubeM = new THREE.MeshPhongMaterial({ color: 0xaa00ff });
  const cube = new THREE.Mesh(cubeG, cubeM);
  cube.position.y = 3;
  cube.castShadow = true;
  scene.add(cube);

  camera.position.z = 20;
  camera.position.y = 1;

  const cubosPequenos: { mesh: THREE.Mesh; moving: boolean }[] = [];
  const numCubos = 15;

  for (let i = 0; i < numCubos; i++) {
    const colorAleatorio = Math.floor(Math.random() * 0xffffff);
    const cubePequenoM = new THREE.MeshPhongMaterial({ color: colorAleatorio });
    const cubePequenoG = new THREE.BoxGeometry(1, 1, 1);
    const cubePequeno = new THREE.Mesh(cubePequenoG, cubePequenoM);
    cubePequeno.position.set(
      (Math.random() - 0.5) * 30,  
      Math.random() * 8,
      (Math.random() - 0.5) * 30
    );
    cubePequeno.castShadow = true;
    cubosPequenos.push({ mesh: cubePequeno, moving: false });
    scene.add(cubePequeno);
  }

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  window.addEventListener("click", (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(cubosPequenos.map(c => c.mesh));

    if (intersects.length > 0) {
      const clickedCube = intersects[0].object as THREE.Mesh;
      const targetCube = cubosPequenos.find(c => c.mesh === clickedCube);

      if (targetCube && targetCube.moving) {
        targetCube.moving = false;
        scene.attach(clickedCube);
      } else if (targetCube) {
        cube.attach(clickedCube);
        targetCube.moving = true;
      }
    }
  });

  const clock = new THREE.Clock();
  let time = 0;

  function animate() {
    const deltaTime = clock.getDelta();
    time += deltaTime;

    for (const targetCube of cubosPequenos) {
      if (targetCube.moving) {
        targetCube.mesh.position.x += Math.sin(time) * 0.05;
      }
    }

    cube.position.set(Math.sin(time * 0.5) * 10, 3, 0); 

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

DoThreeJS();

function App() {
  return <div></div>;
}

export default App;
