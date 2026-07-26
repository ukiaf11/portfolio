"use client";

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePortfolioStore } from '../store/usePortfolioStore';

gsap.registerPlugin(ScrollTrigger);

export function useScrollProgress() {
  const { setScrollProgress, setActiveSection } = usePortfolioStore();

  useEffect(() => {
    // 1. Setup global scroll progress
    const updateProgress = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = scrollPx / winHeightPx;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', updateProgress, { passive: true });

    // 2. Setup section triggers
    const sections = [
      { id: 'home' },
      { id: 'about' },
      { id: 'projects' },
      { id: 'experience' },
      { id: 'contact' },
    ];

    const triggers = sections.map((sec) => {
      const el = document.getElementById(sec.id);
      if (!el) return null;

      return ScrollTrigger.create({
        trigger: el,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          setActiveSection(sec.id);
        },
        onEnterBack: () => {
          setActiveSection(sec.id);
        }
      });
    });

    return () => {
      window.removeEventListener('scroll', updateProgress);
      triggers.forEach(t => t?.kill());
    };
  }, [setScrollProgress, setActiveSection]);
}
