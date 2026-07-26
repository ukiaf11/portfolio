"use client";

import { MouseEvent, useRef } from 'react';
import styles from './ProjectCard.module.css';
import Image from 'next/image';

interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
  imageSrc?: string;
  link: string;
}

export default function ProjectCard({ title, description, techStack, imageSrc, link }: ProjectCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <a 
      href={link} 
      className={styles.card} 
      target="_blank" 
      rel="noopener noreferrer"
      ref={cardRef}
      onMouseMove={handleMouseMove}
    >
      <div className={styles.spotlight} />
      <div className={styles.imageWrapper}>
        {imageSrc ? (
          <Image 
            src={imageSrc} 
            alt={title} 
            fill 
            style={{ objectFit: 'cover' }} 
          />
        ) : (
          <div className={styles.imageFallback} />
        )}
      </div>
      
      <div className={styles.content}>
        <div>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
          <div className={styles.techList}>
            {techStack.map((tech) => (
              <span key={tech} className={styles.techItem}>{tech}</span>
            ))}
          </div>
        </div>
        <div className={styles.icon}>
          &rarr;
        </div>
      </div>
    </a>
  );
}
