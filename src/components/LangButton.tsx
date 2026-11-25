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
    onMount(() => document.addEventListener("click", close));
    onCleanup(() => document.removeEventListener("click", close));
    return (
        <div class="lang-float" ref={ref} data-testid="lang-float">
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
