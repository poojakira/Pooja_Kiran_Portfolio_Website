import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Domains from "@/components/sections/Domains";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";

// --- Transition Divider ---
// A reusable component that renders a centered italic quote
// flanked by decorative horizontal lines.

function TransitionDivider({ text }: { text: string }) {
  return (
    <div className="py-16 max-w-2xl mx-auto px-6">
      <div className="flex items-center gap-4">
        {/* Left line */}
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-silver-haze/20 to-silver-haze/30" aria-hidden="true" />
        {/* Dot */}
        <span className="w-1.5 h-1.5 rounded-full bg-sentinel-violet/60 flex-shrink-0" aria-hidden="true" />
        {/* Right line */}
        <div className="flex-1 h-px bg-gradient-to-l from-transparent via-silver-haze/20 to-silver-haze/30" aria-hidden="true" />
      </div>
      <p className="text-center italic text-silver-haze text-sm sm:text-base leading-relaxed mt-6">
        {text}
      </p>
      <div className="flex items-center gap-4 mt-6">
        {/* Left line */}
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-silver-haze/20 to-silver-haze/30" aria-hidden="true" />
        {/* Dot */}
        <span className="w-1.5 h-1.5 rounded-full bg-plasma-cyan/60 flex-shrink-0" aria-hidden="true" />
        {/* Right line */}
        <div className="flex-1 h-px bg-gradient-to-l from-transparent via-silver-haze/20 to-silver-haze/30" aria-hidden="true" />
      </div>
    </div>
  );
}

// --- Main Page ---

export default function Home() {
  return (
    <>
      <Hero />

      <TransitionDivider text="The problem is not AI. It is AI with agency." />

      <About />

      <TransitionDivider text="Five boundaries. Five attack surfaces. One unified approach." />

      <Domains />

      <TransitionDivider text="Theory is easy. Here is what I have built." />

      <Projects />

      <TransitionDivider text="Context matters. Here is where this work was forged." />

      <Experience />

      <Contact />
    </>
  );
}
