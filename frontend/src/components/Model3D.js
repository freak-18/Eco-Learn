import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const Model3D = ({ type, onClose }) => {
  const mountRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a1a);
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Create 3D model based on type
    let model;
    if (type === 'quiz') {
      const geometry = new THREE.BoxGeometry(2, 2, 2);
      const material = new THREE.MeshPhongMaterial({ 
        color: 0x3b82f6,
        shininess: 100
      });
      model = new THREE.Mesh(geometry, material);
    } else if (type === 'challenge') {
      const geometry = new THREE.SphereGeometry(1.5, 32, 32);
      const material = new THREE.MeshPhongMaterial({ 
        color: 0x10b981,
        shininess: 100
      });
      model = new THREE.Mesh(geometry, material);
    } else if (type === 'leaderboard') {
      const geometry = new THREE.CylinderGeometry(1, 1, 3, 32);
      const material = new THREE.MeshPhongMaterial({ 
        color: 0xf59e0b,
        shininess: 100
      });
      model = new THREE.Mesh(geometry, material);
    }

    if (model) {
      model.castShadow = true;
      model.receiveShadow = true;
      scene.add(model);
    }

    camera.position.z = 5;

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      if (model) {
        model.rotation.x += 0.005;
        model.rotation.y += 0.01;
      }
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, [type]);

  return (
    <div className="fixed inset-0 z-50 bg-black">
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={onClose}
          className="bg-white text-black px-4 py-2 rounded-lg font-semibold shadow-lg"
        >
          Close 3D View
        </button>
      </div>
      <div ref={mountRef} className="w-full h-full" />
    </div>
  );
};

export default Model3D;