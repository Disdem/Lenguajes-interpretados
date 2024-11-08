import * as THREE from 'three';
import { useEffect } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

function DoThreeJS() {
  useEffect(() => {
    // Escena
    const scene = new THREE.Scene();

    // Cámara
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    scene.background = new THREE.Color(0.5, 0.2, 0.9);

    // Renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);

    // Luz ambiental y direccional
    const luzAmbiental = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(luzAmbiental);
    const luzDireccional = new THREE.DirectionalLight(0xffffff, 1);
    scene.add(luzDireccional);

    // Cargar textura de Tetris
    const textura = new THREE.TextureLoader().load(
      'public/models/tetris.png', 
      (texture) => {
        const planoGeometry = new THREE.PlaneGeometry(10, 10);
        const planoMaterial = new THREE.MeshBasicMaterial({ map: texture });
        const planoMesh = new THREE.Mesh(planoGeometry, planoMaterial);
        scene.add(planoMesh);
        planoMesh.position.z = -1;
      },
      undefined, 
      (err) => {
        console.error('An error happened loading the texture.', err);
      }
    );

    const puntos = [
      new THREE.Vector3(-.87, -2.8, 0),  // Punto 1
      new THREE.Vector3(-.87, 2.6, 0),  // Punto 2
      new THREE.Vector3(.5, 2.6, 0),   // Punto 3
      new THREE.Vector3(.50, 1.75, 0),   // Punto 4
      new THREE.Vector3(-.2, 1.75, 0),   // Punto 5
      new THREE.Vector3(-.2, -2, 0),   // Punto 6
      new THREE.Vector3(.5, -2, 0),   // Punto 7
      new THREE.Vector3(.5, -2.8, 0),  // Punto 8
    ];

    // Mostrar los puntos como esferas en la escena
    const sphereGeometry = new THREE.SphereGeometry(0.1, 16, 16);
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    
    puntos.forEach((punto) => {
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      sphere.position.copy(punto);
      scene.add(sphere);
    });

    // Crear una línea que conecte todos los puntos
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(puntos.concat([puntos[0]])); // Añadir el primer punto al final para cerrar el ciclo
    const line = new THREE.Line(lineGeometry, lineMaterial);
    scene.add(line);

    // Cargar modelo 3D GLTF (nave espacial)
    const gltfLoader = new GLTFLoader();
    let nave: THREE.Object3D | undefined;

    gltfLoader.load(
      'public/models/spaceship.gltf',
      (gltf) => {
        nave = gltf.scene;
        nave.scale.set(0.05, 0.05, 0.05);
        scene.add(nave);
        nave.position.copy(puntos[0]); 
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },
      (error) => {
        console.error('Error cargando el modelo:', error);
      }
    );

    camera.position.z = 5;

    
    const clock = new THREE.Clock();
    let currentPointIndex = 0;
    const speed: number = 4;

    function moveToNextPoint() {
      if (!nave) return;

      const currentPoint = puntos[currentPointIndex];
      const nextPoint = puntos[(currentPointIndex + 1) % puntos.length];

      
      const direction = new THREE.Vector3().subVectors(nextPoint, currentPoint).normalize();
      nave.position.add(direction.multiplyScalar(speed * clock.getDelta()));

      
      nave.lookAt(nextPoint);

      
      if (nave.position.distanceTo(nextPoint) < 0.1) {
        currentPointIndex = (currentPointIndex + 1) % puntos.length;
        nave.position.copy(nextPoint); 
      }
    }

    function animate() {
      moveToNextPoint();
      controls.update();
      renderer.render(scene, camera);
    }

    
    renderer.setAnimationLoop(animate);

   
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    
    return () => {
      window.removeEventListener('resize', () => {});
      document.body.removeChild(renderer.domElement);
    };
  }, []);

  return <></>; 
}

function App() {
  return (
    <div>
      <DoThreeJS />
    </div>
  );
}

export default App;