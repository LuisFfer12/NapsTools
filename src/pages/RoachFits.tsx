/*
 * React page for /RoachFits.
 * Uses local component state, browser APIs, and static data to render the page workflow.
 */

import React, { useMemo, useState } from "react";
import { ToolChrome, ToolEmptyState } from "../components/tool-ui";

import { FIT_DATA, type Marauder, type YesNo } from "../data/fits";

const marauders: Marauder[] = ["Golem", "Vargur", "Paladin", "Kronos"];



function getVariantKey(maraudersV: YesNo, dread: YesNo): "5n" | "5y" | "4n" | "4y" {
    if (maraudersV === "yes" && dread === "no") return "5n";
    if (maraudersV === "yes" && dread === "yes") return "5y";
    if (maraudersV === "no" && dread === "no") return "4n";
    return "4y";
}

function ChoiceButton({
    active,
    onClick,
    children,
}: {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={[
                "px-3 py-1.5 text-[10px] uppercase tracking-widest border transition-colors",
                active
                    ? "border-[#53b6ff] bg-[#0b1622] text-slate-100 shadow-[inset_0_0_0_1px_rgba(83,182,255,0.2)]"
                    : "border-[#3a3c40] bg-[#0b0d11] text-slate-300 hover:bg-[#101319]",
            ].join(" ")}
        >
            {children}
        </button>
    );
}

function HullButton({
    hull,
    selected,
    onClick,
}: {
    hull: Marauder;
    selected: boolean;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={[
                "group w-full border px-3 py-4 text-left transition-colors",
                selected
                    ? "border-[#53b6ff] bg-[#0b1622] shadow-[inset_0_0_0_1px_rgba(83,182,255,0.22)]"
                    : "border-[#3a3c40] bg-[#0b0d11] hover:bg-[#101319]",
            ].join(" ")}
        >
            <div className="flex items-center justify-between gap-3">
                <div>
                    <div className="text-[11px] font-semibold uppercase tracking-widest text-slate-100">
                        {hull}
                    </div>
                    <div className="mt-1 text-[9px] text-slate-400 uppercase tracking-wide">
                        Select Hull
                    </div>
                </div>

                <div
                    className={[
                        "h-3 w-3 border",
                        selected
                            ? "border-[#53b6ff] bg-[#53b6ff] shadow-[0_0_8px_rgba(83,182,255,0.7)]"
                            : "border-[#3a3c40] bg-[#05070b]",
                    ].join(" ")}
                />
            </div>
        </button>
    );
}

