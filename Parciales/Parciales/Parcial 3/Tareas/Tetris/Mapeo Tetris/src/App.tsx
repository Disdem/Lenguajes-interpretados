import React, { useEffect, useState } from 'react';
import * as THREE from 'three';

function App() {
  const [texture, setTexture] = useState(null);
  const [renderer, setRenderer] = useState(null);
  const [scene, setScene] = useState(null);
  const [camera, setCamera] = useState(null);

  useEffect(() => {
    // Initialize the scene, camera, and renderer only once
    const newScene = new THREE.Scene();
    const newCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const newRenderer = new THREE.WebGLRenderer();
    
    newRenderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(newRenderer.domElement);
    
    const luzAmbiental = new THREE.AmbientLight(0xffffff, 0.6);
    newScene.add(luzAmbiental);

    setScene(newScene);
    setCamera(newCamera);
    setRenderer(newRenderer);

    // Cleanup on component unmount
    return () => {
      newRenderer.dispose();
      document.body.removeChild(newRenderer.domElement);
    };
  }, []);

  useEffect(() => {
    if (texture && scene && camera && renderer) {
      const planoGeometry = new THREE.PlaneGeometry(5, 5);
      const planoMaterial = new THREE.MeshBasicMaterial({ map: texture });
      const planoMesh = new THREE.Mesh(planoGeometry, planoMaterial);
      scene.add(planoMesh);
      planoMesh.position.z = -1; // Position the plane

      camera.position.z = 5;

      const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      };

      animate();

      // Handle window resize
      const onWindowResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener('resize', onWindowResize, false);

      // Cleanup on component unmount
      return () => {
        window.removeEventListener('resize', onWindowResize);
        scene.remove(planoMesh);
      };
    }
  }, [texture, scene, camera, renderer]);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(
      '/models/tetris.png', // Corrected path
      (loadedTexture) => {
        setTexture(loadedTexture);
      },
      undefined,
      (err) => {
        console.error('An error happened.', err);
      }
    );
  }, []);

  return (
    <>
      <div></div>
    </>
  );
}

export default App;