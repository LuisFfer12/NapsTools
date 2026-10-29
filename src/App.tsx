import { lazy, Suspense } from "react";
import { NavLink, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import { TOOLS } from "./tools";

const WormholeSites = lazy(() => import("./pages/WormholeSites"));
const RollingMass = lazy(() => import("./pages/RollingMass"));
const RoachFits = lazy(() => import("./pages/RoachFits"));


function TopNav() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `shrink-0 whitespace-nowrap px-2 py-1 text-[10px] uppercase tracking-widest border transition-colors ${
      isActive
        ? "border-[#53b6ff]/70 bg-[#08131d] text-[#8bd3ff]"
        : "border-transparent text-slate-400 hover:text-slate-200"
    }`;

  return (
    <nav className="sticky top-0 z-20 border-b border-[#1c2027] bg-[#05070b]/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1320px] items-center gap-3 overflow-x-auto px-2 py-2 sm:px-4">
        <NavLink to="/" className="mr-2 flex shrink-0 items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#53b6ff] shadow-[0_0_8px_rgba(83,182,255,0.7)]" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-200">NapsTools</span>
        </NavLink>
        {TOOLS.map((t) => (
          <NavLink key={t.path} to={t.path} className={linkClass}>
            {t.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <div className="relative min-h-screen text-slate-100">
      <div className="static-starfield pointer-events-none fixed inset-0" aria-hidden="true" />
      <div className="relative z-10 flex min-h-screen flex-col">
        <TopNav />
        <main className="flex-1">
          <Suspense fallback={<div className="p-6 text-xs text-slate-500">Carregando…</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sites" element={<WormholeSites />} />
              <Route path="/rolling-mass" element={<RollingMass />} />
              <Route path="/fits" element={<RoachFits />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </main>
        <footer className="border-t border-[#1c2027] px-4 py-3 text-center text-[10px] text-slate-500">
          Baseado no{" "}
          <a className="text-[#53b6ff] hover:underline" href="https://github.com/NarcisussX/Triff.Tools-Source" target="_blank" rel="noreferrer">
            Triff.Tools
          </a>{" "}
          (GPL-3.0). EVE Online e todo material relacionado são marcas da CCP hf.
        </footer>
      </div>
    </div>
  );
}
