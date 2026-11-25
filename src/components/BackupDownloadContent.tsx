import { Show, createSignal } from "solid-js";

import { useGlobalContext } from "../context/Global";
import { downloadRescueFile } from "../utils/backup";
import { formatError } from "../utils/errors";
import { isMobile } from "../utils/helper";
import { emphasize } from "../utils/strings";
import Warning from "./Warning";

type BackupDownloadContentProps = {
    onFileDownloaded: () => void;
    onMnemonicRequested: () => void;
    // Kiloswap: skipping this step (after a warning)
    onSkip?: () => void;
};

const BackupDownloadContent = (props: BackupDownloadContentProps) => {
    const { t, rescueFile, notify } = useGlobalContext();
    const [confirmSkip, setConfirmSkip] = createSignal(false);
    const downloadKey = () => {
        try {
            downloadRescueFile(rescueFile);
            props.onFileDownloaded();
        } catch (e) {
            notify("error", formatError(e));
        }
    };

    return (
        <>
            <h2>{t("download_boltz_rescue_key")}</h2>
            <h4>{t("download_boltz_rescue_key_subline")}</h4>
            <p>
                {t("download_boltz_rescue_key_subline_second")} <br />
                {t("download_boltz_rescue_key_subline_backup")}
            </p>
            <Warning />
            <p>
                {emphasize(t("download_boltz_rescue_key_subline_save"))}
                <br />
                {emphasize(t("download_boltz_rescue_key_subline_warning"))}
            </p>
            <div class="btns">
                <button class="btn" onClick={downloadKey}>
                    {t("download_new_key")}
                </button>
            </div>
            <Show when={isMobile()}>
                <button
                    class="btn btn-light"
                    data-testid="show-mnemonic-backup"
                    onClick={() => props.onMnemonicRequested()}>
                    {t("show_rescue_key_instead")}
                </button>
            </Show>
            <Show when={props.onSkip}>
                <Show
                    when={confirmSkip()}
                    fallback={
                        <button
                            class="btn btn-light"
                            data-testid="backup-skip"
                            onClick={() => setConfirmSkip(true)}>
                            {t("backup_skip")}
                        </button>
                    }>
                    <div class="backup-skip-confirm" role="alert">
                        <p class="frame-text">{t("backup_skip_warning")}</p>
                        <div class="btns">
                            <button
                                class="btn btn-danger"
                                data-testid="backup-skip-confirm"
                                onClick={() => props.onSkip?.()}>
                                {t("backup_skip_confirm")}
                            </button>
                            <button
                                class="btn btn-light"
                                onClick={() => setConfirmSkip(false)}>
                                {t("backup_skip_back")}
                            </button>
                        </div>
                    </div>
                </Show>
            </Show>
        </>
    );
};

export default BackupDownloadContent;
