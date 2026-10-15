import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';
import leafImage from '@/assets/leaf-study.jpg';

function LeafPlane() {
  const map = useTexture(leafImage);
  const mesh = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  map.colorSpace = THREE.SRGBColorSpace;
  useFrame(({ pointer }, rawDelta) => {
    if (!mesh.current) return;
    const amount = 1 - Math.exp(-2 * Math.min(rawDelta, .05));
    mesh.current.rotation.y += (pointer.x * .12 - mesh.current.rotation.y) * amount;
    mesh.current.rotation.x += (-pointer.y * .09 - mesh.current.rotation.x) * amount;
    mesh.current.position.x += (pointer.x * .12 - mesh.current.position.x) * amount;
  });
  return <mesh ref={mesh} scale={[viewport.width * 1.12, viewport.height * 1.12, 1]}>
    <planeGeometry args={[1, 1, 24, 24]} />
    <meshBasicMaterial map={map} side={THREE.DoubleSide} />
  </mesh>;
}

export default function BotanicalDepth() {
  return <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5], fov: 45 }} gl={{ alpha: true, antialias: true }}>
    <Suspense fallback={null}><LeafPlane /></Suspense>
  </Canvas>;
}
