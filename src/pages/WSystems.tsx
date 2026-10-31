/*
 * W-Space Systems: searchable database of every wormhole system
 * (class, effect, statics, region, star, planets), in the spirit of anoik.is/systems.
 * Data: public/data/systems.json (built from Triff.Tools enriched_systems.json).
 */

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowLeft, ExternalLink, Search, Sparkles, X } from "lucide-react";
import { ToolChrome } from "../components/tool-ui";
import {
    DEST_TONE,
    EFFECTS,
    EFFECT_TONE,
    classLabel,
    classTone,
    sortStatics,
    staticDestination,
    staticSize,
} from "../data/wormholeTypes";

type WSystem = {
    j: string; // J-code
    c: string; // class
    e: string; // effect ("" = none)
    s: string[]; // statics
    r: string; // region
    k: string; // constellation
    id: number; // solar system id
    st: string; // star
    p: [string, number][]; // planets: [type, moons]
};

const CLASS_FILTERS = ["1", "2", "3", "4", "5", "6", "13", "Drifter"];
const DRIFTER = new Set(["Sentinel", "Barbican", "Vidette", "Redoubt", "Conflux"]);
const DEST_FILTERS = ["HS", "LS", "NS", "C1", "C2", "C3", "C4", "C5", "C6"];
const PAGE = 150;

const isShattered = (s: WSystem) => s.p.some(([t]) => t === "Shattered");

function matchesClass(s: WSystem, f: string | null) {
    if (!f) return true;
    if (f === "Drifter") return DRIFTER.has(s.c);
    return s.c === f;
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`border px-2 py-1 text-[10px] uppercase tracking-widest transition-colors ${
                active ? "border-[#53b6ff]/70 bg-[#08131d] text-[#8bd3ff]" : "border-[#30343c] bg-[#05070b] text-slate-300 hover:bg-[#0c1017]"
            }`}
        >
            {children}
        </button>
    );
}

function StaticBadge({ code }: { code: string }) {
    const dest = staticDestination(code);
    return (
        <span className={`inline-flex items-center gap-1 border bg-[#05070b] px-1.5 py-0.5 font-mono text-[10px] ${DEST_TONE[dest] ?? DEST_TONE["?"]}`}>
            {code}
            <span className="text-slate-500">→</span>
            {dest}
        </span>
    );
}

function EffectLabel({ effect }: { effect: string }) {
    if (!effect) return <span className="text-slate-500">—</span>;
    return <span className={EFFECT_TONE[effect] ?? "text-slate-200"}>{EFFECTS[effect]?.short ?? effect}</span>;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="border-t border-[#262933] px-4 py-3">
            <div className="mb-2 text-[9px] uppercase tracking-widest text-slate-500">{title}</div>
            {children}
        </div>
    );
}

