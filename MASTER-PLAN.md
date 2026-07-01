# Devorix — Master Plan

**Version 1.0 · Last updated 2026-06-28 · Living document — THE single source of truth for decisions, pricing, and numbers**
*Consolidates `04-P0-tasks.md`, `05-shared-language.md`, `06-business-plan.md`, `07-advertiser-demand-and-niche.md`, `PRICING_ARCHITECTURE.md`, and `FINANCIAL_MODEL.md` — resolving every contradiction between them — plus fresh verification research from 2026-06-28. Read this doc first. If anything in a specialist doc disagrees with this one, this one wins.*

---

## 0. Doc map

**This doc (the master):** all decisions, the reconciled pricing model, the GTM plan, compliance, the roadmap. Absorbs and retires the six files listed above — they're kept on disk with a banner pointing back here, content untouched, for history.

**Specialist docs that remain separate (still living, patched for consistency with this doc):**
- `00-MVP-spec.md` — technical/architecture detail.
- `01-competitive-case-study.md` — full competitor teardown.
- `02-PRD.md` — product requirements detail.
- `03-marketing-plan.md` — channel-level marketing detail.

---

## 1. The idea, one line

When an AI coding tool is "thinking," it shows a status line that earns nothing. Devorix puts a small, tasteful sponsor line there and shares the money with the developer — paid in rupees over UPI. India first; global is Phase 2.

---

## 2. Locked decisions (final — supersedes the Decisions Log in 05)

| # | Decision | Status | Notes |
|---|---|---|---|
| 1 | Model = ads-to-devs (Kickbacks-style) | Decided | — |
| 2 | First tool = Claude Code; client = non-patching/status-bar | Decided | Enterprise-safe, avoids Kickbacks' ToS risk |
| 3 | Payout rail = RazorpayX UPI, accrue + batch | Decided | Re-verified 2026-06-28: RazorpayX Payouts API confirmed to support automated UPI/IMPS/NEFT/RTGS, 24/7 instant settlement |
| 4 | Build = solo, founder-built MVP | Decided | — |
| 5 | Public framing = "sponsorship footer" | Decided | From AI Studio prototype |
| 6 | Adopt 3 Gemini prototype tools | Decided | Ad-Copy Generator (P1), Wait-State Coach (P1), Workspace Analyzer (P2); core ad-serving/ledger must not depend on Gemini |
| 7 | Entity/brand = "Devorix" / "DEVORIX." | **DECIDED FINAL** | Renamed from "Async Returns" / "ASYNC." on 2026-06-28 per founder's explicit call. Domain placeholder used across docs/code: devorix.ai — not yet verified as registered/available. |
| 8 | Budget/runway ≤ ₹1 lakh, low burn, solo | Founder constraint | — |
| 9 | Do NOT incorporate yet — sole proprietor | Decided | Re-verified 2026-06-28, see §7.1 |
| 10 | No GST registration yet (below ₹20L/yr threshold) | Decided | Re-verified 2026-06-28, see §7.1 |
| 11 | **Dev rev share = 50 / 50** | **DECIDED FINAL** | Closes the 50-vs-60-70% open question. Overrides FINANCIAL_MODEL's 40/60 and 01/03's "60-70% as install-war lever" idea. |
| 12 | **Geographic sequencing: India first, Global = explicit Phase 2** | **DECIDED FINAL** | Gated on the go/no-go criteria in §8.3. PRD's "non-India = non-goal" is correct for now, not permanent. |
| 13 | **Payout threshold = ₹300** | **DECIDED FINAL** | Overrides ₹500 (05) and ₹250 (PRICING_ARCHITECTURE) — founder's call, splits the difference |
| 14 | **Pricing model = hybrid ladder** — Tier 0 (house ads + opportunistic flat-fee deals, until ~5 advertisers) → Tier 1 (real fixed-price CPM rate card, once 5–10 advertisers) → Tier 2 (real-time auction, once 5,000+ DAU) | **DECIDED FINAL** | Full detail in §5 |
| 15 | **Billable impression length = 5 seconds for v1 build**; 10 seconds kept as a documented, data-gated option | **DECIDED FINAL for now** | Founder asked to compare, not force a permanent choice — see §5.3 |
| 16 | **USD→INR = ₹94** | **RE-VERIFIED 2026-06-28** | Live mid-market ~₹94.36–94.44. Replaces ₹86 (00), ₹83 (PRICING_ARCHITECTURE, FINANCIAL_MODEL); confirms ₹94.5 (05) was right. |
| 17 | **Warm advertiser intros at sprint start = 0** (fully cold outreach) | Founder constraint, newly confirmed | Adjusts sprint math, see §6.3 |
| 18 | **Tier-1 rate-card CPM (once activated) = ~$2–3 India / $5–8 Global** | **DECIDED FINAL (planning number)** | Replaces $8/$15 (PRICING_ARCHITECTURE) and $5→$10-12 (FINANCIAL_MODEL) — anchored to the one independently-audited real comp, not 4–10x it. Full reasoning in §5.4. Tagged *Assumption* — revisit with real fill data. |

---

## 3. Market reality (verified, consolidated — holds as of 2026-06-28)

