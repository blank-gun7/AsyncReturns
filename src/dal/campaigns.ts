import "server-only";
import { db } from "@/lib/db";

export async function getCampaignsByAdvertiser(advertiserId: string) {
  return db.campaign.findMany({
    where: { advertiser_id: advertiserId },
    orderBy: { created_at: "desc" },
  });
}

export async function getCampaignById(campaignId: string) {
  return db.campaign.findUnique({
    where: { id: campaignId },
    include: {
      block_purchases: { orderBy: { created_at: "desc" } },
    },
  });
}

export async function getActiveCampaignCount() {
  return db.campaign.count({ where: { status: "ACTIVE" } });
}

export async function getCampaignStats(campaignId: string) {
  const [impressionsByDay, totalClicks] = await Promise.all([
    db.impression.groupBy({
      by: ["created_at"],
      where: { campaign_id: campaignId, valid: true },
      _count: true,
    }),
    db.impression.count({
      where: { campaign_id: campaignId, clicked: true },
    }),
  ]);

  return { impressionsByDay, totalClicks };
}

export async function getAllCampaigns(options?: { page?: number; perPage?: number }) {
  const page = options?.page ?? 1;
  const perPage = options?.perPage ?? 50;

  const [campaigns, total] = await Promise.all([
    db.campaign.findMany({
      include: { advertiser: { select: { name: true, email: true } } },
      orderBy: { created_at: "desc" },
      skip: (page - 1) * perPage,
      take: perPage,
    }),
    db.campaign.count(),
  ]);

  return { campaigns, total, page, perPage };
}
