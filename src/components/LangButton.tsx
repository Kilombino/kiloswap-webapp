import { For, Show, createSignal, onCleanup, onMount } from "solid-js";

import { useGlobalContext } from "../context/Global";
import dict from "../i18n/i18n";
import "../style/langbutton.scss";

// Kiloswap: a floating language switch, bottom right. The language starts as
// the browser's when we have it (English otherwise); a choice here is kept
// (localStorage, via i18nConfigured) and wins from then on.
const LangButton = () => {
    const { i18n, setI18nConfigured, t } = useGlobalContext();
    const [open, setOpen] = createSignal(false);
    let ref: HTMLDivElement | undefined;
    const langs = Object.keys(dict) as (keyof typeof dict)[];
    const close = (e: MouseEvent) => {
        if (ref && !ref.contains(e.target as Node)) setOpen(false);
    };
    // Phones: the switch moves up under the header while a full-width action button
    // (create swap, pay, refund…) is on screen, so it never covers it
    const [aside, setAside] = createSignal(false);
    let io: IntersectionObserver | undefined;
    let mo: MutationObserver | undefined;
    const watched = new Set<Element>();
    const visible = new Set<Element>();
    const scan = () => {
        if (!io) return;
        document
            .querySelectorAll("#create-swap-button, .frame .btn:not(.btn-light)")
            .forEach((el) => {
                if (!watched.has(el)) {
                    watched.add(el);
                    io!.observe(el);
                }
            });
    };
    onMount(() => {
        document.addEventListener("click", close);
        if (typeof IntersectionObserver === "undefined") return;
        io = new IntersectionObserver((entries) => {
            for (const e of entries) {
                if (e.isIntersecting) visible.add(e.target);
                else visible.delete(e.target);
            }
            setAside(visible.size > 0 && window.innerWidth <= 900);
        });
        scan();
        mo = new MutationObserver(scan);
        mo.observe(document.body, { childList: true, subtree: true });
    });
    onCleanup(() => {
        document.removeEventListener("click", close);
        io?.disconnect();
        mo?.disconnect();
    });
    return (
        <div
            class="lang-float"
            classList={{ aside: aside() }}
            ref={ref}
            data-testid="lang-float">
            <Show when={open()}>
                <ul class="lang-menu" role="listbox" aria-label={t("language_choose")}>
                    <For each={langs}>
                        {(lang) => (
                            <li>
                                <button
                                    type="button"
                                    role="option"
                                    aria-selected={i18n() === lang}
                                    classList={{ active: i18n() === lang }}
                                    data-testid={`lang-${lang}`}
                                    onClick={() => {
                                        setI18nConfigured(lang);
                                        setOpen(false);
                                    }}>
                                    {dict[lang].language}
                                </button>
                            </li>
                        )}
                    </For>
                </ul>
            </Show>
            <button
                type="button"
                class="lang-toggle"
                aria-label={t("language_choose")}
                aria-expanded={open()}
                data-testid="lang-toggle"
                onClick={() => setOpen(!open())}>
                <span aria-hidden="true">🌐</span>
                <span class="lang-code">{(i18n() || "en").toUpperCase()}</span>
            </button>
        </div>
    );
};

export default LangButton;
