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
      if (window.innerWidth >= 900) {
        const heroTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: ".cinematic-hero",
            start: "top top",
            end: "+=85%",
            scrub: 1.15,
            pin: true,
            anticipatePin: 1,
          },
        });

        heroTimeline
          .to(
            ".hero-character-shell",
            {
              scale: 1.13,
              yPercent: -3,
              z: 120,
              rotateX: -1.5,
              ease: "none",
            },
            0,
          )
          .to(
            ".hero-identity",
            {
              xPercent: -8,
              yPercent: -5,
              opacity: 0.28,
              filter: "blur(3px)",
              ease: "none",
            },
            0.12,
          )
          .to(
            ".hero-thesis",
            {
              xPercent: 8,
              yPercent: -7,
              opacity: 0.24,
              filter: "blur(3px)",
              ease: "none",
            },
            0.12,
          )
          .to(
            ".hero-boundary-word",
            {
              scale: 1.32,
              opacity: 0.12,
              letterSpacing: "0.18em",
              ease: "none",
            },
            0,
          )
          .to(
            ".hero-grid",
            {
              scale: 1.16,
              opacity: 0.16,
              ease: "none",
            },
            0,
          )
          .to(
            ".hero-orbit",
            {
              scale: 1.08,
              opacity: 0.35,
              ease: "none",
            },
            0,
          )
          .to(
            ".hero-scroll-cue",
            {
              y: 34,
              opacity: 0,
              ease: "none",
            },
            0,
          )
          .to(
            ".hero-status",
            {
              y: 20,
              opacity: 0,
              ease: "none",
            },
            0.15,
          );
      }

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
            {
              opacity: 0,
              y: 54,
              rotateX: 4,
              z: -45,
              filter: "blur(8px)",
              transformPerspective: 1200,
              transformOrigin: "center top",
            },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              z: 0,
              filter: "blur(0px)",
              duration: 1.05,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "top 89%",
                once: true,
              },
            },
          );
        });
      });

      gsap.utils.toArray<HTMLElement>(".metric-grid > div").forEach((metric, index) => {
        gsap.fromTo(
          metric,
          { opacity: 0, y: 28, scale: 0.94, rotateX: 6 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 0.85,
            delay: index * 0.08,
            ease: "back.out(1.25)",
            scrollTrigger: {
              trigger: ".metric-grid",
              start: "top 85%",
              once: true,
            },
          },
        );
      });

      gsap.fromTo(
        ".focus-items span",
        { opacity: 0, y: 20, filter: "blur(5px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.75,
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
          scrub: 1.3,
        },
      });

      gsap.to(".contact-section", {
        backgroundPosition: "100% 50%",
        ease: "none",
        scrollTrigger: {
          trigger: ".contact-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.3,
        },
      });

      if (window.matchMedia("(pointer: fine)").matches) {
        gsap.utils.toArray<HTMLElement>(".project").forEach((project) => {
          const move = (event: PointerEvent) => {
            const rect = project.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;

            gsap.to(project, {
              rotateY: x * 1.8,
              rotateX: y * -1.4,
              z: 12,
              duration: 0.45,
              ease: "power2.out",
              transformPerspective: 1400,
              transformOrigin: "center center",
            });
          };

          const reset = () => {
            gsap.to(project, {
              rotateY: 0,
              rotateX: 0,
              z: 0,
              duration: 0.8,
              ease: "elastic.out(1, .55)",
            });
          };

          project.addEventListener("pointermove", move);
          project.addEventListener("pointerleave", reset);
        });
      }
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return null;
}
