"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { createCampaignSchema, updateCampaignSchema } from "@/utils/validation";
import { revalidatePath } from "next/cache";

export async function createCampaign(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const data = Object.fromEntries(formData);
  const parsed = createCampaignSchema.safeParse({
    ...data,
    priority: Number(data.priority),
  });

  if (!parsed.success) throw new Error("Invalid data");

  await db.campaign.create({
    data: {
      advertiser_id: session.user.id,
      ...parsed.data,
    },
  });

  revalidatePath("/advertiser/campaigns");
}

export async function updateCampaign(campaignId: string, data: Record<string, unknown>) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const campaign = await db.campaign.findUnique({ where: { id: campaignId } });
  if (!campaign || campaign.advertiser_id !== session.user.id) {
    throw new Error("Not found");
  }

  const parsed = updateCampaignSchema.safeParse(data);
  if (!parsed.success) throw new Error("Invalid data");

  await db.campaign.update({
    where: { id: campaignId },
    data: parsed.data,
  });

  revalidatePath(`/advertiser/campaigns/${campaignId}`);
}

export async function pauseCampaign(campaignId: string) {
  return updateCampaign(campaignId, { status: "PAUSED" });
}

export async function resumeCampaign(campaignId: string) {
  const campaign = await db.campaign.findUnique({ where: { id: campaignId } });
  if (!campaign || campaign.impressions_remaining <= 0) {
    throw new Error("Cannot resume — no impressions remaining");
  }
  return updateCampaign(campaignId, { status: "ACTIVE" });
}
