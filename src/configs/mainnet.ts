import { AssetKind, Explorer } from "boltz-swaps/types";
import {
    type Config,
    baseConfig,
    chooseUrl,
    sameOrigin,
} from "src/configs/base";

// The API is served from the same origin as the web app (`/v2/...` and the
// WebSocket at `/v2/ws`) unless VITE_API_URL is set at build time.
const apiUrl =
    (import.meta.env.VITE_API_URL as string | undefined) || sameOrigin();

// Set at build time; the address is created on the live node's lnd wallet
// (lncli newaddress p2tr) and recorded in deploy/OPERATING.md
const donationAddress = import.meta.env.VITE_DONATION_ADDRESS as
    string | undefined;

const config = {
    ...baseConfig,
    network: "mainnet",
    // Kiloswap: the server signs nothing (its key is the guard's); claims
    // and refunds take the script path
    cooperativeDisabled: true,
    donation: donationAddress ? { address: donationAddress } : undefined,
    // Kiloswap: no channel donations (no ourNode, no donation address)
    torUrl: import.meta.env.VITE_TOR_URL as string | undefined,
    loglevel: "info",
    apiUrl: {
        normal: apiUrl,
    },
    assets: {
        BTC: {
            type: AssetKind.UTXO,
            blockExplorerUrl: {
                id: Explorer.Mempool,
                normal: "https://mempool.kilombino.com",
            },
            // The deployment proxies its mempool's API at /explorer/api on
            // the same origin (also over Tor)
            blockExplorerApis: [
                {
                    id: Explorer.Mempool,
                    normal: `${sameOrigin()}/explorer/api`,
                },
            ],
        },
    },
} as Config;

export { config, chooseUrl };