- Category is ~2.5 weeks old (born 2026-06-11). Players: kickbacks.ai, IdleAds.dev, Idlen.io, Sponsoric, picoads. No India-native competitor found, then or now. *(High confidence.)*
- **Zero verified paying advertisers exist anywhere in this category.** Both kickbacks.ai and IdleAds.dev independently used **Firecrawl** as a house placeholder — not a customer. That overlap is the strongest signal in the whole space: AI-infra/dev-tool sellers are the natural first buyer (see §6.1). *(High confidence.)*
- **No funding found for any competitor.** Every signal points to solo/two-person bootstrapped builds riding a viral moment, not VC-backed operations with sales teams. *(Medium-High confidence — absence of evidence.)*
- **Real earnings data points:** $4.43/3hrs (one HN tester) down to $0.27 CPM once novelty faded for another user. Blog "estimates" of $8–42 CPM are unverified self-reports — do not plan around them.
- **The Stripe-India wedge is real and independently re-verified** (not just a single GitHub issue): Stripe has been invite-only for new India accounts since May 2024 due to RBI regulatory changes, and Connect Express onboarding for India-based recipients is restricted. Confidence raised to **High** — corroborated by Stripe's own support documentation. IdleAds.dev already does UPI manually, so treat the payout-rail edge as *contested, not exclusive* — the real differentiator is *native, automated, GST-ready* UPI, not merely "we pay India."
- **Real developer-ad-network pricing comps** (the only trustworthy CPM data in this entire space): Carbon Ads' own published range is **$0.50–1.10 CPM**; an independent 3-year publisher audit (The Pragmatic Engineer) found **$1.60 effective CPM** on 2.1M views, selling to Okta/GitLab/Retool/MongoDB on a decade-old trusted network. EthicalAds ($1,000 min buy), Stack Overflow Ads ($10-15k/mo min), LinkedIn ($33-65 CPM, wrong comp — ABM display, not a captive moment), Reddit dev subreddits ($0.50-3.50 CPM), dev newsletters ($100-15,000/send) round out the comp set. *(High confidence for Carbon Ads' two numbers; Medium for the rest — self-reported minimums.)*
- **India market sizing — re-verified and strengthened:** India has **27 million developers on GitHub (2026)**, up from 21.9M in October 2025 (confirmed by GitHub COO Kyle Daigle — over 2M added this year alone). Microsoft CEO **Satya Nadella has gone on record** projecting India will be GitHub's largest developer community by 2030, at **57.5 million developers**. Confidence on this headline raised from Medium to **High** (named, on-record sources, not just a derived projection). SAM (devs actively using agentic AI coding tools) is still single-digit millions, undocumented precisely — flagged for primary research (open question, §9).
- **Pulse-check, 3 days on:** no material change anywhere — no new funding, no fix for Kickbacks' India block, no new India-native entrant. The "advertiser side is the real bottleneck, and it's wide open" thesis holds.

---

## 4. The honest bottom line (carried forward from 06, unchanged)

