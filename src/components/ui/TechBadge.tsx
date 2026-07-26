"use client";

import { MouseEvent, useRef } from 'react';
import styles from './TechBadge.module.css';

interface TechBadgeProps {
  name: string;
  icon: string; // Emoji or SVG string for now
  color: string;
}

export default function TechBadge({ name, icon, color }: TechBadgeProps) {
  const badgeRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!badgeRef.current) return;
    const rect = badgeRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    badgeRef.current.style.setProperty('--mouse-x', `${x}px`);
    badgeRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div 
      className={styles.badge}
      style={{ '--accent-color': color } as React.CSSProperties}
      ref={badgeRef}
      onMouseMove={handleMouseMove}
    >
      <div className={styles.spotlight} />
      <div className={styles.icon}>{icon}</div>
      <span className={styles.name}>{name}</span>
    </div>
  );
}
