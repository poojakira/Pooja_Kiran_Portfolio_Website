import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(6,182,212,0.1) 50%, #0A0A0F 100%)",
      }}
    >
      {/* Subtle radial glow accents */}
      <div
        className="absolute top-1/4 -left-32 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #8B5CF6 0%, transparent 70%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #06B6D4 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      {/* Main content container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20">
        <div className="flex flex-col lg:flex-row items-center lg:items-center gap-12 lg:gap-16">
          {/* Photo - shown above text on mobile, right side on desktop */}
          <div className="lg:order-2 flex-shrink-0">
            <div className="photo-ring w-48 h-48 sm:w-56 sm:h-56 lg:w-72 lg:h-72 xl:w-80 xl:h-80">
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <Image
                  src="/pooja-photo.jpeg"
                  alt="Pooja Kiran Bharadwaj - AI Security Engineer"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 192px, (max-width: 1024px) 224px, 320px"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Text content */}
          <div className="lg:order-1 flex-1 flex flex-col items-center lg:items-start text-center lg:text-left gap-6">
            {/* Status badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-border">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-guardian-green opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-guardian-green" />
              </span>
              <span className="text-xs font-medium tracking-wide text-silver-haze font-jetbrains">
                OPEN TO SECURITY ENGAGEMENTS
              </span>
            </div>

            {/* Main heading */}
            <h1 className="font-satoshi font-bold text-hero leading-[0.9] tracking-tight">
              <span className="block text-white">POOJA KIRAN</span>
              <span className="block gradient-text-violet">BHARADWAJ</span>
            </h1>

            {/* Subtitle */}
            <p className="font-jetbrains text-sm sm:text-base uppercase tracking-widest text-plasma-cyan">
              AI Security Engineer
            </p>

            {/* Tagline */}
            <p className="font-inter text-lg sm:text-xl text-silver-haze max-w-2xl leading-relaxed">
              I secure the boundaries where AI agents meet the real world.
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-2 text-sm text-silver-haze/80 font-inter">
              <span className="flex items-center gap-1.5">
                <span className="text-plasma-violet font-semibold">13</span> Projects
              </span>
              <span className="text-white/20">•</span>
              <span className="flex items-center gap-1.5">
                <span className="text-plasma-violet font-semibold">5</span> Security Domains
              </span>
              <span className="text-white/20">•</span>
              <span className="text-guardian-green font-medium">Available Now</span>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
              <a href="#projects" className="btn-primary">
                <span>Explore My Work</span>
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
              <a
                href="/Pooja_Kiran_AI_Security_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <svg
                  className="mr-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span>Download Resume</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-silver-haze/60 font-inter tracking-wide">
          Scroll to explore
        </span>
        <svg
          className="w-5 h-5 text-silver-haze/40 animate-bounce-slow"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </section>
  );
}
