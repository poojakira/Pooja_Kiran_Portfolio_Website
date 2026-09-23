"use client";

import { useEffect, useRef, useState } from "react";
import { PORTRAIT_URL, RESUME_URL, SITE_PATH, profile } from "@/data/portfolio";

const VIDEO_URL = `${SITE_PATH}/media/pooja-interactive-hero.mp4`;

export default function InteractivePortfolioHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetX = useRef(0.5);
  const smoothX = useRef(0.5);
  const targetY = useRef(0.5);
  const smoothY = useRef(0.5);
  const frame = useRef<number | null>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)");

    const move = (event: PointerEvent) => {
      if (reduced.matches || coarse.matches) return;
      targetX.current = Math.min(1, Math.max(0, event.clientX / window.innerWidth));
      targetY.current = Math.min(1, Math.max(0, event.clientY / window.innerHeight));
    };

    const tick = () => {
      smoothX.current += (targetX.current - smoothX.current) * 0.045;
      smoothY.current += (targetY.current - smoothY.current) * 0.045;

      const x = (smoothX.current - 0.5) * 2;
      const y = (smoothY.current - 0.5) * 2;
      section.style.setProperty("--px", x.toFixed(4));
      section.style.setProperty("--py", y.toFixed(4));

      const video = videoRef.current;
      if (
        video &&
        videoReady &&
        !videoFailed &&
        Number.isFinite(video.duration) &&
        video.duration > 0 &&
        !reduced.matches
      ) {
        const start = 0.1;
        const end = 0.9;
        const progress = start + smoothX.current * (end - start);
        const time = progress * video.duration;
        if (Math.abs(video.currentTime - time) > 0.01) video.currentTime = time;
      }

      frame.current = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", move, { passive: true });
    frame.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", move);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, [videoReady, videoFailed]);

  const onMetadata = () => {
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return;
    video.pause();
    video.currentTime = video.duration * 0.5;
  };

  return (
    <section ref={sectionRef} className="premium-hero" aria-labelledby="hero-title">
      <div className="premium-hero-light" aria-hidden="true" />

      <div className="premium-hero-inner container">
        <div className="premium-hero-copy">
          <p className="premium-eyebrow">Security Engineer · Tempe, Arizona</p>
          <h1 id="hero-title">Pooja Kiran<span>.</span></h1>
          <p className="premium-focus">
            AI Security · Agent Security · Cloud Identity · Detection Engineering
          </p>

          <div className="premium-actions">
            <a className="premium-button primary" href="#projects">View Security Work</a>
            <a className="premium-button secondary" href="#contact">Contact Me</a>
          </div>

          <div className="premium-links">
            <a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a href={RESUME_URL} download>Résumé ↓</a>
          </div>
        </div>

        <div className="premium-portrait-wrap" aria-label="Portrait of Pooja Kiran">
          <div className="premium-portrait-halo" aria-hidden="true" />
          {!videoReady && (
            <img
              className="premium-portrait"
              src={PORTRAIT_URL}
              alt="Pooja Kiran, Security Engineer"
            />
          )}

          {!videoFailed && (
            <video
              ref={videoRef}
              className={`premium-portrait premium-video ${videoReady ? "ready" : ""}`}
              muted
              playsInline
              preload="metadata"
              poster={PORTRAIT_URL}
              onLoadedMetadata={onMetadata}
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
        </div>

        <div className="premium-hero-statement">
          <p>Security for AI</p>
          <p>that takes action.</p>
          <span>
            I build controls for what agents can execute, which permissions they hold,
            and which model artifacts they trust.
          </span>
        </div>
      </div>

      <div className="premium-scroll-hint" aria-hidden="true">
        <span>Selected work below</span>
        <i />
      </div>
    </section>
  );
}
