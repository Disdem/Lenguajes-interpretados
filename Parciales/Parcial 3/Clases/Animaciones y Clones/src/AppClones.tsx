import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as SkeletonUtils from 'three/addons/utils/SkeletonUtils.js';

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
    const planeG = new THREE.PlaneGeometry(10, 10);
    const planeM = new THREE.MeshBasicMaterial({ color: 0x2271b3  });
    const plane = new THREE.Mesh(planeG, planeM);
    plane.rotation.x = -Math.PI / 2;  // Inclinar el plano 45 grados
    // plane.rotation.z = Math.PI / 6;   // Rotar el plano en el eje Z 30 grados
    plane.castShadow = true;
    scene.add(plane);

    //AQUI es la clase
    const dances = ['Happy','HipHop','Macarena','Samba']; //arreglo con los nombres
    let nModels = 20;
    let waitTimer = 1;

    const gltfLoader = new GLTFLoader();
    let monitaBailando: THREE.AnimationObjectGroup | any; // Guarda al personaje
    let clips: THREE.AnimationClip[] = []; // Guarda las animaciones
    let mixers: THREE.AnimationMixer[] = []; // Animator en unity

    gltfLoader.load('models/robot.gltf', (gltf)=> {
      monitaBailando = gltf.scene;
    //   scene.add(monitaBailando)
      
      clips = gltf.animations;
     

      monitaBailando.traverse((objetohijo: {
          castShadow: boolean; isMesh: boolean; 
        }) => {
            if(objetohijo.isMesh){
                objetohijo.castShadow = true;
        }
      })
    })



    const spawnInterval = setInterval(()=>{

        if(nModels <=0){
            clearInterval(spawnInterval);
            return;
        }
        nModels--;


        const modelClone = SkeletonUtils.clone(monitaBailando);
        modelClone.position.set( Math.random()*8-4, 0, Math.random()*8-4 );
        modelClone.rotateY(Math.random() * (Math.PI*2));
        scene.add(modelClone);

        const numeroBaile = Math.floor(Math.random()*3.9);
        const mixer = new THREE.AnimationMixer(modelClone);
        const clip = THREE.AnimationClip.findByName(clips, dances[numeroBaile]);
        const action = mixer.clipAction(clip);

        action.play();
        mixers?.push(mixer);


    }, waitTimer*1000);


    camera.position.z = 5;

    // Agregar OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;  // Añade una sensación de suavidad al movimiento
    controls.dampingFactor = 0.05;
    const clock = new THREE.Clock();
    // Función de animación
    function animate() {
      const deltaTime = clock.getDelta();

      if(mixers.length > 0){
          mixers?.forEach((mixerIndividual)=>{
            mixerIndividual.update(deltaTime);
          })
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

const AppClones = () => {
    return (
      <div>AppClones</div>
    )
  }

export default AppClones