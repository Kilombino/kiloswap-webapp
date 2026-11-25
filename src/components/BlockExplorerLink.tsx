import { type Accessor, Show } from "solid-js";

import {
    type SomeSwap,
    getRelevantAssetForSwap,
    getSwapAddress,
} from "../utils/swapCreator";
import { usePayContext } from "../context/Pay";
import BlockExplorer, { BlockExplorerTargetKind } from "./BlockExplorer";
import CopyButton from "./CopyButton";

// Kiloswap: when a transaction of the swap is known (the claim, or the
// lockup the status reports), copy its txid and open it on our mempool;
// otherwise the lockup address
const BlockExplorerLinkInner = (props: {
    swap: Accessor<SomeSwap>;
    swapStatus: Accessor<string>;
}) => {
    const { swapStatusTransaction } = usePayContext();
    const txid = () =>
        props.swap().claimTx ?? swapStatusTransaction()?.id ?? undefined;
    return (
        // Refund transactions are handled in SwapRefunded
        <Show
            when={
                props.swapStatus() !== null &&
                props.swapStatus() !== "invoice.set" &&
                props.swapStatus() !== "swap.created"
            }>
            <Show
                when={txid()}
                fallback={
                    <BlockExplorer
                        asset={getRelevantAssetForSwap(props.swap())}
                        kind={BlockExplorerTargetKind.Address}
                        id={getSwapAddress(props.swap())}
                    />
                }>
                {(id) => (
                    <div class="tx-actions" data-testid="tx-actions">
                        <CopyButton
                            label="copy_txid"
                            data={id()}
                            btnClass="btn btn-light"
                        />
                        <BlockExplorer
                            asset={getRelevantAssetForSwap(props.swap())}
                            kind={BlockExplorerTargetKind.Tx}
                            id={id()}
                            typeLabel={
                                props.swap().claimTx !== undefined
                                    ? "claim_tx"
                                    : "lockup_tx"
                            }
                        />
                    </div>
                )}
            </Show>
        </Show>
    );
};

const BlockExplorerLink = (props: {
    swap: Accessor<SomeSwap | null>;
    swapStatus: Accessor<string>;
}) => {
    return (
        <Show when={props.swap()}>
            {(swap) => (
                <BlockExplorerLinkInner
                    swap={swap}
                    swapStatus={props.swapStatus}
                />
            )}
        </Show>
    );
};

export default BlockExplorerLink;
