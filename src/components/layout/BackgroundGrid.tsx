"use client";

import styles from './BackgroundGrid.module.css';

export default function BackgroundGrid() {
  return (
    <div className={styles.container}>
      {/* Premium HUD CSS Grid */}
      <div className={styles.gridPattern} />

      {/* Floating GPU-accelerated ambient glowing orbs */}
      <div className={`${styles.orb} ${styles.orbCyan}`} />
      <div className={`${styles.orb} ${styles.orbViolet}`} />
    </div>
  );
}
