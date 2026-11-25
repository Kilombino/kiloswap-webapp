import { createSignal } from "solid-js";

// Kiloswap: swaps whose rescue-key backup step the user chose to skip. Kept
// per swap (localStorage), so skipping once never silences the step for
// later swaps. The keys themselves stay saved in the browser as always.
const KEY = "kiloswapBackupSkipped";

const read = (): string[] => {
    try {
        const v = JSON.parse(localStorage.getItem(KEY) ?? "[]");
        return Array.isArray(v) ? v.filter((x) => typeof x === "string") : [];
    } catch {
        return [];
    }
};

const [skipped, setSkipped] = createSignal<string[]>(read());

export const backupSkipped = (id: string | undefined): boolean =>
    id !== undefined && skipped().includes(id);

export const skipBackup = (id: string) => {
    const next = [...new Set([...skipped(), id])].slice(-500);
    try {
        localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
        // storage full or blocked: the skip still holds for this session
    }
    setSkipped(next);
    // Ask the browser to keep this site's storage (the keys live there);
    // never block on the answer
    void navigator.storage?.persist?.().catch(() => undefined);
};
