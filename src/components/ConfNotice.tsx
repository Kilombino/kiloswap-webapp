import { useGlobalContext } from "../context/Global";

// Kiloswap: how deep an on-chain → Lightning deposit must be before the
// invoice is paid (the guard's tiers by total exposure), in English and
// Spanish
const ConfNotice = () => {
    const { t } = useGlobalContext();
    return (
        <div data-testid="conf-notice">
            <p class="frame-text">{t("kiloswap_conf_notice")}</p>
            <p class="frame-text" lang="es">
                {t("kiloswap_conf_notice_es")}
            </p>
        </div>
    );
};

export default ConfNotice;
