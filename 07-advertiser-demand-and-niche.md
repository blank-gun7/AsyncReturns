# Devorix — Advertiser Demand & Niche Deep-Dive

> **⚠️ RETIRED 2026-06-28 — superseded by `MASTER-PLAN.md`.** The three-ring niche breakdown and comparables table below are carried forward unchanged into `MASTER-PLAN.md` §3 and §6.1. Read the master doc for the reconciled pricing implications and the cold-outreach-adjusted close-rate math (§6.3).

**Version 1.0 · 2026-06-28 · Living document**
*Follow-up to `01-competitive-case-study.md` and `06-business-plan.md`. Question asked: who actually buys these ads, who is backing the competitors, and how does that define our real niche? Every figure tagged with confidence.*

---

## 1. The base we're starting from (recap, not repeated in full)

Already established and still holding as of today:
- Category is ~3 weeks old (born 2026-06-11). Four real players: kickbacks.ai, IdleAds.dev, Idlen.io, Sponsoric, picoads. No confirmed India-native competitor.
- Nobody has proven revenue. Real data points range from $4.43/3hrs (HN tester) down to $0.27 CPM once novelty faded.
- Stripe doesn't pay out to India. That's our wedge. IdleAds does UPI manually; nobody does it natively.
- See `01-competitive-case-study.md` for the full teardown and `06-business-plan.md` for the resulting "sell flat sponsorships, not CPM" strategy.

This doc adds three things you asked for: **who is actually buying, who is funding the sellers, and what that implies about our real client niche.**

---

## 2. Who is actually advertising right now? (Verified: almost no one)

- **kickbacks.ai:** As of launch (2026-06-12) the only ad ever shown was **Firecrawl** — explicitly a house placeholder to bootstrap inventory, not a paying client. *(High confidence.)*
- **IdleAds.dev:** Same story — **Firecrawl** again as the house placeholder, no real advertisers reported. *(High confidence.)*
- **Idlen.io:** Positions itself for "developer tool companies... hosting, databases, CI/CD, SDKs" but no named client or case study found publicly. *(Medium — absence of evidence.)*
- **Sponsoric / picoads:** No named advertisers found. Marketing copy only describes the target buyer (app builders, MCP agent builders), not actual deals. *(Medium.)*

**The Firecrawl overlap is the most useful signal in this whole search.** Two unrelated competitors independently chose the same company as their placeholder ad. Firecrawl is a developer-facing API (web scraping/data for LLM agents) — i.e., an **AI-infra/dev-tool company selling to the exact people staring at the spinner.** That's a real clue about which advertiser category will bite first: not generic brands, but companies that sell *to* AI-building developers specifically (vector DBs, observability, agent frameworks, AI APIs, MCP tooling).

**Bottom line: zero verified paying advertisers exist anywhere in this category today**, three weeks in. The "advertiser problem" flagged in `06-business-plan.md` is, if anything, confirmed harder than first written.

---

## 3. Who's backing the competitors? (Verified: nobody, as far as public records show)

Searched specifically for funding, investors, and capital raised by kickbacks.ai (ShiftKeys Inc / Andrew McCalip), IdleAds.dev, Idlen.io, Sponsoric, and picoads.

**Found nothing.** No Crunchbase entries, no funding announcements, no investor names. Every signal points to these being **solo-founder or two-person, bootstrapped, weekend-build projects riding a viral X/Twitter moment** — not VC-backed companies with a war chest to buy advertiser relationships or absorb a slow ramp. *(Confidence: Medium-High — absence of evidence across multiple targeted searches, not a confirmed "no funding" statement from any founder.)*

**What this means for you, as CEO:**
- No one has "proven" this model to institutional capital yet. The category exists on attention, not money.
- You're not competing against well-funded rivals with sales teams — you're competing against other solo operators who, like you, have to personally hustle every advertiser deal. **This levels the field on the one axis (capital) where you'd otherwise lose.**
- It also means there's no external validation that the unit economics work at scale. Treat that as a real risk, not just a competitive opening.

