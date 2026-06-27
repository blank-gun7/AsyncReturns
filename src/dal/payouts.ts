import "server-only";
import { db } from "@/lib/db";
import { CASHOUT_INDIA_USD, CASHOUT_GLOBAL_USD, USD_TO_INR } from "@/utils/constants";

export async function getPayoutsByDeveloper(developerId: string) {
  return db.payout.findMany({
    where: { developer_id: developerId },
    orderBy: { requested_at: "desc" },
  });
}

export async function getPendingPayouts() {
  return db.payout.findMany({
    where: { status: "REQUESTED" },
    include: { developer: { select: { name: true, email: true, region: true } } },
    orderBy: { requested_at: "asc" },
  });
}

export async function canRequestPayout(developerId: string): Promise<{
  eligible: boolean;
  reason?: string;
  balance: number;
  threshold: number;
}> {
  const user = await db.user.findUnique({
    where: { id: developerId },
    include: { wallet: true },
  });

  if (!user?.wallet) {
    return { eligible: false, reason: "no_wallet", balance: 0, threshold: 0 };
  }

  const threshold = user.region === "INDIA" ? CASHOUT_INDIA_USD : CASHOUT_GLOBAL_USD;
  const balance = Number(user.wallet.balance_usd);

  if (balance < threshold) {
    return { eligible: false, reason: "below_threshold", balance, threshold };
  }

  const pendingPayout = await db.payout.findFirst({
    where: {
      developer_id: developerId,
      status: { in: ["REQUESTED", "APPROVED", "PROCESSING"] },
    },
  });

  if (pendingPayout) {
    return { eligible: false, reason: "pending_payout_exists", balance, threshold };
  }

  return { eligible: true, balance, threshold };
}

export async function createPayout(developerId: string, method: "UPI" | "PAYPAL" | "WISE") {
  const user = await db.user.findUnique({
    where: { id: developerId },
    include: { wallet: true },
  });

  if (!user?.wallet) throw new Error("No wallet found");

  const balanceUsd = Number(user.wallet.balance_usd);
  const currency = user.region === "INDIA" ? "INR" : "USD";
  const amountLocal = currency === "INR" ? balanceUsd * USD_TO_INR : balanceUsd;

  return db.$transaction([
    db.payout.create({
      data: {
        developer_id: developerId,
        amount_usd: balanceUsd,
        amount_local: amountLocal,
        currency,
        method,
      },
    }),
    db.wallet.update({
      where: { user_id: developerId },
      data: {
        balance_usd: 0,
        pending_usd: { increment: balanceUsd },
      },
    }),
  ]);
}
