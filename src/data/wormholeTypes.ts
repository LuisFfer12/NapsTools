/*
 * Wormhole reference data shared by the W-Space Systems tool.
 * Static destinations come from Triff.Tools (audited against Anoik.is).
 * Total mass bands are the same ones used by the Rolling Mass chart.
 */

export const DESTINATION_BY_CODE: Record<string, string> = {};

const STATIC_CODES_BY_DESTINATION: Record<string, readonly string[]> = {
    C1: ["E004", "H121", "P060", "Q317", "V301", "Y790", "Z647", "Z971"],
    C2: ["C125", "D364", "D382", "G024", "I182", "L005", "N766", "R943"],
    C3: ["C247", "L477", "M267", "N968", "O477", "O883", "X702", "Z006"],
    C4: ["E175", "M001", "M609", "O128", "T405", "X877", "Y683", "Z457"],
    C5: ["C008", "H296", "H900", "L614", "M555", "N062", "N432", "N770", "V911"],
    C6: ["A982", "B041", "G008", "R474", "S804", "U319", "U574", "V753", "W237"],
    HS: ["N110", "B274", "D845", "S047", "D792", "B520", "A641", "B449", "Q063"],
    LS: ["J244", "A239", "U210", "N290", "C140", "R051", "N944", "V898"],
    NS: ["C248", "E545", "E587", "K329", "K346", "Q003", "S199", "V283", "Z060", "Z142"],
    Thera: ["F353", "F135", "T458", "M164", "L031"],
};

for (const [dest, codes] of Object.entries(STATIC_CODES_BY_DESTINATION)) {
    for (const code of codes) DESTINATION_BY_CODE[code] = dest;
}

const MASS_BANDS: Record<string, readonly string[]> = {
    "1,000 Gg": ["C729", "D364", "F216", "M267", "O128", "R081", "U372", "X450", "X702"],
    "2,000 Gg": [
        "A239", "A641", "B274", "B449", "C247", "D382", "E175", "E545", "G024", "I182",
        "L477", "M164", "N766", "N968", "O477", "T405", "V898", "X877", "Y683", "Z457",
    ],
    "3,000 Gg": [
        "A982", "B041", "B520", "D792", "E587", "H900", "K329", "K346", "L031", "M555",
        "N062", "N290", "N770", "R051", "R474", "S047", "U210", "U574", "V283",
    ],
    "3,300 Gg": ["C140", "C248", "C391", "H296", "N432", "N944", "S199", "U319", "V753", "V911", "W237", "Z142"],
};

const FRIGATE_HOLES = new Set(["E004", "L005", "Z006", "M001", "C008", "G008", "Q003", "A009"]);
// Anything leading into a C1, plus the k-space statics of C1 systems: medium holes, no battleships.
const C1_MEDIUM = new Set([...STATIC_CODES_BY_DESTINATION.C1.filter((c) => c !== "E004"), "N110", "J244", "Z060"]);

export function staticDestination(code: string) {
    return DESTINATION_BY_CODE[code.toUpperCase()] ?? "?";
}

export function staticSize(code: string): string | null {
    const c = code.toUpperCase();
    for (const [mass, codes] of Object.entries(MASS_BANDS)) {
        if (codes.includes(c)) return `${mass} total`;
    }
    if (FRIGATE_HOLES.has(c)) return "Frigate only";
    if (C1_MEDIUM.has(c)) return "Medium (no battleships)";
    return null;
}

const DEST_ORDER = ["C1", "C2", "C3", "C4", "C5", "C6", "HS", "LS", "NS", "Thera", "?"];
export function sortStatics(statics: string[]) {
    return [...statics].sort(
        (a, b) => DEST_ORDER.indexOf(staticDestination(a)) - DEST_ORDER.indexOf(staticDestination(b)) || a.localeCompare(b)
    );
}

/* ---- tones ---- */

