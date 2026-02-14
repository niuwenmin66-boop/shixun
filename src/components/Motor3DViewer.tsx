import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

export default function Motor3DViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  
  // 使用 ref 跟踪交互状态，避免 useEffect 重新运行
  const isDraggingRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    // 初始化场景
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    sceneRef.current = scene;

    // 初始化相机
    const camera = new THREE.PerspectiveCamera(50, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
    camera.position.set(2, 0.5, 2);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // 初始化渲染器
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 添加灯光
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight2.position.set(-1, -1, -1);
    scene.add(directionalLight2);

    // 加载FBX模型
    const loader = new FBXLoader();
    loader.load(
      '/交流感应电动机_绕线式-转子.fbx',
      (object) => {
        // 创建一个组作为旋转中心
        const modelGroup = new THREE.Group();
        scene.add(modelGroup);
        modelRef.current = modelGroup;

        // 缩放模型
        object.scale.set(0.04, 0.04, 0.04);
        object.position.set(0, 0, 0);
        object.rotation.y = Math.PI / 2; // 调整初始旋转角度
        
        // 将模型添加到组中
        modelGroup.add(object);

        // 添加鼠标交互 - 旋转
        const handleMouseDown = (e: MouseEvent) => {
          isDraggingRef.current = true;
          lastMousePosRef.current = { x: e.clientX, y: e.clientY };
        };

        const handleMouseMove = (e: MouseEvent) => {
          if (!isDraggingRef.current || !modelRef.current) return;

          const deltaX = e.clientX - lastMousePosRef.current.x;
          const deltaY = e.clientY - lastMousePosRef.current.y;

          // 旋转模型组（围绕中心旋转）
          const modelGroup = modelRef.current;
          modelGroup.rotation.y += deltaX * 0.01;
          modelGroup.rotation.x += deltaY * 0.01;

          // 限制X轴旋转范围，防止模型翻转
          modelGroup.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, modelGroup.rotation.x));

          lastMousePosRef.current = { x: e.clientX, y: e.clientY };
        };

        const handleMouseUp = () => {
          isDraggingRef.current = false;
        };

        // 添加鼠标滚轮交互 - 缩放
        const handleWheel = (e: WheelEvent) => {
          e.preventDefault();
          if (!camera) return;

          // 根据滚轮方向缩放相机距离
          const zoomSpeed = 0.1;
          const direction = new THREE.Vector3();
          camera.getWorldDirection(direction);
          
          if (e.deltaY > 0) {
            // 放大 - 向模型移动
            camera.position.addScaledVector(direction, zoomSpeed);
          } else {
            // 缩小 - 远离模型
            camera.position.addScaledVector(direction, -zoomSpeed);
          }
          
          // 限制相机距离
          const distance = camera.position.length();
          if (distance < 1) {
            camera.position.setLength(1);
          } else if (distance > 5) {
            camera.position.setLength(5);
          }
        };

        // 添加事件监听器
        containerRef.current.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        containerRef.current.addEventListener('wheel', handleWheel, { passive: false });

        // 添加动画循环
        const animate = () => {
          animationIdRef.current = requestAnimationFrame(animate);
          
          // 只有在未拖动时才自动旋转
          if (modelRef.current && !isDraggingRef.current) {
            modelRef.current.rotation.y += 0.005;
          }
          
          renderer.render(scene, camera);
        };
        
        animate();

        // 清理事件监听器
        return () => {
          containerRef.current?.removeEventListener('mousedown', handleMouseDown);
          window.removeEventListener('mousemove', handleMouseMove);
          window.removeEventListener('mouseup', handleMouseUp);
          containerRef.current?.removeEventListener('wheel', handleWheel);
        };
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      (error) => {
        console.error('Error loading FBX model:', error);
      }
    );

    // 处理窗口大小变化
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      
      const camera = cameraRef.current;
      const renderer = rendererRef.current;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // 清理函数
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      
      if (rendererRef.current) {
        const renderer = rendererRef.current;
        renderer.dispose();
        if (containerRef.current && renderer.domElement) {
          containerRef.current.removeChild(renderer.domElement);
        }
      }
      
      // 清理场景中的对象
      if (sceneRef.current) {
        const scene = sceneRef.current;
        scene.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            object.geometry.dispose();
            if (object.material instanceof THREE.Material) {
              object.material.dispose();
            } else if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            }
          }
        });
      }
    };
  }, []); // 空依赖数组，确保 useEffect 只运行一次

  return (
    <div className="w-full">
      <div 
        ref={containerRef} 
        className="w-full h-96 rounded-lg overflow-hidden border border-gray-200 cursor-grab active:cursor-grabbing"
      />
    </div>
  );
}
