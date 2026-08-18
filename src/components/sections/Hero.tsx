"use client";

import { useRef, useState, useEffect } from "react";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showSoundBadge, setShowSoundBadge] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSoundBadge(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
      setShowSoundBadge(false);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden flex flex-col justify-end"
    >
      {/* Fullscreen Video — shifted up so face shows in top half */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "center 30%" }}
        src="/hero.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />

      {/* Gradient — ONLY at the bottom where text sits. Top/center is CLEAR for face */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(to top, rgba(10,10,15,0.95) 0%, rgba(10,10,15,0.7) 25%, rgba(10,10,15,0.2) 45%, transparent 55%)
          `,
        }}
        aria-hidden="true"
      />

      {/* Video Controls — Glassmorphism top-right */}
      <div className="absolute top-6 right-6 z-30 flex items-center gap-3">
        <button
          onClick={togglePlay}
          className="w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300"
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? (
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <button
          onClick={toggleMute}
          className="w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? (
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          )}
        </button>
      </div>

      {/* "Tap for sound" badge */}
      {showSoundBadge && (
        <button
          onClick={toggleMute}
          className="absolute top-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl bg-white/10 border border-white/20 text-white/90 text-sm animate-pulse cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
          Tap for sound
        </button>
      )}

      {/* Hero Content — at the BOTTOM, your face stays visible in center */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-12">
        {/* Name and info */}
        <div className="flex flex-col items-start gap-4">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md bg-white/5 border border-white/10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="text-xs font-medium tracking-wide text-white/70 font-mono">
              AVAILABLE NOW
            </span>
          </div>

          {/* Main heading */}
          <h1 className="font-bold leading-[0.85] tracking-tight" style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}>
            <span className="block text-white">POOJA KIRAN</span>
            <span className="block bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              BHARADWAJ
            </span>
          </h1>

          {/* Subtitle */}
          <p className="font-mono text-sm uppercase tracking-[0.2em] text-cyan-400">
            AI Security Engineer
          </p>

          {/* Tagline */}
          <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-lg">
            I secure the boundaries where AI agents meet the real world.
          </p>

          {/* Stats + CTA row */}
          <div className="flex flex-wrap items-center gap-4 mt-1">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/25"
            >
              Explore My Work
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="/Pooja_Kiran_AI_Security_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg backdrop-blur-md bg-white/5 border border-white/20 text-white/80 text-sm font-medium hover:bg-white/10 transition-all duration-300"
            >
              Resume
            </a>
            <span className="text-xs text-white/40 font-mono hidden sm:inline">
              13 Projects • 5 Domains
            </span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20">
        <div className="w-px h-6 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
