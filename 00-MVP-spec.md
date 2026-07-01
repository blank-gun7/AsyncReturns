# Devorix — Technical MVP Spec (00)

> **Decisions and numbers below are subordinate to `MASTER-PLAN.md`.** Where they disagree, the master doc wins. Specifically patched 2026-06-28: FX rate (§6), payout threshold (§6), and §7's compliance framing — see notes inline.

**Version 1.1 · Last updated 2026-06-25 · Living document**
*Companion docs: 01-competitive-case-study, 02-PRD, 03-marketing-plan, 04-P0-tasks, 05-shared-language, devorix-financial-model.xlsx.*

**One line:** Monetize the AI-agent "thinking…" wait state for India. Advertisers buy the status line inside Claude Code, Cursor, Codex, etc.; Indian developers earn a revenue share paid via UPI.

**Model chosen:** Ads-to-devs (kickbacks model). **Client posture:** non-patching / status-bar (enterprise-safe), unlike Kickbacks which patches Claude Code's renderer.

> **Competitive note (see 01-competitive-case-study):** The payout moat is *contested, not exclusive* — **IdleAds.dev already does UPI payouts (manually)**. Our edge is therefore *native, automated, GST-compliant rupee billing + aggressive local advertiser supply*, not merely "we pay India." Kickbacks (50% share, patches Claude Code, Stripe → no India) genuinely can't pay India; IdleAds (70% share, status-bar, manual UPI) can. The real bottleneck across the whole category is **advertiser demand / fill rate**, not installs.

---

## 1. The India wedge (why this wins here)

kickbacks.ai excludes India almost certainly because its payouts run on Stripe, which has no clean India payout path, and its advertiser billing is USD-first. That gap is the whole opportunity.

1. **Payouts that actually work.** UPI / RazorpayX payouts to any Indian bank or VPA. This is the moat — copying the extension is easy, building rupee payout + KYC + tax plumbing is the hard, defensible part.
2. **Rupee billing + GST invoices** for Indian advertisers (dev-tool startups, hosting/cloud resellers, EdTech/upskilling, dev job boards, SaaS). They can't easily buy USD ad inventory; you give them a local IO and a GST invoice.
3. **Install-base land grab.** India has the world's largest and fastest-growing developer population. First-mover advantage here is about *installs*, not features. Whoever owns the install base owns the inventory.

**Honest constraint (drives the whole design):** per-developer earnings are tiny. At realistic rates (~₹0.27 CPM today, dev gets 50%), a heavy user earns roughly **₹80–₹400/month**. See §6. Implications:
- You **cannot** pay per impression. You **accrue** and **batch payouts** at a threshold (**₹300**, final — see §6) so payout cost stays under ~1%.
- The consumer "earn money coding" hook gets you installs, but the real economic value is **aggregated reach across thousands of devs**. Design for scale and advertiser self-serve from day one.

---

## 2. System architecture

Three planes: **Client** (injects the slot, counts events), **Backend** (ad serving, ledger, dashboards), **Payouts** (batched UPI). Keep impression ingestion and the money ledger strictly separated.

```
┌─────────────── CLIENT (dev's machine) ───────────────┐
│ VS Code extension  +  Claude Code/Codex config hook   │
│  • injects 1 sponsored status line into the spinner   │
│  • local agent: fetches creatives, counts impr/click  │
│  • status bar: live balance (today / month / lifetime)│
│  • OAuth sign-in (Google + GitHub)                    │
└───────────────┬───────────────────────────────────────┘
                │ HTTPS (TLS 1.2+), batched events, signed
                ▼
┌─────────────── BACKEND ──────────────────────────────┐
│  Ad Serving API   →  picks creative (house→fixed→auction)
│  Event Ingest API →  impressions/clicks (idempotent, dedup, fraud)
│  Ledger Service   →  Postgres, double-entry, dev balance
│  Advertiser Dash  →  campaign, budget, targeting, creative, GST invoice
│  Publisher Dash   →  dev balance, payout settings, KYC/PAN
└───────────────┬───────────────────────────────────────┘
                ▼
┌─────────────── PAYOUTS ──────────────────────────────┐
│  Threshold batch job → RazorpayX Payouts (UPI/IMPS)   │
│  KYC/PAN gate · TDS handling · webhook reconciliation │
└───────────────────────────────────────────────────────┘
```

