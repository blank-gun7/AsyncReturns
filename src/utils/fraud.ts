import { createHash } from "crypto";
import { IMPRESSION_MIN_DURATION_MS, IMPRESSION_RATE_LIMIT_MS } from "./constants";

const recentImpressions = new Map<string, number>();

setInterval(() => {
  const cutoff = Date.now() - 60_000;
  for (const [key, timestamp] of recentImpressions) {
    if (timestamp < cutoff) recentImpressions.delete(key);
  }
}, 30_000);

export interface FraudCheckResult {
  valid: boolean;
  reason?: string;
}

export function checkImpressionFraud(
  developerId: string,
  durationMs: number,
  _ipHash: string
): FraudCheckResult {
  if (durationMs < IMPRESSION_MIN_DURATION_MS) {
    return { valid: false, reason: "duration_too_short" };
  }

  const lastImpression = recentImpressions.get(developerId);
  if (lastImpression && Date.now() - lastImpression < IMPRESSION_RATE_LIMIT_MS) {
    return { valid: false, reason: "rate_limited" };
  }

  recentImpressions.set(developerId, Date.now());
  return { valid: true };
}

export function hashIp(ip: string): string {
  return createHash("sha256").update(ip).update(process.env.IP_HASH_SALT || "async-returns").digest("hex").slice(0, 16);
}
