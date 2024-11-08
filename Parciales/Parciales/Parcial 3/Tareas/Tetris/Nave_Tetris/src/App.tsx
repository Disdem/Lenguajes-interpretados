import * as THREE from 'three';
import { useEffect } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

function RenderThreeJS() {
  useEffect(() => {
    const escena = new THREE.Scene();
    const camara = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    escena.background = new THREE.Color(0x4A2364);

    const renderizador = new THREE.WebGLRenderer();
    renderizador.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderizador.domElement);

    const controles = new OrbitControls(camara, renderizador.domElement);

    const luzAmbiente = new THREE.AmbientLight(0xffffff, 0.6);
    escena.add(luzAmbiente);
    
    const luzPrincipal = new THREE.DirectionalLight(0xffffff, 1);
    escena.add(luzPrincipal);

    const texturaPlano = new THREE.TextureLoader().load(
      'public/models/tetris.png',
      (textura) => {
        const geometriaPlano = new THREE.PlaneGeometry(10, 10);
        const materialPlano = new THREE.MeshBasicMaterial({ map: textura });
        const mallaPlano = new THREE.Mesh(geometriaPlano, materialPlano);
        escena.add(mallaPlano);
        mallaPlano.position.z = -1;
      },
      undefined,
      (error) => {
        console.error('Error al cargar la textura:', error);
      }
    );

    const trayectoria = [
      new THREE.Vector3(1.46, -0.3, 0), 
      new THREE.Vector3(1.46, 0.5, 0),  
      new THREE.Vector3(2.2, 0.5, 0),   
      new THREE.Vector3(2.2, 1.36, 0),  
      new THREE.Vector3(2.95, 1.36, 0), 
      new THREE.Vector3(2.95, 0.5, 0),  
      new THREE.Vector3(3.68, 0.5, 0),  
      new THREE.Vector3(3.68, -0.36, 0),
    ];

    const geometriaEsfera = new THREE.SphereGeometry(0.06, 16, 16);
    const materialEsfera = new THREE.MeshBasicMaterial({ color: 0x9A3367 });

    trayectoria.forEach((punto) => {
      const esfera = new THREE.Mesh(geometriaEsfera, materialEsfera);
      esfera.position.copy(punto);
      escena.add(esfera); 
    });

    const cargadorGLTF = new GLTFLoader();
    let modeloNave: THREE.Object3D<THREE.Object3DEventMap>;

    cargadorGLTF.load(
      'public/models/spaceship.gltf',
      (modelo) => {
        modeloNave = modelo.scene;
        modeloNave.scale.set(0.04, 0.04, 0.04);
        escena.add(modeloNave);
        modeloNave.position.copy(trayectoria[0]);
      },
      (progreso) => {
        console.log((progreso.loaded / progreso.total) * 100 + '% cargado');
      },
      (error) => {
        console.error('Error al cargar el modelo:', error);
      }
    );

    camara.position.z = 5;

    const reloj = new THREE.Clock();
    let indicePuntoActual = 0;
    const velocidad = 2;

    function moverSiguientePunto() {
      if (!modeloNave) return;

      const puntoActual = trayectoria[indicePuntoActual];
      const siguientePunto = trayectoria[(indicePuntoActual + 1) % trayectoria.length];
      const direccion = new THREE.Vector3().subVectors(siguientePunto, puntoActual).normalize();
      modeloNave.position.add(direccion.multiplyScalar(velocidad * reloj.getDelta()));

      modeloNave.lookAt(siguientePunto);

      if (modeloNave.position.distanceTo(siguientePunto) < 0.1) {
        indicePuntoActual = (indicePuntoActual + 1) % trayectoria.length;
        modeloNave.position.copy(siguientePunto);
      }
    }

    function animar() {
      moverSiguientePunto();
      controles.update();
      renderizador.render(escena, camara);
    }

    renderizador.setAnimationLoop(animar);

    window.addEventListener('resize', () => {
      camara.aspect = window.innerWidth / window.innerHeight;
      camara.updateProjectionMatrix();
      renderizador.setSize(window.innerWidth, window.innerHeight);
    });

    return () => {
      window.removeEventListener('resize', () => {});
      document.body.removeChild(renderizador.domElement);
    };
  }, []);

  return <></>;
}

function Aplicacion() {
  return (
    <div>
      <RenderThreeJS />
    </div>
  );
}

export default Aplicacion;
