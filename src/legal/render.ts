// A tiny Markdown renderer for Kiloswap's own legal texts (terms and
// privacy), which are trusted, static files bundled at build time. It covers
// what those texts use: headings, paragraphs, lists, tables, bold, inline
// code and links. Everything is HTML-escaped first.

const esc = (s: string) =>
    s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");

const inline = (s: string) =>
    esc(s)
        .replace(/`([^`]+)`/g, "<code>$1</code>")
        .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
        .replace(
            /\[([^\]]+)\]\((https:\/\/[^)\s]+)\)/g,
            '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
        );

export const renderLegal = (md: string): string => {
    const out: string[] = [];
    const lines = md.replace(/\r/g, "").split("\n");
    let para: string[] = [];
    let list: string[] | null = null;
    let table: string[][] | null = null;
    const flush = () => {
        if (para.length) out.push(`<p>${inline(para.join(" "))}</p>`);
        para = [];
        if (list) out.push(`<ul>${list.map((l) => `<li>${inline(l)}</li>`).join("")}</ul>`);
        list = null;
        if (table) {
            const rows = table.filter((r) => !r.every((c) => /^-*$/.test(c.trim())));
            const body = rows
                .filter((r) => r.some((c) => c.trim() !== ""))
                .map((r) => `<tr>${r.map((c) => `<td>${inline(c.trim())}</td>`).join("")}</tr>`)
                .join("");
            out.push(`<table>${body}</table>`);
        }
        table = null;
    };
    for (const line of lines) {
        const t = line.trim();
        if (t === "" || t === "---") { flush(); continue; }
        const h = /^(#{1,3})\s+(.*)$/.exec(t);
        if (h) { flush(); const n = h[1].length; out.push(`<h${n}>${inline(h[2])}</h${n}>`); continue; }
        if (t.startsWith("|")) {
            if (para.length || list) flush();
            table ??= [];
            table.push(t.replace(/^\||\|$/g, "").split("|"));
            continue;
        }
        if (/^- /.test(t)) {
            if (para.length || table) flush();
            list ??= [];
            list.push(t.slice(2));
            continue;
        }
        if (list && /^\s+\S/.test(line)) { list[list.length - 1] += " " + t; continue; }
        if (list || table) flush();
        para.push(t);
    }
    flush();
    return out.join("\n");
};
