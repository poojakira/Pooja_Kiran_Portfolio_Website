"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { PROFILE } from "@/data/content";

const NAV = [
  { href: "#systems", label: "Systems" },
  { href: "#work", label: "Work" },
  { href: "#lab", label: "Lab" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        scrolled ? "border-b border-white/[0.06] bg-void/80 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-editorial items-center justify-between px-6 py-4 sm:px-10 lg:px-16">
        <a href="#" className="group flex items-center gap-2.5" aria-label="Home">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-pulse-soft rounded-full bg-signal/60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-signal" />
          </span>
          <span className="font-mono text-fluid-sm tracking-wide text-chalk">
            {PROFILE.name.split(" ")[0]}
            <span className="text-ash"> {PROFILE.name.split(" ").slice(1).join(" ")}</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-mono text-fluid-xs uppercase tracking-wider text-mist transition-colors hover:text-chalk"
            >
              {item.label}
            </a>
          ))}
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noreferrer"
            className="rounded border border-white/10 px-3 py-1.5 font-mono text-fluid-xs uppercase tracking-wider text-chalk transition-colors hover:border-signal/50 hover:text-signal"
          >
            GitHub
          </a>
        </nav>

        <button
          className="md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <div className="flex flex-col gap-1.5">
            <span className={cn("h-px w-6 bg-chalk transition", open && "translate-y-[6.5px] rotate-45")} />
            <span className={cn("h-px w-6 bg-chalk transition", open && "opacity-0")} />
            <span className={cn("h-px w-6 bg-chalk transition", open && "-translate-y-[6.5px] -rotate-45")} />
          </div>
        </button>
      </div>

      {open && (
        <nav className="border-t border-white/[0.06] bg-void/95 px-6 py-4 md:hidden" aria-label="Mobile">
          <div className="flex flex-col gap-4">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-mono text-fluid-sm uppercase tracking-wider text-mist"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
