import { Link } from "react-router-dom";
import { Bookmark, Crosshair, Globe, Orbit, Swords } from "lucide-react";
import { TOOLS } from "../tools";

const ICONS = [Swords, Orbit, Crosshair, Bookmark, Globe];

export default function Home() {
  return (
    <div className="tt-tool-v2 mx-auto max-w-[1100px] px-4 py-12 sm:py-20">
      <div className="mb-10 text-center">
        <h1 className="eve-title text-2xl text-slate-100 sm:text-3xl">NapsTools</h1>
        <p className="mt-2 text-xs uppercase tracking-widest text-slate-400">Ferramentas de wormhole PvE</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TOOLS.map((tool, i) => {
          const Icon = ICONS[i];
          return (
            <Link
              key={tool.path}
              to={tool.path}
              className="group border border-[#262933] bg-[#0b0d11]/85 p-5 transition-colors hover:border-[#53b6ff]/70 hover:bg-[#08131d]"
            >
              <Icon className="mb-3 h-5 w-5 text-[#53b6ff]" />
              <div className="text-sm font-semibold uppercase tracking-widest text-slate-100">{tool.label}</div>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">{tool.description}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
