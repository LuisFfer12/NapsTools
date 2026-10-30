/*
 * Krab C5 bookmarking guide: one card per C5 combat anomaly with the
 * bookmark position and an annotated in-game screenshot.
 * Data lives in src/data/bookmarks.ts.
 */

import { useEffect, useState } from "react";
import { Bookmark, ImageOff, X } from "lucide-react";
import { ToolChrome } from "../components/tool-ui";
import { C5_BOOKMARKS, type BookmarkEntry } from "../data/bookmarks";

function Lightbox({ entry, onClose }: { entry: BookmarkEntry; onClose: () => void }) {
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 sm:p-8"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label={`${entry.site} bookmark screenshot`}
        >
            <div className="relative max-h-full max-w-[1400px]" onClick={(e) => e.stopPropagation()}>
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute -top-9 right-0 flex items-center gap-1 text-[10px] uppercase tracking-widest text-slate-300 hover:text-white"
                >
                    <X className="h-3.5 w-3.5" /> Close
                </button>
                <img
                    src={entry.image}
                    alt={`${entry.site} — ${entry.bookmark}`}
                    className="block max-h-[85vh] w-auto border border-[#3a3c40]"
                />
                <div className="mt-2 text-center text-[11px] text-slate-300">
                    <span className="font-semibold text-slate-100">{entry.site}</span> · {entry.bookmark}
                </div>
            </div>
        </div>
    );
}

function BookmarkCard({ entry, onOpen }: { entry: BookmarkEntry; onOpen: () => void }) {
    const pending = !entry.image;

    return (
        <section className="flex flex-col border border-[#262933] bg-[#05070b]">
            <header className="flex items-start justify-between gap-3 border-b border-[#262933] bg-[#0b0d11] px-3 py-2">
                <div className="min-w-0">
                    <div className="text-sm font-semibold text-slate-100">{entry.site}</div>
                    <div className="text-[10px] uppercase tracking-widest text-slate-500">C5 • Combat Site</div>
                </div>
                {pending ? (
                    <span className="shrink-0 border border-[#5a4a1f] bg-[#1a1408] px-1.5 py-0.5 text-[9px] uppercase tracking-widest text-[#e8c36a]">
                        Pending
                    </span>
                ) : null}
            </header>

            <div className="flex items-start gap-2 border-b border-[#262933] px-3 py-2.5">
                <Bookmark className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#53b6ff]" />
                <div className="min-w-0 text-[12px] leading-snug">
                    <div className="font-semibold text-[#8bd3ff]">{entry.bookmark}</div>
                    {entry.anchor ? <div className="mt-0.5 text-[11px] text-slate-400">Anchor: {entry.anchor}</div> : null}
                    {entry.notes ? <div className="mt-1 text-[11px] text-slate-300">{entry.notes}</div> : null}
                </div>
            </div>

            <div className="p-3">
                {pending ? (
                    <div className="flex aspect-[16/11] w-full flex-col items-center justify-center gap-2 border border-dashed border-[#30343c] bg-[#070910] text-slate-500">
                        <ImageOff className="h-5 w-5" />
                        <span className="text-[10px] uppercase tracking-widest">Image pending</span>
                    </div>
                ) : (
                    <button
                        type="button"
                        onClick={onOpen}
                        className="block w-full overflow-hidden border border-[#3a3c40] bg-black/40 transition-colors hover:border-[#53b6ff]"
                        title="Click to open full-size image"
                    >
                        <img
                            src={entry.image}
                            alt={`${entry.site} — ${entry.bookmark}`}
                            loading="lazy"
                            className="block h-auto w-full"
                        />
                    </button>
                )}
            </div>
        </section>
    );
}

export default function BookmarkGuide() {
    const [open, setOpen] = useState<BookmarkEntry | null>(null);
    const ready = C5_BOOKMARKS.filter((b) => b.image).length;

    return (
        <div className="tt-tool-v2 tt2-reference-page min-h-screen leading-snug text-slate-100">
            <div className="mx-auto max-w-[1320px] px-2 py-3 sm:px-4 sm:py-6">
                <div className="tt2-window">
                    <ToolChrome
                        section="Wormholes"
                        title="Krab C5 Bookmarking Guide"
                        badge="Reference"
                        context="C5 Anomalies"
                        status={`${ready}/${C5_BOOKMARKS.length} bookmarks mapped`}
                    />

                    <div className="space-y-4 p-3 sm:p-4">
                        <div className="border border-[#262933] bg-[#0b0d11]/80 px-4 py-3 text-[12px] leading-relaxed text-slate-300">
                            Where to drop the warp-in bookmark for each C5 combat anomaly. Warp to the
                            anomaly, burn to the position shown, save the bookmark, and the fleet can warp
                            straight to it on every run. Click a screenshot to view it full size.
                        </div>

                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                            {C5_BOOKMARKS.map((entry) => (
                                <BookmarkCard key={entry.site} entry={entry} onOpen={() => setOpen(entry)} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {open ? <Lightbox entry={open} onClose={() => setOpen(null)} /> : null}
        </div>
    );
}
