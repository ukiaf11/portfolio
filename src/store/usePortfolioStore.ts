import { create } from 'zustand';

interface PortfolioState {
  scrollProgress: number;
  activeSection: string;
  qualityLevel: 'high' | 'medium' | 'low';
  
  setScrollProgress: (progress: number) => void;
  setActiveSection: (section: string) => void;
  setQualityLevel: (level: 'high' | 'medium' | 'low') => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  scrollProgress: 0,
  activeSection: 'home',
  qualityLevel: 'high',
  
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  setActiveSection: (section) => set({ activeSection: section }),
  setQualityLevel: (level) => set({ qualityLevel: level }),
}));
