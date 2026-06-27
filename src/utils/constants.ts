export const CPM_INDIA_USD = 5;
export const CPM_GLOBAL_USD = 15;
export const DEV_SHARE = 0.5;
export const REFERRAL_SHARE = 0.05;
export const IMPRESSIONS_PER_BLOCK = 1000;
export const IMPRESSION_DURATION_SEC = 10;
export const CASHOUT_INDIA_USD = 3.01;
export const CASHOUT_GLOBAL_USD = 10;
export const CLICK_MULTIPLIER = 50;
export const MAX_PRIORITY = 100;
export const IMPRESSION_MIN_DURATION_MS = 5000;
export const IMPRESSION_RATE_LIMIT_MS = 5000;
export const AD_SERVE_RATE_LIMIT_PER_MIN = 20;
export const IMPRESSION_TOKEN_TTL_SEC = 30;

export const USD_TO_INR = 83;

export function perImpressionRate(cpmUsd: number): number {
  return cpmUsd / IMPRESSIONS_PER_BLOCK;
}

export function devEarningPerImpression(cpmUsd: number): number {
  return perImpressionRate(cpmUsd) * DEV_SHARE;
}

export function clickRate(cpmUsd: number): number {
  return perImpressionRate(cpmUsd) * CLICK_MULTIPLIER;
}

export function devClickEarning(cpmUsd: number): number {
  return clickRate(cpmUsd) * DEV_SHARE;
}
