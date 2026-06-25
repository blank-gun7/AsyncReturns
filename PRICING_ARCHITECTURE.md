# Async Returns — Complete Pricing Architecture v2

---

## 1. Kickback's Model — Decoded

| What they say | What it actually means |
|---|---|
| "$5 per block" | Fixed price — you always pay $5, non-negotiable |
| "Bid any amount from $1" | The bid is a **priority number**, NOT the price. Higher bid = your impressions deliver sooner. You still pay $5. |
| "Outbid the top to take #1" | Jump the queue, not the price |
| "50% settles to the developer" | $2.50 per 1,000 impressions goes to devs |
| "Clicks at 50× impression rate" | 50 × $0.005 = **$0.25 per click** |

**So Kickback's actual CPM = $5 for 5 seconds.**

---

## 2. Our Model — Better In Every Way

### The Core Unit: 1 Block

| | Kickback | **Async Returns** |
|---|---|---|
| 1 block = | 1,000 × 5s impressions | **1,000 × 10s impressions** |
| Price per block | $5.00 | **$8.00** |
| Dev share | 50% = $2.50/block | **50% = $4.00/block** |
| Click rate | 50× = $0.25/click | **50× = $0.40/click** |
| Impression length | 5 seconds | **10 seconds — 2× brand recall** |

**Why $8 is right:**
- 2× dwell time vs Kickback = worth more
- Brands pay $20–60 CPM on LinkedIn for developers
- $8 CPM is still a steal — no need to undersell

---

## 3. Two-Tier Pricing (India + International)

| Tier | Audience | Block Price | Dev Earns/Block | You Earn/Block |
|---|---|---|---|---|
| 🇮🇳 **India Tier** | Indian devs | **$8** | $4.00 (₹332) | $4.00 |
| 🌍 **Global Tier** | US/EU/ROW devs | **$15** | $7.50 (₹623) | $7.50 |

**Why this works:**
- Western advertisers (Vercel, Stripe, GitHub) routinely pay $15–25 CPM for US developers
- Indian advertisers (Razorpay, Sentry India) pay Indian market rates
- Devs earn 50% of whatever their inventory sold for — fair for everyone
- A US dev earns $7.50/block; an Indian dev earns $4.00/block

---

## 4. Per-Impression Math

### India Tier ($8/block)
| Unit | Value |
|---|---|
| Per impression | $0.008 |
| **Dev earns** | $0.004 = ₹0.33 |
| **You earn** | $0.004 = ₹0.33 |

### Global Tier ($15/block)
| Unit | Value |
|---|---|
| Per impression | $0.015 |
| **Dev earns** | $0.0075 = ₹0.62 |
| **You earn** | $0.0075 = ₹0.62 |

---

## 5. Can We Pay Devs ₹300/Month?

**Assumptions:** 22 working days, 50 prompts/day, 80% fill rate

```
Impressions/dev/month = 22 × 50 × 0.80 = 880 impressions
```

| Dev Location | Earnings/month | INR equiv |
|---|---|---|
| 🇮🇳 India (80% fill) | $3.52 | **₹292** — set cashout at ₹250 ✓ |
| 🇮🇳 India (100% fill) | $4.40 | **₹365** ✓ |
| 🌍 Global (80% fill) | $6.60 | **₹548** ✓✓ |

> Lower cashout threshold to **₹250** (India) and **$8** (Global). First payout hits in ~3 weeks — that's the viral loop.

---

## 6. How Many Blocks Will a Client Buy?

| Client Type | Blocks/Month | Spend | Impressions |
|---|---|---|---|
| Trial (small startup) | 10–25 | $80–200 | 10k–25k |
| Small campaign (funded SaaS) | 50–100 | $400–800 | 50k–100k |
| Standard (growth stage) | 150–250 | $1,200–2,000 | 150k–250k |
| Premium (scale-up) | 500+ | $4,000+ | 500k+ |

**Your capacity at 200 devs:**
```
200 devs × 880 impressions = 176,000 impressions = 176 blocks available/month
```

---

## 7. Revenue — Month 1 Scenarios

### Scenario A: 1 India Client, 200 devs
```
176 blocks × $8     = $1,408 gross
Your cut (50%)      = $704
Dev pool (50%)      = $704 → ÷ 200 devs = $3.52 = ₹292/dev
OpEx                ≈ $90
Net Profit          = ~$614/month ✓
```

### Scenario B: 1 India + 1 Global Client, Mixed Pool
```
100 India blocks × $8  = $800
76 Global blocks × $15 = $1,140
Gross Revenue           = $1,940
Your cut (50%)          = $970
OpEx                    ≈ $90
Net Profit              = ~$880/month ✓✓
```

> **Break-even = 20 blocks ($160 gross).** You're profitable from the first real client.

---

## 8. The Priority Queue — Steal Kickback's Best Idea

- Client sets a **priority number 0–100** when buying blocks
- Highest number serves first (delivers impressions sooner)
- Tie = first paid, first served
- **Price never changes** — priority is free (removes friction)
- You manage this manually in a spreadsheet until 10+ clients

---

## 9. Click Pricing

```
India: $0.008/impression × 50 = $0.40/click → dev gets $0.20
Global: $0.015/impression × 50 = $0.75/click → dev gets $0.375
```

**At 1% CTR on 176,000 impressions:**
```
1,760 clicks × $0.40 = $704 extra revenue/month
```
Clicks could **double your monthly revenue** on product launch ads.

---

## 10. Payment Stack

| Audience | Payout Method | Cashout Threshold |
|---|---|---|
| 🇮🇳 Indian devs | Razorpay UPI | ₹250 |
| 🌍 International devs | PayPal / Wise | $10 |
| 💳 Clients (billing) | Razorpay (India) / Stripe (Global) | Per block upfront |

---

## 11. Final Architecture Summary

```
1 Block  = 1,000 × 10-second impressions
India    = $8/block   → $4 dev / $4 you
Global   = $15/block  → $7.50 dev / $7.50 you
Clicks   = 50× CPM ($0.40 India / $0.75 Global), 50/50 split
Priority = 0–100, client-set, free
Split    = 50 / 50 always
Cashout  = ₹250 India / $10 Global
```

### Month 1 Snapshot
| Metric | Number |
|---|---|
| Devs | 200 |
| Monthly inventory | 176 blocks |
| Revenue (1 India client) | ~$614 net |
| Revenue (mixed) | ~$880 net |
| Per Indian dev payout | ₹292–365 |
| Per global dev payout | ₹548+ |
| Break-even | 20 blocks / 1 client |
