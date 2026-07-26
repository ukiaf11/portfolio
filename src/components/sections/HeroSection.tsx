"use client";

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import styles from './HeroSection.module.css';
import GlowOrb from '../effects/GlowOrb';

export default function HeroSection() {
  const [text, setText] = useState('');
  const fullText = "> Hello, I'm Upendra";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, index + 1));
      index++;
      if (index === fullText.length) {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className={styles.hero}>
      {/* Ambient background fog */}
      <GlowOrb color="var(--orb-color-1)" size={600} top="-10%" left="-10%" />
      <GlowOrb color="var(--orb-color-2)" size={500} bottom="10%" right="-5%" delay={2} />

      <div className={styles.content}>
        <div className={styles.greeting}>
          <span>{text}</span>
          <span className={styles.cursor}></span>
        </div>
        
        <motion.h1 
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Building Interfaces &amp; Microservices.
        </motion.h1>
        
        <motion.p 
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          Full Stack Developer specializing in robust Django/Python backends and dynamic React frontends. 
          Experienced in building secure APIs, scalable microservices, and custom SaaS solutions.
        </motion.p>
        
        <motion.div 
          className={styles.actions}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <a href="#projects" className={styles.btnPrimary}>View Work</a>
          <a href="/UK_CV.pdf" target="_blank" rel="noopener noreferrer" className={styles.btnSecondary}>Download CV</a>
        </motion.div>
      </div>

      <motion.div 
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <div className={styles.mouse}>
          <div className={styles.wheel}></div>
        </div>
        <span>Scroll to explore</span>
      </motion.div>
    </section>
  );
}