**Suggested stack (optimize for ship speed, not novelty):**
- Client: TypeScript VS Code extension; thin local HTTP/IPC reporter.
- Backend: one service to start (Node/TS or Python/FastAPI). Split later.
- **Postgres** = source of truth for the ledger and money (ACID, double-entry).
- **ClickHouse or Redis Streams** = high-write impression events (don't put raw events in your money DB).
- Queue (SQS/Redis) for payout jobs and webhook processing.
- Host on an India region (AWS Mumbai / GCP Mumbai) for latency + data residency under DPDP.

---

## 3. The client — how the slot actually works

This is the mechanically tricky part. Each AI tool surfaces its "thinking" state differently:

- **Claude Code** — configurable status line / spinner verbs via `~/.claude/settings.json` (`statusLine`, custom spinner text). Inject your sponsored line here. *(This is essentially what kickbacks does — verify current schema, it changes.)*
- **Cursor / VS Code** — status bar item (`window.createStatusBarItem`) shown while an agent task runs.
- **Codex / others** — per-tool; abstract behind a small adapter interface so you add tools without touching core.

Design an **`AdSlotProvider` interface** with one adapter per tool. Core responsibilities:
1. **Prefetch** a small batch of approved creatives (text only at MVP — one short tasteful line, optional click URL). Cache locally; serve even if briefly offline.
2. **Render** the current creative into that tool's wait-state slot.
3. **Count** an impression when shown ≥ N seconds (e.g. 5s, matching the "block = 1000×5s impression" unit), and a click when the URL is opened.
4. **Report** events in **batches** (every ~60s or 50 events), signed with the device/session token, idempotency key per event.
5. **Reversible & honest:** one toggle restores the tool's original spinner. **Never read code, prompts, or completions** — and make that auditable (publish a source-available client like kickbacks did; it builds trust and pre-empts the obvious objection).

**Anti-tamper:** events are advisory from an untrusted client, so the backend, not the client, decides what's billable/payable (§5).

---

## 4. Backend — ad serving

Ship in three escalating tiers; don't build the auction first.

- **Tier 0 (week 1–2): house ads.** Your own promo lines. Zero advertisers needed. Goal = get the client + ingest + ledger working and start accruing fake/house revenue while you grow installs.
- **Tier 1 (week 3–6): fixed-price direct sales.** Manually onboarded advertisers buy "blocks" (1 block = 1,000 impressions) at a flat CPM. Round-robin / weighted serving. This earns real rupees and validates demand.
- **Tier 2 (later): second-price auction.** Real-time bidding per impression once you have enough advertiser demand to justify it.

Targeting at MVP: keep it coarse (geo = India, optionally language/editor). Don't over-engineer.

---

## 5. Event integrity & fraud (existential for any ad network)

If advertisers don't trust your impression counts, you have no business. Minimum bar for MVP:
- **Idempotency + dedup** on every event (event UUID + device + timestamp window).
- **Server-side validity rules:** min display time, max events/hour/device, active-session signal, plausible cadence. Discard the rest *before* billing or crediting.
- **Device/session attestation:** signed token per install; rotate; bind events to it.
- **Click fraud:** rate-limit, dedup, separate "billable click" from "raw click".
- **Two-ledger view:** raw events (ClickHouse) vs. *billable/payable* events (Postgres, after fraud filter). Advertisers are billed and devs are paid only off the filtered ledger.

---

## 6. Payout economics & rails (the moat)

Realistic per-dev numbers at today's thin rates (illustrative, order-of-magnitude only — 50% dev share). **FX rate corrected 2026-06-28: ₹94/USD** (re-verified live; was ₹86 here, see `MASTER-PLAN.md` §7.1). For the current reconciled Tier-1 planning CPM ($2–3 India), see `MASTER-PLAN.md` §5.4 — these don't match it exactly and shouldn't be re-derived from this table:

| Impressions/day | Dev earns/day | Dev earns/month |
|---|---|---|
| 300 | ₹3.5 | ~₹77 |
| 800 | ₹9.3 | ~₹204 |
| 1,500 | ₹17.4 | ~₹383 |

UPI payout cost ≈ ₹2–5 each. So:

| Payout threshold | Payout cost as % of balance |
|---|---|
| ₹50 | ~6% |
| ₹200 | ~1.5% |
| **₹300 (final)** | **~1%** |
| ₹500 | ~0.6% |

**Design rules:**
- **Accrue, never pay per event.** Auto-payout when balance ≥ **₹300** (final decision 2026-06-28, `MASTER-PLAN.md` §2 row 13 — was ₹500 here) (let users lower it further, warn about the fee drag).
- **Rail:** RazorpayX Payouts — create Contact + Fund Account (VPA or bank), then payout via **UPI** (cheapest, instant, 24×7), fall back to IMPS. Mandatory idempotency key; consume status webhooks (queued→processing→processed/failed/reversed) to reconcile the ledger.
- **Accrued balance is a payable, not stored value** — keeps you clear of RBI wallet/PPI (prepaid instrument) rules. Don't let users load/spend balance like a wallet.
- **Test mode** end-to-end before going live (RazorpayX sandbox has dummy balance).

---

## 7. "Enterprise proper" — compliance to set up early

> **Superseded 2026-06-28 — see `MASTER-PLAN.md` §7.1.** Decision is now: **do NOT incorporate Pvt Ltd or register GST yet** (sole proprietor, below the ₹20L/yr GST threshold). TDS is confirmed "basically nil" for a sharper reason than guessed below: §194H only attaches once Devorix' own turnover exceeds ₹1 crore/yr, far past current projections. The list below is the *eventual, post-traction* compliance checklist, not a near-term build requirement.

These are what make it a real company, not a side project, **once you clear the go/no-go gate (`MASTER-PLAN.md` §8.3).** **Confirm specifics with a CA + lawyer — flagged, not legal advice:**
- **Entity:** Private Limited company (advertisers and investors expect it, eventually).
- **GST:** register once revenue nears ₹20L/yr, or sooner if a specific advertiser needs a GST invoice; ad services attract **18% GST**.
- **Tax on dev payouts:** revenue-share to individuals is **Section 194H** territory (not 194-O — that's for e-commerce operators, doesn't fit this payment shape), but the deduction obligation only applies once Devorix' own gross turnover exceeds ₹1 crore/yr, and even then only above ₹20,000/yr per developer at 2%. Collect **PAN** from day one anyway — needed for the payout flow regardless, and avoids retrofitting later.
- **DPDP Act 2023:** explicit consent, India data residency, the auditable "we never read your code" guarantee.
- **Advertiser contracts:** simple IO + content policy (no malware, no deceptive creatives) — your inventory sits inside developers' editors; brand safety cuts both ways.

---

## 8. MVP scope cut — what to build first

**Goal of MVP: maximize Indian dev installs while proving the rupee payout loop end-to-end.** Land grab beats feature depth.

In:
1. VS Code + Claude Code client: inject one sponsored line, count impr/click, batch-report, status-bar balance, Google/GitHub auth, one-click disable.
2. Backend: event ingest (idempotent + basic fraud filter), Postgres ledger, house ads (Tier 0) → fixed-price (Tier 1).
3. Publisher dashboard: balance, PAN/KYC, payout settings.
4. RazorpayX payout: threshold batch, UPI, webhook reconciliation (sandbox → live).
5. Minimal advertiser onboarding (can be manual/concierge at first).

Out (defer): real-time auction, multi-editor adapters beyond Claude Code+Cursor, self-serve advertiser portal, advanced targeting, mobile.

---

## 9. 30 / 60 / 90 to first-mover position

- **Days 0–30:** Entity + GST + RazorpayX (sandbox) started in parallel with build. Ship Tier-0 client (Claude Code) with house ads + working ledger. **Public launch to grab installs** (HN/X/Indian dev communities) — kickbacks proved this gets millions of views; ride the same wave with "the one that pays Indian devs."
- **Days 30–60:** Live UPI payouts (real money to first devs = your best marketing). Onboard 5–10 fixed-price advertisers (Indian dev-tool/EdTech/cloud). Add Cursor adapter. Harden fraud filtering.
- **Days 60–90:** Self-serve advertiser flow + GST invoicing. Begin auction groundwork. Start the enterprise/B2B conversation (teams branding/monetizing their own wait states) as the higher-margin second act.

---

## 10. Top risks

1. **Thin per-dev payouts** → retention risk. Mitigate with streaks/bonuses, referral boosts, and honest framing ("beer money that adds up"), and lean into aggregate scale for the real revenue.
2. **No advertiser demand at start** → bootstrap with house ads + concierge sales; don't gate launch on a full ad marketplace.
3. **Fraud** → can bankrupt trust; filter server-side before money moves.
4. **Tool API churn** (Claude Code/Cursor change their spinner/config) → adapter abstraction + fast client update channel.
5. **Fast-follow copycats** (kickbacks itself could enter India) → payout/tax/compliance plumbing + install base is your defensibility, so move now.
