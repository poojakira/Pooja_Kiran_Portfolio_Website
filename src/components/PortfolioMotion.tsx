"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function PortfolioMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".aura-portfolio");
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)");

    const onPointerMove = (event: PointerEvent) => {
      if (reduced.matches || coarse.matches) return;
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      root.style.setProperty("--pointer-x", x.toFixed(4));
      root.style.setProperty("--pointer-y", y.toFixed(4));
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });

    if (reduced.matches) {
      return () => window.removeEventListener("pointermove", onPointerMove);
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".section-grid > *, .project-section-header > *").forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 46, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.95,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              once: true,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".project").forEach((element, index) => {
        gsap.fromTo(
          element,
          {
            opacity: 0,
            y: 70,
            scale: 0.94,
            rotateX: 8,
            transformPerspective: 1200,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 1,
            delay: index * 0.04,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 90%",
              once: true,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".experience-row, .skill-group, .recognition-grid article").forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 30, x: -14 },
          {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 0.78,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 91%",
              once: true,
            },
          },
        );
      });

      gsap.fromTo(
        ".metric-grid > div",
        { opacity: 0, y: 38, scale: 0.92 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.09,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".metric-grid",
            start: "top 90%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        ".focus-items span",
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.58,
          stagger: 0.065,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".focus-band",
            start: "top 95%",
            once: true,
          },
        },
      );

      gsap.utils.toArray<HTMLElement>(".section").forEach((section) => {
        gsap.to(section, {
          "--section-drift": "1",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      });

      gsap.fromTo(
        ".contact-grid > *",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-section",
            start: "top 82%",
            once: true,
          },
        },
      );
    }, root);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return null;
}
