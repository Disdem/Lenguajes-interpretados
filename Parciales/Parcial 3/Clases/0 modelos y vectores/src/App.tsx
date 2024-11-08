import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

function DoThreeJS(){

//escena escencial 1
const scene = new THREE.Scene();
//escenciales 2
//Camera
// 75 es el angulo de vision
// aspect ratio
// near Plane
// far plane
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

scene.background = new THREE.Color(0.9,0.3,0.3)

//escenciales 3
//Renderer es donde se guarda la informacion, libreria grafica, OpneGL
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );


//materiales mas complejos necesitan la luz
//Luz ambiental simula los rebotes de luz
const luzAmbiental = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(luzAmbiental);
//luz direccional simula la direccion de la luz para dar profundidad
const luzDireccional = new THREE.DirectionalLight(0xffffff);
scene.add(luzDireccional);

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

//creacion de una nueva figura, documentacion en threeJS
const sphereGeometry = new THREE.SphereGeometry(0.5, 16, 8);
const sphereMaterial = new THREE.MeshPhongMaterial({color: 'tomato'});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add( sphere );

sphere.position.set(2, 0, 0);




//Cargar GLTF
const gltfLoader = new GLTFLoader();
let nave: THREE.Object3D<THREE.Object3DEventMap> | null;


gltfLoader.load(
  'models/spaceship.gltf',
  (gltf)=>{
    //este modelo se llama cuando cargo el modelo
    nave = gltf.scene;
    console.log(gltf);
    scene.add(nave);
    nave.scale.set(0.2,0.2,0.2);
  },
  (progreso)=>{
    // se llama mientras carga
    console.log( ( progreso.loaded / progreso.total * 100) + '%loaded' );
  },
  (error)=>{
    console.log(error);
  });


  const origen = new THREE.Vector3(0,0,0);
  const vFinal = new THREE.Vector3(10,10,10);

  const direccion = vFinal.add(origen.negate());
  direccion.normalize();

camera.position.z = 5;

const clock = new THREE.Clock();

function animate() {
// Update in Unity, llama el loop cada frame

  const deltaTIme = clock.getDelta();
  const time = clock.getElapsedTime();

	cube.rotation.x += 0 * deltaTIme;
	cube.rotation.y += 2 * deltaTIme;

	renderer.render( scene, camera );

  sphere.position.set(Math.sin(time)*5,0,Math.cos(time)*5);

// Crear un if que dependiendo la distancia la nave voltee al punto para que se cree

  if(nave != null){
    nave.lookAt(sphere.position);
    // nave.position.addScaledVector(direccion,deltaTIme);
    nave.position.lerpVectors(origen,sphere.position, (Math.sin(time)+1)/2);
  }

	controls.update();
	renderer.render( scene, camera );
}




window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize() { //funcion para redimensionar ventana si el usuario le anda moviendo
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}
}

DoThreeJS();

function App() {

  return (
    <>
      <div>
        buenas
      </div>
    </>
  )
}

export default App
