import { USD_TO_INR } from "./constants";

export function usdToInr(usd: number): number {
  return Math.round(usd * USD_TO_INR * 100) / 100;
}

export function formatInr(amount: number): string {
  return `₹${amount.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function formatUsd(amount: number | { toNumber(): number }): string {
  const n = typeof amount === "number" ? amount : amount.toNumber();
  return `$${n.toFixed(2)}`;
}

export function formatCurrency(amountUsd: number, region: string): string {
  if (region === "INDIA") {
    return formatInr(usdToInr(amountUsd));
  }
  return formatUsd(amountUsd);
}
