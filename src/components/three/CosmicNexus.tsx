"use client";

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Environment, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { usePortfolioStore } from '../../store/usePortfolioStore';

import PostProcessing from './PostProcessing';

export default function CosmicNexus() {
  const { camera, pointer } = useThree();

  useFrame(() => {
    const progress = usePortfolioStore.getState().scrollProgress;
    
    // Curved camera path based on progress (0 to 1)
    // We use sine/cosine functions to sweep the camera in an arc instead of a straight line.
    const targetY = -60 * progress;
    // Sweep left and right
    const targetX = Math.sin(progress * Math.PI * 1.5) * 8; 
    // Push in and out
    const targetZ = 15 + Math.cos(progress * Math.PI * 2) * 5;
    
    // Base camera position calculation
    const basePosition = new THREE.Vector3(targetX, targetY, targetZ);
    
    // Parallax effect based on mouse (pointer)
    // pointer.x/y go from -1 to 1
    const parallaxX = pointer.x * 2;
    const parallaxY = pointer.y * 2;
    
    // Final camera position combines the path and the parallax
    const finalPosition = new THREE.Vector3(
      basePosition.x + parallaxX,
      basePosition.y + parallaxY,
      basePosition.z
    );
    
    camera.position.lerp(finalPosition, 0.05);
    
    // Always look at the center of the current vertical depth
    const lookAtTarget = new THREE.Vector3(0, targetY, 0);
    // Add a slight tilt based on mouse
    lookAtTarget.x += pointer.x * 2;
    lookAtTarget.y += pointer.y * 2;
    
    camera.lookAt(lookAtTarget);
  });
  
  return (
    <>
      <group>
        {/* Only animated background stars are rendered per user request */}
      </group>

      <Environment preset="night" />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
      
      <PostProcessing />
    </>
  );
}
