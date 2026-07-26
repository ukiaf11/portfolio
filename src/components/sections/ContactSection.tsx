"use client";

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import styles from './ContactSection.module.css';

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className={styles.contact}>
      <motion.div 
        className={styles.container}
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8 }}
      >
        <div className={styles.header}>04. What's Next?</div>
        <h2 className={styles.title}>Get In Touch</h2>
        <p className={styles.subtitle}>
          Whether you have a question, a project proposal, or just want to say hi, 
          I'll try my best to get back to you!
        </p>
        
        <div className={styles.card}>
          <a href="mailto:ukiaf11@gmail.com" className={styles.link}>
            <span>📧</span> ukiaf11@gmail.com
          </a>
          <a href="tel:+916209927804" className={styles.link}>
            <span>📞</span> +91 62099 27804
          </a>
          <a href="https://github.com/ukiaf11" target="_blank" rel="noopener noreferrer" className={styles.link}>
            <span>💻</span> GitHub
          </a>
        </div>
      </motion.div>
    </section>
  );
}
