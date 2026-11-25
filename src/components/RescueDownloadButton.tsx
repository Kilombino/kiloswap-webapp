import { BiRegularDownload } from "solid-icons/bi";

import { useGlobalContext } from "../context/Global";
import { downloadRescueFile } from "../utils/backup";
import { formatError } from "../utils/errors";

// Kiloswap: the rescue key download, always at hand on a swap's page
const RescueDownloadButton = () => {
    const { t, rescueFile, notify } = useGlobalContext();
    return (
        <button
            type="button"
            class="btn btn-light rescue-download"
            data-testid="swap-rescue-download"
            onClick={() => {
                try {
                    downloadRescueFile(rescueFile);
                } catch (e) {
                    notify("error", formatError(e));
                }
            }}>
            <BiRegularDownload size={16} /> {t("download_new_key")}
        </button>
    );
};

export default RescueDownloadButton;
