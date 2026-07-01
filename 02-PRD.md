# Devorix — Product Requirements Document (PRD)

> **Decisions and numbers below are subordinate to `MASTER-PLAN.md`.** Rev share, payout threshold, geographic scope, and compliance posture have all been finalized/re-verified there as of 2026-06-28 — see notes inline below and `MASTER-PLAN.md` §2, §7, §8.

**Version 0.1 · Last updated 2026-06-25 · Living document**
*Update this as scope changes. Companion docs: `00-MVP-spec` (technical), `01-competitive-case-study`, `03-marketing-plan`, `04-P0-tasks`, `devorix-financial-model.xlsx`.*

---

## 1. Problem & opportunity
AI coding agents (Claude Code, Cursor, Codex, Windsurf) show a "thinking" status line that earns nothing. A new category monetizes that moment and shares revenue with the developer. The category leader, kickbacks.ai, **cannot pay Indian developers** (Stripe). India has ~27M GitHub developers (2026). The inventory is unclaimed. Opportunity: be the India-native platform that monetizes AI wait states, pays in rupees, and bills Indian advertisers — and grab the install base before anyone localizes.

## 2. Vision
The default way Indian developers earn from AI wait time, and the default way Indian dev-focused brands reach developers — paid in rupees, GST-compliant, enterprise-safe.

## 3. Goals & non-goals
**Goals (first 6 months)**
- Own the Indian install base for wait-state monetization (target: land grab, see model).
- Make the "earn money" promise real by landing actual advertisers (fill rate is the KPI that matters).
- Native, automated UPI payouts + GST-compliant advertiser billing.
- Enterprise-safe client (non-patching, "never reads your code," auditable).

**Non-goals (for now)**
- Real-time auction (start with house ads → fixed-price; auction triggers at 5,000+ DAU — see `MASTER-PLAN.md` §5.1).
- Non-India markets — **confirmed as a Phase-1 scoping decision, not permanent.** India first, Global is an explicit Phase 2 gated on the go/no-go criteria (`MASTER-PLAN.md` §8.1, §8.3).
- Mobile / non-coding AI surfaces.
- Crypto/USDC payouts (revisit only if fiat friction blocks growth).

## 4. Users & personas
- **Publisher (developer):** Indian dev using AI coding tools daily; wants passive rupee income, low hassle, trust that code isn't read. Success = installs, weekly active, reaches payout threshold.
- **Advertiser:** Indian dev-tool startup, cloud/hosting reseller, EdTech/upskilling brand, dev job board, DevRel team; wants cheap, targeted developer reach with a GST invoice in INR. Success = campaigns live, measurable clicks, repeat spend.
- **(Later) Enterprise buyer:** Indian IT/dev org wanting to brand or monetize their teams' wait states + analytics.

## 5. Key requirements (MVP)
**Publisher client (VS Code + Claude Code first)**
- Inject one sponsored status line into the agent's wait state via per-tool adapter.
- Count impression (shown ≥5s, window focused) and click; batch-report signed events.
- Status-bar live balance (today/month/lifetime); one-click disable to restore original spinner.
- Google + GitHub OAuth sign-in.
- Hard guarantee + audit: never read code, prompts, completions, paths, or transcripts.

**Backend**
- Event ingest (idempotent, dedup, server-side fraud/validity filter before any money moves).
- Ad serving: Tier 0 house ads → Tier 1 fixed-price blocks (1 block = 1,000 impressions).
- Double-entry ledger (Postgres) separate from raw event store (ClickHouse/Redis).
- Publisher dashboard: balance, PAN/KYC, payout settings.
- Advertiser onboarding (concierge/manual acceptable at MVP) + GST invoicing.

**Payouts**
- Accrue; auto-payout at **₹300** threshold (final, 2026-06-28 — was ₹500) via RazorpayX UPI (IMPS fallback); idempotency key; webhook reconciliation; PAN-gated; TDS handling.

## 6. Success metrics
- **North star:** monthly rupees actually paid out to developers (proves the loop end-to-end).
- Installs, WAU, % devs reaching payout, **fill rate** (most important early), advertiser count & repeat rate, ARPU/dev, payout reliability, fraud rate.

