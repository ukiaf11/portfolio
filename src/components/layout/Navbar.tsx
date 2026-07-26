"use client";

import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import ThemeToggle from '../ui/ThemeToggle';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Home', 'About', 'Projects', 'Experience', 'Contact'];

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.logo}>
        <span className={styles.accent}>&gt;</span> upendra.dev
      </div>
      <div className={styles.navRight}>
        <ul className={styles.navLinks}>
          {navItems.map((item) => (
            <li key={item}>
              <a href={`#${item.toLowerCase()}`} className={styles.navLink}>
                {item}
              </a>
            </li>
          ))}
        </ul>
        <ThemeToggle />
      </div>
    </nav>
  );
}
