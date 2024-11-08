import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

function DoTHREE(){
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    scene.background = new THREE.Color(0.5, 0.5, 0.3);

    renderer.shadowMap.enabled = true;

    // Agregar luces
    const luzAmbiental = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(luzAmbiental);

    const luzDireccional = new THREE.DirectionalLight(0xffffff);
    luzDireccional.castShadow = true;
    scene.add(luzDireccional);

    // Creación de figuras
    const planeG = new THREE.PlaneGeometry(4, 4);
    const planeM = new THREE.MeshBasicMaterial({ color: 0x2271b3  });
    const plane = new THREE.Mesh(planeG, planeM);
    plane.rotation.x = -Math.PI / 2.8;  // Inclinar el plano 45 grados
    // plane.rotation.z = Math.PI / 6;   // Rotar el plano en el eje Z 30 grados
    plane.castShadow = true;
    scene.add(plane);

    //AQUI es la clase
    const dances = ['Happy','HipHop','Macarena','Samba']; //arreglo con los nombres
    let previousAction:THREE.AnimationAction, activeAction : THREE.AnimationAction; //variable para guardar la animacion actual y la previa
    let ndance=0;  //indice del baile

    const gltfLoader = new GLTFLoader();
    let monitaBailando: THREE.AnimationObjectGroup | any; // Guarda al personaje
    let clips: THREE.AnimationClip[] = []; // Guarda las animaciones
    let mixer: THREE.AnimationMixer | null; // Animator en unity

    gltfLoader.load('models/robot.gltf', (gltf)=> {
      monitaBailando = gltf.scene;
      scene.add(monitaBailando)
      
      clips = gltf.animations;
      mixer = new THREE.AnimationMixer(monitaBailando);
      /*
       * Es un reproductor para las animaciones deun objeto 
       * en particular
       * si multiples objetos en mi escena son animados
       * puedo usar multiples AnimatorMixes
       */
      const clipInicial = THREE.AnimationClip.findByName(clips, dances[ndance]);
      const action = mixer.clipAction(clipInicial);

      activeAction = action;
      action.play();

      monitaBailando.traverse((objetohijo: {
          castShadow: boolean; isMesh: boolean; 
        }) => {
            if(objetohijo.isMesh){
                objetohijo.castShadow = true;
        }
      })
    })

    function fadeToAction( n: number, duration: number ) {

      const clip = THREE.AnimationClip.findByName( clips, dances[n] );
      const action = mixer!.clipAction( clip );
  
      previousAction = activeAction;
      activeAction = action;
  
      if ( previousAction !== activeAction ) {
  
        previousAction.fadeOut( duration );
  
      }
  
      activeAction
        .reset()
        .setEffectiveTimeScale( 1 )
        .setEffectiveWeight( 1 )
        .fadeIn( duration )
        .play();
  
    }

    setInterval(()=>{
        ndance ++;
        if(ndance >= dances.length)
            ndance = 0;

        fadeToAction(ndance, 0.9);
    }, 3000);


    camera.position.z = 5;

    // // Agregar OrbitControls
    // const controls = new OrbitControls(camera, renderer.domElement);
    // controls.enableDamping = true;  // Añade una sensación de suavidad al movimiento
    // controls.dampingFactor = 0.05;
    const clock = new THREE.Clock();
    // Función de animación
    function animate() {
      const deltaTime = clock.getDelta();

      if(mixer != null){
          mixer.update(deltaTime);
      }

      // controls.update(); // Necesario para que los controles de órbita funcionen
      renderer.render(scene, camera);
    }

    renderer.setAnimationLoop(animate);

    // Función para redimensionar
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener('resize', onWindowResize);
}

DoTHREE();

const Anim = () => {
  return (
    <div>Anim</div>
  )
}

export default Anim