import * as THREE from 'three';
import { useEffect } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as CANNON from 'cannon-es';

function DoThreeJS() {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    scene.background = new THREE.Color(0x4A2364);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(5, 10, 5);
    scene.add(directionalLight);

    camera.position.set(0, 2, 8);

    const world = new CANNON.World();
    world.gravity.set(0, -4, 0);

    const planeBody = new CANNON.Body({
      type: CANNON.Body.STATIC,
      shape: new CANNON.Plane(),
    });
    planeBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
    world.addBody(planeBody);

    const planeGeometry = new THREE.PlaneGeometry(10, 10);
    const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x3b83bd, side: THREE.DoubleSide });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    scene.add(plane);

    const spheres: { mesh: THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial, THREE.Object3DEventMap>; body: CANNON.Body; }[] = [];
    const maxSpheres = 80;
    let lastSpawnTime = 0;
    const spawnInterval = 0.1;

    function createRandomVelocity() {
      const speed = 6 + Math.random() * 3;
      const angleX = (Math.random() - 0.5) * Math.PI / 6;
      const angleZ = (Math.random() - 0.5) * Math.PI / 6;
      return new CANNON.Vec3(speed * Math.sin(angleX), speed, speed * Math.sin(angleZ));
    }

    function getRandomColor() {
      return new THREE.Color(Math.random(), Math.random(), Math.random());
    }

    function createSphere() {
      const sphereMaterial = new THREE.MeshStandardMaterial({ color: getRandomColor() });
      const sphereMesh = new THREE.Mesh(new THREE.SphereGeometry(0.2, 32, 32), sphereMaterial);
      scene.add(sphereMesh);

      const sphereBody = new CANNON.Body({
        mass: 1,
        shape: new CANNON.Sphere(0.2),
        position: new CANNON.Vec3(0, 0.2, 0),
      });
      sphereBody.velocity = createRandomVelocity();
      world.addBody(sphereBody);

      spheres.push({ mesh: sphereMesh, body: sphereBody });
    }

    function animate() {
      const currentTime = performance.now() / 1000;
      world.step(1 / 60);

      if (spheres.length < maxSpheres && currentTime - lastSpawnTime > spawnInterval) {
        createSphere();
        lastSpawnTime = currentTime;
      }

      spheres.forEach((sphere) => {
        if (sphere.body.position.y < 0 || sphere.body.position.length() > 10) {
          sphere.body.position.set(0, 0.2, 0);
          sphere.body.velocity = createRandomVelocity();
        }
        sphere.mesh.position.copy(sphere.body.position);
        sphere.mesh.quaternion.copy(sphere.body.quaternion);
      });

      controls.update();
      renderer.render(scene, camera);
    }

    renderer.setAnimationLoop(animate);

    window.addEventListener('resize', onWindowResize, false);

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    return () => {
      renderer.dispose();
      document.body.removeChild(renderer.domElement);
    };
  }, []);

  return null;
}

function App() {
  return (
    <>
      <DoThreeJS />
      <div>
        <h1>Fuente de esferas</h1>
      </div>
    </>
  );
}

export default App;
