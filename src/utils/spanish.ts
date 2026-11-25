// The UI has one language (English); Kiloswap's own texts (the hero title,
// terms and privacy) also come in Spanish, shown to browsers that prefer it.
export const prefersSpanish = (): boolean =>
    typeof navigator !== "undefined" &&
    (navigator.languages?.length ? navigator.languages : [navigator.language])
        .slice(0, 1)
        .some((l) => /^es\b/i.test(l ?? ""));