export const DEST_TONE: Record<string, string> = {
    C1: "text-[#a8d8e8] border-[#2b4550]",
    C2: "text-[#9cc8e2] border-[#2b4150]",
    C3: "text-[#91b8d4] border-[#2a3c4d]",
    C4: "text-[#d2c28f] border-[#4a4430]",
    C5: "text-[#e0b46a] border-[#55432a]",
    C6: "text-[#e0946a] border-[#55392a]",
    HS: "text-[#7fdba0] border-[#2b4d37]",
    LS: "text-[#e6c56a] border-[#4f4426]",
    NS: "text-[#ef8a8a] border-[#552e2e]",
    Thera: "text-[#c6bdd6] border-[#433d50]",
    "?": "text-slate-300 border-[#30343c]",
};

export function classLabel(raw: string) {
    if (/^\d+$/.test(raw)) return `C${raw}`;
    return raw || "Unknown";
}

export function classTone(raw: string) {
    const label = classLabel(raw);
    return DEST_TONE[label]?.split(" ")[0] ?? "text-[#c6bdd6]";
}

/* ---- effects ---- */

export type EffectMod = { label: string; good: boolean };

// Qualitative summary; strength scales with class (C1 weakest → C6 strongest).
export const EFFECTS: Record<string, { short: string; mods: EffectMod[] }> = {
    Pulsar: {
        short: "Pulsar",
        mods: [
            { label: "Shield HP ↑", good: true },
            { label: "Capacitor recharge ↑", good: true },
            { label: "Armor resists ↓", good: false },
            { label: "Signature radius ↑", good: false },
            { label: "Neut / NOS amount ↑", good: false },
        ],
    },
    "Black Hole": {
        short: "Black Hole",
        mods: [
            { label: "Ship velocity ↑", good: true },
            { label: "Missile velocity ↑", good: true },
            { label: "Targeting range ↑", good: true },
            { label: "Inertia ↑ (worse agility)", good: false },
            { label: "Stasis web strength ↓", good: false },
        ],
    },
    Magnetar: {
        short: "Magnetar",
        mods: [
            { label: "Weapon damage ↑", good: true },
            { label: "Tracking speed ↓", good: false },
            { label: "Drone tracking ↓", good: false },
            { label: "Targeting range ↓", good: false },
            { label: "Missile explosion radius ↑", good: false },
            { label: "Target painter strength ↓", good: false },
        ],
    },
    "Red Giant": {
        short: "Red Giant",
        mods: [
            { label: "Overload bonus ↑", good: true },
            { label: "Smartbomb range & damage ↑", good: true },
            { label: "Bomb damage ↑", good: true },
            { label: "Overheat damage ↑", good: false },
        ],
    },
    "Wolf Rayet": {
        short: "Wolf-Rayet",
        mods: [
            { label: "Armor HP ↑", good: true },
            { label: "Small weapon damage ↑", good: true },
            { label: "Signature radius ↓", good: true },
            { label: "Shield resists ↓", good: false },
        ],
    },
    "Cataclysmic Variable": {
        short: "Cataclysmic",
        mods: [
            { label: "Remote repair amount ↑", good: true },
            { label: "Capacitor capacity ↑", good: true },
            { label: "Local repair / boost ↓", good: false },
            { label: "Capacitor recharge slower", good: false },
        ],
    },
};

export const EFFECT_TONE: Record<string, string> = {
    Pulsar: "text-[#5fb8ff]",
    "Black Hole": "text-[#a98bff]",
    Magnetar: "text-[#ff6fa8]",
    "Red Giant": "text-[#ff7a4d]",
    "Wolf Rayet": "text-[#ffcc3d]",
    "Cataclysmic Variable": "text-[#e040e0]",
};

/** Lowercase anoik.is-style token color for a static destination. */
export const DEST_TEXT: Record<string, string> = {
    HS: "text-[#7fe0b0]",
    LS: "text-[#e8de6a]",
    NS: "text-[#ff6b6b]",
    C1: "text-[#8fd4ff]",
    C2: "text-[#7fc0ff]",
    C3: "text-[#6fa8ff]",
    C4: "text-[#c9a8ff]",
    C5: "text-[#ffae5f]",
    C6: "text-[#ff8a5f]",
    Thera: "text-[#d0c0ff]",
    "?": "text-slate-300",
};
