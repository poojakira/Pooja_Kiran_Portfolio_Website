'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let registered = false;

export function useGSAP() {
  if (typeof window !== 'undefined' && !registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }

  return { gsap, ScrollTrigger };
}
