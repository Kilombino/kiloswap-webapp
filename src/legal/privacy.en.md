# Privacy policy

**Last updated:** 25 November 2026

### What the service keeps

For a swap to work, and to be able to help you rescue it, the service
keeps, for each swap:

- its identifier, status, amounts and fees;
- the contract's on-chain addresses and transactions;
- the Lightning invoice and its payment hash;
- the contract's **public keys** (never your private keys);
- the dates and timeouts.

That database is copied, **encrypted**, off the machine, so as not to lose
the information that lets you recover a swap. Finished swaps are kept for 12 months to be able to help with rescues and claims, and are then deleted.

The guard keeps its own record of operations (amounts, hashes,
transactions) and alerts the operator (on Telegram) about every movement.

### What the service does not keep

- **IP addresses:** the web server logs only the date, method, path,
  response code, size and time of each request, **without IP or
  browser**. Container logs rotate (5 × 20 MB).
- No personal data: there are no accounts, emails or forms.
- Your private keys or your rescue key: they stay in your browser.

### Third parties that see part of the traffic

- **Cloudflare:** swap.kilombino.com goes through Cloudflare, which sees
  your IP and the requests under its own policy. To avoid that, use the
  **.onion** address with Tor Browser.
- **The blockchain and the Lightning network:** on-chain transactions are
  public, and the nodes a Lightning payment goes through see part of it,
  as with any payment.

### Data in your browser

The web app keeps the data of your swaps and your keys in your browser
(local storage), so you can come back to them. No tracking cookies or
analytics are used. You can delete them whenever you want (save the rescue
key of unfinished swaps first).

### Your rights

Since no personal data is kept, in general there is nothing that
identifies you. If you want a specific finished swap deleted, write
through any of the contact channels above with its identifier.
