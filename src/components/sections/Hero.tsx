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
    <section id="hero" className="relative h-screen w-full overflow-hidden bg-[#08080C]">
      
      {/* VIDEO — takes full screen as background */}
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

      {/* Left panel overlay — dark glass panel on left 38% for text */}
      <div
        className="absolute inset-y-0 left-0 w-full lg:w-[38%] z-10 flex flex-col justify-center px-8 sm:px-12 lg:px-14"
        style={{
          background: "linear-gradient(to right, rgba(8,8,12,0.92) 0%, rgba(8,8,12,0.85) 70%, rgba(8,8,12,0) 100%)",
        }}
      >
        {/* Status */}
        <div className="flex items-center gap-2 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-mono text-white/40 uppercase tracking-[0.2em]">
            Available for hire
          </span>
        </div>

        {/* Name */}
        <h1 className="font-bold leading-[0.85] tracking-[-0.02em] mb-4" style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)" }}>
          <span className="block text-white">Pooja Kiran</span>
          <span className="block text-white/30">Bharadwaj</span>
        </h1>

        {/* Separator */}
        <div className="w-10 h-px bg-violet-500/60 mb-4" aria-hidden="true" />

        {/* Role */}
        <p className="text-xs font-mono text-violet-400/80 tracking-[0.15em] uppercase mb-5">
          AI Security Engineer
        </p>

        {/* One-liner */}
        <p className="text-[14px] text-white/45 leading-relaxed max-w-xs mb-8">
          I engineer security infrastructure for autonomous AI systems — from MCP gateways to model supply chain verification.
        </p>

        {/* Stats — horizontal, tiny */}
        <div className="flex items-center gap-5 mb-8 text-[11px] font-mono text-white/25">
          <span><span className="text-white/70 text-sm font-bold">13</span> projects</span>
          <span><span className="text-white/70 text-sm font-bold">5</span> domains</span>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <a
            href="#projects"
            className="px-4 py-2 text-xs font-medium text-black bg-white rounded hover:bg-white/90 transition-all"
          >
            View Work
          </a>
          <a
            href="/Pooja_Kiran_AI_Security_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-xs font-medium text-white/60 border border-white/15 rounded hover:border-white/30 hover:text-white transition-all"
          >
            Resume
          </a>
        </div>
      </div>

      {/* Video controls — top right corner */}
      <div className="absolute top-5 right-5 z-20 flex items-center gap-2">
        <button
          onClick={togglePlay}
          className="w-8 h-8 rounded-full flex items-center justify-center bg-black/40 border border-white/10 hover:bg-black/60 transition-all"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" /></svg>
          ) : (
            <svg className="w-3 h-3 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
          )}
        </button>
        <button
          onClick={toggleMute}
          className="w-8 h-8 rounded-full flex items-center justify-center bg-black/40 border border-white/10 hover:bg-black/60 transition-all"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>
          ) : (
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
          )}
        </button>
      </div>

      {/* "Hear me speak" prompt — bottom center of video area */}
      {showSoundBadge ? (
        <button
          onClick={toggleMute}
          className="absolute bottom-8 right-[20%] lg:right-[25%] -translate-x-1/2 z-20 flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-sm font-medium cursor-pointer hover:bg-white/90 transition-all shadow-xl"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
          Hear me speak
        </button>
      ) : (
        <button
          onClick={toggleMute}
          className="absolute bottom-8 right-[20%] lg:right-[25%] -translate-x-1/2 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 border border-white/10 text-white/50 text-xs cursor-pointer hover:text-white transition-all"
        >
          {isMuted ? "🔇 Tap to unmute" : "🔊 Playing"}
        </button>
      )}

      {/* Scroll indicator — bottom left */}
      <div className="absolute bottom-6 left-14 z-20 hidden lg:flex flex-col items-center gap-1">
        <span className="text-[9px] text-white/25 font-mono uppercase tracking-widest" style={{ writingMode: "vertical-rl" }}>
          Scroll
        </span>
        <div className="w-px h-6 bg-gradient-to-b from-white/25 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
