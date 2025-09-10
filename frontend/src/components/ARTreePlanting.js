import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const ARTreePlanting = ({ onClose, onPointsEarned }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [treesPlanted, setTreesPlanted] = useState(0);
  const [currentPoints, setCurrentPoints] = useState(0);
  const [plantingMode, setPlantingMode] = useState(false);
  const [trees, setTrees] = useState([]);
  const { user, updateUser } = useAuth();

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

    camera.position.z = 5;

    // Create tree models
    const createTree = (x, y, z, scale = 1) => {
      const treeGroup = new THREE.Group();
      
      // Tree trunk
      const trunkGeometry = new THREE.CylinderGeometry(0.1 * scale, 0.15 * scale, 1 * scale, 8);
      const trunkMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
      const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
      trunk.position.y = 0.5 * scale;
      treeGroup.add(trunk);

      // Tree leaves
      const leavesGeometry = new THREE.SphereGeometry(0.8 * scale, 8, 6);
      const leavesMaterial = new THREE.MeshLambertMaterial({ color: 0x228B22 });
      const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
      leaves.position.y = 1.2 * scale;
      treeGroup.add(leaves);

      treeGroup.position.set(x, y, z);
      return treeGroup;
    };

    // Render existing trees
    trees.forEach((tree, index) => {
      const treeModel = createTree(tree.x, tree.y, tree.z, tree.scale);
      scene.add(treeModel);
    });

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Handle canvas clicks for tree planting
    const handleCanvasClick = (event) => {
      if (!plantingMode) return;

      const rect = canvasRef.current.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      // Convert screen coordinates to world coordinates
      const worldX = x * 3;
      const worldY = y * 2;
      const worldZ = 0;

      // Create new tree
      const newTree = { x: worldX, y: worldY, z: worldZ, scale: 1 };
      const treeModel = createTree(worldX, worldY, worldZ);
      scene.add(treeModel);

      // Add to trees array
      setTrees(prev => [...prev, newTree]);
      setTreesPlanted(prev => prev + 1);
      
      // Award points
      const pointsEarned = 50;
      setCurrentPoints(prev => prev + pointsEarned);
      
      toast.success(`Tree planted! +${pointsEarned} eco-points!`);
      
      // Animate tree growth
      treeModel.scale.set(0.1, 0.1, 0.1);
      const growTree = () => {
        if (treeModel.scale.x < 1) {
          treeModel.scale.x += 0.05;
          treeModel.scale.y += 0.05;
          treeModel.scale.z += 0.05;
          requestAnimationFrame(growTree);
        }
      };
      growTree();
    };

    canvasRef.current.addEventListener('click', handleCanvasClick);

    return () => {
      renderer.dispose();
      if (canvasRef.current) {
        canvasRef.current.removeEventListener('click', handleCanvasClick);
      }
    };
  }, [trees, plantingMode]);

  const saveProgress = async () => {
    try {
      const response = await axios.post('/api/ar/tree-planting', {
        treesPlanted,
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

  const resetSession = () => {
    setTrees([]);
    setTreesPlanted(0);
    setCurrentPoints(0);
    setPlantingMode(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* Camera Feed */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* AR Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ cursor: plantingMode ? 'crosshair' : 'default' }}
      />

      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Bar */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center pointer-events-auto">
          <div className="bg-black/70 text-white px-4 py-2 rounded-lg backdrop-blur-sm">
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{treesPlanted}</div>
                <div className="text-xs">Trees Planted</div>
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

        {/* Instructions */}
        <div className="absolute top-20 left-4 right-4 pointer-events-auto">
          <div className="bg-black/70 text-white p-4 rounded-lg backdrop-blur-sm max-w-md">
            <h3 className="font-bold mb-2">AR Tree Planting</h3>
            <p className="text-sm mb-3">
              {plantingMode 
                ? "Tap anywhere on the screen to plant a tree and earn 50 eco-points!"
                : "Enable planting mode to start growing your virtual forest!"
              }
            </p>
            <div className="flex space-x-2">
              <button
                onClick={() => setPlantingMode(!plantingMode)}
                className={`px-3 py-1 rounded text-sm font-medium ${
                  plantingMode 
                    ? 'bg-red-600 hover:bg-red-700' 
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {plantingMode ? 'Stop Planting' : 'Start Planting'}
              </button>
              <button
                onClick={resetSession}
                className="px-3 py-1 bg-gray-600 hover:bg-gray-700 rounded text-sm font-medium"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-center pointer-events-auto">
          <div className="bg-black/70 text-white px-6 py-3 rounded-lg backdrop-blur-sm">
            <div className="flex items-center space-x-4">
              <button
                onClick={saveProgress}
                disabled={treesPlanted === 0}
                className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-600 disabled:cursor-not-allowed px-4 py-2 rounded font-medium transition-colors"
              >
                Save Progress
              </button>
              <div className="text-sm text-gray-300">
                Each tree = 50 eco-points
              </div>
            </div>
          </div>
        </div>

        {/* Planting Mode Indicator */}
        {plantingMode && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="w-8 h-8 border-2 border-green-400 rounded-full animate-ping"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-green-400 rounded-full"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ARTreePlanting;