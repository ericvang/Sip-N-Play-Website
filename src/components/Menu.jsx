import React, { useEffect, useState } from 'react';

const ThreeDContainer = () => {
  const [modelIndex, setModelIndex] = useState(0);
  const modelNames = ['coffee_shop_cup', 'boba_tea_cup', 'cafe_latte_with_art', 'bubble_tea_and_cookies', 'desserts'];
  const itemDescriptions = ['Hot Jamaican Roast Coffee', "Brown Sugar Boba", "Hot Vanilla Latte", "Matcha Boba with Cookies", "Strawberry Dessert Set"]

  useEffect(() => {
    let scene, camera, renderer, controls, object;

    const initThreeJS = async () => {
      try {
        const THREE = await import('https://cdn.skypack.dev/three@0.129.0/build/three.module.js');
        const { OrbitControls } = await import('https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js');
        const { GLTFLoader } = await import('https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js');

        // Create scene object
        scene = new THREE.Scene();

        // Create camera
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 70;
        camera.position.y = 20;

        // Create renderer
        renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);

        // Add renderer to DOM
        const container = document.getElementById('Container3D');
        if (container) {
          container.innerHTML = ''; // Clear any existing content
          container.appendChild(renderer.domElement);
        } else {
          console.error('Container3D not found in the DOM');
        }

        // Add lighting
        const topLight = new THREE.DirectionalLight(0xFBF4B5, 2); // (color, intensity)
        topLight.position.set(500, 500, 500); // Top-left-ish
        scene.add(topLight);

        const ambientLight = new THREE.AmbientLight(0x333333, 5);
        scene.add(ambientLight);

        // Initialize controls
        controls = new OrbitControls(camera, renderer.domElement);

        // Load the initial model
        loadModel(THREE, GLTFLoader);

        // Add a listener to the window, so we can resize the window and the camera
        window.addEventListener('resize', () => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // Start the 3D rendering
        animate();
      } catch (error) {
        console.error('Error initializing Three.js:', error);
      }
    };

    const loadModel = (THREE, GLTFLoader) => {
      try {
        const loader = new GLTFLoader();
        const objToRender = modelNames[modelIndex];

        if (object) {
          scene.remove(object);
        }

        loader.load(
          `/src/assets/models/${objToRender}/scene.gltf`,
          function (gltf) {
            object = gltf.scene;

            // Make specific adjustments depending on the model
            if (objToRender === 'boba_tea_cup') {
              object.scale.set(5, 5, 5);
              object.position.x = -15;
            } else if (objToRender === 'bubble_tea_and_cookies') {
              object.scale.set(10, 10, 10);
            } else {
              object.scale.set(23, 23, 23);
            }

            scene.add(object);
          },
          function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
          },
          function (error) {
            console.error('Error loading model:', error);
          }
        );
      } catch (error) {
        console.error('Error loading GLTFLoader:', error);
      }
    };

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    initThreeJS();

    return () => {
      // Cleanup Three.js components
      if (renderer) {
        renderer.dispose();
      }
      if (controls) {
        controls.dispose();
      }
    };
  }, [modelIndex]);

  const handleNext = () => {
    setModelIndex((prevIndex) => (prevIndex + 1) % modelNames.length);
  };

  const handlePrev = () => {
    setModelIndex((prevIndex) => (prevIndex - 1 + modelNames.length) % modelNames.length);
  };

  return (
    <div id="menu">
      <div className="menu-header">
        <h1>{itemDescriptions[modelIndex]}</h1>
      </div>
      <div className="menu-controls">
        <button onClick={handlePrev}>&lt;</button>
        <button onClick={handleNext}>&gt;</button>
      </div>
      <div id="Container3D"><canvas></canvas></div>
    </div>
  );
};

export default ThreeDContainer;