export default function RoachFits() {
    const [selectedMarauder, setSelectedMarauder] = useState<Marauder | null>(null);
    const [maraudersV, setMaraudersV] = useState<YesNo | null>(null);
    const [dreadEscalation, setDreadEscalation] = useState<YesNo | null>(null);
    const [copied, setCopied] = useState(false);
    const [imageModalOpen, setImageModalOpen] = useState(false);

    const resolvedFit = useMemo(() => {
        if (!selectedMarauder || !maraudersV || !dreadEscalation) return null;
        const key = getVariantKey(maraudersV, dreadEscalation);
        return FIT_DATA[selectedMarauder][key];
    }, [selectedMarauder, maraudersV, dreadEscalation]);

    const selectionSummary = useMemo(() => {
        if (!selectedMarauder || !maraudersV || !dreadEscalation) return null;

        return {
            hull: selectedMarauder,
            maraudersText: maraudersV === "yes" ? "Marauders V" : "Marauders IV",
            dreadText: dreadEscalation === "yes" ? "Dread Escalations" : "No Dread Escalations",
        };
    }, [selectedMarauder, maraudersV, dreadEscalation]);

    const handleCopy = async () => {
        if (!resolvedFit?.fitText) return;

        try {
            await navigator.clipboard.writeText(resolvedFit.fitText);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1500);
        } catch {
            setCopied(false);
        }
    };



    const resetQuestionsForHull = (hull: Marauder) => {
        setSelectedMarauder(hull);
        setMaraudersV(null);
        setDreadEscalation(null);
        setCopied(false);
    };

    return (
        <div className="tt-tool-v2 tt2-reference-page tt2-roach-fits min-h-screen bg-transparent text-slate-100 leading-snug">
            <div className="mx-auto max-w-[1320px] px-2 py-3 sm:px-4 sm:py-6">
                <div className="tt2-window">
                    <ToolChrome
                        section="Wormholes"
                        title="C5 Roach Fits"
                        badge="Fit Selector"
                        context="Select Hull"
                        status="C5 Marauder Roaching"
                    />

                    <div className="space-y-4 p-2 sm:p-3">

                        <div className="border border-[#262933] bg-[#05070b]/90 px-3 py-3 sm:px-4">
                            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                                <h1 className="text-[15px] font-semibold uppercase tracking-widest text-slate-100">
                                    C5 Ratting Marauder Fits
                                </h1>
                                <p className="text-[12px] text-slate-400">
                                    Pick your hull, then answer the skill and escalation questions to get the matching fit.
                                </p>
                            </div>
                        </div>

                        { }
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[320px_minmax(0,1fr)] xl:grid-cols-[360px_minmax(0,1fr)]">
                            { }
                            <div className="space-y-4">
                                <section className="overflow-hidden border border-[#262933] bg-[#070910]">
                                    <div className="px-3 py-2 border-b border-[#262933] bg-[#0b0d11]">
                                        <h2 className="text-[12px] font-semibold uppercase tracking-widest text-slate-200">
                                            1. Select Marauder
                                        </h2>
                                    </div>

                                    <div className="p-3 grid grid-cols-1 gap-2">
                                        {marauders.map((hull) => (
                                            <HullButton
                                                key={hull}
                                                hull={hull}
                                                selected={selectedMarauder === hull}
                                                onClick={() => resetQuestionsForHull(hull)}
                                            />
                                        ))}
                                    </div>
                                </section>

                                <section className="overflow-hidden border border-[#262933] bg-[#070910]">
                                    <div className="px-3 py-2 border-b border-[#262933] bg-[#0b0d11]">
                                        <h2 className="text-[12px] font-semibold uppercase tracking-widest text-slate-200">
                                            2. Fit Conditions
                                        </h2>
                                    </div>

                                    <div className="p-3 space-y-4">
                                        <div>
                                            <div className="mb-2 text-[10px] uppercase tracking-widest text-slate-400">
                                                Do you have Marauders V?
                                            </div>
                                            <div className="grid grid-cols-2 gap-2">
                                                <ChoiceButton
                                                    active={maraudersV === "yes"}
                                                    onClick={() => setMaraudersV("yes")}
                                                >
                                                    Yes
                                                </ChoiceButton>
                                                <ChoiceButton
                                                    active={maraudersV === "no"}
                                                    onClick={() => setMaraudersV("no")}
                                                >
                                                    No
                                                </ChoiceButton>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="mb-2 text-[10px] uppercase tracking-widest text-slate-400">
                                                Will you be running dread escalations?
                                            </div>
                                            <div className="grid grid-cols-2 gap-2">
                                                <ChoiceButton
                                                    active={dreadEscalation === "yes"}
                                                    onClick={() => setDreadEscalation("yes")}
                                                >
                                                    Yes
                                                </ChoiceButton>
                                                <ChoiceButton
                                                    active={dreadEscalation === "no"}
                                                    onClick={() => setDreadEscalation("no")}
                                                >
                                                    No
                                                </ChoiceButton>
                                            </div>
                                        </div>

                                        <div className="border border-[#1f2d3d] bg-[#07111b] px-3 py-2 text-[10px] text-slate-300">
                                            <div className="uppercase tracking-widest text-[#8dcfff] mb-1">
                                                Notes
                                            </div>
                                            <p className="text-slate-400 leading-relaxed">
                                                !! IMPORTANT !! These fits assume you have relevant skills to IV/V, ESPECIALLY Armor compensations, armor and shield repair affecting skills and most importantly CAPACITOR related skills. When in doubt, ask a friend or better yet: Run in a group!
                                            </p>
                                        </div>
                                    </div>
                                </section>
                            </div>

                            { }
                            <div className="space-y-4">
                                <section className="overflow-hidden border border-[#262933] bg-[#070910]">
                                    <div className="px-3 py-2 border-b border-[#262933] bg-[#0b0d11] flex items-center justify-between gap-3">
                                        <h2 className="text-[10px] font-semibold uppercase tracking-widest text-slate-200">
                                            Recommended Fit
                                        </h2>

                                        {selectionSummary ? (
                                            <div className="flex flex-wrap justify-end gap-2 text-[8px] uppercase tracking-widest">
                                                <span className="border border-[#3a3c40] bg-[#05070b] px-2 py-1 text-slate-300">
                                                    {selectionSummary.hull}
                                                </span>
                                                <span className="border border-[#3a3c40] bg-[#05070b] px-2 py-1 text-slate-300">
                                                    {selectionSummary.maraudersText}
                                                </span>
                                                <span className="border border-[#3a3c40] bg-[#05070b] px-2 py-1 text-slate-300">
                                                    {selectionSummary.dreadText}
                                                </span>
                                            </div>
                                        ) : null}
                                    </div>

                                    {!resolvedFit ? (
                                        <div className="p-3 sm:p-5">
                                            <ToolEmptyState title="Awaiting selection">
                                                Select a marauder, then answer both fit-condition questions.
                                            </ToolEmptyState>
                                        </div>
                                    ) : (
                                        <div className="p-3 space-y-4">
                                            <div className="border border-[#262933] bg-[#05070b]">
                                                <div className="px-3 py-2 border-b border-[#262933] bg-[#0b0d11] flex items-center justify-between text-[9px] uppercase tracking-widest text-slate-400">
                                                    <span>Pyfa Preview</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => setImageModalOpen(true)}
                                                        className="px-2 py-1 border border-[#3a3c40] bg-[#101319] text-slate-200 hover:bg-[#151922]"
                                                    >
                                                        Expand
                                                    </button>
                                                </div>
                                                <div className="p-3">
                                                    <button
                                                        type="button"
                                                        onClick={() => setImageModalOpen(true)}
                                                        className="block w-full border border-[#3a3c40] bg-black/40 overflow-hidden hover:border-[#53b6ff] transition-colors"
                                                        title="Click to open full-size image"
                                                    >
                                                        <img
                                                            src={resolvedFit.image}
                                                            alt={`${selectionSummary?.hull ?? "Marauder"} fit preview`}
                                                            className="block w-full h-auto"
                                                        />
                                                    </button>
                                                </div>
                                            </div>

                                            { }
                                            <div className="grid grid-cols-1 2xl:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] gap-4">
                                                <div className="border border-[#262933] bg-[#05070b]">
                                                    <div className="px-3 py-2 border-b border-[#262933] bg-[#0b0d11] flex items-center justify-between gap-3">
                                                        <div className="text-[9px] uppercase tracking-widest text-slate-400">
                                                            Click-To-Copy Fit
                                                        </div>

                                                        <div className="flex flex-wrap justify-end gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={handleCopy}
                                                                className="px-2 py-1 text-[9px] uppercase tracking-widest border border-[#3a3c40] bg-[#101319] text-slate-200 hover:bg-[#151922]"
                                                            >
                                                                {copied ? "Copied" : "Copy Fit"}
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div className="p-3">
                                                        
                                                        <button
                                                            type="button"
                                                            onClick={handleCopy}
                                                            className="w-full text-left border border-[#3a3c40] bg-[#070910] hover:bg-[#0c1017] transition-colors"
                                                            title="Click to copy fit"
                                                        >
                                                            <pre className="whitespace-pre-wrap break-words px-3 py-3 text-[10px] leading-relaxed text-slate-200 font-mono">
                                                                {resolvedFit.fitText}
                                                            </pre>
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="border border-[#262933] bg-[#05070b]">
                                                    <div className="px-3 py-2 border-b border-[#262933] bg-[#0b0d11] text-[10px] uppercase tracking-widest text-slate-400">
                                                        Fit Notes
                                                    </div>

                                                    <div className="p-3">
                                                        <div className="border border-[#1f2d3d] bg-[#07111b] px-3 py-3">
                                                            <p className="text-[11px] leading-relaxed text-slate-300 whitespace-pre-wrap">
                                                                {resolvedFit.notes}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {imageModalOpen && resolvedFit && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-4 py-4"
                    onClick={() => setImageModalOpen(false)}
                >
                    <div
                        className="relative max-w-[95vw] max-h-[95vh] border border-[#3a3c40] bg-[#05070b] shadow-[0_0_32px_rgba(0,0,0,0.95)]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between px-3 py-2 border-b border-[#262933] bg-[#0b0d11]">
                            <div className="text-[9px] uppercase tracking-widest text-slate-300">
                                {selectionSummary?.hull ?? "Fit"} ▸ Full Resolution Preview
                            </div>
                            <button
                                type="button"
                                onClick={() => setImageModalOpen(false)}
                                className="px-2 py-1 text-[9px] uppercase tracking-widest border border-[#3a3c40] bg-[#101319] text-slate-200 hover:bg-[#151922]"
                            >
                                Close
                            </button>
                        </div>

                        <div className="p-3 overflow-auto max-h-[calc(95vh-42px)]">
                            <img
                                src={resolvedFit.image}
                                alt={`${selectionSummary?.hull ?? "Marauder"} fit preview full size`}
                                className="block max-w-full h-auto"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
