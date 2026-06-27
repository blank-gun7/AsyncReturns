import { db } from "@/lib/db";

export async function getNextAd(developerRegion: string) {
  return db.campaign.findFirst({
    where: {
      status: "ACTIVE",
      impressions_remaining: { gt: 0 },
      OR: [
        { target_region: developerRegion as "INDIA" | "GLOBAL" },
        { target_region: "ALL" },
      ],
    },
    orderBy: [
      { priority: "desc" },
      { created_at: "asc" },
    ],
    select: {
      id: true,
      ad_text: true,
      ad_icon: true,
      ad_color: true,
      ad_url: true,
      target_region: true,
    },
  });
}
