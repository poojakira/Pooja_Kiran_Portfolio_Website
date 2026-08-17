import { create } from 'zustand';

interface ScrollState {
  scrollProgress: number;
  mousePosition: { x: number; y: number };
  deviceTier: 'high' | 'medium' | 'low';
  setScrollProgress: (progress: number) => void;
  setMousePosition: (x: number, y: number) => void;
  setDeviceTier: (tier: 'high' | 'medium' | 'low') => void;
}

export const useScrollStore = create<ScrollState>((set) => ({
  scrollProgress: 0,
  mousePosition: { x: 0, y: 0 },
  deviceTier: 'high',
  setScrollProgress: (progress: number) => set({ scrollProgress: progress }),
  setMousePosition: (x: number, y: number) => set({ mousePosition: { x, y } }),
  setDeviceTier: (tier: 'high' | 'medium' | 'low') => set({ deviceTier: tier }),
}));
