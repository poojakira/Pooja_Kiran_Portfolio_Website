"use client";

import { useEffect, useRef, useState } from "react";
import { RESUME_URL, SITE_PATH } from "@/data/portfolio";

const navigation = [
  ["About", "about"], ["Experience", "experience"], ["Projects", "projects"],
  ["Skills", "skills"], ["Contact", "contact"],
] as const;

export default function PortfolioHeader() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const dismiss = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) { setOpen(false); toggle.current?.focus(); }
    };
    document.addEventListener("keydown", dismiss);
    return () => document.removeEventListener("keydown", dismiss);
  }, [open]);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="wordmark" href={`${SITE_PATH}/`} aria-label="Pooja Kiran, home">Pooja Kiran<span aria-hidden="true">.</span></a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map(([label, id]) => <a href={`${SITE_PATH}/#${id}`} key={id}>{label}</a>)}
        </nav>
        <a className="header-resume" href={RESUME_URL} download>Résumé <span aria-hidden="true">↗</span></a>
        <button ref={toggle} className="menu-toggle" type="button" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>{open ? "Close" : "Menu"}</button>
      </div>
      <nav id="mobile-menu" className="mobile-nav" aria-label="Mobile navigation" hidden={!open}>
        {navigation.map(([label, id]) => <a href={`${SITE_PATH}/#${id}`} key={id} onClick={() => setOpen(false)}>{label}</a>)}
      </nav>
    </header>
  );
}
