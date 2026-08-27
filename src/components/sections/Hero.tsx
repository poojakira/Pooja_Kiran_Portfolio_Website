import { siteConfig } from "@/lib/content";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center overflow-hidden bg-deep-space"
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      {/* Soft radial glow */}
      <div
        className="absolute -top-40 -left-40 w-[36rem] h-[36rem] rounded-full opacity-20 blur-3xl"
        aria-hidden="true"
        style={{ background: "radial-gradient(circle, #8B5CF6 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 w-full">
        {/* Status */}
        <div className="flex items-center gap-2 mb-8">
          <span className="w-2 h-2 rounded-full bg-secure-green animate-pulse" />
          <span className="text-[11px] font-mono text-silver-haze uppercase tracking-[0.2em]">
            Open to Security Engineer roles
          </span>
        </div>

        {/* Name */}
        <h1 className="font-bold leading-[0.95] tracking-tight text-pure-light" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
          Pooja Kiran
          <span className="block text-silver-haze/50">Bharadwaj</span>
        </h1>

        {/* Role */}
        <p className="mt-6 text-fluid-lg font-mono text-sentinel-violet tracking-wide">
          {siteConfig.role}
        </p>

        {/* Tagline */}
        <p className="mt-4 max-w-2xl text-fluid-base text-silver-haze leading-relaxed">
          {siteConfig.tagline}
        </p>

        {/* Focus line */}
        <p className="mt-3 max-w-2xl text-fluid-sm text-whisper font-mono">
          Detection engineering · Security automation · Cloud &amp; IAM · MITRE ATT&amp;CK
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href="#projects"
            className="px-5 py-2.5 text-sm font-medium text-deep-space bg-pure-light rounded-md hover:bg-white/90 transition-colors"
          >
            View Work
          </a>
          <a
            href="/Pooja_Kiran_Detection_Response_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 text-sm font-medium text-pure-light border border-white/15 rounded-md hover:border-sentinel-violet/60 hover:text-sentinel-violet transition-colors"
          >
            Resume
          </a>
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 text-sm font-medium text-silver-haze hover:text-pure-light transition-colors"
          >
            GitHub &rarr;
          </a>
        </div>

        {/* Quick stats */}
        <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-4 text-sm">
          <div>
            <span className="block text-2xl font-bold text-pure-light">16</span>
            <span className="text-xs font-mono text-whisper uppercase tracking-wider">Open-source repos</span>
          </div>
          <div>
            <span className="block text-2xl font-bold text-pure-light">800+</span>
            <span className="text-xs font-mono text-whisper uppercase tracking-wider">Automated tests</span>
          </div>
          <div>
            <span className="block text-2xl font-bold text-pure-light">MITRE</span>
            <span className="text-xs font-mono text-whisper uppercase tracking-wider">ATT&amp;CK / ATLAS mapped</span>
          </div>
        </div>
      </div>
    </section>
  );
}
