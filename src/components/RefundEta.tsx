import { isCooperativeDisabled } from "boltz-swaps/config";
import { type Accessor, Show } from "solid-js";

import { useGlobalContext } from "../context/Global";
import { getNetworkName } from "../utils/blockchain";

const RefundEta = (props: {
    timeoutEta: Accessor<number>;
    timeoutBlockHeight: Accessor<number>;
    asset: string;
}) => {
    const { t } = useGlobalContext();
    const getDateString = (timestamp: number) =>
        new Date(timestamp * 1000).toLocaleString();
    return (
        <div data-testid="refund-eta">
            <h3>{t("refund_explainer")}</h3>
            <p class="frame-text">
                {t("pay_timeout_blockheight", {
                    network: getNetworkName(props.asset),
                })}
                : {props.timeoutBlockHeight()}
                <Show when={props.timeoutEta()}>
                    <br />
                    {t("timeout_eta")}: {getDateString(props.timeoutEta())}
                </Show>
            </p>
            <Show when={isCooperativeDisabled()}>
                <p class="frame-text" data-testid="refund-no-coop">
                    {t("refund_no_coop")}
                </p>
            </Show>
        </div>
    );
};

export default RefundEta;
