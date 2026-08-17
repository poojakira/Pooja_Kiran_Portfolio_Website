export default function Footer() {
  return (
    <footer className="border-t border-graphite bg-deep-space">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Tagline */}
          <div className="text-center md:text-left">
            <p className="text-sm font-mono text-sentinel-violet tracking-wide">
              Engineering Trust in Intelligent Systems
            </p>
            <p className="text-xs text-silver-haze mt-2">
              &copy; 2026 Pooja Kiran Bharadwaj. All rights reserved.
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/poojakiranbharadwaj"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-silver-haze hover:text-pure-light transition-colors duration-200"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/poojakiranbharadwaj"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-silver-haze hover:text-pure-light transition-colors duration-200"
            >
              LinkedIn
            </a>
            <a
              href="mailto:poojakiranbhardwaj@gmail.com"
              className="text-sm text-silver-haze hover:text-pure-light transition-colors duration-200"
            >
              Email
            </a>
            <a
              href="/Pooja_Kiran_AI_Security_Resume.pdf"
              download
              className="text-sm text-sentinel-violet hover:text-pure-light transition-colors duration-200 flex items-center gap-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Resume
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
