import "server-only";
import { db } from "@/lib/db";

export async function getReferralStats(userId: string) {
  const [referredUsers, totalEarnings] = await Promise.all([
    db.user.findMany({
      where: { referred_by_id: userId },
      select: { id: true, name: true, email: true, created_at: true },
      orderBy: { created_at: "desc" },
    }),
    db.referralEarning.aggregate({
      where: { referrer_id: userId },
      _sum: { amount_usd: true },
    }),
  ]);

  return {
    referredCount: referredUsers.length,
    referredUsers,
    totalEarningsUsd: Number(totalEarnings._sum.amount_usd ?? 0),
  };
}

export async function getUserReferralCode(userId: string) {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { referral_code: true },
  });
  return user?.referral_code;
}

export async function applyReferralCode(userId: string, referralCode: string) {
  const referrer = await db.user.findUnique({
    where: { referral_code: referralCode },
    select: { id: true },
  });

  if (!referrer || referrer.id === userId) return false;

  await db.user.update({
    where: { id: userId },
    data: { referred_by_id: referrer.id },
  });

  return true;
}
