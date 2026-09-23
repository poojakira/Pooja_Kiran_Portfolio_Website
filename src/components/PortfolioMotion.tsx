"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function PortfolioMotion() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".premium-hero-copy > *, .premium-hero-statement > *, .premium-scroll-hint",
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.07, ease: "power3.out" },
      );

      gsap.fromTo(
        ".premium-portrait-wrap",
        { opacity: 0, y: 26, scale: 0.975 },
        { opacity: 1, y: 0, scale: 1, duration: 1.05, ease: "power3.out" },
      );

      if (window.innerWidth >= 900) {
        gsap.to(".premium-portrait-wrap", {
          y: -26,
          scale: 1.025,
          ease: "none",
          scrollTrigger: {
            trigger: ".premium-hero",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });

        gsap.to(".premium-hero-light", {
          y: 34,
          opacity: 0.6,
          ease: "none",
          scrollTrigger: {
            trigger: ".premium-hero",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

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
            { opacity: 0, y: 28 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "top 90%",
                once: true,
              },
            },
          );
        });
      });

      gsap.fromTo(
        ".focus-items span",
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".focus-band",
            start: "top 94%",
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