One concrete, newly-found data point that sharpens the India wedge: there's an **open GitHub issue on kickbacks.ai's own repo — "Stripe Connect Express onboarding blocked for India-based creators" (Issue #51)**. This isn't a blog claim anymore; it's a live, documented bug filed by an affected Indian developer. India and Indonesia sit in Stripe's "Preview" tier and Stripe has been invite-only for new India accounts since May 2024 (RBI rules). That gap is real, current, and unresolved.

---

## 4. Who actually pays to reach developers? (Verified comparables — the real market, not the hype)

Wait-state ads are too new to have their own pricing truth. So the honest move is to borrow from **established developer ad networks with real, audited numbers** and use them as a price/demand anchor.

| Network | Real advertisers (named) | Pricing | Verified CPM reality |
|---|---|---|---|
| **Carbon Ads** (BuySellAds, since 2010) | Okta, GitLab, Retool, MongoDB | Recommended $5,000–10,000/mo over 60–90 days, CPC model | **$0.50–$1.10 CPM** per their own FAQ; one 3-year independent publisher report: **$1.60 effective CPM** on 2.1M views, $3,541 total over 33 months |
| **EthicalAds** (Read the Docs) | ESLint (publisher-side), DEV Community partnership | $1,000 minimum buy, CPM model | Not disclosed, but minimum buy implies sub-$1,000 campaigns aren't served |
| **Stack Overflow Ads** | Not disclosed publicly | $10,000–15,000/mo minimum | CPM model, tag-targeted |
| **LinkedIn** | N/A (self-serve) | $33–65 CPM average for tech | Highest-cost channel — only works for narrow ABM, not broad reach |
| **Reddit (dev subreddits)** | N/A (self-serve) | $0.50–3.50 CPM, $5/day minimum | Lowest barrier to entry |
| **Dev newsletters** (TLDR, Bytes, etc.) | N/A | $100–15,000 per send depending on list size | High open rates (40–60%), no ad-blocker risk |

*(Confidence: High for Carbon Ads' own published CPM range and the independent 3-year publisher report — these are the two most trustworthy numbers in this entire document. Medium for the others, which are self-reported minimums.)*

**The uncomfortable implication for our pricing:** the one number in this whole table that's independently audited — Carbon's real-world **$1.60 CPM** over three years — sits far below both (a) the wait-state category's blog "estimates" of $8–42 CPM, and (b) our own `PRICING_ARCHITECTURE.md` assumption of **$8 India / $15 global CPM-equivalent**. Established, trusted, decade-old developer ad networks selling to real brands (Okta, GitLab, MongoDB) earn under $2 CPM in practice. We're assuming 4–10x that for an unproven, three-week-old surface with zero brand trust. That gap needs to close when we get to the pricing conversation — flagging it now so it's not a surprise later.

---

## 5. Defining the actual niche (both sides of the marketplace)

**The supply side (our users) — already well-defined:** Indian developers using agentic AI coding tools (Claude Code, Cursor, Copilot, Windsurf) daily. SAM is single-digit millions, growing. Not "all 27M Indian GitHub devs" — only the subset actively in an AI-agent wait loop for hours a day.

**The demand side (our clients) — this is the part that was vague until now. Based on verified comparables above plus the Firecrawl signal, the real buyer niche has three concentric rings, ranked by how likely they are to say yes first:**

1. **AI-infra / dev-tool companies selling to AI-building developers** (highest probability first movers). Vector DBs, observability/eval tools, agent frameworks, scraping/data APIs like Firecrawl, MCP tooling, AI coding plugins. They are *already* trying to reach exactly this audience and the wait-state surface is a literal, on-the-nose fit — this is who both kickbacks.ai and IdleAds independently picked for their placeholder ad, even as a fake.
2. **India-specific dev-economy sellers**: cloud/hosting resellers (DigitalOcean India partners, Hostinger, AWS/GCP credit resellers), EdTech/upskilling bootcamps targeting working developers (Scaler, Masai School, Pesto Tech, upGrad), dev job boards, API/SaaS tools with Indian GTM budgets. These already spend on Reddit/newsletter/Stack Overflow-style channels for Indian dev reach — they have budget and precedent, just not for this surface yet.
3. **Global dev-tool brands** (Vercel, Stripe, GitHub-tier spenders) — only relevant once you have scale and credibility; this is the "Global Tier" in `PRICING_ARCHITECTURE.md`. Not a month-1 target.

**Why ring 1 over ring 2 for your first deal:** ring 1 buyers don't need to be convinced developers exist on this surface — their own product depends on AI-coding developers existing and choosing tools mid-workflow. Ring 2 buyers need more education about why this channel works at all, since they're used to buying Reddit/newsletter slots with known reach numbers.

---

## 6. Probability, in real numbers — what to expect from outreach

No one in this category has published a close rate, so this is modeled from cold-B2B-outreach norms plus the comparables above, not observed data for this exact pitch. Treat as a planning range, not a forecast.

- Cold outreach to a well-targeted list (ring 1 + ring 2 companies, warm-ish via dev-tool Twitter/LinkedIn) for a **flat pilot offer** (₹10,000–15,000/month, not CPM) typically converts at **5–15%** for an unproven channel with no case study yet. Pitching 20 gets you a realistic **1–3 verbal yeses** — which is exactly what `06-business-plan.md`'s 14-day sprint already targets ("pitch 5–10, success = 1 verbal yes"). That plan was calibrated correctly; this research supports it rather than changing it.
- Once you have **one real payout screenshot + one renewal**, close rate on the next batch should roughly double, because you've removed the single biggest objection (does this even reach real people, does the money really move). This is the standard B2B pattern for unproven channels — first deal is hardest, second is materially easier with proof in hand.
- Realistic 4-month outcome, given zero competitors have any public traction either: **2–4 paying advertisers if you execute the sprint disciplined and lean on ring 1.** More than that would put you ahead of every funded-or-not competitor in the category, which is possible precisely because nobody is executing the demand side yet — confirmed again by this research.

---

## 7. What changes, what's confirmed, what's next

**Confirmed by this research (no change needed):** the India payout wedge is real and now has a literal GitHub issue as evidence. The "sell flat sponsorships, not CPM" strategy in `06-business-plan.md` is right — there is no liquid CPM market to sell into yet, anywhere in this category, by anyone.

**New and actionable:** target ring-1 advertisers (AI-infra/dev-tool sellers to AI-building devs) first, not generic Indian dev-tool brands — they have the shortest path to "yes" because they already believe in the audience.

**Flagged for the pricing conversation (next phase):** our $8 India / $15 Global CPM-equivalent in `PRICING_ARCHITECTURE.md` is 4–10x the one independently-verified real CPM we found in the entire developer-ad market ($1.60, Carbon Ads, 3-year audited). We don't need to abandon premium positioning — the "10-second vs 5-second" dwell-time argument is reasonable — but the gap needs an explicit justification or a haircut when we model CPMs next, or the financial model will overstate per-block revenue.

---

## Sources
- [GitHub - andrewmccalip/kickbacks.ai](https://github.com/andrewmccalip/kickbacks.ai) · [Issue #51 — Stripe Connect blocked for India](https://github.com/andrewmccalip/kickbacks.ai/issues/51) · [FAQ/fraud](https://kickbacks.ai/faq)
- [IdleAds.dev](https://idleads.dev/)
- [Idlen — Developer Ad Network Playbook 2026](https://www.idlen.io/blog/developer-ad-network-playbook/) *(vendor content — used only for category comparison structure, not as proof of Idlen's own traction)*
- [Carbon Ads FAQ](https://www.carbonads.net/faq) · [Carbon Ads media kit](https://www.carbonads.net/more-info) · [Carbon Ads via BuySellAds](https://discover.buysellads.com/carbon)
- [Three years of advertising on my blog: numbers — The Pragmatic Engineer](https://blog.pragmaticengineer.com/ads/) *(independently verified real CPM data)*
- [EthicalAds — Advertise with Us](https://www.ethicalads.io/advertisers/) · [Read the Docs / EthicalAds](https://docs.readthedocs.com/platform/stable/advertising/ethical-advertising.html)
- [Kickbacks.ai — Hacker News discussion](https://news.ycombinator.com/item?id=48493940)
- [AIWaitIndex comparison (dev.to)](https://dev.to/digitalcheff/i-compared-every-ai-wait-state-ad-platform-kickbacks-idleads-idlen-more-3m4a)

## Changelog
- v1.0 (2026-06-28): Initial advertiser-demand and niche deep-dive, in response to "who are the clients, who's backing competitors, how does the niche break down."
