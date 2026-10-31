/*
 * W-Space Systems: every wormhole system, filterable by class, statics, effect
 * and planet types, shown as an Anoikis → region → constellation tree in the
 * style of anoik.is/systems.
 * Data: public/data/systems.json (built from Triff.Tools enriched_systems.json).
 */

import { Fragment, useEffect, useMemo, useState, type ReactNode } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowLeft, ExternalLink, Search, Sparkles, X } from "lucide-react";
import { ToolChrome } from "../components/tool-ui";
import {
    DEST_TEXT,
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

type Mode = "any" | "all";

const CLASS_OPTIONS = [
    { value: "1", label: "C1" },
    { value: "2", label: "C2" },
    { value: "3", label: "C3" },
    { value: "4", label: "C4" },
    { value: "5", label: "C5" },
    { value: "6", label: "C6" },
    { value: "13", label: "C13" },
    { value: "Drifter", label: "Drifter" },
];
const DRIFTER = new Set(["Sentinel", "Barbican", "Vidette", "Redoubt", "Conflux"]);
const STATIC_OPTIONS = ["HS", "LS", "NS", "C1", "C2", "C3", "C4", "C5", "C6"];
const EFFECT_OPTIONS = ["none", ...Object.keys(EFFECTS)];
const PLANET_OPTIONS = ["Barren", "Gas", "Ice", "Lava", "Oceanic", "Plasma", "Storm", "Temperate", "Shattered"];

const isShattered = (s: WSystem) => s.p.some(([t]) => t === "Shattered");
const classKey = (s: WSystem) => (DRIFTER.has(s.c) ? "Drifter" : s.c);
const lc = (v: string) => (/^C\d+$/.test(v) || v.length <= 2 ? v.toLowerCase() : v);

function toggle(set: Set<string>, value: string) {
    const next = new Set(set);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    return next;
}

/* ---------------- filter UI ---------------- */

function Chip({ active, onClick, children, tone }: { active: boolean; onClick: () => void; children: ReactNode; tone?: string }) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={active}
            className={`border px-2 py-1 text-[11px] transition-colors ${
                active
                    ? "border-[#53b6ff]/80 bg-[#0b1d2c] text-slate-100"
                    : `border-[#30343c] bg-[#05070b] hover:bg-[#0c1017] ${tone ?? "text-slate-300"}`
            }`}
        >
            {children}
        </button>
    );
}

function ModeToggle({ mode, onChange }: { mode: Mode; onChange: (m: Mode) => void }) {
    return (
        <div className="inline-flex border border-[#30343c] text-[9px] uppercase tracking-widest">
            {(["any", "all"] as Mode[]).map((m) => (
                <button
                    key={m}
                    type="button"
                    onClick={() => onChange(m)}
                    className={`px-1.5 py-0.5 ${mode === m ? "bg-[#0b1d2c] text-[#8bd3ff]" : "text-slate-500 hover:text-slate-300"}`}
                >
                    {m}
                </button>
            ))}
        </div>
    );
}

function FilterRow({ label, extra, children }: { label: string; extra?: ReactNode; children: ReactNode }) {
    return (
        <div className="flex flex-col gap-1.5 sm:flex-row sm:items-start">
            <div className="flex w-28 shrink-0 items-center gap-2 pt-1 text-[9px] uppercase tracking-widest text-slate-500">
                {label}
                {extra}
            </div>
            <div className="flex flex-wrap gap-1.5">{children}</div>
        </div>
    );
}

/* ---------------- tree (anoik.is style) ---------------- */

/** Vertical label + bracket wrapping a group of rows. */
function Bracket({
    label,
    labelClass,
    sticky,
    children,
}: {
    label: ReactNode;
    labelClass?: string;
    /** Keep the label pinned at the top while scrolling long groups. */
    sticky?: boolean;
    children: ReactNode;
}) {
    return (
        <div className="flex items-stretch">
            <div className={`flex w-5 shrink-0 justify-center ${sticky ? "items-start pt-3" : "items-center"}`}>
                <span
                    className={`whitespace-nowrap text-[12px] leading-none ${sticky ? "sticky top-16" : ""} ${labelClass ?? "text-slate-400"}`}
                    style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                >
                    {label}
                </span>
            </div>
            <div className="w-1.5 shrink-0 border-y border-l border-[#4a5160]" aria-hidden="true" />
            <div className="min-w-0 flex-1 py-2 pl-1.5">{children}</div>
        </div>
    );
}

function StaticsText({ statics }: { statics: string[] }) {
    if (!statics.length) return <span className="text-slate-500">no static</span>;
    const sorted = sortStatics(statics);
    return (
        <span>
            {sorted.map((code, i) => {
                const dest = staticDestination(code);
                return (
                    <Fragment key={code}>
                        {i > 0 ? <span className="text-slate-400">/</span> : null}
                        <span className={`font-semibold ${DEST_TEXT[dest] ?? DEST_TEXT["?"]}`} title={code}>
                            {lc(dest)}
                        </span>
                    </Fragment>
                );
            })}
            <span className="text-slate-300"> {sorted.length > 1 ? "statics" : "static"}</span>
        </span>
    );
}

function SystemRow({ sys, selected, onSelect }: { sys: WSystem; selected: boolean; onSelect: () => void }) {
    const extras = [
        sys.e ? (
            <span key="e" className={EFFECT_TONE[sys.e] ?? "text-slate-200"}>
                {sys.e === "Wolf Rayet" ? "Wolf-Rayet" : sys.e}
            </span>
        ) : null,
        isShattered(sys) ? (
            <span key="sh" className="text-slate-300">
                Shattered
            </span>
        ) : null,
    ].filter(Boolean);

    return (
        <div
            className={`grid grid-cols-[minmax(0,9.5rem)_minmax(0,1fr)] gap-x-4 px-1 py-[1px] text-[14px] leading-[1.35] sm:grid-cols-[9.5rem_11rem_minmax(0,1fr)] ${
                selected ? "bg-[#0b1d2c]" : "hover:bg-white/[0.03]"
            }`}
        >
            <button type="button" onClick={onSelect} className="text-left text-[#33c233] hover:text-[#5fe05f]">
                <span className="underline underline-offset-2">{sys.j}</span>
                <span className="ml-1.5">({classLabel(sys.c).toLowerCase()})</span>
            </button>
            <div className="whitespace-nowrap">
                <StaticsText statics={sys.s} />
            </div>
            <div className="col-span-2 pl-3 sm:col-span-1 sm:pl-0">
                {extras.map((node, i) => (
                    <Fragment key={i}>
                        {i > 0 ? <span className="text-slate-400">, </span> : null}
                        {node}
                    </Fragment>
                ))}
            </div>
        </div>
    );
}

type RegionGroup = { region: string; cls: string | null; constellations: { name: string; systems: WSystem[] }[] };

function groupTree(systems: WSystem[]): RegionGroup[] {
    const regions = new Map<string, Map<string, WSystem[]>>();
    for (const s of systems) {
        if (!regions.has(s.r)) regions.set(s.r, new Map());
        const cons = regions.get(s.r)!;
        if (!cons.has(s.k)) cons.set(s.k, []);
        cons.get(s.k)!.push(s);
    }
    return [...regions.entries()]
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([region, cons]) => {
            const all = [...cons.values()].flat();
            const classes = new Set(all.map((s) => s.c));
            return {
                region,
                cls: classes.size === 1 ? classLabel(all[0].c).toLowerCase() : null,
                constellations: [...cons.entries()]
                    .sort(([a], [b]) => a.localeCompare(b))
                    .map(([name, list]) => ({ name, systems: list.sort((a, b) => a.j.localeCompare(b.j)) })),
            };
        });
}

/* ---------------- detail panel ---------------- */

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

function Section({ title, children }: { title: string; children: ReactNode }) {
    return (
        <div className="border-t border-[#262933] px-4 py-3">
            <div className="mb-2 text-[9px] uppercase tracking-widest text-slate-500">{title}</div>
            {children}
        </div>
    );
}

function toRoman(n: number) {
    const map: [number, string][] = [[10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]];
    let out = "";
    for (const [v, s] of map) while (n >= v) { out += s; n -= v; }
    return out;
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

/* ---------------- page ---------------- */

const PAGE = 400;

export default function WSystems() {
    const [systems, setSystems] = useState<WSystem[]>([]);
    const [error, setError] = useState("");
    const [params, setParams] = useSearchParams();

    const [query, setQuery] = useState("");
    const [classes, setClasses] = useState<Set<string>>(new Set());
    const [statics, setStatics] = useState<Set<string>>(new Set());
    const [staticMode, setStaticMode] = useState<Mode>("any");
    const [effects, setEffects] = useState<Set<string>>(new Set());
    const [planets, setPlanets] = useState<Set<string>>(new Set());
    const [planetMode, setPlanetMode] = useState<Mode>("all");
    const [limit, setLimit] = useState(PAGE);

    const selectedJ = params.get("j")?.toUpperCase() ?? null;

    useEffect(() => {
        fetch(`${import.meta.env.BASE_URL}data/systems.json`)
            .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
            .then(setSystems)
            .catch((e) => setError(String(e.message || e)));
    }, []);

    const filtered = useMemo(() => {
        const q = query.trim().toUpperCase();
        // A J-code search finds the system regardless of the other filters.
        if (/^J\d/.test(q)) return systems.filter((s) => s.j.includes(q));

        const wantStatics = [...statics];
        const wantPlanets = [...planets];
        return systems.filter((s) => {
            if (q && !s.r.toUpperCase().includes(q) && !s.k.toUpperCase().includes(q)) return false;
            if (classes.size && !classes.has(classKey(s))) return false;
            if (effects.size && !effects.has(s.e || "none")) return false;
            if (wantStatics.length) {
                const dests = s.s.map(staticDestination);
                const ok =
                    staticMode === "any"
                        ? wantStatics.some((d) => dests.includes(d))
                        : wantStatics.every((d) => dests.includes(d));
                if (!ok) return false;
            }
            if (wantPlanets.length) {
                const types = new Set(s.p.map(([t]) => t));
                const ok =
                    planetMode === "any" ? wantPlanets.some((t) => types.has(t)) : wantPlanets.every((t) => types.has(t));
                if (!ok) return false;
            }
            return true;
        });
    }, [systems, query, classes, effects, statics, staticMode, planets, planetMode]);

    useEffect(() => setLimit(PAGE), [filtered]);

    const tree = useMemo(() => groupTree(filtered.slice(0, limit)), [filtered, limit]);
    const selected = useMemo(() => systems.find((s) => s.j === selectedJ) ?? null, [systems, selectedJ]);

    const select = (j: string | null) => {
        const next = new URLSearchParams(params);
        if (j) next.set("j", j);
        else next.delete("j");
        setParams(next, { replace: true });
    };

    useEffect(() => {
        const q = query.trim().toUpperCase();
        if (/^J\d{6}$/.test(q) && systems.some((s) => s.j === q)) select(q);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query, systems]);

    const anyFilter = query || classes.size || statics.size || effects.size || planets.size;
    const clearAll = () => {
        setQuery("");
        setClasses(new Set());
        setStatics(new Set());
        setEffects(new Set());
        setPlanets(new Set());
    };

    const pct = systems.length ? ((filtered.length / systems.length) * 100).toFixed(2) : "0";

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
                    />

                    <div className="grid grid-cols-1 gap-4 p-3 sm:p-4 lg:grid-cols-[minmax(0,1fr)_380px]">
                        <div className={`min-w-0 space-y-3 ${selected ? "hidden lg:block" : ""}`}>
                            {/* filters */}
                            <div className="space-y-2.5 border border-[#262933] bg-[#0b0d11]/80 p-3">
                                <div className="relative">
                                    <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
                                    <input
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        placeholder="J-code, region or constellation…"
                                        className="w-full border border-[#30343c] bg-[#05070b] py-2 pl-8 pr-3 font-mono text-[12px] text-slate-100 placeholder:font-sans placeholder:text-slate-600 focus:border-[#53b6ff]/70 focus:outline-none"
                                    />
                                </div>

                                <FilterRow label="System class">
                                    {CLASS_OPTIONS.map((o) => (
                                        <Chip key={o.value} active={classes.has(o.value)} onClick={() => setClasses(toggle(classes, o.value))}>
                                            {o.label}
                                        </Chip>
                                    ))}
                                </FilterRow>

                                <FilterRow label="Statics" extra={<ModeToggle mode={staticMode} onChange={setStaticMode} />}>
                                    {STATIC_OPTIONS.map((d) => (
                                        <Chip
                                            key={d}
                                            active={statics.has(d)}
                                            onClick={() => setStatics(toggle(statics, d))}
                                            tone={`${DEST_TEXT[d]} font-semibold`}
                                        >
                                            {lc(d)}
                                        </Chip>
                                    ))}
                                </FilterRow>

                                <FilterRow label="Effect">
                                    {EFFECT_OPTIONS.map((e) => (
                                        <Chip
                                            key={e}
                                            active={effects.has(e)}
                                            onClick={() => setEffects(toggle(effects, e))}
                                            tone={e === "none" ? "text-slate-400" : EFFECT_TONE[e]}
                                        >
                                            {e === "none" ? "No effect" : EFFECTS[e].short}
                                        </Chip>
                                    ))}
                                </FilterRow>

                                <FilterRow label="Planet types" extra={<ModeToggle mode={planetMode} onChange={setPlanetMode} />}>
                                    {PLANET_OPTIONS.map((t) => (
                                        <Chip key={t} active={planets.has(t)} onClick={() => setPlanets(toggle(planets, t))}>
                                            {t}
                                        </Chip>
                                    ))}
                                </FilterRow>

                                <div className="flex items-center justify-between pt-1 text-[10px] text-slate-500">
                                    <span>
                                        <b className="text-slate-400">any</b> = at least one selected ·{" "}
                                        <b className="text-slate-400">all</b> = every selected
                                    </span>
                                    {anyFilter ? (
                                        <button type="button" onClick={clearAll} className="uppercase tracking-widest hover:text-slate-200">
                                            Clear filters
                                        </button>
                                    ) : null}
                                </div>
                            </div>

                            {error ? (
                                <div className="border border-[#6b2b32] bg-[#1d090b] px-3 py-2 text-[11px] text-[#ffaaaa]">Could not load systems: {error}</div>
                            ) : null}

                            {/* tree */}
                            <div className="border border-[#262933] bg-[#05070b]/90 px-2 py-3 sm:px-4">
                                <div className="mb-3 text-[14px] text-slate-300">
                                    Showing {filtered.length.toLocaleString()} ({pct}%) of {systems.length.toLocaleString()} Anoikis systems:
                                </div>

                                {filtered.length ? (
                                    <div>
                                        <Bracket label="Anoikis" labelClass="text-slate-300" sticky>
                                            {tree.map((rg) => (
                                                <Bracket
                                                    key={rg.region}
                                                    label={
                                                        <>
                                                            {rg.region}
                                                            {rg.cls ? ` (${rg.cls})` : ""}
                                                        </>
                                                    }
                                                    labelClass="text-[#33c233]"
                                                    sticky={rg.constellations.reduce((n, c) => n + c.systems.length, 0) > 12}
                                                >
                                                    {rg.constellations.map((cn) => (
                                                        <Bracket key={cn.name} label={cn.name} labelClass="text-[#33c233] text-[11px]">
                                                            <div className="flex min-h-[4.5rem] flex-col justify-center">
                                                                {cn.systems.map((s) => (
                                                                    <SystemRow
                                                                        key={s.j}
                                                                        sys={s}
                                                                        selected={s.j === selectedJ}
                                                                        onSelect={() => select(s.j)}
                                                                    />
                                                                ))}
                                                            </div>
                                                        </Bracket>
                                                    ))}
                                                </Bracket>
                                            ))}
                                        </Bracket>
                                    </div>
                                ) : systems.length ? (
                                    <div className="py-6 text-center text-[12px] text-slate-500">No systems match these filters.</div>
                                ) : null}

                                {filtered.length > limit ? (
                                    <button
                                        type="button"
                                        onClick={() => setLimit(limit + PAGE)}
                                        className="mt-3 block w-full border border-[#262933] py-2 text-[10px] uppercase tracking-widest text-[#8bd3ff] hover:bg-[#0c1017]"
                                    >
                                        Show more ({(filtered.length - limit).toLocaleString()} left)
                                    </button>
                                ) : null}
                            </div>
                        </div>

                        <div className={selected ? "" : "hidden lg:block"}>
                            <div className="lg:sticky lg:top-16">
                                {selected ? (
                                    <SystemDetail sys={selected} onClose={() => select(null)} />
                                ) : (
                                    <div className="border border-dashed border-[#30343c] px-4 py-10 text-center text-[11px] text-slate-500">
                                        Click a system to see statics, effect and celestials.
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
