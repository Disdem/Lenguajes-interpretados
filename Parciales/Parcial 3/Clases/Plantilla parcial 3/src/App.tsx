
import * as THREE from 'three';

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

camera.position.z = 5;

const clock = new THREE.Clock();

function animate() {
// Update in Unity, llama el loop cada frame

  const deltaTIme = clock.getDelta();

	cube.rotation.x += 2 * deltaTIme;
	cube.rotation.y += 1 * deltaTIme;

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