function SystemDetail({ sys, onClose }: { sys: WSystem; onClose: () => void }) {
    const effect = sys.e ? EFFECTS[sys.e] : null;
    const moons = sys.p.reduce((n, [, m]) => n + m, 0);
    const planetTypes = useMemo(() => {
        const counts = new Map<string, number>();
        sys.p.forEach(([t]) => counts.set(t, (counts.get(t) ?? 0) + 1));
        return [...counts.entries()].sort((a, b) => b[1] - a[1]);
    }, [sys]);

    const links = [
        { label: "Anoik.is", href: `https://anoik.is/systems/${sys.j}` },
        { label: "zKillboard", href: `https://zkillboard.com/system/${sys.id}/` },
        { label: "Dotlan", href: `https://evemaps.dotlan.net/system/${sys.j}` },
    ];

    return (
        <div className="border border-[#262933] bg-[#05070b]">
            <div className="flex items-start justify-between gap-3 bg-[#0b0d11] px-4 py-3">
                <div className="min-w-0">
                    <div className="flex items-baseline gap-3">
                        <span className="font-mono text-xl font-semibold text-slate-100">{sys.j}</span>
                        <span className={`text-sm font-semibold ${classTone(sys.c)}`}>{classLabel(sys.c)}</span>
                    </div>
                    <div className="mt-1 text-[11px] text-slate-400">
                        {sys.r} · {sys.k}
                    </div>
                </div>
                <button type="button" onClick={onClose} className="text-slate-500 hover:text-slate-200" aria-label="Close">
                    <X className="hidden h-4 w-4 lg:block" />
                    <span className="flex items-center gap-1 text-[10px] uppercase tracking-widest lg:hidden">
                        <ArrowLeft className="h-3.5 w-3.5" /> Back
                    </span>
                </button>
            </div>

            <Section title="Statics">
                {sys.s.length ? (
                    <div className="space-y-1.5">
                        {sortStatics(sys.s).map((code) => {
                            const size = staticSize(code);
                            return (
                                <div key={code} className="flex flex-wrap items-center gap-2">
                                    <StaticBadge code={code} />
                                    {size ? <span className="text-[11px] text-slate-400">{size}</span> : null}
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <span className="text-[12px] text-slate-500">No static</span>
                )}
            </Section>

            <Section title="Effect">
                {effect ? (
                    <>
                        <div className={`mb-2 flex items-center gap-1.5 text-[13px] font-semibold ${EFFECT_TONE[sys.e]}`}>
                            <Sparkles className="h-3.5 w-3.5" /> {effect.short}
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                            {effect.mods.map((m) => (
                                <span
                                    key={m.label}
                                    className={`border px-1.5 py-0.5 text-[10px] ${
                                        m.good ? "border-[#2b4d37] text-[#8fe0aa]" : "border-[#552e2e] text-[#f0a0a0]"
                                    }`}
                                >
                                    {m.label}
                                </span>
                            ))}
                        </div>
                        <div className="mt-2 text-[10px] text-slate-500">Strength scales with class: C1 weakest, C6 strongest.</div>
                    </>
                ) : (
                    <span className="text-[12px] text-slate-400">No effect</span>
                )}
            </Section>

            <Section title="Celestials">
                <div className="mb-2 text-[12px] text-slate-300">
                    <span className="text-slate-500">Star:</span> {sys.st}
                </div>
                <div className="mb-2 text-[12px] text-slate-300">
                    <span className="text-slate-500">Planets:</span> {sys.p.length} · <span className="text-slate-500">Moons:</span> {moons}
                    {isShattered(sys) ? <span className="ml-2 border border-[#433d50] px-1 text-[10px] text-[#c6bdd6]">Shattered</span> : null}
                </div>
                <div className="mb-3 flex flex-wrap gap-1.5">
                    {planetTypes.map(([t, n]) => (
                        <span key={t} className="border border-[#30343c] bg-[#070910] px-1.5 py-0.5 text-[10px] text-slate-300">
                            {n}× {t}
                        </span>
                    ))}
                </div>
                <table className="w-full text-[11px]">
                    <thead>
                        <tr className="text-left text-[9px] uppercase tracking-widest text-slate-500">
                            <th className="py-1 pr-2 font-normal">#</th>
                            <th className="py-1 pr-2 font-normal">Type</th>
                            <th className="py-1 font-normal">Moons</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sys.p.map(([t, m], i) => (
                            <tr key={i} className="border-t border-[#1a1d24] text-slate-300">
                                <td className="py-1 pr-2 font-mono text-slate-500">{toRoman(i + 1)}</td>
                                <td className="py-1 pr-2">{t}</td>
                                <td className="py-1">{m}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Section>

            <Section title="Links">
                <div className="flex flex-wrap gap-2">
                    {links.map((l) => (
                        <a
                            key={l.label}
                            href={l.href}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 border border-[#30343c] px-2 py-1 text-[10px] uppercase tracking-widest text-[#8bd3ff] hover:border-[#53b6ff]/70"
                        >
                            {l.label} <ExternalLink className="h-3 w-3" />
                        </a>
                    ))}
                </div>
            </Section>
        </div>
    );
}

function toRoman(n: number) {
    const map: [number, string][] = [[10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]];
    let out = "";
    for (const [v, s] of map) while (n >= v) { out += s; n -= v; }
    return out;
}

export default function WSystems() {
    const [systems, setSystems] = useState<WSystem[]>([]);
    const [error, setError] = useState("");
    const [params, setParams] = useSearchParams();
    const [query, setQuery] = useState("");
    const [cls, setCls] = useState<string | null>(null);
    const [effect, setEffect] = useState<string>("");
    const [dest, setDest] = useState<string | null>(null);
    const [shattered, setShattered] = useState(false);
    const [limit, setLimit] = useState(PAGE);

    const selectedJ = params.get("j")?.toUpperCase() ?? null;

    useEffect(() => {
        fetch(`${import.meta.env.BASE_URL}data/systems.json`)
            .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
            .then(setSystems)
            .catch((e) => setError(String(e.message || e)));
    }, []);

    useEffect(() => setLimit(PAGE), [query, cls, effect, dest, shattered]);

    const filtered = useMemo(() => {
        const q = query.trim().toUpperCase();
        // A J-code search finds the system regardless of the other filters.
        if (/^J\d/.test(q)) return systems.filter((s) => s.j.includes(q));
        return systems.filter((s) => {
            if (q && !s.j.includes(q) && !s.r.toUpperCase().includes(q) && !s.k.toUpperCase().includes(q)) return false;
            if (!matchesClass(s, cls)) return false;
            if (effect === "none" ? s.e !== "" : effect && s.e !== effect) return false;
            if (dest && !s.s.some((c) => staticDestination(c) === dest)) return false;
            if (shattered && !isShattered(s)) return false;
            return true;
        });
    }, [systems, query, cls, effect, dest, shattered]);

    const selected = useMemo(() => systems.find((s) => s.j === selectedJ) ?? null, [systems, selectedJ]);

    const select = (j: string | null) => {
        const next = new URLSearchParams(params);
        if (j) next.set("j", j);
        else next.delete("j");
        setParams(next, { replace: true });
    };

    // Typing an exact J-code jumps straight to it.
    useEffect(() => {
        const q = query.trim().toUpperCase();
        if (/^J\d{6}$/.test(q) && systems.some((s) => s.j === q)) select(q);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query, systems]);

    const anyFilter = query || cls || effect || dest || shattered;

    return (
        <div className="tt-tool-v2 tt2-reference-page min-h-screen leading-snug text-slate-100">
            <div className="mx-auto max-w-[1320px] px-2 py-3 sm:px-4 sm:py-6">
                <div className="tt2-window">
                    <ToolChrome
                        section="Wormholes"
                        title="W-Space Systems"
                        badge="Database"
                        context="All Systems"
                        status={systems.length ? `${systems.length.toLocaleString()} systems` : "Loading"}
                        contextAside={<span className="text-[10px] text-slate-400">{filtered.length.toLocaleString()} matching</span>}
                    />

                    <div className="grid grid-cols-1 gap-4 p-3 sm:p-4 lg:grid-cols-[minmax(0,1fr)_400px]">
                        {/* list */}
                        <div className={`min-w-0 space-y-3 ${selected ? "hidden lg:block" : ""}`}>
                            <div className="space-y-3 border border-[#262933] bg-[#0b0d11]/80 p-3">
                                <div className="relative">
                                    <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
                                    <input
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        placeholder="J-code, region or constellation…"
                                        className="w-full border border-[#30343c] bg-[#05070b] py-2 pl-8 pr-3 font-mono text-[12px] text-slate-100 placeholder:font-sans placeholder:text-slate-600 focus:border-[#53b6ff]/70 focus:outline-none"
                                    />
                                </div>

                                <div className="flex flex-wrap items-center gap-1.5">
                                    <span className="mr-1 text-[9px] uppercase tracking-widest text-slate-500">Class</span>
                                    {CLASS_FILTERS.map((c) => (
                                        <Chip key={c} active={cls === c} onClick={() => setCls(cls === c ? null : c)}>
                                            {/^\d+$/.test(c) ? `C${c}` : c}
                                        </Chip>
                                    ))}
                                </div>

                                <div className="flex flex-wrap items-center gap-1.5">
                                    <span className="mr-1 text-[9px] uppercase tracking-widest text-slate-500">Static to</span>
                                    {DEST_FILTERS.map((d) => (
                                        <Chip key={d} active={dest === d} onClick={() => setDest(dest === d ? null : d)}>
                                            {d}
                                        </Chip>
                                    ))}
                                </div>

                                <div className="flex flex-wrap items-center gap-3">
                                    <label className="flex items-center gap-2 text-[9px] uppercase tracking-widest text-slate-500">
                                        Effect
                                        <select
                                            value={effect}
                                            onChange={(e) => setEffect(e.target.value)}
                                            className="border border-[#30343c] bg-[#05070b] px-2 py-1 text-[11px] normal-case tracking-normal text-slate-200"
                                        >
                                            <option value="">Any</option>
                                            <option value="none">No effect</option>
                                            {Object.entries(EFFECTS).map(([k, v]) => (
                                                <option key={k} value={k}>
                                                    {v.short}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                    <Chip active={shattered} onClick={() => setShattered(!shattered)}>
                                        Shattered
                                    </Chip>
                                    {anyFilter ? (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setQuery("");
                                                setCls(null);
                                                setEffect("");
                                                setDest(null);
                                                setShattered(false);
                                            }}
                                            className="ml-auto text-[10px] uppercase tracking-widest text-slate-500 hover:text-slate-200"
                                        >
                                            Clear filters
                                        </button>
                                    ) : null}
                                </div>
                            </div>

                            {error ? (
                                <div className="border border-[#6b2b32] bg-[#1d090b] px-3 py-2 text-[11px] text-[#ffaaaa]">Could not load systems: {error}</div>
                            ) : null}

                            <div className="overflow-x-auto border border-[#262933] bg-[#05070b]">
                                <table className="w-full min-w-[560px] text-[12px]">
                                    <thead className="bg-[#0b0d11]">
                                        <tr className="text-left text-[9px] uppercase tracking-widest text-slate-500">
                                            <th className="px-3 py-2 font-normal">System</th>
                                            <th className="px-2 py-2 font-normal">Class</th>
                                            <th className="px-2 py-2 font-normal">Effect</th>
                                            <th className="px-2 py-2 font-normal">Statics</th>
                                            <th className="px-2 py-2 font-normal">Region</th>
                                            <th className="px-2 py-2 text-right font-normal">Planets</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filtered.slice(0, limit).map((s) => (
                                            <tr
                                                key={s.j}
                                                onClick={() => select(s.j)}
                                                className={`cursor-pointer border-t border-[#1a1d24] transition-colors hover:bg-[#0c1017] ${
                                                    s.j === selectedJ ? "bg-[#08131d]" : ""
                                                }`}
                                            >
                                                <td className="px-3 py-1.5 font-mono text-slate-100">{s.j}</td>
                                                <td className={`px-2 py-1.5 font-semibold ${classTone(s.c)}`}>{classLabel(s.c)}</td>
                                                <td className="px-2 py-1.5">
                                                    <EffectLabel effect={s.e} />
                                                </td>
                                                <td className="px-2 py-1.5">
                                                    <div className="flex flex-wrap gap-1">
                                                        {sortStatics(s.s).map((c) => (
                                                            <StaticBadge key={c} code={c} />
                                                        ))}
                                                    </div>
                                                </td>
                                                <td className="px-2 py-1.5 text-slate-400">{s.r}</td>
                                                <td className="px-2 py-1.5 text-right text-slate-400">{s.p.length}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {systems.length && !filtered.length ? (
                                    <div className="px-3 py-6 text-center text-[12px] text-slate-500">No systems match these filters.</div>
                                ) : null}
                                {filtered.length > limit ? (
                                    <button
                                        type="button"
                                        onClick={() => setLimit(limit + PAGE * 2)}
                                        className="block w-full border-t border-[#262933] py-2 text-[10px] uppercase tracking-widest text-[#8bd3ff] hover:bg-[#0c1017]"
                                    >
                                        Show more ({(filtered.length - limit).toLocaleString()} left)
                                    </button>
                                ) : null}
                            </div>
                        </div>

                        {/* detail */}
                        <div className={`${selected ? "" : "hidden lg:block"}`}>
                            <div className="lg:sticky lg:top-16">
                                {selected ? (
                                    <SystemDetail sys={selected} onClose={() => select(null)} />
                                ) : (
                                    <div className="border border-dashed border-[#30343c] px-4 py-10 text-center text-[11px] text-slate-500">
                                        Select a system to see statics, effect and celestials.
                                        <div className="mt-2 text-slate-600">Tip: paste a full J-code to jump straight to it.</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
