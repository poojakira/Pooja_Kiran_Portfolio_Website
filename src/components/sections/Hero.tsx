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
    <section id="hero" className="relative min-h-screen w-full" style={{ background: "#08080C" }}>
      <div className="flex flex-col lg:flex-row min-h-screen">
        
        {/* LEFT — Content */}
        <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-20 py-20 lg:py-0 order-2 lg:order-1 relative">
          
          {/* Subtle accent line */}
          <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent hidden lg:block" aria-hidden="true" />
          
          {/* Status */}
          <div className="flex items-center gap-2 mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-mono text-white/40 uppercase tracking-[0.25em]">
              Available for hire
            </span>
          </div>

          {/* Name — clean, sharp, no gradient gimmicks */}
          <h1 className="font-bold leading-[0.82] tracking-[-0.03em] mb-5" style={{ fontSize: "clamp(2.8rem, 5.5vw, 5rem)" }}>
            <span className="block text-white">Pooja Kiran</span>
            <span className="block text-white/40">Bharadwaj</span>
          </h1>

          {/* Thin separator */}
          <div className="w-12 h-px bg-white/20 mb-5" aria-hidden="true" />

          {/* Role */}
          <p className="text-sm font-mono text-white/60 tracking-wide uppercase mb-6">
            AI Security Engineer
          </p>

          {/* One-liner — sharp, not fluffy */}
          <p className="text-[15px] text-white/50 leading-relaxed max-w-sm mb-10">
            Engineering security infrastructure for autonomous AI systems. MCP gateways. LLM red-teaming. Model supply chain. IAM for non-human identities.
          </p>

          {/* Metrics — minimal, factual */}
          <div className="flex items-center gap-6 mb-10 text-xs font-mono text-white/30">
            <div>
              <span className="text-white text-lg font-bold">13</span>
              <span className="block mt-0.5">projects</span>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div>
              <span className="text-white text-lg font-bold">5</span>
              <span className="block mt-0.5">domains</span>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div>
              <span className="text-white text-lg font-bold">14</span>
              <span className="block mt-0.5">stars</span>
            </div>
          </div>

          {/* Actions — understated, confident */}
          <div className="flex items-center gap-4">
            <a
              href="#projects"
              className="px-5 py-2.5 text-sm font-medium text-black bg-white rounded hover:bg-white/90 transition-all duration-200"
            >
              View Work
            </a>
            <a
              href="/Pooja_Kiran_AI_Security_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 text-sm font-medium text-white/70 border border-white/15 rounded hover:border-white/30 hover:text-white transition-all duration-200"
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

          {/* Left edge blend */}
          <div
            className="absolute inset-0 pointer-events-none hidden lg:block"
            style={{
              background: "linear-gradient(to right, #08080C 0%, transparent 12%)",
            }}
            aria-hidden="true"
          />

          {/* Video controls — minimal, top right */}
          <div className="absolute top-5 right-5 z-10 flex items-center gap-2">
            <button
              onClick={togglePlay}
              className="w-8 h-8 rounded-full flex items-center justify-center bg-black/50 border border-white/10 hover:bg-black/70 transition-all"
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
              className="w-8 h-8 rounded-full flex items-center justify-center bg-black/50 border border-white/10 hover:bg-black/70 transition-all"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? (
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>
              ) : (
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
              )}
            </button>
          </div>

          {/* Sound prompt */}
          {showSoundBadge ? (
            <button
              onClick={toggleMute}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white text-black text-sm font-medium cursor-pointer hover:bg-white/90 transition-all shadow-lg"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
              Hear me speak
            </button>
          ) : (
            <button
              onClick={toggleMute}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 border border-white/10 text-white/60 text-xs cursor-pointer hover:text-white/90 transition-all"
            >
              {isMuted ? "🔇 Muted" : "🔊 Playing"}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
