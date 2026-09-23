"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function PortfolioMotion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const selectors = [
        ".section-grid > *",
        ".project-section-header > *",
        ".experience-row",
        ".project",
        ".skill-group",
        ".recognition-grid article",
        ".contact-grid > *",
      ];

      selectors.forEach((selector) => {
        gsap.utils.toArray<HTMLElement>(selector).forEach((element) => {
          gsap.fromTo(
            element,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.72,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "top 92%",
                once: true,
              },
            },
          );
        });
      });

      gsap.fromTo(
        ".focus-items span",
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.055,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".focus-band",
            start: "top 95%",
            once: true,
          },
        },
      );
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return null;
}
