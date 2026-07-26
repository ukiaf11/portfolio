"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import styles from './ExperienceSection.module.css';

const experiences = [
  {
    role: "Full Stack Developer",
    company: "BOL7 Technologies Private Limited",
    date: "Sep 2025 — Present",
    details: [
      "Manage and integrate secure backend modules, APIs, and authentication systems using Django REST Framework and Postman.",
      "Collaborate on backend logic and database management, utilizing containerization and version control tools like Docker and Git."
    ]
  },
  {
    role: "Master of Computer Applications (MCA)",
    company: "Indira Gandhi National Open University (IGNOU)",
    date: "2026 — Pursuing",
    details: [
      "Pursuing advanced academic qualifications in computer applications and software engineering.",
      "Focusing on system design, database management systems, and modern web application development paradigms."
    ]
  }
];

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className={styles.experience}>
      <div className={styles.container} ref={sectionRef}>
        <motion.h2 
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <span>03.</span> Work Experience
        </motion.h2>

        <div className={styles.timeline}>
          <div className={styles.timelineLine} />
          <motion.div 
            className={styles.timelineProgress} 
            style={{ scaleY }} 
          />
          
          {experiences.map((exp, idx) => (
            <motion.div 
              key={idx} 
              className={styles.item}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.3 + idx * 0.2 }}
            >
              <div className={styles.itemDot} />
              <div className={styles.card}>
                <h3 className={styles.role}>{exp.role}</h3>
                <div className={styles.company}>{exp.company}</div>
                <span className={styles.date}>{exp.date}</span>
                <ul className={styles.details}>
                  {exp.details.map((detail, dIdx) => (
                    <li key={dIdx}>{detail}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
