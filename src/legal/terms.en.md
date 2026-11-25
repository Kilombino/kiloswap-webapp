# Terms of use

**Last updated:** 25 November 2026

### 1. Who offers the service

Kiloswap (swap.kilombino.com and its .onion address) is offered and run by
**Kilombino** ("the operator"), as an individual. Contact: Telegram [@Kilombino](https://t.me/Kilombino), X [@Kilombino_](https://x.com/Kilombino_), Matrix [@kilombino:matrix.org](https://matrix.to/#/@kilombino:matrix.org), Nostr `npub1qqqqqqzs0udz0dpa93ra5thgycmcmwsqw5qave53ltdrd75nrptqv5h62x`, and the Signal and SimpleX channels listed on [kilombino.com](https://kilombino.com).

Kiloswap uses free software: the Boltz backend and the Boltz web app,
adapted to the Bitcoin BLAKE2b chain, and a guard of its own that watches
every operation. The code is published at [github.com/Kilombino/kiloswap](https://github.com/Kilombino/kiloswap), [kiloswap-backend](https://github.com/Kilombino/kiloswap-backend) and [kiloswap-webapp](https://github.com/Kilombino/kiloswap-webapp).

### 2. What Kiloswap does

Kiloswap swaps bitcoin on the Bitcoin BLAKE2b chain between Lightning and
on-chain, in both directions:

- **On-chain → Lightning:** you send coins to a contract address and
  Kiloswap pays your Lightning invoice.
- **Lightning → on-chain:** you pay a Lightning invoice and Kiloswap sends
  the coins to a contract that you claim from, to your address.

Kiloswap **only** works with the Bitcoin BLAKE2b chain. Do not send coins
from another chain: they would be lost.

### 3. Non-custodial

Kiloswap **never holds your money**. Every swap uses an on-chain contract
with a timeout (an "atomic swap"):

- Either the swap completes for both sides, or, when the timeout expires,
  you get your coins back **on your own**, with your rescue key, even if
  the service no longer exists.
- Your keys are generated in your browser. The operator never sees them.

You are responsible for keeping **your rescue key** (the file the web app
offers you to download) until the swap ends. Without it, and if you clear
your browser's data, you may be unable to recover a failed swap.

### 4. Fees

| | |
|---|---|
| On-chain → Lightning | 0.01 % + the network fee (the operator's claim) |
| Lightning → on-chain | 0.15 % + the network fee (the lockup and a possible refund) |
| Lightning routing fee (on-chain → Lightning) | paid by the operator, up to max(121 sats, 0.01 % of the invoice) |

The web app shows the exact amount **before** you confirm. Network fees
depend on the moment and are not charged by the operator but by the
miners.

### 5. Limits

- Per swap: from **10,000 sats to 1 BTC**.
- All swaps together: **2 BTC every 24 hours**.
- Confirmations of your on-chain deposit before your invoice is paid (on-chain → Lightning): **1 up to 0.01 BTC, 2 up to 0.1 BTC and 3 above**. All pending swaps count together, so with several simultaneous swaps it may ask for the next step (at most 3).
- There may be additional temporary limits (for example, how many swaps
  are handled at once). If one is reached, the web app does not let you
  create the swap, or the swap is refused before you pay.

The operator may change the limits or pause new swaps at any time. Swaps
already started can still be refunded and rescued.

### 6. If a swap fails: refund after the timeout

- **On-chain → Lightning:** if Kiloswap cannot pay your invoice (for
  example, there is no route within the routing fee limit), the swap is
  marked as failed and **you get your coins back when the contract's
  timeout expires** (about **3 days**), from the web app ("Refund") or with
  your rescue key on the rescue page. There is no immediate refund: the
  server does not sign early refunds.
- **Lightning → on-chain:** if you do not claim the coins in time, the
  Lightning payment returns to you automatically when the timeout expires.

A refund only costs the network fee of the refund transaction.

### 7. What is not guaranteed

- The service is offered **as is**, with no guarantee of availability or
  that there will always be a route or liquidity.
- Timeouts depend on the chain (blocks), not on the clock.
- The operator is not liable for losses caused by sending to a wrong
  address, by using another chain, by losing the rescue key or by faults
  of your wallet. To the extent the law allows, the operator's liability is limited, at most, to the fees you paid for the affected swap.

### 8. Acceptable use

Do not use Kiloswap for activities that are illegal in your jurisdiction.
The operator may stop serving swaps that look abusive (for example,
attempts to drain the liquidity or to harm other users).

### 9. No KYC

Kiloswap does not ask for a name, email, document or account. Every swap
is independent.

### 10. Changes

These terms may change. The version in force is the one published on the
web with its date. A swap already started is governed by the terms in
force when it was created.

### 11. Jurisdiction

Kiloswap is an internet service and is governed by the law of cyberspace: it does not submit to the jurisdiction of any particular country. The service is offered by an individual,
not a company. Nothing in these terms limits the rights that the law of
your country grants you as a consumer.
