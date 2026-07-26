"use client";

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import styles from './ProjectsSection.module.css';
import ProjectCard from '../ui/ProjectCard';

const projects = [
  {
    title: "Microservice SaaS Platform & Credit Service Core",
    description: "Architected a scalable SaaS platform with a Credit Service module for transaction lifecycles, global pricing controls, Razorpay billing, and secure Google Secret Manager credentials.",
    techStack: ["Django", "React", "Razorpay", "Google Secret Manager", "PostgreSQL"],
    link: "#"
  },
  {
    title: "Vertical Farming Web Platform",
    description: "Developed a specialized agricultural telemetry and operational data tracking web app for vertical farming node operations. Live demo hosted on Render.",
    techStack: ["Django", "Python", "Render"],
    link: "https://vertical-farming.onrender.com/"
  },
  {
    title: "Embeddable Web-Chat & Voice Assistant Widgets",
    description: "Engineered highly customizable chat widgets with dynamic theme styling and quick-action links (WhatsApp, email, phone) for third-party site embedding.",
    techStack: ["React", "WebSockets", "API Integration"],
    link: "#"
  },
  {
    title: "Multi-Vendor Hotel & Food Ordering Platform",
    description: "Built a comprehensive multi-tenant platform enabling hotel owners to establish digital storefronts, manage inventories, and handle food ordering workflows.",
    techStack: ["Django", "PostgreSQL", "React"],
    link: "#"
  },
  {
    title: "Social Media Automation Engine",
    description: "Developed an automated video scraping and content extraction pipeline that posts natively to Instagram and YouTube using direct API integrations.",
    techStack: ["Python", "Instagram API", "YouTube API"],
    link: "#"
  }
];

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.container} ref={ref}>
        <motion.h2 
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <span>02.</span> Featured Projects
        </motion.h2>

        <div className={styles.grid}>
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 + idx * 0.2 }}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