## 7. Differentiation (vs. competitors — see case study)
India-native automated UPI + GST billing (beats Kickbacks' no-India and IdleAds' manual UPI); enterprise-safe non-patching client; aggressive local advertiser supply; ~~optional higher rev share (60–70%) as an install-war lever~~ **superseded — rev share locked at 50/50, `MASTER-PLAN.md` §2 row 11; compete on ops/reliability instead.**

## 8. Compliance (confirm with CA/lawyer — not legal advice)
**Updated 2026-06-28 (`MASTER-PLAN.md` §7.1, re-verified):** stay sole proprietor for now, no GST registration yet (below ₹20L/yr threshold; ad services are 18% GST once it applies); TDS section is **194H** (not 194-O), but the obligation doesn't attach yet at our scale — collect PAN anyway from day one. DPDP Act 2023 consent + India data residency; advertiser content policy / brand safety; accrued balance treated as payable (not a wallet) to avoid RBI PPI rules — note RBI issued draft PPI rules in April 2026, worth re-confirming with a CA before scaling past MVP.

## 8b. Current build state — AI Studio prototype (2026-06-25)
A working React/Vite prototype exists (Google AI Studio, app id `6fa3119e…`), unzipped to the outputs folder. It is a **marketing site + simulated dashboard + advertiser tool**, not the real extension/backend. Branding confirmed: "Devorix" / "DEVORIX." / ₹ mark / domain devorix.ai / positioning "Crafted for Elite Developers."

**Tabs:** How it Works · Expected Earnings · Developer Dashboard (mock: total ₹845.50, today ₹12.40, referral ₹45.10, ₹1,000 goal, referral code, live impression ticker e.g. "Vercel ad shown during npm run build — ₹0.42") · For Advertisers.

**Three Gemini-powered features worth adopting (server.ts):**
- **Wait-State Coach** (`/api/gemini/coach`, gemini-3.1-pro): dev's IDE + languages + queries/day → estimated idle seconds, earnings, matched B2B sponsors, workspace micro-optimizations. → *Adopt as a lead-gen/marketing tool (P1).* 
- **Workspace Analyzer** (`/api/gemini/analyze-image`): upload terminal/IDE screenshot → detect theme, suggest hex/padding for native-looking footer, earning tier. → *Nice-to-have (P2).* 
- **Ad-Copy Generator** (`/api/gemini/generate-ad`, gemini-3.5-flash): advertiser brand/product → 3 sponsorship-line variations (JSON). → *Adopt early: directly helps cold-start advertiser onboarding (P1).* 

**Framing note:** prototype says "sponsorship **footer**" (terminal + IDE status line), slightly broader than "spinner line" — same inventory, adopt the footer framing. **Dependency:** AI features use Google Gemini; acceptable for these helpers, but the core ad-serving/ledger must not depend on it.

**⚠️ Conflicts to resolve (see Decisions Log in 05):**
1. **Earnings realism** — prototype shows ₹0.42/impression (₹0.35–0.60 in code) ⇒ implied gross eCPM ~$8–14, which is 4–7× our conservative base ($2) and at/above the top of observed real data ($0.27–$10.9). **Risk: overpromising → churn + reputational damage.** Marketing must show ranges with conservative defaults and label all earnings as estimates.
2. ~~**Payout threshold** — prototype ₹1,000 vs. logged decision ₹500.~~ **Resolved 2026-06-28: ₹300, final** (`MASTER-PLAN.md` §2 row 13) — splits the difference, faster first payout = better retention.

## 9. Open questions
- Confirmed Indian SAM (devs using agentic AI tools) — needs primary research. Still open.
- ~~Final dev revenue share (50% vs 60–70%)~~ — **resolved 2026-06-28: 50/50, final.**
- ~~Exact TDS section applicable to revenue-share payouts~~ — **resolved 2026-06-28: Section 194H, doesn't attach yet at our scale. See `MASTER-PLAN.md` §7.1.**
- Which second tool after Claude Code: Cursor vs Windsurf (by India usage). Still open.

## 10. Risks (see case study §6 and MVP spec §10)
Thin per-dev payouts → retention; zero advertiser demand early; fraud; tool-API churn; fast-follow localization by IdleAds/Kickbacks.

## Changelog
- v0.2 (2026-06-25): Added §8b — AI Studio prototype state, 3 Gemini features to adopt, and two conflicts (earnings realism, payout threshold).
- v0.1 (2026-06-25): Initial PRD.
