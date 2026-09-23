"use client";

import { useEffect, useRef, useState } from "react";
import { PORTRAIT_URL, RESUME_URL, SITE_PATH, profile } from "@/data/portfolio";

const VIDEO_URL = `${SITE_PATH}/media/pooja-interactive-hero.mp4`;

export default function InteractivePortfolioHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetProgress = useRef(0.5);
  const smoothedProgress = useRef(0.5);
  const frameRef = useRef<number | null>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

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

      section.style.setProperty("--hero-x", `${(x - 0.5) * 2}`);
      section.style.setProperty("--hero-y", `${(y - 0.5) * 2}`);
    };

    const animate = () => {
      const video = videoRef.current;
      smoothedProgress.current += (targetProgress.current - smoothedProgress.current) * 0.065;

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
        const mapped = min + smoothedProgress.current * (max - min);
        const targetTime = mapped * video.duration;

        if (Math.abs(video.currentTime - targetTime) > 0.008) {
          video.currentTime = targetTime;
        }
      }

      frameRef.current = window.requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    frameRef.current = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
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

        <div className="character-fade" aria-hidden="true" />
      </div>

      <div className="cinematic-hero-inner container">
        <div className="hero-identity">
          <p className="hero-kicker">Security Engineer · Tempe, Arizona</p>
          <h1 id="hero-title">Pooja Kiran<span aria-hidden="true">.</span></h1>
          <p className="hero-specialization">
            AI Security · Agent Security · Cloud Identity · Detection Engineering
          </p>

          <div className="hero-cta-row">
            <a className="hero-primary-cta" href="#projects">View Security Work</a>
            <a className="hero-secondary-cta" href="#contact">Contact Me</a>
          </div>

          <div className="hero-utility-links">
            <a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a href={RESUME_URL} download>Résumé ↓</a>
          </div>
        </div>

        <div className="hero-thesis">
          <p>Security for AI</p>
          <p>that takes action.</p>
          <span>
            I build controls for what agents can execute, which permissions they hold,
            and which model artifacts they trust.
          </span>
        </div>
      </div>

      <div className="hero-status" aria-hidden="true">
        <span className="status-dot" />
        <span>Open to U.S. security engineering roles</span>
      </div>
    </section>
  );
}
