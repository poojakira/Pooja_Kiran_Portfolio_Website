import type { ClaimStatus, Evidence } from "@/data/projects";

const STATUS_STYLE: Record<ClaimStatus, { bg: string; fg: string; label: string }> = {
  verified: { bg: "rgba(65,209,138,0.14)", fg: "#41D18A", label: "VERIFIED" },
  scoped: { bg: "rgba(245,166,35,0.14)", fg: "#F5A623", label: "SCOPED" },
  experimental: { bg: "rgba(61,214,224,0.14)", fg: "#3DD6E0", label: "EXPERIMENTAL" },
};

export function StatusBadge({ status }: { status: ClaimStatus }) {
  const s = STATUS_STYLE[status];
  return (
    <span
      className="mono"
      style={{
        background: s.bg, color: s.fg, fontSize: 10, letterSpacing: 1,
        padding: "2px 7px", borderRadius: 3, fontWeight: 600, whiteSpace: "nowrap",
      }}
    >
      {s.label}
    </span>
  );
}

export function EvidenceCard({ e }: { e: Evidence }) {
  return (
    <div className="rounded-md border border-line bg-panel p-4">
      <div className="flex items-start justify-between gap-2">
        <span className="text-2xl font-bold text-ink">{e.value}</span>
        <StatusBadge status={e.status} />
      </div>
      <div className="mt-1 text-sm text-muted">{e.label}</div>
      {e.scope && <div className="mono mt-2 text-[11px] leading-snug text-muted/80">{e.scope}</div>}
    </div>
  );
}

export function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="mono mb-3 flex items-center gap-3 text-xs tracking-widest text-muted">
      <span className="text-cyan">{index}</span>
      <span>{children}</span>
    </div>
  );
}
