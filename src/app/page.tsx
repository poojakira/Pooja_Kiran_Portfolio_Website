"use client";

import { useState } from "react";
import { TopNav } from "@/components/TopNav";
import { CinematicView } from "@/components/CinematicView";
import { RecruiterView } from "@/components/RecruiterView";
import { AttackSimulator } from "@/components/AttackSimulator";

export default function HomePage() {
  const [view, setView] = useState<"cinematic" | "recruiter">("cinematic");
  return (
    <>
      <TopNav view={view} onToggle={() => setView((v) => (v === "cinematic" ? "recruiter" : "cinematic"))} />
      {view === "cinematic" ? <CinematicView /> : <RecruiterView />}
      <AttackSimulator />
    </>
  );
}
