"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function PortfolioMotion() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const revealGroups = [
        ".section-grid > *",
        ".project-section-header > *",
        ".experience-row",
        ".project",
        ".skill-group",
        ".recognition-grid article",
        ".contact-grid > *",
      ];

      revealGroups.forEach((selector) => {
        gsap.utils.toArray<HTMLElement>(selector).forEach((element) => {
          gsap.fromTo(
            element,
            { opacity: 0, y: 42, filter: "blur(7px)" },
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
      });

      gsap.utils.toArray<HTMLElement>(".metric-grid > div").forEach((metric, index) => {
        gsap.fromTo(
          metric,
          { opacity: 0, y: 26, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.08,
            ease: "back.out(1.35)",
            scrollTrigger: {
              trigger: ".metric-grid",
              start: "top 85%",
              once: true,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".project").forEach((project) => {
        const line = project.querySelector<HTMLElement>(".project-title-row");
        if (!line) return;
        gsap.fromTo(
          line,
          { x: -18 },
          {
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: project,
              start: "top 82%",
              once: true,
            },
          },
        );
      });

      gsap.fromTo(
        ".focus-items span",
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".focus-band",
            start: "top 92%",
            once: true,
          },
        },
      );

      gsap.to(".projects-section", {
        backgroundPosition: "50% 100%",
        ease: "none",
        scrollTrigger: {
          trigger: ".projects-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".contact-section", {
        backgroundPosition: "100% 50%",
        ease: "none",
        scrollTrigger: {
          trigger: ".contact-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return null;
}
