import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const ARViewer = ({ content, onClose }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (error) {
        console.error('Camera access denied:', error);
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    // Create 3D model
    let geometry, material;
    if (content === 'quiz') {
      geometry = new THREE.BoxGeometry(2, 2, 2);
      material = new THREE.MeshPhongMaterial({ color: 0x3b82f6 });
    } else if (content === 'challenge') {
      geometry = new THREE.SphereGeometry(1.5, 32, 32);
      material = new THREE.MeshPhongMaterial({ color: 0x10b981 });
    } else {
      geometry = new THREE.CylinderGeometry(1, 1, 3, 32);
      material = new THREE.MeshPhongMaterial({ color: 0xf59e0b });
    }

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      renderer.dispose();
    };
  }, [content]);

  return (
    <div className="fixed inset-0 z-50 bg-black">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover"
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={onClose}
          className="bg-white text-black px-4 py-2 rounded-lg font-semibold shadow-lg"
        >
          Close AR
        </button>
      </div>
      <div className="absolute bottom-4 left-4 right-4 z-10 bg-black bg-opacity-50 text-white p-3 rounded-lg text-center">
        <p className="text-sm">
          {content === 'quiz' && 'Interactive Quiz Visualization'}
          {content === 'challenge' && 'Environmental Challenge View'}
          {content === 'leaderboard' && 'Rankings & Achievements'}
        </p>
      </div>
    </div>
  );
};

export default ARViewer;