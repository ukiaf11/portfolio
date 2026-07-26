"use client";

import { Canvas } from '@react-three/fiber';
import { Suspense, useState, useEffect } from 'react';
import CosmicNexus from './CosmicNexus';
import { Preload } from '@react-three/drei';

export default function SceneCanvas() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="canvas-container" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 0,
      pointerEvents: 'none' // Let clicks pass through, we'll selectively enable it on 3D objects
    }}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        dpr={[1, 2]} // Support retina displays
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <CosmicNexus />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
