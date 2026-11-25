import { For } from "solid-js";

import { useGlobalContext } from "../../context/Global";
import dict from "../../i18n/i18n";

// Kiloswap: the same choice as the floating language switch
const Language = () => {
    const { i18n, setI18nConfigured } = useGlobalContext();
    const langs = Object.keys(dict) as (keyof typeof dict)[];
    return (
        <select
            class="settings-language"
            data-testid="settings-language"
            value={i18n() ?? "en"}
            onChange={(e) => setI18nConfigured(e.currentTarget.value)}>
            <For each={langs}>
                {(lang) => <option value={lang}>{dict[lang].language}</option>}
            </For>
        </select>
    );
};

export default Language;
