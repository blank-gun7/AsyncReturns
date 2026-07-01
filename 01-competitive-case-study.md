# Devorix — Competitive Case Study & Market Research

> **Decisions and numbers below are subordinate to `MASTER-PLAN.md`.** Rev share is now locked at 50/50 (not "50–70% TBD"); market-sizing and Stripe/India findings have been independently re-verified and strengthened — see `MASTER-PLAN.md` §2, §3.

**Version 1.0 · Last updated 2026-06-25 · Living document**
*Every figure is tagged with a confidence level. Estimates from a single blog or self-report are marked Low — do not treat them as verified.*

---

## 1. The category (what we're entering)

"Wait-state advertising" is a **~3-week-old** category (born early June 2026). The idea: while an AI coding agent is "thinking," it shows a spinner / status line; startups sell that moment to advertisers and share revenue with the developer (or the app that hosts the agent). kickbacks.ai went viral (claimed ~5.5M views in 24h) and spawned copycats within 48 hours. *(Confidence: High — multiple sources.)*

Two structural facts shape everything:
- The inventory is **brand-new and unclaimed**. No one has a defensible install base yet. This is a land grab.
- The category itself is **unproven**. Real earnings are tiny and volatile, advertiser demand is mostly not there yet, and the consumer "earn money" promise may not retain users. We are betting on being first to *organize* the market in India, not on the tech being hard.

---

## 2. Competitor teardown

All players below are global and launched within the last ~3 weeks. **I found no confirmed India-headquartered competitor** — your belief that 1–2 India products exist at ideation/beta could not be verified in public sources as of 2026-06-25. If one exists it is unannounced/stealth. *(Confidence: Medium — absence of evidence, not evidence of absence.)*

### kickbacks.ai — the category creator
- **Model:** Replaces Claude Code's spinner verb with a sponsored line. Advertisers buy "blocks" (1 block = 1,000 × 5s impressions); a click = 50× an impression. **50%** revenue share to devs. *(High)*
- **Differentiator:** First mover, viral founder distribution (Andrew McCalip / ShiftKeys Inc), source-available client for trust.
- **Weaknesses:** Patches Claude Code's rendering layer (not Anthropic-sanctioned, ToS risk for enterprise devs); payouts on Stripe Connect → **does not pay India** ("Preview" stage); early payout reliability complaints; earnings reportedly decayed for some users. *(High)*
- **Why it matters to us:** This is the gap. They explicitly can't disburse to India.

### IdleAds.dev — the closest threat to our wedge
- **Model:** A single sponsor line in the **status bar** (no editor patching), 70% rev share, "provably-real" viewability (only counts when VS Code window is focused, ≥5s). *(High)*
- **Payouts:** PayPal, Wise, **and UPI (currently processed manually)**. Minimum payout $5. *(High)*
- **Why it matters:** **They already touch India via UPI.** This directly contests a pure "UPI payout" moat. Their UPI is manual and bolted-on, not India-native — that's the seam we exploit (rupee billing, GST invoices, instant automated UPI, local advertiser supply, Indian-language creatives, local support). But assume the payout-rail advantage is *contested, not exclusive.*

