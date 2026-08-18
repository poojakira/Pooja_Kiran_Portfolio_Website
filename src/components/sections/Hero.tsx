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

  const scrollToNext = () => {
    const about = document.getElementById("about");
    about?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Fullscreen Video — you are the hero */}
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

      {/* Subtle vignette — just edges darkened, center completely clear */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: "inset 0 0 150px 40px rgba(10,10,15,0.6)",
        }}
        aria-hidden="true"
      />

      {/* Very subtle bottom gradient for scroll indicator only */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(10,10,15,0.7) 0%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* Top left — Name (small, elegant, not competing with face) */}
      <div className="absolute top-8 left-8 z-20">
        <p className="text-white/90 text-sm font-medium tracking-wide">
          Pooja Kiran Bharadwaj
        </p>
        <p className="text-cyan-400/80 text-xs font-mono tracking-wider">
          AI Security Engineer
        </p>
      </div>

      {/* Top right — Video controls */}
      <div className="absolute top-8 right-8 z-30 flex items-center gap-2">
        <button
          onClick={togglePlay}
          className="w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-lg bg-white/10 border border-white/15 hover:bg-white/20 transition-all duration-300"
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
          className="w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-lg bg-white/10 border border-white/15 hover:bg-white/20 transition-all duration-300"
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

      {/* Tap for sound badge */}
      {showSoundBadge && (
        <button
          onClick={toggleMute}
          className="absolute top-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-lg bg-white/10 border border-white/15 text-white/80 text-xs animate-pulse cursor-pointer"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
          Tap for sound
        </button>
      )}

      {/* Bottom center — scroll cue */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer group"
        aria-label="Scroll to next section"
      >
        <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono group-hover:text-white/60 transition-colors">
          Scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
      </button>
    </section>
  );
}
