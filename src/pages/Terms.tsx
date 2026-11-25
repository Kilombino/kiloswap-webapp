import type { Component } from "solid-js";

import { useGlobalContext } from "../context/Global";
import en from "../legal/terms.en.md?raw";
import es from "../legal/terms.es.md?raw";
import { renderLegal } from "../legal/render";
import "../style/legal.scss";

// Kilombino's own text (src/legal/terms.*.md): Spanish for Spanish, English
// for every other language.
const Terms: Component = () => {
    const { i18n } = useGlobalContext();
    return (
        <div
            class="terms-container"
            innerHTML={renderLegal(i18n() === "es" ? es : en)}
        />
    );
};

export default Terms;
