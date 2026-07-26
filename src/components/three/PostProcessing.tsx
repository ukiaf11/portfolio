"use client";

import { EffectComposer, Bloom, Vignette, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';
import { usePortfolioStore } from '../../store/usePortfolioStore';

export default function PostProcessing() {
  const qualityLevel = usePortfolioStore(state => state.qualityLevel);

  if (qualityLevel === 'low') return null;

  return (
    <EffectComposer enableNormalPass={false} multisampling={qualityLevel === 'high' ? 4 : 0}>
      <Bloom 
        luminanceThreshold={1} 
        mipmapBlur 
        intensity={1.5} 
      />
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={new THREE.Vector2(0.002, 0.002)}
      />
      <Vignette 
        eskil={false} 
        offset={0.1} 
        darkness={1.1} 
        blendFunction={BlendFunction.NORMAL} 
      />
    </EffectComposer>
  );
}
