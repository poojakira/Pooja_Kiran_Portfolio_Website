'use client';

export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="fixed top-0 left-0 z-[9999] px-4 py-3 bg-sentinel-violet text-white font-medium text-sm rounded-br-lg transform -translate-y-full focus:translate-y-0 transition-transform duration-200 outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-sentinel-violet"
    >
      Skip to main content
    </a>
  );
}
