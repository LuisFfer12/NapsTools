/*
 * Krab C5 bookmarking guide.
 *
 * To add or update an anomaly:
 *   1. Drop the screenshot in src/assets/bookmarks/ (jpg/png/webp).
 *   2. Import it below and set `image` on the matching entry.
 *   3. Write the bookmark position in `bookmark` (short, as it appears in the screenshot title).
 * Entries without `image` show an "image pending" placeholder.
 */

import coreGarrison from "../assets/bookmarks/c5-core-garrison.jpg";
import coreStronghold from "../assets/bookmarks/c5-core-stronghold.jpg";
import quarantineArea from "../assets/bookmarks/c5-quarantine-area.jpg";
import oruzeOsobnyk from "../assets/bookmarks/c5-oruze-osobnyk.jpg";

export type BookmarkEntry = {
    /** Anomaly name exactly as it appears in the probe scanner. */
    site: string;
    /** Where to drop the bookmark. */
    bookmark: string;
    /** Reference object on grid used to place the bookmark, if any. */
    anchor?: string;
    image?: string;
    notes?: string;
};

export const C5_BOOKMARKS: BookmarkEntry[] = [
    {
        site: "Core Garrison",
        bookmark: "7.5km diagonal from Observation Dome",
        anchor: "Talocan Observation Dome",
        image: coreGarrison,
    },
    {
        site: "Core Stronghold",
        bookmark: "20km from Static Gate, 9km from Orthrus",
        anchor: "Talocan Static Gate",
        image: coreStronghold,
    },
    {
        site: "Quarantine Area",
        bookmark: "Warp at 0km",
        anchor: "Talocan Exchange Depot (~51km)",
        image: quarantineArea,
    },
    {
        site: "Oruze Osobnyk",
        bookmark: "5km from the lowest Sleeper Enclave",
        anchor: "Sleeper Enclave (lowest one)",
        image: oruzeOsobnyk,
    },
];
