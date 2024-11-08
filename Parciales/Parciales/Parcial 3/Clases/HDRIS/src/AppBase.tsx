
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { ThreeMFLoader } from 'three/examples/jsm/Addons.js';

function DoThreeJs(){
 
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  let currentTimeout: number | undefined;
  //Color fondo
  scene.background = new THREE.Color( 'skyblue' );
  
  //Luz ambiental
  const ambientLight = new THREE.AmbientLight(0x99aaff,1);
  scene.add(ambientLight);

  const renderer = new THREE.WebGLRenderer();

  renderer.outputColorSpace = THREE.SRGBColorSpace; //opciones aestethic
  renderer.toneMapping = THREE.ACESFilmicToneMapping; //opciones aestethic
  renderer.toneMappingExposure = 0.85;
  renderer.setPixelRatio(window.devicePixelRatio); //opciones aestethic
  renderer.setSize( window.innerWidth, window.innerHeight );

  const controls = new OrbitControls( camera, renderer.domElement );

  document.body.appendChild( renderer.domElement );

  //1 ============================================================ Iluminacion con HDRI y reflejos
  const loader = new RGBELoader();  
  //carga HDRIs o high dinamyc range images
    loader.load('environments/wildflower_field_2k.hdr', function(texture){
      texture.mapping = THREE.EquirectangularReflectionMapping;
      // scene.background = texture;
      scene.environment = texture;     
    })

  const jpgloader = new THREE.TextureLoader();

  jpgloader.load('environments/HDRIS Campo.jpg', (texturajpg)=>{
    texturajpg.mapping = THREE.EquirectangularRefractionMapping;
    scene.background = texturajpg;

    const sphereG = new THREE.SphereGeometry(1);
    const sphereM = new THREE.MeshStandardMaterial({
      roughness:0,
      metalness:1,
      color: 'tomato'
    })

    const sphere = new THREE.Mesh(sphereG, sphereM);
    scene.add(sphere);
    sphere.position.x = 2;
    sphere.name = 'sphere';

  })

  const geometry = new THREE.BoxGeometry( 1, 1, 1 );
  const material = new THREE.MeshStandardMaterial({
    roughness:0,
    metalness:1,
    color: 0x3333FF
  });
  const cube = new THREE.Mesh( geometry, material );
  scene.add( cube );
  cube.name="cube"

  camera.position.z = 5;
  controls.update();

  //2 ================================== ELEMENTOS HTML
  const etiquetasRenderer = new CSS2DRenderer(); //lo primero es inicializar
  etiquetasRenderer.setSize(window.innerWidth, window.innerHeight);//darle tamano
  etiquetasRenderer.domElement.style.position = 'absolute';//poner encima del canvas
  etiquetasRenderer.domElement.style.top = '0px';//encima del canvas
  document.body.appendChild(etiquetasRenderer.domElement);
  etiquetasRenderer.domElement.style.pointerEvents = 'none';//quitamos los eventos de mover
  etiquetasRenderer.domElement.style.color = '#ffffff';

  //Parrafo con texto
  const p = document.createElement('p');
  p.textContent = 'Hola crack';
  const pCSSObject = new CSS2DObject(p);
  scene.add(pCSSObject);
  pCSSObject.position.set(0,1,0);
  //2 ================================== ELEMENTOS HTML

  //3 ================================== AUDIO
  const listener = new THREE.AudioListener();
  camera.add( listener );

  // create a global audio source
  const sound = new THREE.Audio( listener );

  // load a sound and set it as the Audio object's buffer
  const audioLoader = new THREE.AudioLoader();
  audioLoader.load( 'audio/wineGlassClink.wav', function( buffer ) {
    sound.setBuffer( buffer );
    sound.setLoop( false );
    sound.setVolume( 0.5 );
  });


  const mousePosition = new THREE.Vector2();
  const rayCaster = new THREE.Raycaster();
  window.addEventListener('click',(e)=>{
   
      mousePosition.x =  ( e.clientX / window.innerWidth ) * 2 - 1;
      mousePosition.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
      
      rayCaster.setFromCamera(mousePosition,camera);
      const intersects = rayCaster.intersectObjects(scene.children);
      if(intersects.length>0){
         

        const objPos = intersects[0].object.position;
        //aqui

        

        if(sound.isPlaying){
          sound.stop();      
        }
        sound.play();
                
      }else{
        
      }
  })

  function animate() {
    requestAnimationFrame( animate );

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    
    etiquetasRenderer.render(scene,camera);
    renderer.render( scene, camera );
  }


  window.addEventListener( 'resize', onWindowResize, false );
  
  function onWindowResize(){ //funcion para redimensionar ventana si el usuario le anda moviendo
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
    etiquetasRenderer.setSize( window.innerWidth, window.innerHeight );
  }
  
  animate(); //Iniciamos el loop
}


function Clase() {
  return (
    <>      
      {DoThreeJs()}
    </>
  )
}

export default Clase