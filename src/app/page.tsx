"use client";

import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ContactSection from "@/components/sections/ContactSection";
import SceneCanvas from "@/components/three/SceneCanvas";
import { useScrollProgress } from "@/hooks/useScrollProgress";

export default function Home() {
  useScrollProgress();
  
  return (
    <main>
      <Navbar />
      
      {/* HTML/CSS Overlay layer */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </div>

      <SceneCanvas />
    </main>
  );
}
