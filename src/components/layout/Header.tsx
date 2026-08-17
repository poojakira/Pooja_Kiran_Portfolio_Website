"use client";

import { useState, useEffect } from "react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Domains", href: "#domains" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (currentScrollY / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const bgOpacity = Math.min(0.3 + scrollY / 500, 0.85);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-[2px] z-[60]">
        <div
          className="h-full bg-gradient-to-r from-sentinel-violet to-plasma-cyan"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Header */}
      <header
        className="fixed top-[2px] left-0 w-full z-50 transition-all duration-300"
        style={{
          backgroundColor: `rgba(10, 10, 15, ${bgOpacity})`,
          backdropFilter: `blur(${8 + scrollY / 50}px)`,
          borderBottom:
            scrollY > 50
              ? "1px solid rgba(139, 92, 246, 0.2)"
              : "none",
        }}
      >
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="font-mono text-xl font-bold tracking-wider text-pure-light hover:text-sentinel-violet transition-colors"
          >
            PKB
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-sm text-silver-haze hover:text-pure-light transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-sentinel-violet group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </div>

          {/* Availability Badge + Mobile Toggle */}
          <div className="flex items-center gap-4">
            {/* Availability Badge */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-secure-green/30 bg-secure-green/5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secure-green opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-secure-green" />
              </span>
              <span className="text-xs text-secure-green font-medium">
                Available Now
              </span>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex flex-col gap-1.5 p-2"
              aria-label="Toggle menu"
            >
              <span
                className={`block w-6 h-[2px] bg-pure-light transition-all duration-300 ${
                  mobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""
                }`}
              />
              <span
                className={`block w-6 h-[2px] bg-pure-light transition-all duration-300 ${
                  mobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block w-6 h-[2px] bg-pure-light transition-all duration-300 ${
                  mobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Full-Screen Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-deep-space/95 backdrop-blur-xl flex flex-col items-center justify-center transition-all duration-500 md:hidden ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-center gap-8">
          {navLinks.map((link, index) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-2xl font-light text-pure-light hover:text-sentinel-violet transition-all duration-300"
              style={{
                transitionDelay: mobileMenuOpen ? `${index * 100}ms` : "0ms",
                transform: mobileMenuOpen
                  ? "translateY(0)"
                  : "translateY(20px)",
                opacity: mobileMenuOpen ? 1 : 0,
              }}
            >
              {link.label}
            </button>
          ))}

          {/* Mobile Availability Badge */}
          <div
            className="flex items-center gap-2 mt-8 px-4 py-2 rounded-full border border-secure-green/30 bg-secure-green/5"
            style={{
              transitionDelay: mobileMenuOpen
                ? `${navLinks.length * 100}ms`
                : "0ms",
              transform: mobileMenuOpen ? "translateY(0)" : "translateY(20px)",
              opacity: mobileMenuOpen ? 1 : 0,
              transition: "all 0.3s ease",
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secure-green opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secure-green" />
            </span>
            <span className="text-sm text-secure-green font-medium">
              Available Now
            </span>
          </div>
        </nav>
      </div>
    </>
  );
}
