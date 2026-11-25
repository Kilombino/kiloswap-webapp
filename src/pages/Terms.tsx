import type { Component } from "solid-js";

import en from "../legal/terms.en.md?raw";
import es from "../legal/terms.es.md?raw";
import { renderLegal } from "../legal/render";
import { prefersSpanish } from "../utils/spanish";
import "../style/legal.scss";

// Kilombino's own text (src/legal/terms.*.md): Spanish for browsers that
// prefer Spanish, English for every other language.
const Terms: Component = () => {
    return (
        <div
            class="terms-container"
            innerHTML={renderLegal(prefersSpanish() ? es : en)}
        />
    );
};

export default Terms;
