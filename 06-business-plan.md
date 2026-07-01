# Devorix — Business Plan (realistic, plain-English)

> **⚠️ RETIRED 2026-06-28 — superseded by `MASTER-PLAN.md`.** The flat-deal strategy, 14-day sprint, and 4-month money table below are still accurate and are restated in `MASTER-PLAN.md` §5.2, §6.3, and §8. Read the master doc first — it adjusts the sprint for zero warm advertiser intros and reconciles the pricing model with the two pricing docs this plan didn't originally account for.

**Version 1.0 · Last updated 2026-06-26 · Living document**
*Consolidates the case study, model, PRD and research into one plan grounded in verified data and your real constraints: ≤500 users in 3–4 months, ≤₹1 lakh cash, 1–2 advertisers in 14 days. Companion file: `devorix-financial-model-REALISTIC.xlsx`.*

---

## 1. The idea in one line
When an AI coding tool is "thinking," it shows a status line that earns nothing. Devorix puts a small, tasteful sponsor line there and shares the money with the developer — paid in rupees over UPI.

## 2. The honest truth about this market (read this first)
I verified the numbers. They are sobering, and you should build with eyes open:

- **Nobody is making real money here yet.** The category leader (kickbacks.ai) went viral (~5.5M views) but has **no proven revenue, no public user count, and had no real advertisers at launch** — it showed its own placeholder ads. Payouts weren't even live.
- **Developers earn very little.** The one solid real data point: a tester earned **$4.43 in 3 hours**, and another user's earnings **collapsed to $0.27 CPM** within days once the novelty faded. Translated: a daily-active dev earns maybe **₹100–300/month**, not thousands.
- **Developers are skeptical, not excited.** The official "Show HN" post got **2 points and 0 comments**. The loudest reaction was *worry* about privacy and security (one tool weakens the editor's security to inject ads). Devs use ad-blockers for a reason.
- **The real bottleneck is advertisers, not users.** Building the tool is easy. Getting brands to *pay* is the hard part nobody has cracked.

**What this means for you:** Do **not** bet on a "millions of users earning passive income" story. Bet on a small, focused, cash-light play: **get 1–2 advertisers to pay you directly, keep costs near zero, and prove the loop works.** If that works and renews, *then* scale.

## 3. Your edge (realistic version)
You can't out-spend or out-engineer anyone. Your only real advantages:
1. **India focus + UPI payouts done properly** (Kickbacks can't pay India at all; IdleAds only does it manually). Worth something, but it's a head-start, not a moat.
2. **You'll out-hustle on the demand side.** The whole category is failing at advertiser sales. If you personally close even 1–2 Indian dev-tool/EdTech advertisers, you're ahead of where the "viral" players actually are.
3. **A ready-made product face.** Your AI Studio prototype already looks premium and includes an AI tool that writes ad copy for advertisers — use it to win deals.

## 4. The strategy: sell flat deals, not "CPM"
Here's the key insight from the math. At 500 users, the automatic "pay-per-impression" (CPM) model earns about **₹5,000/month total** — roughly **₹12 per developer**. Useless.

So at your scale you **don't sell impressions — you sell a sponsorship.** You go to one Indian dev-tool company and say: *"Be the exclusive sponsor shown to my community of Indian developers this month for ₹15,000."* That's a flat deal. One conversation, real money, no ad-tech machinery needed.

- 1 advertiser = ₹15,000/month. 2–3 = ₹30,000–45,000/month.
- You keep ~50%, devs split the rest (each gets ~₹100–190/month — honest, and in line with reality).
- **You stay cash-positive from month 1** because your costs are tiny.

## 5. The money (from the realistic model)
| | Month 1 | Month 2 | Month 3 | Month 4 |
|---|---|---|---|---|
| Installs | 100 | 250 | 400 | 500 |
| Advertisers (flat) | 1 | 2 | 2 | 3 |
| Revenue (₹) | 15,000 | 30,000 | 30,000 | 45,000 |
| Net profit (₹) | ~2,400 | ~9,900 | ~9,900 | ~17,300 |
| Cumulative net (₹) | 2,400 | 12,300 | 22,200 | **~39,500** |

You **never dip into your ₹1 lakh** if you land the deals — the business funds itself from month 1. The ₹1 lakh is a safety net, not fuel. *(All figures are scenarios built on stated assumptions — see the model's Sources sheet for what's verified vs assumed.)*

## 6. Costs & compliance — stay lean (CA-grade, verified)
The most important CA advice: **do not start a Pvt Ltd company yet.** Here's why.

- A Pvt Ltd costs ~₹20,000 to set up **plus ₹40,000–70,000/year** in mandatory filings. That alone would eat most of your ₹1 lakh for zero benefit at this stage.
- **Run as a sole proprietor** (just you + a bank account + RazorpayX). 
- **You don't need GST registration** — that's only mandatory above ₹20 lakh/year revenue. (One caveat: a business advertiser may want a GST invoice to claim tax credit. If a deal hinges on it, weigh registering then — not before.)
- **TDS on what you pay developers is basically nil** — the law only kicks in above ₹20,000/year *per developer*, and you'll be paying each one ~₹1,000–2,000/year. Just collect their PAN to be safe.
- **Your only real costs:** domain (~₹1,000/yr), hosting (free tier to start), a little Gemini API usage (~₹1,000), and UPI payout fees (₹2–5 each). Call it **₹5,000/month all-in.**

Translation: you can run this for the better part of a year on a few thousand rupees a month. The ₹1 lakh is plenty.

## 7. The 14-day sprint (your immediate target)
**Goal: 1–2 paying advertisers + a working demo + first real users.** Order matters — sell before you over-build.

**Days 1–3 — Prove demand first**
- List 20 Indian companies that want to reach developers (dev-tool startups, EdTech/bootcamps, cloud/hosting resellers, dev job boards, API/SaaS).
- Pitch 5–10 of them a **1-month sponsorship pilot at ₹10,000–15,000**: "exclusive sponsor line shown to Indian developers in their editor." Use the prototype + AI ad-copy generator in the pitch.
- **Success = 1 verbal yes.** If you can't get one, stop and rethink before building more.

**Days 3–10 — Build the thinnest real loop**
- Ship the VS Code/Claude Code status-bar line (non-patching, never reads code).
- Minimal backend: count impressions, store a ledger, show a balance.
- Wire RazorpayX UPI payout in **sandbox**.
- Reuse the AI Studio prototype as your landing page (fix the earnings claims — see below).

**Days 10–14 — Launch small & deliver**
- Recruit 50–100 real devs from your network + Indian dev communities.
- Run the first sponsor's line live; capture a **real UPI payout screenshot** (your best marketing asset).
- Send the advertiser a simple report (impressions, clicks). Ask for renewal.

## 8. Two fixes before you launch (from the prototype review)
1. **Lower the earnings claims.** The prototype shows ₹0.42/impression — that implies ad rates 4–7× higher than anything real, and ~40× the worst real case. Promising that will get you roasted by skeptical devs. Show **honest ranges** ("₹50–300/month for active users") and lead with real payout proof.
2. **Drop the payout threshold to ₹500** (prototype says ₹1,000). Faster first payout = devs actually believe it's real = they stay.

## 9. Risks (and what to do)
- **No advertiser will pay** → this kills it. That's why the sprint sells *first*. If 10 pitches yield zero interest, the thesis is wrong — pivot or stop.
- **Devs won't install / won't stay** → keep it dead-simple, private, honest about money; lean on proof-of-payout.
- **A bigger player localizes for India** → your defense is speed and advertiser relationships, not technology. Move now.
- **Platform/ToS risk** (Anthropic dislikes ads) → stay non-patching and well-behaved; it's the safe posture.

## 10. The go / no-go gate (be disciplined)
After ~4 months, continue only if **all three** are true:
1. At least 2 advertisers have **paid and renewed** (real, repeatable demand).
2. Developers **stick around** after the novelty (check week-4 retention).
3. You enjoy running it on tiny margins while it's still small.

If yes → *then* consider Pvt Ltd, GST, and a real growth push. If no → you'll have spent ~₹20–30k and a few weekends to learn something most founders pay far more to find out.

## Changelog
- v1.0 (2026-06-26): Initial consolidated, reality-grounded business plan.
