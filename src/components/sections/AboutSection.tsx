"use client";

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import styles from './AboutSection.module.css';
import TechBadge from '../ui/TechBadge';

const techCategories = [
  {
    title: "Frontend",
    items: [
      { name: "React", icon: "⚛️", color: "#22d3ee" },
      { name: "Next.js", icon: "▲", color: "#ffffff" },
      { name: "Three.js", icon: "🧊", color: "#f97316" },
      { name: "HTML & CSS", icon: "🎨", color: "#38bdf8" },
    ]
  },
  {
    title: "Backend & Database",
    items: [
      { name: "Python", icon: "🐍", color: "#fbbf24" },
      { name: "Django & DRF", icon: "🟩", color: "#10b981" },
      { name: "PostgreSQL", icon: "🐘", color: "#60a5fa" },
      { name: "Redis", icon: "🔴", color: "#ef4444" },
    ]
  },
  {
    title: "Integrations & Tools",
    items: [
      { name: "Docker", icon: "🐳", color: "#0ea5e9" },
      { name: "Google Secret Manager", icon: "🔑", color: "#f59e0b" },
      { name: "Razorpay", icon: "💳", color: "#3b82f6" },
      { name: "Gemini / Claude API", icon: "🤖", color: "#a78bfa" },
    ]
  }
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="about" className={styles.about}>
      <div className={styles.container} ref={ref}>
        
        <motion.div 
          className={styles.bio}
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className={styles.header}>
            <span>01.</span> About Me
          </h2>
          <p>
            I am a results-driven <strong>Full Stack Developer</strong> currently engineering secure APIs, 
            complex multitenant architectures, and AI integrations at <strong>BOL7 Technologies</strong>. 
            I specialize in developing robust backends with Django and dynamic frontends with React.
          </p>
          <p>
            I have a strong foundation in designing multi-tier workflows, real-time communications, 
            and automating business processes. I am currently pursuing my <strong>Master of Computer Applications (MCA)</strong> 
            to continuously deepen my theoretical and practical computer science expertise.
          </p>
          <p>
            I'm passionate about building at the intersection of developer productivity and AI. I frequently design systems 
            using the Gemini and Claude APIs, and explore cutting-edge automation solutions.
          </p>
        </motion.div>

        <motion.div 
          className={styles.techGrid}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {techCategories.map((category, idx) => (
            <motion.div key={idx} className={styles.techCategory} variants={itemVariants}>
              <h3>{category.title}</h3>
              <div className={styles.badges}>
                {category.items.map((tech, tIdx) => (
                  <TechBadge key={tIdx} {...tech} />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
