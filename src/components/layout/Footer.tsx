import { PROFILE } from "@/data/content";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-ink">
      <div className="mx-auto max-w-editorial px-6 py-14 sm:px-10 lg:px-16">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-fluid-xs uppercase tracking-widest text-signal">
              {PROFILE.role}
            </p>
            <p className="mt-2 text-fluid-xl text-chalk">{PROFILE.name}</p>
            <p className="mt-1 body-base max-w-prose">{PROFILE.focus}</p>
          </div>
          <div className="flex flex-col gap-2 font-mono text-fluid-xs uppercase tracking-wider text-mist">
            <a href={PROFILE.github} target="_blank" rel="noreferrer" className="hover:text-signal">
              GitHub ↗
            </a>
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="hover:text-signal">
              LinkedIn ↗
            </a>
            <a href={`mailto:${PROFILE.email}`} className="hover:text-signal">
              {PROFILE.email}
            </a>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-white/[0.06] pt-6 font-mono text-fluid-xs text-ash sm:flex-row sm:items-center sm:justify-between">
          <span>{PROFILE.location} · {PROFILE.availability}</span>
          <span>© {new Date().getFullYear()} {PROFILE.name}. Built with Next.js + React Three Fiber.</span>
        </div>
      </div>
    </footer>
  );
}