### Idlen.io — widest surface
- **Model:** 3-line npm SDK you embed in **your own** app (not patching others'). Claimed **$20–42 CPM**, 70% share. Surfaces: VS Code, Cursor, Windsurf + browser extensions for ChatGPT/Claude/Perplexity/Gemini. Anonymous team. Pays in EUR (€0.02–0.05/view). *(CPM: Low — blog estimate.)*
- **Why it matters:** Different buyer (app builders, not end devs). Less of a head-to-head, more of an adjacent SDK competitor. No India focus.

### Sponsoric — API-first
- **Model:** Ad API you integrate in your app, ~70% share, CPM $15–35 (blog est, Low). Targets app builders / MCP agents. Not consumer, not India.

### picoads — crypto-native
- **Model:** CPC, pays in **USDC**, aimed at MCP agent builders. Sidesteps the India fiat-payout problem entirely via stablecoin — worth watching as an alt-rail competitor. *(Medium)*

### Meanwhile (meanwhile.cash), aikickbacks.com, AIWaitIndex
- Meanwhile: "earn while AI thinks," not India-specific. aikickbacks.com: a Kickbacks-branded landing/mirror. AIWaitIndex: an independent comparison/aggregator site + paid guide — a *media* play on the category, not a platform. *(Medium)*

### Snapshot table

| Player | Rev share to dev | Approach | Est. CPM (USD) | India payout | Confidence |
|---|---|---|---|---|---|
| kickbacks.ai | 50% | Patches Claude Code spinner | $8–15 (blog) | **No** | High / CPM Low |
| IdleAds.dev | 70% | Status-bar SDK, no patch | $8–14 (blog) | **Yes (manual UPI)** | High / CPM Low |
| Idlen.io | 70% | npm SDK in your own app | $20–42 (blog) | EUR only | CPM Low |
| Sponsoric | ~70% | Ad API for app builders | $15–35 (blog) | No | CPM Low |
| picoads | CPC | USDC, MCP agents | — | via USDC | Medium |
| **Devorix (us)** | **50% (locked, 2026-06-28)** | India-native, automated UPI + GST | Tier-1 planning CPM $2–3 India / $5–8 Global (reconciled, see `MASTER-PLAN.md` §5.4) | **Yes, native** | Plan |

---

## 3. What the differentiators actually reduce to

Strip the noise and there are only four real axes of competition:

1. **Distribution / install base.** The only durable asset. Whoever owns the most active AI-coding devs owns the inventory. Today this is wide open in India.
2. **Trust & safety of the client.** Patching (Kickbacks) vs. native status bar (IdleAds) vs. SDK (Idlen). Non-patching + "we never read your code," auditable, is the defensible, enterprise-safe posture.
3. **Payout rail + local monetization.** Stripe excludes India; this is Kickbacks' blind spot. But IdleAds already does manual UPI, so our edge is *native, automated, GST-compliant, rupee-billed* — operational depth, not mere existence.
4. **Advertiser supply.** The category's real bottleneck. Everyone has near-zero fill today. Whoever lands real advertisers first makes the "earn money" promise true and wins devs.

**Our honest edge = #1 + #4 executed in India + operational depth on #3.** It is a *go-to-market and operations* advantage, not a technology moat. Which is exactly what you said: if we land clients and market better, we can overpower their position. That thesis is correct — but it lives or dies on advertiser supply, not on the extension.

---

## 4. Market sizing (India)

- India has **~27 million developers on GitHub (2026)**, the fastest-growing major community, projected ~57.5M by 2030. *(High / projection Medium.)*
- **TAM** (all Indian devs): not the right denominator — most don't use agentic AI coding tools heavily.
- **SAM** (Indian devs using Claude Code / Cursor / Copilot / Windsurf agentically): no clean public number. A defensible rough cut is single-digit millions today and growing fast. *(Confidence: Low — derived, not sourced. Flag for primary research.)*
- **SOM (year 1, our model's base case):** ~100,000 active devs. That is ~0.4% of India's GitHub base — plausible for a viral land grab but **aggressive**; treat as a stretch target, not a forecast.

---

## 5. Financial model summary

Full live model in `devorix-financial-model.xlsx` (assumptions are editable; every input is flagged). Headlines (Base case):

- **Per-dev economics are small.** At a conservative India eCPM of **$2** (assumption), a heavy dev (~80 impressions/day × 22 days) generates ~₹300/mo gross; at 50% share the dev keeps ~₹150 and we keep ~₹150. At $0.8 eCPM it's ~₹60 each. *(Derived from flagged assumptions.)*
- **The binding constraint is fill rate** (advertiser demand), not installs. Early months realize almost nothing because there are no advertisers yet — modeled as fill ramping 2% → 55% over year 1.
- **Base-case year 1:** turns monthly-profitable around **month 5**, cumulative break-even ~**month 7**, ending ~**₹2.3 crore cumulative net** with month-12 gross ~₹1.66 crore/mo. **This assumes hitting 100k active devs and 55% fill — both aggressive.** Lower either and profitability slips materially. *(Confidence: Low — scenario built on assumptions; not a forecast.)*
- **Reality check on CPM:** observed real-world numbers range from **$0.27** (a Product Hunt reviewer's bad day) to **~$10.9** (an HN tester's 407 impressions = $4.43). Blog "estimates" of $8–42 are optimistic and unverified. India CPMs run a fraction of US rates, which is why the model uses $2 as base. Do not plan on US blog CPMs.

---

## 6. Strategic read & recommendation

The category is real enough to move on but unproven enough that **whoever solves advertiser supply in India wins** — the dev-side install grab is necessary but not sufficient. Recommendation:

1. **Win installs fast** (viral launch into Indian dev communities) to assemble inventory — but in parallel,
2. **Sell advertisers harder than anyone** (Indian dev-tool startups, cloud/hosting resellers, EdTech/upskilling, dev job boards, DevRel teams). This is your true differentiator and the category's weak point.
3. **Out-operate on India payments**: native automated UPI, instant payouts, GST invoices, PAN/TDS handled — beat IdleAds' manual UPI on reliability and compliance.
4. **Position as enterprise-safe**: non-patching client, "we never read your code," auditable. This unlocks the higher-margin B2B second act and avoids Kickbacks' ToS risk.
5. ~~Differentiate on rev share if needed: matching IdleAds at 60–70% to devs is a cheap lever to win the install war, since fill rate (not share) governs early payouts anyway.~~ **Superseded 2026-06-28: rev share is locked at 50/50 — see `MASTER-PLAN.md` §2 row 11.** Compete on payout reliability + GST instead, not on matching the headline share number.

**Bottom line:** Your instinct is right and the timing is rare. The win condition is GTM + advertiser sales + India ops, not the extension. Treat the payout moat as contested (IdleAds is already there) and compete on depth and demand.

---

## Sources
- [kickbacks.ai](https://kickbacks.ai/) · [FAQ/fraud](https://kickbacks.ai/faq) · [GitHub mirror](https://github.com/andrewmccalip/kickbacks.ai) · [Product Hunt](https://www.producthunt.com/products/kickbacks-ai)
- [IdleAds.dev](https://idleads.dev/) · [IdleAds on HN](https://news.ycombinator.com/item?id=48506060) · [Open VSX listing](https://open-vsx.org/extension/idleads/idleads-vscode)
- [Idlen — How it works](https://www.idlen.io/developers/how-it-works/) · [Idlen pricing blog](https://www.idlen.io/blog/cpm-cpc-cpa-developer-advertising-pricing-guide/)
- [AIWaitIndex comparison (dev.to)](https://dev.to/digitalcheff/i-compared-every-ai-wait-state-ad-platform-kickbacks-idleads-idlen-more-3m4a)
- [Kickbacks.ai – Hacker News](https://news.ycombinator.com/item?id=48493940)
- [India 27M GitHub developers](https://investmentguruindia.com/newsdetail/india-s-developer-community-surges-to-27-million-on-github453627) · [VARINDIA](https://www.varindia.com/news/india-becomes-fastest-growing-developer-community-on-github)
- [RazorpayX Payouts docs](https://razorpay.com/docs/api/x/payouts/)
