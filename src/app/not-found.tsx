import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-void px-6">
      <div className="grid-texture pointer-events-none absolute inset-0 opacity-30" aria-hidden />
      <div className="relative z-10 max-w-prose text-center">
        <p className="eyebrow">Error 404</p>
        <h1 className="display mt-4 text-fluid-4xl text-chalk">
          No route to this resource.
        </h1>
        <p className="mt-5 body-base">
          The request didn&apos;t match any known path. Nothing crossed the boundary.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="rounded border border-signal/40 bg-signal/10 px-6 py-3 font-mono text-fluid-sm uppercase tracking-wider text-signal transition-colors hover:bg-signal/20"
          >
            ← Return home
          </Link>
          <Link
            href="/#contact"
            className="font-mono text-fluid-sm uppercase tracking-wider text-mist transition-colors hover:text-chalk"
          >
            Contact →
          </Link>
        </div>
      </div>
    </div>
  );
}
