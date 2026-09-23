"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { PORTRAIT_URL, RESUME_URL, SITE_PATH, profile } from "@/data/portfolio";

const VIDEO_URL = `${SITE_PATH}/media/pooja-interactive-hero.mp4`;

export default function InteractivePortfolioHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetProgress = useRef(0.5);
  const smoothProgress = useRef(0.5);
  const targetY = useRef(0.5);
  const smoothY = useRef(0.5);
  const frameRef = useRef<number | null>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-intro-line",
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 1.05 },
      )
        .fromTo(
          ".hero-character-shell",
          { opacity: 0, scale: 0.94, y: 24, filter: "blur(14px)" },
          { opacity: 1, scale: 1, y: 0, filter: "blur(0px)", duration: 1.2 },
          "-=.72",
        )
        .fromTo(
          ".hero-anim",
          { opacity: 0, y: 28, filter: "blur(8px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.86, stagger: 0.09 },
          "-=.82",
        )
        .fromTo(
          ".hero-orbit",
          { opacity: 0, scale: 0.8, rotate: -18 },
          { opacity: 1, scale: 1, rotate: 0, duration: 1.2, stagger: 0.12 },
          "-=1.0",
        )
        .fromTo(
          ".hero-signal-node",
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1, duration: 0.5, stagger: 0.08 },
          "-=.65",
        );

      gsap.to(".orbit-a", { rotate: 360, duration: 42, ease: "none", repeat: -1 });
      gsap.to(".orbit-b", { rotate: -360, duration: 58, ease: "none", repeat: -1 });
      gsap.to(".hero-scan-beam", {
        yPercent: 125,
        duration: 6.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
      gsap.to(".hero-status .status-dot", {
        boxShadow: "0 0 0 10px rgba(123,255,191,0)",
        duration: 1.7,
        ease: "power1.out",
        repeat: -1,
      });
    }, section);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(pointer: coarse)");

    const onPointerMove = (event: PointerEvent) => {
      if (reducedMotion.matches || coarsePointer.matches) return;

      const x = Math.min(1, Math.max(0, event.clientX / window.innerWidth));
      const y = Math.min(1, Math.max(0, event.clientY / window.innerHeight));
      targetProgress.current = x;
      targetY.current = y;
    };

    const magnetic = Array.from(section.querySelectorAll<HTMLElement>(".hero-magnetic"));
    const magneticCleanups = magnetic.map((element) => {
      const move = (event: PointerEvent) => {
        if (coarsePointer.matches || reducedMotion.matches) return;
        const rect = element.getBoundingClientRect();
        const dx = event.clientX - (rect.left + rect.width / 2);
        const dy = event.clientY - (rect.top + rect.height / 2);
        gsap.to(element, { x: dx * 0.14, y: dy * 0.16, duration: 0.32, ease: "power2.out" });
      };
      const reset = () => gsap.to(element, { x: 0, y: 0, duration: 0.55, ease: "elastic.out(1, .45)" });
      element.addEventListener("pointermove", move);
      element.addEventListener("pointerleave", reset);
      return () => {
        element.removeEventListener("pointermove", move);
        element.removeEventListener("pointerleave", reset);
      };
    });

    const animate = () => {
      smoothProgress.current += (targetProgress.current - smoothProgress.current) * 0.055;
      smoothY.current += (targetY.current - smoothY.current) * 0.055;

      const nx = (smoothProgress.current - 0.5) * 2;
      const ny = (smoothY.current - 0.5) * 2;
      section.style.setProperty("--hero-x", nx.toFixed(4));
      section.style.setProperty("--hero-y", ny.toFixed(4));

      const video = videoRef.current;
      if (
        video &&
        videoReady &&
        !videoFailed &&
        Number.isFinite(video.duration) &&
        video.duration > 0 &&
        !reducedMotion.matches
      ) {
        const min = 0.08;
        const max = 0.92;
        const mapped = min + smoothProgress.current * (max - min);
        const targetTime = mapped * video.duration;
        if (Math.abs(video.currentTime - targetTime) > 0.008) video.currentTime = targetTime;
      }

      frameRef.current = window.requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    frameRef.current = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      magneticCleanups.forEach((cleanup) => cleanup());
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    };
  }, [videoReady, videoFailed]);

  const handleMetadata = () => {
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return;
    video.pause();
    video.currentTime = video.duration * 0.5;
  };

  return (
    <section ref={sectionRef} className="cinematic-hero" aria-labelledby="hero-title">
      <div className="hero-atmosphere" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-noise" aria-hidden="true" />
      <div className="hero-scan-beam" aria-hidden="true" />
      <div className="hero-intro-line" aria-hidden="true" />
      <div className="hero-boundary-word" aria-hidden="true">BOUNDARY</div>

      <div className="hero-character-shell">
        <div className="hero-orbit orbit-a" aria-hidden="true">
          <span className="hero-signal-node node-a" />
          <span className="hero-signal-node node-b" />
        </div>
        <div className="hero-orbit orbit-b" aria-hidden="true">
          <span className="hero-signal-node node-c" />
        </div>

        <div className="character-meta meta-left hero-anim" aria-hidden="true">
          <span>01</span>
          <strong>EXECUTE</strong>
          <small>MCP / TOOL POLICY</small>
        </div>
        <div className="character-meta meta-right hero-anim" aria-hidden="true">
          <span>02</span>
          <strong>IDENTITY</strong>
          <small>AWS IAM / AUTHZ</small>
        </div>
        <div className="character-meta meta-bottom hero-anim" aria-hidden="true">
          <span>03</span>
          <strong>PROVENANCE</strong>
          <small>MODEL SUPPLY CHAIN</small>
        </div>

        <div className="cinematic-character" aria-label="Portrait of Pooja Kiran">
          {!videoReady && (
            <img
              className="character-fallback"
              src={PORTRAIT_URL}
              alt="Pooja Kiran, Security Engineer"
            />
          )}

          {!videoFailed && (
            <video
              ref={videoRef}
              className={`character-video ${videoReady ? "is-ready" : ""}`}
              muted
              playsInline
              preload="metadata"
              poster={PORTRAIT_URL}
              onLoadedMetadata={handleMetadata}
              onCanPlay={() => setVideoReady(true)}
              onError={() => {
                setVideoFailed(true);
                setVideoReady(false);
              }}
              aria-hidden="true"
            >
              <source src={VIDEO_URL} type="video/mp4" />
            </video>
          )}
          <div className="character-glow" aria-hidden="true" />
          <div className="character-fade" aria-hidden="true" />
        </div>
      </div>

      <div className="cinematic-hero-inner container">
        <div className="hero-identity">
          <p className="hero-kicker hero-anim">Security Engineer · Tempe, Arizona</p>
          <h1 id="hero-title" className="hero-anim">
            Pooja Kiran<span aria-hidden="true">.</span>
          </h1>
          <p className="hero-specialization hero-anim">
            AI Security · Agent Security · Cloud Identity · Detection Engineering
          </p>

          <div className="hero-cta-row hero-anim">
            <a className="hero-primary-cta hero-magnetic" href="#projects">View Security Work</a>
            <a className="hero-secondary-cta hero-magnetic" href="#contact">Contact Me</a>
          </div>

          <div className="hero-utility-links hero-anim">
            <a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a href={RESUME_URL} download>Résumé ↓</a>
          </div>
        </div>

        <div className="hero-thesis">
          <p className="hero-anim">Security for AI</p>
          <p className="hero-anim">that takes action.</p>
          <span className="hero-anim">
            I build controls for what agents can execute, which permissions they hold,
            and which model artifacts they trust.
          </span>
        </div>
      </div>

      <div className="hero-status hero-anim">
        <span className="status-dot" />
        <span>Open to U.S. security engineering roles</span>
      </div>

      <div className="hero-scroll-cue hero-anim" aria-hidden="true">
        <span>SCROLL TO EVIDENCE</span>
        <i />
      </div>
    </section>
  );
}
