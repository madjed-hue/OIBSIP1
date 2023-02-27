import React, { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const fileUrl = new URL("../assets/pizza.glb", import.meta.url);

const PizzaScene = () => {
  useEffect(() => {
    const canvas = document.querySelector(".pizzaCanvas");
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: canvas,
      alpha: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);

    // Sets the color of the background
    // renderer.setClearColor(0x4e6949);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      12,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    // Sets orbit control to move the camera around
    const orbit = new OrbitControls(camera, renderer.domElement);
    orbit.autoRotate = true;
    orbit.enableDamping = true;
    orbit.maxZoom = 2;
    orbit.maxDistance = 20;
    orbit.maxPolarAngle = Math.PI / 2;
    orbit.autoRotateSpeed = 1;

    // Camera positioning
    camera.position.set(1, 2, 1);
    orbit.update();

    const ambiantLight = new THREE.AmbientLight(0xcccccc, 0.8);
    scene.add(ambiantLight);

    const directionaLight = new THREE.DirectionalLight(0xffffff, 1);
    scene.add(directionaLight);
    directionaLight.position.set(11, 7, 12);

    const assetLoader = new GLTFLoader();

    assetLoader.load(fileUrl.href, function (gltf) {
      const model = gltf.scene;
      scene.add(model);
    });

    let req;
    const animate = () => {
      orbit.update();
      renderer.render(scene, camera);
    };

    renderer.setAnimationLoop(animate);

    window.addEventListener("resize", function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }, []);
  return <canvas className="pizzaCanvas"></canvas>;
};

export default PizzaScene;
