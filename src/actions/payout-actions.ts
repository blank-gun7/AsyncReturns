"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function approvePayout(payoutId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const user = await db.user.findUnique({ where: { id: session.user.id } });
  if (!user || user.role !== "ADMIN") throw new Error("Forbidden");

  await db.payout.update({
    where: { id: payoutId },
    data: { status: "APPROVED" },
  });

  revalidatePath("/admin/payouts");
}

export async function rejectPayout(payoutId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const user = await db.user.findUnique({ where: { id: session.user.id } });
  if (!user || user.role !== "ADMIN") throw new Error("Forbidden");

  const payout = await db.payout.findUnique({ where: { id: payoutId } });
  if (!payout) throw new Error("Not found");

  await db.$transaction([
    db.payout.update({
      where: { id: payoutId },
      data: { status: "FAILED" },
    }),
    db.wallet.update({
      where: { user_id: payout.developer_id },
      data: {
        balance_usd: { increment: Number(payout.amount_usd) },
        pending_usd: { decrement: Number(payout.amount_usd) },
      },
    }),
  ]);

  revalidatePath("/admin/payouts");
}
