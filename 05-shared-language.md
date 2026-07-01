# Devorix — Shared Language & Decisions Log

> **⚠️ RETIRED 2026-06-28 — superseded by `MASTER-PLAN.md`, which is now the single source of truth for decisions.** The Glossary below still holds for terminology, but the Decisions Log and Open Questions are superseded — see `MASTER-PLAN.md` §2 (final decisions) and §9 (still-open questions).

**Version 0.1 · Last updated 2026-06-25 · Living document — the single source of truth for terms & decisions**
*Reference this before making decisions. When we agree on something, it gets recorded in the Decisions Log. When a term is ambiguous, it gets defined in the Glossary. Update on every meaningful decision.*

---

## 1. Glossary (canonical definitions)
- **Wait state / async return** — the moment an AI coding agent is "thinking" and shows a spinner/status line. Our inventory.
- **Impression** — one sponsored line displayed for ≥5s while the editor window is focused. The billable/payable unit.
- **Block** — advertiser purchase unit = 1,000 impressions (matching category convention).
- **Fill rate** — % of available impressions actually sold to a paying advertiser (vs. house/unsold). *The key early constraint.*
- **eCPM** — effective revenue per 1,000 impressions, USD unless stated. Model base = $2 (assumption).
- **Rev share** — % of gross ad revenue paid to the developer. Currently undecided (50–70%).
- **Publisher** — the developer earning from impressions.
- **Advertiser** — brand buying blocks.
- **House ad** — our own/placeholder ad shown when fill rate < 100%; earns ~nothing, used to test the loop.
- **Payout threshold** — accrued balance at which an automatic UPI payout fires (current plan: ₹500).
- **Patching** — modifying a third-party tool's internals to inject ads (Kickbacks does this; we avoid it).
- **The loop** — install → impression → counted → balance → payout. "P0 done" = the loop works end-to-end.
- **North star metric** — ₹ actually paid out to developers per month.
- **Sponsorship footer** — the rendered ad line in the terminal/IDE (prototype's term; same as the status-line inventory). Use this framing publicly.
- **Impression value** — ₹ paid to the dev per impression. Governed by gross eCPM × rev share ÷ 1000. Model base ≈ ₹0.07–0.09 (at $2 eCPM, 50%); prototype shows ₹0.42 (≈ $8–14 eCPM) — flagged as optimistic.
- **Wait-State Coach** — Gemini tool estimating a dev's idle seconds + earnings + sponsor matches (lead-gen).
- **Workspace Analyzer** — Gemini tool reading an IDE screenshot to theme the footer natively.
- **Ad-Copy Generator** — Gemini tool producing tasteful sponsorship lines for advertisers (helps cold-start supply).

## 2. Decisions Log (append-only; date each)
| Date | Decision | Status | Rationale |
|---|---|---|---|
| 2026-06-25 | Model = ads-to-devs (kickbacks style) | Decided | User choice |
| 2026-06-25 | First tool = Claude Code; client is non-patching/status-bar | Decided | Enterprise-safe, avoids Kickbacks ToS risk |
| 2026-06-25 | Payout rail = RazorpayX UPI, accrue + batch at ₹500 | Decided | Keeps payout fee <1%; India-native |
| 2026-06-25 | Dev rev share = **50%**; compete on ops (automated UPI + GST + reliability) | Decided | Founder choice; fill rate governs early payouts anyway, so margin > share early |
| 2026-06-25 | Client = **status-bar only, non-patching** | Decided | Consistent with 50%/ops + enterprise-safe positioning; solo founder + cold-start = low tolerance for ToS blowups (recommended, accepted pending review) |
| 2026-06-25 | Build = **solo, founder-built MVP** | Decided | Founder ships VS Code ext + backend himself; founder is the bottleneck → ruthless scope |
| 2026-06-25 | Demand side = **cold start (no advertiser network)** | Noted risk | #1 risk to the whole thesis; front-load advertiser validation before heavy build |
| 2026-06-25 | Second tool (Cursor vs Windsurf) | **OPEN** | Depends on India usage data |
| 2026-06-25 | Entity / brand name | Leaning **"Devorix" / "DEVORIX."** (devorix.ai) | Confirmed in AI Studio prototype; confirm trademark/domain |
| 2026-06-25 | Public framing = "sponsorship footer" (terminal + IDE) | Decided | From prototype; same inventory, clearer than "spinner" |
| 2026-06-25 | Adopt 3 Gemini tools: Ad-Copy Generator (P1, aids cold-start advertisers), Wait-State Coach (P1, lead-gen), Workspace Analyzer (P2) | Decided | From prototype; core ad-serving must NOT depend on Gemini |
| 2026-06-25 | Payout threshold: prototype ₹1,000 vs model ₹500 | **OPEN — reconcile** | Recommend ₹500 (faster first payout, supports "income from day one") |
| 2026-06-25 | Earnings claims realism | **OPEN — must fix before launch** | Prototype ₹0.42/impr ⇒ ~$8–14 eCPM, 4–7× our base; show ranges + conservative defaults, label as estimates to avoid churn/credibility risk |
| 2026-06-25 | Budget / runway | **≤₹1 lakh total, low burn, solo** | Founder constraint (2026-06-26) |
| 2026-06-26 | Scale target | **≤500 users in 3–4 months; 1–2 advertisers in 14 days** | Founder constraint |
| 2026-06-26 | Revenue model at this scale = **flat sponsorship deals, NOT CPM** | Decided | Math: CPM at 500 users ≈ ₹12/dev/mo — unviable. Flat deal ₹15k/advertiser works |
| 2026-06-26 | **Do NOT incorporate yet** — run as sole proprietor | Decided (CA-grade) | Pvt Ltd = ₹20k + ₹40–70k/yr; would eat the ₹1L. Defer to post-validation |
| 2026-06-26 | No GST registration yet | Decided | Below ₹20L/yr threshold; register only if a deal requires a GST invoice |
| 2026-06-26 | Payout threshold = **₹500** (not ₹1,000) | Decided | Faster first payout → retention |
| 2026-06-26 | USD→INR = **94.5** (was 86) | Corrected | Verified spot Jun 2026 |
| 2026-06-26 | Modeled gross eCPM = **$1 (range $0.5–$2)** | Corrected | Verified real $0.27–$11, steady-state ~$0.27; old $2–8 too high |
| 2026-06-26 | Earnings messaging = honest ranges + payout proof | Decided | Prototype's ₹0.42/impr is 4–7× reality; overpromising = churn |

## 3. Open Questions (to resolve; mirrors P0.1)
These are the questions being used to "grill" the founder. Answers get promoted into the Decisions Log.

**Founder & resources**
- Q1. Are you solo or do you have a co-founder/team? Who covers engineering, sales, ops?
- Q2. Can you build the VS Code extension + backend yourself, or do we need to hire/contract?
- Q3. Budget & runway: how much can you put in, and what's your timeline to first revenue vs. first raise?

**Market & demand**
- Q4. Do you personally know Indian dev-tool/EdTech/cloud founders who could be first advertisers? How many warm intros?
- Q5. How many Indian devs are in your own network/community to seed installs?
- Q6. What's your read on real demand — would devs care about ₹150/mo, or is the hook more about novelty/virality?

**Product & strategy**
- Q7. Rev share: do we win the install war with 70% (and thinner margin), or hold 50% and compete on payout reliability + GST?
- Q8. Enterprise B2B second act — interested now, or strictly ads-to-devs until scale?
- Q9. Risk appetite on the client: status-bar only (safe) vs. also patching Claude Code spinner for max visibility (risky, higher CPM)?
- Q10. Geographic scope — India-only to start, or design for global-from-day-1?

**Moat & timing**
- Q11. IdleAds already does manual UPI. What's our honest 6-month defensibility beyond "we tried harder in India"?
- Q12. What's your unfair advantage (distribution, capital, ad relationships, technical speed)?

## 4. Naming & conventions
- Doc set numbering: 00 MVP spec, 01 case study, 02 PRD, 03 marketing, 04 P0, 05 shared language; model = xlsx.
- Currency: ₹ for INR, $ for USD; always state which.
- Every projection/figure carries a confidence tag: High / Medium / Low / Assumption.

## Changelog
- v0.1 (2026-06-25): Initial shared-language doc.
