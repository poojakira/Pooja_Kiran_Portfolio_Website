"use client";

import { useRef, useState, useEffect } from "react";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showSoundBadge, setShowSoundBadge] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSoundBadge(false), 4000);
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
    <section id="hero" className="relative min-h-screen w-full bg-[#0A0A0F]">
      <div className="flex flex-col lg:flex-row min-h-screen">
        
        {/* LEFT — Text content */}
        <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-20 lg:py-0 order-2 lg:order-1">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 w-fit mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="text-xs font-mono text-white/60 tracking-wide">
              AVAILABLE NOW
            </span>
          </div>

          {/* Name */}
          <h1 className="font-bold leading-[0.85] tracking-tight mb-6" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
            <span className="block text-white">POOJA KIRAN</span>
            <span className="block bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              BHARADWAJ
            </span>
          </h1>

          {/* Role */}
          <p className="font-mono text-sm uppercase tracking-[0.2em] text-cyan-400 mb-5">
            AI Security Engineer
          </p>

          {/* Tagline */}
          <p className="text-base sm:text-lg text-white/60 leading-relaxed max-w-md mb-8">
            I secure the boundaries where AI agents meet the real world.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/40 mb-8">
            <span><span className="text-violet-400 font-semibold">13</span> Projects</span>
            <span className="text-white/15">•</span>
            <span><span className="text-violet-400 font-semibold">5</span> Security Domains</span>
            <span className="text-white/15">•</span>
            <span className="text-emerald-400">Open to Work</span>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-3">
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
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/5 border border-white/15 text-white/70 text-sm font-medium hover:bg-white/10 transition-all duration-300"
            >
              Resume
            </a>
          </div>
        </div>

        {/* RIGHT — Video */}
        <div className="flex-1 relative min-h-[50vh] lg:min-h-screen order-1 lg:order-2">
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover object-center"
            src="/hero.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          />

          {/* Subtle gradient on left edge of video to blend with text side */}
          <div
            className="absolute inset-0 pointer-events-none hidden lg:block"
            style={{
              background: "linear-gradient(to right, #0A0A0F 0%, transparent 15%)",
            }}
            aria-hidden="true"
          />

          {/* Video controls */}
          <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
            <button
              onClick={togglePlay}
              className="w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-lg bg-black/30 border border-white/15 hover:bg-black/50 transition-all duration-300"
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              {isPlaying ? (
                <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg className="w-3.5 h-3.5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
            <button
              onClick={toggleMute}
              className="w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-lg bg-black/30 border border-white/15 hover:bg-black/50 transition-all duration-300"
              aria-label={isMuted ? "Unmute video" : "Mute video"}
            >
              {isMuted ? (
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
              ) : (
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              )}
            </button>
          </div>

          {/* Tap for sound */}
          {showSoundBadge && (
            <button
              onClick={toggleMute}
              className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-lg bg-black/30 border border-white/15 text-white/80 text-xs animate-pulse cursor-pointer"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
              Tap for sound
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
