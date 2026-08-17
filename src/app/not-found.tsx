import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-slate-950 overflow-hidden">
      {/* Scanline overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)',
        }}
      />

      <div className="relative z-20 text-center px-6">
        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl font-bold text-amber-400 mb-8 tracking-wide">
          ⚠ BREACH DETECTED
        </h1>

        {/* Terminal block */}
        <div className="inline-block text-left bg-slate-900/80 border border-slate-700 rounded-lg p-8 font-mono text-sm sm:text-base mb-10 shadow-[0_0_40px_rgba(245,158,11,0.1)]">
          <p className="text-green-400">
            <span className="text-slate-500">Target:</span> /unknown
          </p>
          <p className="text-green-400 mt-2">
            <span className="text-slate-500">Status:</span> NOT FOUND
          </p>
          <p className="text-green-400 mt-2">
            <span className="text-slate-500">Threat Level:</span> NONE
          </p>
          <p className="text-green-400 mt-2">
            <span className="text-slate-500">Resolution:</span> Resource does not exist in this system
          </p>
        </div>

        {/* Navigation links */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="px-6 py-3 bg-green-600/20 border border-green-500/50 text-green-400 rounded hover:bg-green-600/30 hover:border-green-400 transition-all font-mono text-sm"
          >
            ← Return to Secure Perimeter
          </Link>
          <Link
            href="/#contact"
            className="px-6 py-3 bg-amber-600/20 border border-amber-500/50 text-amber-400 rounded hover:bg-amber-600/30 hover:border-amber-400 transition-all font-mono text-sm"
          >
            Report Anomaly →
          </Link>
        </div>
      </div>
    </div>
  );
}
