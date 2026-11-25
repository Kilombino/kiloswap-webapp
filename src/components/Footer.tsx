import { Show } from "solid-js";

import { config } from "../config";
import { useGlobalContext } from "../context/Global";
import "../style/footer.scss";
import { openDonate } from "../utils/donate";
import { donationAvailable } from "./DonateModal";
import ExternalLink from "./ExternalLink";
import { clipboard } from "../utils/helper";

const Footer = () => {
    const { t, notify } = useGlobalContext();
    // Kiloswap: the .onion host (from VITE_TOR_URL), to copy for Tor Browser;
    // over Tor already, say so instead
    const onionHost = () => {
        try {
            return config.torUrl ? new URL(config.torUrl).host : undefined;
        } catch {
            return undefined;
        }
    };
    const onTor = () => window.location.hostname.endsWith(".onion");

    return (
        <footer>
            <div class="footer-nav">
                <a href="/terms">{t("terms")}</a>
                <a href="/privacy">{t("privacy")}</a>
                <a href="/rescue">{t("rescue")}</a>
                <ExternalLink href={config.contactUrl}>
                    {t("contact")}
                </ExternalLink>
                <Show when={donationAvailable()}>
                    <a
                        href="/donate"
                        onClick={(e) => {
                            e.preventDefault();
                            openDonate();
                        }}>
                        {t("donate")}
                    </a>
                </Show>
                <Show when={onionHost()}>
                    <Show
                        when={!onTor()}
                        fallback={
                            <span class="footer-onion" data-testid="on-tor">
                                🧅 {t("on_tor")}
                            </span>
                        }>
                        <button
                            type="button"
                            class="footer-onion"
                            data-testid="copy-onion"
                            title={onionHost()}
                            onClick={() => {
                                clipboard(onionHost()!);
                                notify("success", t("copy_onion_done"));
                            }}>
                            🧅 {t("copy_onion")}
                        </button>
                    </Show>
                </Show>
            </div>
            <p class="attribution">
                <ExternalLink href={config.repoUrl}>
                    {t("open_source")}
                </ExternalLink>
                {" · "}
                <ExternalLink href="https://github.com/paulscode/lightning-fork-swap">
                    Lightning Fork Swap
                </ExternalLink>
                {" · "}
                <ExternalLink href="https://github.com/BoltzExchange">
                    Boltz
                </ExternalLink>
            </p>
        </footer>
    );
};
export default Footer;
