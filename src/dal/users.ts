import "server-only";
import { cache } from "react";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import crypto from "crypto";

export const getCurrentUser = cache(async () => {
  const session = await auth();
  if (!session?.user?.id) return null;

  return db.user.findUnique({
    where: { id: session.user.id },
    include: { wallet: true },
  });
});

export async function getUserById(id: string) {
  return db.user.findUnique({
    where: { id },
    include: { wallet: true },
  });
}

export async function getUserByApiKey(apiKey: string) {
  const keyHash = crypto.createHash("sha256").update(apiKey).digest("hex");

  const key = await db.apiKey.findUnique({
    where: { key_hash: keyHash },
    include: { user: true },
  });

  if (!key) return null;
  if (key.expires_at && key.expires_at < new Date()) return null;

  await db.apiKey.update({
    where: { id: key.id },
    data: { last_used_at: new Date() },
  });

  return key.user;
}

export async function createApiKey(userId: string, name = "CLI") {
  const rawKey = crypto.randomBytes(32).toString("hex");
  const keyHash = crypto.createHash("sha256").update(rawKey).digest("hex");
  const keyPrefix = rawKey.slice(0, 8);

  await db.apiKey.create({
    data: {
      user_id: userId,
      key_hash: keyHash,
      key_prefix: keyPrefix,
      name,
    },
  });

  return rawKey;
}

export async function getUserStats(userId: string) {
  const [impressionCount, totalEarnings] = await Promise.all([
    db.impression.count({
      where: { developer_id: userId, valid: true },
    }),
    db.impression.count({
      where: {
        developer_id: userId,
        valid: true,
        created_at: { gte: new Date(new Date().setDate(1)) },
      },
    }),
  ]);

  return { impressionCount, monthlyImpressions: totalEarnings };
}