Nobody is making real money here yet. Developers are skeptical, not excited (Kickbacks' Show HN got 2 points, 0 comments — the loudest reaction was privacy concern). The real bottleneck is advertisers, not users. **Do not build for "millions of users earning passive income."** Build for: get 1–2 advertisers to pay you directly, keep costs near zero, prove the loop works, then scale.

Your edge is not technology — it's India focus + UPI done properly, out-hustling everyone else on the demand side (the whole category is failing at advertiser sales), and a ready-made product face (the AI Studio prototype).

---

## 5. Pricing & revenue model — the reconciliation

Three prior docs disagreed badly: `PRICING_ARCHITECTURE.md` ($8/$15 CPM, 10s impression, 50/50, ₹83/$), `FINANCIAL_MODEL.md` ($5→$7→$10-12 phased CPM, 10s impression, **40/60** split, ₹83/$), and `06-business-plan.md` (flat ₹15k/mo deals, no CPM at all, 50/50, 5s impression implied by the glossary). Here's what's now true.

### 5.1 The hybrid ladder, precisely defined

| Tier | Activates when | How you sell | What's built |
|---|---|---|---|
| **Tier 0** | Launch → ~5 advertisers signed | **Flat monthly sponsorships, ₹10,000–15,000/mo** ("exclusive sponsor line to N active Indian developers"). Not CPM — at <500 devs, CPM math yields ~₹12/dev/mo, which is unsellable. | House-ad serving engine + manual flat-deal creative rotation. No rate card, no self-serve. |
| **Tier 1** | 5–10 advertisers signed | Publish the reconciled CPM rate card (§5.4) and sell blocks against it. Flat deals can continue as an enterprise/sponsorship upsell. | The fixed-price block-serving engine in `00-MVP-spec.md` §4 — this is when it starts handling real money, not just existing structurally. |
| **Tier 2** | 5,000+ DAU | Real-time second-price auction. | Built only once there's enough supply-side liquidity for bids to mean anything — both pricing docs independently agreed RTB is premature pre-scale, regardless of who was right about the CPM number. |

This reconciles cleanly with the realistic 4-month plan in §8: at 100–500 installs and 1–3 advertisers, you are **entirely inside Tier 0**. Tier 1 likely doesn't activate until well past month 4, if the sprint runs at a realistic pace. Don't build Tier-1 self-serve infrastructure before then — it solves a problem you don't have yet.

### 5.2 What this means in practice right now (unchanged from 06, restated so nobody quotes the wrong number)

1 advertiser = ₹15,000/mo. 2–3 = ₹30,000–45,000/mo. 50/50 split. At 100–500 installs, each dev nets roughly ₹100–190/month. You stay cash-positive from month 1 because costs are tiny (~₹5,000/month all-in). **Never quote PRICING_ARCHITECTURE's $4/block or FINANCIAL_MODEL's ₹41,500/mo "founding rate" to a real Tier-0 prospect — both are stale, CPM-derived numbers that don't apply to a flat-deal sale.**

### 5.3 Impression length: 5 seconds vs. 10 seconds — compared, not forced

| | 5 seconds | 10 seconds |
|---|---|---|
| Matches category convention (Kickbacks, IdleAds) | Yes | No — would be first to diverge |
| Matches existing build (`00-MVP-spec`, `05` glossary) | Yes — already spec'd | No — needs rework |
| Inventory risk if AI "thinking" states often run shorter | Low | Higher — could undercount impressions and tank fill-rate numbers if avg thinking time < 10s |
| Premium-pricing justification ("2× dwell time = worth more") | Weaker | Stronger in theory, but **untested** — no comp confirms 10s commands 2x price in this category specifically |
| Engineering cost | Already done | Needs real telemetry on Claude Code thinking-state durations before committing |

**Decision for the v1 build: ship 5 seconds.** Lowest risk, matches what's already spec'd and what competitors use. Instrument real thinking-state durations during Tier 0 anyway — if the data shows most thinking states comfortably clear 10s, revisit the dwell-time premium argument at the Tier-1 rate-card decision point, with real numbers instead of a guess. Don't commit revenue math to 10s until then.

### 5.4 The Tier-1 CPM reconciliation (the number, when it activates)

PRICING_ARCHITECTURE's $8 India/$15 Global and FINANCIAL_MODEL's $5→$10-12 ladder are both 3–10x the one independently audited real number anywhere in developer advertising: **Carbon Ads' verified $1.60 CPM over 3 years**, selling to funded, trusted brands (Okta, GitLab, MongoDB) on a decade-old network. Devorix will be an unproven, weeks-old surface with zero case studies. Asking 5-10x what a trusted incumbent charges, before you've proven anything, is a guaranteed objection on every cold pitch.

**Reconciled Tier-1 rate card:** **$2–3 CPM-equivalent (India)** — about 1.3–2x Carbon's audited real number, justified by the captive, full-attention nature of a spinner versus a passive sidebar a user scrolls past, while staying within hailing distance of the only real comp, not 5-10x beyond it. **$5–8 CPM-equivalent (Global, Phase 2 only)** — closer to EthicalAds/Stack Overflow-implied premium territory, still well under LinkedIn's $33-65 (the wrong comp: ABM display, not a captive moment). At 50/50, India dev share ≈ **$1–1.5/block (₹94–141)** — smaller than PRICING_ARCHITECTURE's $4/block claim, but defensible and sellable. Pair with honest-ranges messaging (§6), not the bigger dream number. **Tag: Assumption — revisit immediately once Tier 1 has real fill data.**

---

## 6. Client niche & GTM motion

### 6.1 The three-ring niche (from `07`, holds)

1. **Ring 1 — AI-infra/dev-tool sellers to AI-building devs** (vector DBs, observability, agent frameworks, scraping/data APIs like Firecrawl, MCP tooling). Highest probability first movers — both Kickbacks and IdleAds independently picked Firecrawl as their placeholder, even fake. They already believe the audience exists.
2. **Ring 2 — India dev-economy sellers**: cloud/hosting resellers, EdTech/upskilling bootcamps, dev job boards, API/SaaS with Indian GTM budgets. Budget and precedent exist (they already buy Reddit/newsletter slots) but need more education on why this channel works.
3. **Ring 3 — Global dev-tool brands.** Phase 2 only (§8.1), not a month-1 target.

### 6.2 Tactical target list (from `FINANCIAL_MODEL`, tactics kept — only the dollar figures are superseded)

**Tier 1 (target first):** Razorpay DevTools, Sentry, PostHog, Hasura, DhiWise, Appsmith, Pabbly, 100ms, Supabase India (Evo) + recently-funded Indian startups (filter Crunchbase/YourStory/Inc42 by India + SaaS + Seed/Series A + last 6 months).
**Tier 2 (month 2):** Bootcamps (Scaler, Coding Ninjas, iNeuron, Newton School, Masai School); cloud-provider India DevRel teams (AWS, GCP, Azure).
**Avoid for now:** enterprise (Infosys/TCS/Wipro — procurement hell), consumer brands, ad agencies.

Reuse the outreach script structure (short LinkedIn/Twitter DM, screenshot not a deck, 15-minute call) but **swap the dollar figure** — pitch the Tier-0 flat range (₹10,000–15,000/mo), not the old $5-CPM-derived ₹41,500/mo "founding rate," which no longer reflects the reconciled model.

### 6.3 The cold-outreach reality (new — warm intros confirmed at 0)

You confirmed **zero** warm advertiser intros today. `07`'s modeled close rate (5–15% on a well-targeted list, 1–3 yeses from pitching 20) already assumed some cold-ish warmth via dev-tool Twitter/LinkedIn rapport — plan toward the **lower end** of that range with a true cold start. Adjusted sprint targets: build a list of **25–30** companies (not 20), pitch **12–15** of them (not 5–10), to keep a realistic shot at the same bar — **1 verbal yes = go, zero = stop and rethink.** Lead with Ring 1 every time; they need the least convincing.

---

## 7. Compliance & money mechanics

### 7.1 Re-verified findings (2026-06-28)

- **Entity:** Stay sole proprietor. Confirmed — Pvt Ltd costs ~₹20,000 to set up plus ₹40,000–70,000/year in mandatory filings, which would consume most of the ₹1 lakh budget for no near-term benefit.
- **GST:** Independently re-verified — **₹20 lakh/year** turnover threshold for services registration is current (multiple 2026 sources). GST on advertising/digital marketing services confirmed **18%** for FY2025-26, unchanged by the September 2025 GST Council rate revisions. No registration needed below the threshold; register only if a deal specifically requires a GST invoice.
- **TDS — sharper than previously written.** Section **194H** (commission/brokerage) is the right section if structured as a revenue-share/commission, not 194-O (e-commerce-operator rules don't fit this payment shape). Two thresholds, both newly confirmed, mean TDS likely doesn't attach at all yet: (a) the 194H deduction obligation only applies once the **deductor's own gross turnover exceeds ₹1 crore** (business) in the preceding financial year — Devorix' projected ~₹39,500 cumulative net by month 4 is nowhere near that; (b) even past that point, the per-payee exemption is **₹20,000/year** (raised from ₹15,000, effective April 2025) at a **2% rate** (cut from 5%, effective October 2024) — friendlier than any prior doc assumed. Practical effect: "TDS is basically nil for now" was right, for an even stronger reason than stated. Keep collecting PAN anyway — needed for the payout flow regardless.
- **Stripe/India wedge:** Independently re-verified via Stripe's own support documentation (beyond the GitHub issue) — invite-only for new India accounts since May 2024 (RBI rules), Connect Express onboarding for India-based recipients restricted. Confidence raised to **High**.
- **RazorpayX:** Independently re-verified via Razorpay's own API docs — Payouts API supports automated UPI/IMPS/NEFT/RTGS, UPI settles 24/7 instantly, per-transaction UPI cap is ₹5 lakh (irrelevant at our scale). The payout plan is technically sound, not just plausible.
- **RBI PPI / "payable not wallet":** The structural instinct is right — PPIs regulate stored value a holder can later spend elsewhere; an accrued-but-unpaid balance settled to a bank/UPI account on a threshold, with no load/spend/hold capability, sits outside that definition. **New flag:** RBI issued draft Master Directions revisiting PPI rules as recently as April 2026 (post-Paytm-restrictions context) — this area is actively moving. Confirm the ledger design with a fintech-savvy CA before scaling past MVP.
- **FX rate:** Live mid-market USD/INR ≈ **₹94.36–94.44** as of today. Confirms `05`'s ₹94.5 correction was right; `00`'s ₹86 and the two pricing docs' ₹83 are stale by 9–12%. **Use ₹94 everywhere going forward.**

*(None of this is legal advice — confirm specifics with a CA/lawyer before acting, especially before your first advertiser invoice and before scaling past MVP.)*

---

## 8. Roadmap & sequencing

### 8.1 Geographic sequencing (final)

**India first. Global is an explicit Phase 2**, gated on the go/no-go criteria below — not a permanent non-goal, just not now. Keep the Global Tier pricing structure on paper (§5.4) for when that gate clears. Don't build international payout rails (PayPal/Wise) or spend GTM effort on global advertisers before then.

### 8.2 The 14-day sprint (structure from `06`, adjusted for zero warm intros)

- **Days 1–3 — Prove demand first.** Build a 25–30 company list (Ring 1 priority). Pitch 12–15 a 1-month flat sponsorship pilot at ₹10,000–15,000. **Success = 1 verbal yes.** Zero yeses → stop and rethink before building more.
- **Days 3–10 — Build the thinnest real loop.** Status-bar client (non-patching, never reads code), minimal backend (ledger + balance), RazorpayX UPI payout in sandbox, reuse the AI Studio prototype as landing page with honest earnings ranges (not ₹0.42/impression).
- **Days 10–14 — Launch small, deliver.** Recruit 50–100 real devs, run the first sponsor live, capture a real UPI payout screenshot (your best marketing asset), send the advertiser a report, ask for renewal.

### 8.3 The 4-month plan and go/no-go gate (unchanged from `06`)

| | Month 1 | Month 2 | Month 3 | Month 4 |
|---|---|---|---|---|
| Installs | 100 | 250 | 400 | 500 |
| Advertisers (flat) | 1 | 2 | 2 | 3 |
| Revenue (₹) | 15,000 | 30,000 | 30,000 | 45,000 |
| Cumulative net (₹) | 2,400 | 12,300 | 22,200 | **~39,500** |

**Continue past month 4 only if all three hold:** (1) at least 2 advertisers have paid *and* renewed, (2) developers stick around after the novelty fades (week-4 retention), (3) you still enjoy running it on tiny margins. All three → consider Pvt Ltd/GST/a real growth push and Tier 1. Any false → you'll have spent ~₹20-30k and a few weekends to learn something most founders pay far more to find out.

### 8.4 Tier 1 trigger

Tier 1 (the real CPM rate card, §5.1/5.4) only activates once 5–10 advertisers are signed — realistically beyond the 4-month window above. Don't build self-serve rate-card infrastructure before then.

---

## 9. Open questions still genuinely unresolved

These were never answered in either grilling round — they remain open, not silently decided:

- **Network for seeding installs:** how many Indian devs are in your own network to seed the Day 10–14 launch cohort? Needed to sanity-check the 50–100-dev launch target.
- **Real demand read:** would devs actually care about ₹150–300/month, or is the install hook mostly novelty/virality? Only real installs + week-4 retention data will answer this.
- **Enterprise B2B second act timing:** leaning "later," never pinned to a date or trigger.
- **6-month defensibility / unfair advantage:** addressed qualitatively in `01` (GTM + advertiser sales + India ops, not tech) but never crisply pinned to one sentence — worth a reflective conversation, not a multiple-choice grill.
- **Second tool after Claude Code:** Cursor vs. Windsurf — depends on India usage data not yet gathered.

---

## 10. Broader market & competitive intelligence (Phase 1 research, 2026-06-28)

*Fresh research beyond the category-specific work in §3, run for the investor-grade PRD effort. Same confidence-labeling convention as §3.*

- **AI coding tool market is large and still compounding, by every research firm's count, though the numbers disagree on category boundaries.** Gartner sizes enterprise AI coding agents at ~$9.8–11.0B annualized (April 2026); Mordor Intelligence puts AI code generation at $11.8B (2025) → $16.13B (2026); other trackers cite $12.8B (2026) → $30.1B (2032) at 27% CAGR. *(Medium confidence — directionally consistent across firms, but no single authoritative number; treat as a range, not a point estimate.)*
- **Adoption is now the majority case, not the early-adopter case.** 85–92% of developers use AI coding tools depending on survey (Stack Overflow 2025 and others); GitHub Copilot has 26M+ users (29% workplace share); Cursor and Claude Code are tied at 18% workplace usage each. *(High confidence — converging numbers from independent surveys.)*
- **The surrounding ecosystem's economics are a useful TAM anchor, even though they don't measure this niche directly.** Cursor (Anysphere): ~$2B annualized revenue (Feb 2026), 1M+ paying customers, $29.3B valuation (Nov 2025 Series D), reportedly in talks for $50B. **Claude Code: $0 to $2.5B run-rate in 9 months** — the single most relevant data point, since it's Devorix's first target tool and shows real, large, fast-growing spend/engagement inside the exact surface being monetized. *(High confidence, named sources — Anysphere funding press, Anthropic's own growth disclosures.)*
- **a16z's ad-supported-AI macro thesis is a directional analogy, not a direct TAM for this niche.** Olivia Moore (a16z): if AI products monetized via ads at Google's $460/user/year ARPU, that implies ~$152B/year — vs. ~$40B from a 5%-of-users-pay-$200/month subscription model. Useful for "advertising-as-a-monetization-channel-for-AI-products is a thesis serious investors hold," not a number to budget against. *(Medium confidence — single analyst's framework, consumer AI broadly, not dev tools specifically.)*
- **Affiliate marketing — the closest existing business-model category to Devorix's mechanic — is an established, growing ~$17–20B/year global market (2026 estimates vary by source, ~8% CAGR).** No source isolates a "developer-focused" sub-segment, so this is market-size context for "affiliate-style monetization is a proven model broadly," not a niche TAM. *(Medium confidence.)*
- **The agent-economy / agentic-commerce thesis (relevant to Devorix's long-term vision, not its current product) has real institutional money behind it.** Visa, Mastercard, PayPal, Stripe, and Google all shipped agentic-payment infrastructure in a six-month window (Apr–Sep 2025). Anthropic's own Anthology Fund (with Menlo Ventures) explicitly backs AI-payments infrastructure. Market-opportunity estimates run $3–5 trillion: directional, multi-year, *not* a near-term number. 89% of global VC funding went to AI in Q1 2026; AI startups raised $255.5B globally in Q1 2026 alone (PitchBook), already exceeding all of 2025. *(High confidence on the funding/launch facts; the $3–5T figure is a long-range industry projection, tag as Estimate.)*
- **Competitive intelligence update on the category (supersedes/extends §3 with launch-mechanics detail):** Kickbacks' launch tweet (June 11, 2026) passed 5.5M views in 24 hours — the category has real top-of-funnel virality, even with weak monetization proof. **Kickbacks pays devs 50% and works by patching Claude Code's rendering layer directly — explicitly *not* officially supported by Anthropic.** IdleAds launched within 24 hours of Kickbacks at a **70% dev rev-share (stated goal 90%)** — i.e., a direct competitor is already offering more than Devorix's locked 50/50. *(High confidence, multiple independent sources.)* **Flag for §11 risk analysis, not a re-opening of the locked 50/50 decision** — the founder has already decided that question; this is new information to monitor at Tier-1 (§5.1), not act on now.
- **Payouts in the category are still unproven even for the leader:** as of June 12, 2026, Kickbacks had not yet activated real payouts — Stripe Connect integration was reported "nearing completion." This is the same Stripe-India gap Devorix is already built around (§7.1), now confirmed to be slowing down the market leader specifically, not just a hypothetical India problem.
- **Platform ToS risk, verified directly against Anthropic's current policy:** in January 2026, Anthropic enforced its Consumer Terms against tools (OpenClaw/Clawdbot, OpenCode, Roo Code, Goose) that extracted and reused OAuth tokens from Claude Free/Pro/Max subscriptions in unauthorized third-party clients — those tools had consumer credentials blocked. **What remains explicitly allowed:** using the actual `claude` CLI binary on any machine, and building with official API keys via Console/Bedrock/Vertex. Devorix's planned client (non-patching, status-bar/terminal overlay, never reads code, never touches Claude's own OAuth tokens or rendering layer) sits on the safe side of this line — unlike Kickbacks, which patches the rendering layer itself. **This is a real, citable differentiator for the PRD's compliance section, not just a defensive assumption.** *(High confidence — direct from Anthropic's enforcement action and current docs.)*
- **Broader dev-tool trust environment is fragile right now, which cuts both ways.** "IDEsaster" — 30+ disclosed vulnerabilities across Cursor, Windsurf, Copilot, Zed, Roo Code, Cline, and others — plus a June 2026 supply-chain attack where Microsoft's own open-source tooling was hacked to inject password-stealing malware into projects used by AI-coding-tool developers. Developers are primed to distrust anything that touches their dev environment (raises the bar Devorix's "non-patching, never reads your code" positioning has to clear — but also makes that positioning a sharper marketing asset if proven out, not just a compliance checkbox). *(High confidence on the incidents; medium on how much this specifically affects willingness to install a sponsor-footer tool — no direct survey data found.)*
- **Domain check (resolves §2 decision #7's open verification item):** `devorix.ai` is available, $160 for 2 years. `devorix.com` is taken. `devorix.io` ($38/yr) and `devorix.dev` ($10/yr) are available as fallbacks. *(Verified live via registrar lookup, 2026-06-28.)* No trademark search run yet — still a genuine open item.

---

## 11. VC-lens validation (Phase 2)

Honest answers, not a sales pitch — per the founder's standing instruction to be grilled rather than reassured.

**Is the problem real?** Partially. Developers spending 4–10 hrs/day in AI coding tools is real and growing (§10). But "developers get no financial participation" is a thinner problem than it sounds: developers aren't asking for this — Kickbacks' own HN reception was 2 points/0 comments, and the loudest reaction across the category is privacy suspicion, not demand (§3, §4). This is a **monetization opportunity for an existing attention pool**, not a pain point developers are actively trying to solve. Be honest about that distinction in the PRD — don't oversell "developers are suffering."

**Is the pain severe?** No — and that's fine, because this isn't a painkiller pitch. It's a "free money for an idle moment" vitamin, closer to cashback/rewards-card psychology than to an urgent unmet need. The real pain this resolves is on the **advertiser side**: developer-tool marketers have shockingly few high-trust placement options (Carbon Ads is the only mature one, and it's not built for the agentic-coding moment specifically). §3, §6.

**Is the timing right?** Yes, narrowly. The category is ~2.5 weeks old, AI-coding-tool usage just crossed majority adoption (§10), and India's GitHub developer base is growing faster than anywhere else (§3). But the window is **short and the moat is shallow** — IdleAds cloned Kickbacks' mechanic within 24 hours (§10). Timing favors moving fast on advertiser relationships (the actual bottleneck, §4), not on product polish.

**Would developers actually want this?** Mildly, probably — as supplementary income, not as a reason to choose a tool. Real installs + week-4 retention data (§9, still an open question) will tell you for certain. Plan for novelty-driven initial installs with real attrition, not a durable habit, until proven otherwise.

**What risks exist?**
- *Competitive:* IdleAds already undercuts Devorix's dev economics (70% vs. 50%, §10) — a real risk to Tier-1 advertiser-quality dev supply if Devorix can't differentiate on something other than payout share (candidates: India-native UPI payouts done properly, advertiser trust/quality of placements, the non-patching compliance posture).
- *Platform policy:* Low-to-moderate, *if* the non-patching architecture is built and maintained as designed (§10) — meaningfully lower than Kickbacks' rendering-layer-patch approach. This is conditional on engineering discipline, not a one-time decision.
- *Regulatory:* RBI's PPI rules are actively being revisited (§7.1) — the accrue-then-payout ledger design needs a CA/fintech-lawyer sign-off before scaling past MVP, not after.
- *Demand-side:* Zero verified paying advertisers exist anywhere in this category (§3) — this remains the single biggest risk to the whole thesis, bigger than any product or compliance risk.
- *Trust environment:* Developers are in a heightened-suspicion moment toward anything touching their dev environment (§10) — a botched first impression (e.g., a privacy misstep) could poison the category, not just one company, given how small and recent it is.

**Would advertisers pay?** Unproven but plausible — Carbon Ads' audited $1.60 CPM and EthicalAds' $1,000 minimum buy show developer-attention ad budgets exist and clear real revenue at small scale (§3). Nobody has yet proven a developer-tool brand will pay specifically for a *wait-state* placement at any price; that's the actual thing the 14-day sprint (§8.2) is designed to test, and the right framing for a PRD section — "this is the open question the MVP is built to answer," not "this is proven."

**Could this violate platform policies?** See §10 — conditionally low risk if built and kept non-patching. Kickbacks already demonstrates what the risky version looks like and that Anthropic has both a policy and an enforcement track record (the January 2026 OAuth-token action). Worth an explicit "we are not Kickbacks" compliance appendix in the PRD.

**What legal risks exist?** Mainly TDS/GST timing (already well-handled in §7.1, re-verified) and the RBI PPI ambiguity above. Advertiser-side: flat-fee sponsorship deals are low-complexity contracts; nothing here requires unusual legal structuring at Tier 0/1 scale.

**What privacy risks exist?** Lower than the median AI-dev-tool privacy risk right now (§10's "IDEsaster" context) *because* the architecture is designed to never read code — but that claim is only as good as the actual implementation, and privacy-skeptical developers (the category's loudest voice so far) will scrutinize it. Recommend the PRD make the "never reads your code" claim verifiable (e.g., open-source the client, or publish what data leaves the machine), not just asserted.

**What is the strongest version of this business?** Not a bigger ad network — a **trust and payout-rail advantage in a market where every competitor is racing the same shallow mechanic.** Concretely: (1) win on India payout execution (UPI done properly is a real, defensible wedge while Stripe stays blocked, §3/§7.1) before competing on rev-share %; (2) win on advertiser trust (be the one network that can show a real, honest report and a renewal, not a Show-HN screenshot) while the category's actual bottleneck — demand-side sales — stays wide open and everyone else ignores it; (3) treat the long-term "recommendation infrastructure" vision (§12, once written) as the reason to build clean ledger/attribution primitives now, not as a near-term pitch.

**Would YC / Sequoia / Accel / Peak XV / Lightspeed invest, at this stage?** Not yet, and the founder's own MASTER-PLAN already reaches the right conclusion independently (§4): pre-seed, pre-revenue, no advertisers, no installs, solo founder, ₹1 lakh budget. That's a **pre-seed/accelerator-stage story, not a seed-round story.** What would change the answer: 1–2 *renewing* paying advertisers and real week-4 dev retention data (§8.3's go/no-go gate) — i.e., exactly the gate the founder already set, independently of this research. The honest pitch to any of these investors today is "give us a small check or an accelerator slot to prove the loop," not "fund our billion-dollar vision" — the vision belongs in the PRD as context for *why* the infrastructure bet is worth taking if the near-term loop works, not as the headline ask.

**Moats / defensibility, 6 months out:** Not technology (the mechanic was cloned in 24 hours, §10). The real candidates are: India payout-rail execution + compliance depth (genuinely hard to replicate fast, unlike a spinner overlay), advertiser relationships and renewal data (sales is the bottleneck nobody else is solving, §4/§6), and — if it gets built — clean attribution/ledger data that makes a future recommendation-marketplace pivot credible. None of these exist yet; all are buildable in the 4-month window if the go/no-go gate clears.

**What must change, if anything?** Nothing about the locked decisions (§2) — they're well-reasoned and the founder has already iterated on them twice. What the PRD should change is **framing**: present the "AI Developer Monetization → ... → Financial Infrastructure for Autonomous Software" vision ladder explicitly as long-range thesis/optionality, with the §4 "honest bottom line" and §8.3 go/no-go gate as the actual near-term plan investors should evaluate. Mixing the two registers — claiming infrastructure-scale ambition while the actual ask is "fund a 14-day sprint" — is the single most common way pre-seed pitches lose credibility with experienced VCs, and the one risk most worth guarding against in the PRD draft.

---

## 12. Sources

- [kickbacks.ai](https://kickbacks.ai/) · [FAQ/fraud](https://kickbacks.ai/faq) · [GitHub mirror](https://github.com/andrewmccalip/kickbacks.ai) · [Issue #51 — Stripe blocked for India](https://github.com/andrewmccalip/kickbacks.ai/issues/51) · [Product Hunt](https://www.producthunt.com/products/kickbacks-ai) · [HN discussion](https://news.ycombinator.com/item?id=48493940)
- [IdleAds.dev](https://idleads.dev/) · [IdleAds on HN](https://news.ycombinator.com/item?id=48506060)
- [Idlen — How it works](https://www.idlen.io/developers/how-it-works/)
- [AIWaitIndex comparison (dev.to)](https://dev.to/digitalcheff/i-compared-every-ai-wait-state-ad-platform-kickbacks-idleads-idlen-more-3m4a)
- [Carbon Ads FAQ](https://www.carbonads.net/faq) · [Carbon Ads media kit](https://www.carbonads.net/more-info)
- [Three years of advertising on my blog — The Pragmatic Engineer](https://blog.pragmaticengineer.com/ads/)
- [EthicalAds — Advertise with Us](https://www.ethicalads.io/advertisers/)
- [India 27M GitHub developers — CIOL](https://www.ciol.com/news/github-27-million-developers-india-open-source-ai-growth-11720405) · [VARINDIA](https://www.varindia.com/news/india-becomes-fastest-growing-developer-community-on-github) · [investmentguruindia](https://investmentguruindia.com/newsdetail/india-s-developer-community-surges-to-27-million-on-github453627)
- [RazorpayX Payouts API docs](https://razorpay.com/docs/api/x/payouts/) · [Create Payout to VPA](https://razorpay.com/docs/api/x/payouts/create/vpa/)
- [Stripe — pausing payouts for India accounts](https://support.stripe.com/questions/pausing-payouts-for-stripe-accounts-in-india) · [Stripe India recurring payments docs](https://docs.stripe.com/india-recurring-payments)
- [GST registration limits — Razorpay Learn](https://razorpay.com/learn/gst-registration-limits/) · [GST on digital marketing services 2026](https://busy.in/gst-rates/digital-marketing-services/)
- [Section 194H — ClearTax](https://cleartax.in/s/section-194h-tds-on-commission-brokerage) · [Section 194H — IndiaFilings](https://www.indiafilings.com/learn/section-194h-tds-on-commission-and-brokerage)
- [RBI draft PPI rules, April 2026 — Medianama](https://www.medianama.com/2026/04/223-rbi-prepaid-payment-instruments-rules-wallet-limits-escrow-norms/) · [RBI PPI FAQs](https://www.rbi.org.in/commonman/english/scripts/FAQs.aspx?Id=2812)
- USD/INR live rate, 2026-06-28 — Wise, XE, Western Union currency converters
- [Gartner — Enterprise AI Coding Agents 2026 Market Guide](https://www.gartner.com/en/articles/enterprise-ai-coding-agent-market) · [Gartner press release, 2026-05-20](https://www.gartner.com/en/newsroom/press-releases/2026-05-20-gartner-says-the-market-for-enterprise-ai-coding-agents-is-entering-a-new-phase-of-expansion-and-competitive-realignment) · [Mordor Intelligence — AI Code Generation Market](https://www.mordorintelligence.com/industry-reports/ai-code-generation-and-developer-assistant-market)
- [CB Insights — Who's winning the AI coding race?](https://www.cbinsights.com/research/report/coding-ai-market-share-december-2025/) · [PitchBook — Q1 2026 AI funding](https://pitchbook.com/news/articles/q1-2026-ai-funding-blows-past-2025-total-with-three-deals-accounting-for-67-of-capital)
- [a16z — Olivia Moore, ad-supported AI economics (via MindStudio summary)](https://www.mindstudio.ai/blog/a16z-olivia-moore-ad-supported-ai-152b-revenue-math) · [a16z — Notes on AI Apps in 2026](https://a16z.com/notes-on-ai-apps-in-2026/)
- [McKinsey — The agentic commerce opportunity](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-agentic-commerce-opportunity-how-ai-agents-are-ushering-in-a-new-era-for-consumers-and-merchants) · [Antler — Agentic commerce](https://www.antler.co/blog/agentic-commerce-unleashing-the-autonomous-economy)
- [Kickbacks launch detail — go-to-agency.com](https://go-to-agency.com/en/blog/kickbacks-ai-ads-claude-code-spinner) · [IdleAds/Kickbacks comparison — dev.to](https://dev.to/digitalcheff/i-compared-every-ai-wait-state-ad-platform-kickbacks-idleads-idlen-more-3m4a) · [AIWaitIndex](https://aiwaitindex.com/)
- [Anthropic — Updates to Consumer Terms and Privacy Policy](https://www.anthropic.com/news/updates-to-our-consumer-terms) · [The Register — Anthropic clarifies ban on third-party tool access](https://www.theregister.com/software/2026/02/20/anthropic-clarifies-ban-on-third-party-tool-access-to-claude/5014546) · [HN — Anthropic blocks third-party use of Claude Code subscriptions](https://news.ycombinator.com/item?id=46549823)
- [Anysphere/Cursor funding & ARR — tech-insider.org](https://tech-insider.org/cursor-vs-copilot-2026/) · [Claude Code run-rate context — Uvik](https://uvik.net/blog/claude-code-vs-cursor-vs-copilot-vs-codex-2026/)
- [TechCrunch — Microsoft open source tools hacked, malware injected, 2026-06-08](https://techcrunch.com/2026/06/08/microsofts-open-source-tools-were-hacked-to-steal-passwords-of-ai-developers/) · ["IDEsaster" vulnerability disclosures — The Hacker News](https://thehackernews.com/2025/12/researchers-uncover-30-flaws-in-ai.html)
- Domain availability/pricing for devorix.ai/.com/.io/.dev — live registrar lookup, 2026-06-28

---

## 12. Investor PRD: Phases 3-10 (complete, 2026-06-29)

Phases 3-10 of the investor-PRD pipeline (TAM/SAM/SOM, personas/JTBD, product requirements, system architecture, GTM, financial model extension, risk analysis, roadmap, full LaTeX assembly) are complete. Full document lives in `devorix-prd/` (compile with `xelatex → bibtex → xelatex → xelatex`; see `devorix-prd/README.md`). Compiled output is **95 pages**, not the originally targeted 150-250 — the content covers all 10 phases at investor-grade depth, the gap is mostly denser-than-needed appendix padding in the original target, not missing substance. No locked decision in §2 changed during this work.

Two new findings from this research that bear on risk/positioning going forward (also written into `devorix-prd/chapters/10_risk_analysis.tex` and `04_customer_research.tex`):
- **Anthropic ran an anti-ads marketing campaign** ("Ads are coming to AI. But not to Claude," Feb 2026, Super Bowl-adjacent) — a platform-level signal that the category Devorix sits in (ads inside AI tools) is something at least one major lab is actively positioning against. Monitored risk, not a reason to change the model.
- **IdleAds is already claiming the same "non-patching / trust-first" positioning** Devorix planned to own, in addition to undercutting on dev rev-share (70-90% vs. Devorix's locked 50/50). Devorix's actual differentiation needs to be sharper than "we're the trustworthy one" since a competitor already says that too.

## Changelog
- v1.0 (2026-06-28): Initial master plan. Consolidates `04`, `05`, `06`, `07`, `PRICING_ARCHITECTURE.md`, `FINANCIAL_MODEL.md`. Resolves all known contradictions (rev share, payout threshold, impression length, FX rate, CPM levels, geographic scope). Incorporates Round 2 founder decisions and fresh verification research (FX, GST, TDS, Stripe, RazorpayX, RBI PPI, India dev count).
- v1.1 (2026-06-28): Renamed "Async Returns"/"ASYNC." → **"Devorix"/"DEVORIX."** across all docs, code, filenames, and the financial-model workbooks. Decision #7 moved from Leaning to Decided Final.
- v1.2 (2026-06-28): Added §10 (broader market/competitive intelligence) and §11 (VC-lens validation) — Phase 1-2 of the investor-PRD research program. Confirmed devorix.ai domain availability. Surfaced two new risk flags for monitoring (not re-opening locked decisions): IdleAds' 70%/90%-goal dev rev-share vs. Devorix's locked 50/50, and Kickbacks' rendering-layer-patch approach as a contrast case for Devorix's non-patching compliance posture. No locked decision in §2 changed.
- v1.3 (2026-06-29): Added §12 — Phases 3-10 of the investor-PRD pipeline complete. Full compiled LaTeX PRD in `devorix-prd/` (95 pages). Surfaced two further risk findings: Anthropic's anti-ads campaign, and IdleAds already claiming Devorix's planned "non-patching/trust" positioning. No locked decision in §2 changed.
