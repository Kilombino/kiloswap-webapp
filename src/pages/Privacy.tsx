import type { Component } from "solid-js";

import { useGlobalContext } from "../context/Global";
import en from "../legal/privacy.en.md?raw";
import es from "../legal/privacy.es.md?raw";
import { renderLegal } from "../legal/render";
import "../style/legal.scss";

// Kilombino's own text (src/legal/privacy.*.md): Spanish for Spanish, English
// for every other language.
const Privacy: Component = () => {
    const { i18n } = useGlobalContext();
    return (
        <div
            class="privacy-container"
            innerHTML={renderLegal(i18n() === "es" ? es : en)}
        />
    );
};

export default Privacy;
