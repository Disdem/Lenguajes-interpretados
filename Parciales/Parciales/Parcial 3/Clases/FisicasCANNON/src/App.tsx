import * as THREE from 'three';
import * as CANNON from 'cannon';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

function doThree(){
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

  camera.position.z = 15;
  camera.position.y = 3;  

  //Color fondo
  scene.background = new THREE.Color( 'lightgreen' );

  //Luz direccional
  const light = new THREE.DirectionalLight(0xffffff,0.6);
  light.position.set(-1,4,2);
  scene.add(light);
  light.castShadow=true;
  
  //Luz ambiental
  const ambientLight = new THREE.AmbientLight(0x99aaff,1);
  scene.add(ambientLight);

  const renderer = new THREE.WebGLRenderer();
  renderer.toneMapping = THREE.ACESFilmicToneMapping; //opciones aestethic
  renderer.outputColorSpace = THREE.SRGBColorSpace; //opciones aestethic
  renderer.setPixelRatio(window.devicePixelRatio); //opciones aestethic
  renderer.setSize( window.innerWidth, window.innerHeight );

  renderer.shadowMap.enabled = true;

  const controls = new OrbitControls( camera, renderer.domElement );
  controls.update();

  document.body.appendChild( renderer.domElement );

  const planoGeometry = new THREE.PlaneGeometry(25,25,5,5);
  const planoMaterial = new THREE.MeshPhongMaterial({
    color:0x339944,       
    side:THREE.DoubleSide
  });
  const planoMesh = new THREE.Mesh(planoGeometry,planoMaterial);
  planoMesh.rotateX(-90 * (Math.PI/180))
  
  scene.add(planoMesh);  
  planoMesh.receiveShadow = true;  

  //CUBO Visual
  const cuboGeo = new THREE.BoxGeometry(2,2,2);
  const cuboMat = new THREE.MeshPhongMaterial({
    color: 0x77bbee,
    wireframe: false
  });
  const cuboMesh = new THREE.Mesh(cuboGeo,cuboMat);
  scene.add(cuboMesh);
  cuboMesh.castShadow=true;
  cuboMesh.position.set(2,15,0);
  
  const esferaGeo = new THREE.SphereGeometry(2);
  const esferaMat = new THREE.MeshPhongMaterial({
    color: 0xeebb77,
    wireframe: false
  });
  const esfeMesh = new THREE.Mesh(esferaGeo,esferaMat);
  scene.add(esfeMesh);
  esfeMesh.castShadow=true;
  esfeMesh.position.set(0,5,0);

  //mundo de fisicas
  const fRadianes = Math.PI/180;
  const world = new CANNON.World();
  world.gravity = new CANNON.Vec3(0, -9.81, 0);

  const materialFisicaPiso = new CANNON.Material("hielo");

  const pisoBody:any = new CANNON.Body({
    shape: new CANNON.Box(new CANNON.Vec3(12.5,12.5,0.1)),
    type: CANNON.Body.STATIC,
    material: materialFisicaPiso
  })

  world.addBody(pisoBody)
  pisoBody.quaternion.setFromEuler(-90 * fRadianes, 0, 0);

  const materialFisicaCubo = new CANNON.Material("cubo");

  const cuboBody = new CANNON.Body({
    mass: 1,
    shape: new CANNON.Box(new CANNON.Vec3(1,1,1)), // La mitad de mi cubo visual
    position: new CANNON.Vec3(2,15,0),
    material: materialFisicaCubo
  })

  cuboBody.angularVelocity.set(0,15,0);
  world.addBody(cuboBody);

  const esferaBody = new CANNON.Body({
    mass: 10,
    shape: new CANNON.Sphere(2),
    position: new CANNON.Vec3(0,5,0),
  })
  world.addBody(esferaBody);
  esferaBody.linearDamping = 0.3;

  const pisoCuboContactMaterial = new CANNON.ContactMaterial(
    materialFisicaPiso,
    materialFisicaCubo,
    {
      friction: 1,
      // restitution: 1
    }
   )
   world.addContactMaterial(pisoCuboContactMaterial);

   //================ evento de colision al cubo ==============================
   cuboBody.addEventListener("collide", (evento: any)=>{
    console.log(evento);
    console.log("colisiono con: ", evento.body.id); // objeto con el que choco
    // console.log('contacto entre cuerpos: ', evento.contact);
    
   })

   setTimeout(()=>{
    cuboBody.velocity.setZero();
    cuboBody.position.set(-3,10,0);

    cuboBody.quaternion.setFromEuler(0,0,0);
    cuboBody.angularVelocity.setZero();
   },5000)

  const physStep = 1 / 60; //la documentacion recomienda usar este valor
  const clock = new THREE.Clock();

  function animate() {
    world.step(physStep);

    planoMesh.position.copy(pisoBody.position);
    planoMesh.quaternion.copy(pisoBody.quaternion);

    cuboMesh.position.copy(cuboBody.position);
    cuboMesh.quaternion.copy(cuboBody.quaternion);


    esfeMesh.position.copy(esferaBody.position);
    esfeMesh.quaternion.copy(esferaBody.quaternion);

    controls.update();
    renderer.render( scene, camera );
    requestAnimationFrame( animate );
  }
  window.addEventListener( 'resize', onWindowResize, false );
  
  function onWindowResize(){ //funcion para redimensionar ventana si el usuario le anda moviendo
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    controls.update();
    renderer.setSize( window.innerWidth, window.innerHeight );
  }

  animate();
}

const App = () => {
  return (
    <>      
    {doThree()}
    </>
  )
}

export default App