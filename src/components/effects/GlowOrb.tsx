"use client";

import styles from './GlowOrb.module.css';

interface GlowOrbProps {
  color: string;
  size: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  delay?: number;
}

export default function GlowOrb({ color, size, top, left, right, bottom, delay = 0 }: GlowOrbProps) {
  return (
    <div 
      className={styles.orb}
      style={{
        backgroundColor: color,
        width: size,
        height: size,
        top, left, right, bottom,
        animationDelay: `${delay}s`
      }}
    />
  );
}
