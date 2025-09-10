import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const ARRecycling = ({ onClose, onPointsEarned }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [itemsRecycled, setItemsRecycled] = useState(0);
  const [currentPoints, setCurrentPoints] = useState(0);
  const [selectedItem, setSelectedItem] = useState('bottle');
  const [recyclingBins, setRecyclingBins] = useState([]);
  const { user, updateUser } = useAuth();

  const recyclingItems = {
    bottle: { color: 0x0066cc, points: 25, name: 'Plastic Bottle' },
    can: { color: 0xcccccc, points: 30, name: 'Aluminum Can' },
    paper: { color: 0xffffff, points: 15, name: 'Paper' },
    glass: { color: 0x00cc66, points: 35, name: 'Glass Bottle' }
  };

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
        toast.error('Camera access required for AR experience');
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

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    scene.add(directionalLight);

    // Create recycling bins
    const createBin = (x, y, z, color) => {
      const binGroup = new THREE.Group();
      
      const binGeometry = new THREE.CylinderGeometry(0.5, 0.6, 1, 8);
      const binMaterial = new THREE.MeshLambertMaterial({ color });
      const bin = new THREE.Mesh(binGeometry, binMaterial);
      
      binGroup.add(bin);
      binGroup.position.set(x, y, z);
      return binGroup;
    };

    // Add recycling bins
    const plasticBin = createBin(-2, 0, 0, 0x0066cc);
    const metalBin = createBin(0, 0, 0, 0xcccccc);
    const paperBin = createBin(2, 0, 0, 0x00cc00);
    
    scene.add(plasticBin);
    scene.add(metalBin);
    scene.add(paperBin);

    camera.position.z = 5;

    // Create recyclable item
    const createItem = (type, x, y, z) => {
      const item = recyclingItems[type];
      let geometry;
      
      switch(type) {
        case 'bottle':
          geometry = new THREE.CylinderGeometry(0.1, 0.15, 0.8, 8);
          break;
        case 'can':
          geometry = new THREE.CylinderGeometry(0.12, 0.12, 0.4, 8);
          break;
        case 'paper':
          geometry = new THREE.BoxGeometry(0.3, 0.01, 0.4);
          break;
        case 'glass':
          geometry = new THREE.CylinderGeometry(0.08, 0.12, 0.6, 8);
          break;
        default:
          geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
      }
      
      const material = new THREE.MeshLambertMaterial({ color: item.color });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(x, y, z);
      
      return mesh;
    };

    let currentItem = null;

    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate bins slightly
      plasticBin.rotation.y += 0.005;
      metalBin.rotation.y += 0.005;
      paperBin.rotation.y += 0.005;
      
      renderer.render(scene, camera);
    };
    animate();

    // Handle canvas clicks for item recycling
    const handleCanvasClick = (event) => {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      // Create item at click position
      const worldX = x * 3;
      const worldY = y * 2 + 2;
      const worldZ = 0;

      if (currentItem) {
        scene.remove(currentItem);
      }

      currentItem = createItem(selectedItem, worldX, worldY, worldZ);
      scene.add(currentItem);

      // Animate item falling into bin
      const targetY = 0;
      const fallSpeed = 0.1;
      
      const animateFall = () => {
        if (currentItem.position.y > targetY) {
          currentItem.position.y -= fallSpeed;
          requestAnimationFrame(animateFall);
        } else {
          // Item recycled
          scene.remove(currentItem);
          currentItem = null;
          
          const pointsEarned = recyclingItems[selectedItem].points;
          setItemsRecycled(prev => prev + 1);
          setCurrentPoints(prev => prev + pointsEarned);
          
          toast.success(`${recyclingItems[selectedItem].name} recycled! +${pointsEarned} points!`);
        }
      };
      
      animateFall();
    };

    canvasRef.current.addEventListener('click', handleCanvasClick);

    return () => {
      renderer.dispose();
      if (canvasRef.current) {
        canvasRef.current.removeEventListener('click', handleCanvasClick);
      }
    };
  }, [selectedItem]);

  const saveProgress = async () => {
    try {
      const response = await axios.post('/api/ar/recycling', {
        itemsRecycled,
        pointsEarned: currentPoints
      });
      
      updateUser({ 
        ecoPoints: response.data.totalPoints,
        level: response.data.newLevel 
      });
      
      onPointsEarned(currentPoints);
      toast.success(`Progress saved! Total: ${response.data.totalPoints} points`);
    } catch (error) {
      toast.error('Failed to save progress');
    }
  };

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
        className="absolute inset-0 w-full h-full cursor-pointer"
      />

      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Bar */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center pointer-events-auto">
          <div className="bg-black/70 text-white px-4 py-2 rounded-lg backdrop-blur-sm">
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{itemsRecycled}</div>
                <div className="text-xs">Items Recycled</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">{currentPoints}</div>
                <div className="text-xs">Points Earned</div>
              </div>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold shadow-lg hover:bg-red-700"
          >
            Exit AR
          </button>
        </div>

        {/* Item Selection */}
        <div className="absolute top-20 left-4 right-4 pointer-events-auto">
          <div className="bg-black/70 text-white p-4 rounded-lg backdrop-blur-sm">
            <h3 className="font-bold mb-3">Select Item to Recycle</h3>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(recyclingItems).map(([key, item]) => (
                <button
                  key={key}
                  onClick={() => setSelectedItem(key)}
                  className={`p-2 rounded text-sm font-medium transition-colors ${
                    selectedItem === key 
                      ? 'bg-blue-600' 
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                >
                  {item.name} (+{item.points}pts)
                </button>
              ))}
            </div>
            <p className="text-xs mt-2 text-gray-300">
              Tap anywhere to drop the selected item into recycling bins
            </p>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-center pointer-events-auto">
          <button
            onClick={saveProgress}
            disabled={itemsRecycled === 0}
            className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-600 disabled:cursor-not-allowed px-6 py-3 rounded-lg font-medium text-white transition-colors"
          >
            Save Progress
          </button>
        </div>
      </div>
    </div>
  );
};

export default ARRecycling;