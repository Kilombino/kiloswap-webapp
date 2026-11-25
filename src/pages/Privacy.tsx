import type { Component } from "solid-js";

import en from "../legal/privacy.en.md?raw";
import es from "../legal/privacy.es.md?raw";
import { renderLegal } from "../legal/render";
import { prefersSpanish } from "../utils/spanish";
import "../style/legal.scss";

// Kilombino's own text (src/legal/privacy.*.md): Spanish for browsers that
// prefer Spanish, English for every other language.
const Privacy: Component = () => {
    return (
        <div
            class="privacy-container"
            innerHTML={renderLegal(prefersSpanish() ? es : en)}
        />
    );
};

export default Privacy;
