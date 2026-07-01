# Devorix — P0 Task List (do now)

> **⚠️ RETIRED 2026-06-28 — superseded by `MASTER-PLAN.md`.** Kept on disk for history; content below is unchanged but no longer the source of truth. Notably: rev share is now locked at 50/50, payout threshold at ₹300, and Track 2's Pvt Ltd/GST urgency is superseded — see `MASTER-PLAN.md` §7.1 and §2 row 9–10.

**Version 0.1 · Last updated 2026-06-25 · Living document**
*P0 = must happen first to validate the loop and start the land grab. Ordered. Check off as you go.*

## Track 1 — Validate & decide (this week, mostly you)
- [ ] **P0.1** Lock the core decisions in `05-shared-language.md` Decisions Log: dev rev share (50 vs 60–70%), first tool (Claude Code), second tool (Cursor vs Windsurf), entity name. *(Blocks almost everything below.)*
- [ ] **P0.2** Reserve brand: domain (devorix.* / .in / .ai), GitHub org, X handle, npm/extension publisher names. *(1 hr, cheap, do today.)*
- [ ] **P0.3** Primary research on India SAM: post in 3 Indian dev communities asking who uses Claude Code/Cursor daily; DM 10 devs. Goal: real install-intent signal + a CPM/usage gut-check. *(This is the cheapest way to de-risk the whole thesis.)*
- [ ] **P0.4** Talk to 5 potential advertisers (Indian dev-tool/EdTech founders you know). One question: "Would you pay ₹X to reach Indian devs inside their editor?" *(Advertiser demand is the make-or-break; validate before building.)*

## Track 2 — Money & compliance plumbing (start in parallel, has lead time)
- [ ] **P0.5** Open RazorpayX account; get **sandbox** payouts working (create Contact → Fund Account → UPI payout) end-to-end with test balance. *(This is the moat; prove it early.)*
- [ ] **P0.6** Begin Pvt Ltd incorporation + PAN/TAN; start GST registration. Engage a CA on TDS treatment for revenue-share payouts (194H vs 194-O) and the "payable not wallet" structure. *(Lead time — start now, don't block MVP on completion.)*

## Track 3 — Build the thinnest end-to-end loop (the technical P0)
Goal: one dev installs → sees a (house) sponsored line → impression counted → balance shows → (sandbox) UPI payout fires at threshold. No advertisers, no auction, no polish.
- [ ] **P0.7** Backend skeleton: event ingest API (idempotent + min-display-time validity filter), Postgres ledger (double-entry), simplest house-ad server. Deploy to a Mumbai region.
- [ ] **P0.8** VS Code + Claude Code client: inject one house-ad status line via adapter, count impression (≥5s, window focused), batch-report signed events, status-bar balance, one-click disable. Verify it **never** touches code/prompts.
- [ ] **P0.9** Publisher mini-dashboard: sign in (Google/GitHub), show balance, collect PAN + UPI VPA for payout.
- [ ] **P0.10** Wire payout job: accrue → at ₹500 fire RazorpayX UPI (sandbox) → reconcile via webhook → reflect in ledger.
- [ ] **P0.11** Internal end-to-end test (you + a few friendly devs) with house ads; capture a real (sandbox) payout screenshot for marketing.

## Track 4 — Launch prep (parallel, light)
- [ ] **P0.12** Landing page: "Your AI's wait time, your money. Paid in rupees." Waitlist capture + "Kickbacks can't pay India — we do" hook.
- [ ] **P0.13** Draft launch assets: Show HN post, PH listing, X thread, community posts. Hold until P0.11 proof exists.

## Definition of "P0 done"
A real Indian developer installs the extension, earns from house ads, and receives a (sandbox-then-live) UPI payout — and you have ≥5 advertiser conversations and ≥1 verbal "yes, I'd pay." Then graduate to Tier-1 fixed-price advertisers and public launch.

## Changelog
- v0.1 (2026-06-25): Initial P0 list.
