import "server-only";
import { db } from "@/lib/db";
import { devEarningPerImpression, REFERRAL_SHARE, CPM_INDIA_USD, CPM_GLOBAL_USD } from "@/utils/constants";

function getCpmForRegion(targetRegion: string): number {
  return targetRegion === "GLOBAL" ? CPM_GLOBAL_USD : CPM_INDIA_USD;
}

export async function recordImpression(params: {
  campaignId: string;
  developerId: string;
  cliSessionId: string;
  durationMs: number;
  ipHash: string;
  toolType: "TERMINAL" | "VSCODE" | "CURSOR" | "OTHER";
  valid: boolean;
}) {
  const campaign = await db.campaign.findUnique({
    where: { id: params.campaignId },
    select: { target_region: true },
  });
  if (!campaign) throw new Error("Campaign not found");

  const cpm = getCpmForRegion(campaign.target_region);
  const devEarning = devEarningPerImpression(cpm);

  const developer = await db.user.findUnique({
    where: { id: params.developerId },
    select: { referred_by_id: true },
  });

  return db.$transaction(async (tx) => {
    const impression = await tx.impression.create({
      data: {
        campaign_id: params.campaignId,
        developer_id: params.developerId,
        cli_session_id: params.cliSessionId,
        duration_ms: params.durationMs,
        ip_hash: params.ipHash,
        tool_type: params.toolType,
        valid: params.valid,
      },
    });

    if (params.valid) {
      await tx.campaign.update({
        where: { id: params.campaignId },
        data: {
          impressions_remaining: { decrement: 1 },
          impressions_delivered: { increment: 1 },
        },
      });

      await tx.wallet.update({
        where: { user_id: params.developerId },
        data: {
          balance_usd: { increment: devEarning },
          lifetime_earned_usd: { increment: devEarning },
        },
      });

      const updatedCampaign = await tx.campaign.findUnique({
        where: { id: params.campaignId },
        select: { impressions_remaining: true },
      });
      if (updatedCampaign && updatedCampaign.impressions_remaining <= 0) {
        await tx.campaign.update({
          where: { id: params.campaignId },
          data: { status: "EXHAUSTED" },
        });
      }

      if (developer?.referred_by_id) {
        const referralEarning = devEarning * REFERRAL_SHARE;
        await tx.referralEarning.create({
          data: {
            referrer_id: developer.referred_by_id,
            referred_id: params.developerId,
            impression_id: impression.id,
            amount_usd: referralEarning,
          },
        });
        await tx.wallet.update({
          where: { user_id: developer.referred_by_id },
          data: {
            balance_usd: { increment: referralEarning },
            lifetime_earned_usd: { increment: referralEarning },
          },
        });
      }
    }

    return { impression, earned_usd: params.valid ? devEarning : 0 };
  });
}

export async function recordClick(impressionId: string, developerId: string) {
  const impression = await db.impression.findUnique({
    where: { id: impressionId },
    select: { developer_id: true, campaign_id: true, clicked: true },
  });

  if (!impression || impression.developer_id !== developerId) {
    throw new Error("Invalid impression");
  }
  if (impression.clicked) {
    throw new Error("Already clicked");
  }

  await db.$transaction([
    db.impression.update({
      where: { id: impressionId },
      data: { clicked: true },
    }),
    db.campaign.update({
      where: { id: impression.campaign_id },
      data: { clicks: { increment: 1 } },
    }),
  ]);
}

export async function getDevEarnings(developerId: string, options?: {
  from?: Date;
  to?: Date;
  page?: number;
  perPage?: number;
}) {
  const where = {
    developer_id: developerId,
    valid: true,
    ...(options?.from || options?.to ? {
      created_at: {
        ...(options.from ? { gte: options.from } : {}),
        ...(options.to ? { lte: options.to } : {}),
      },
    } : {}),
  };

  const page = options?.page ?? 1;
  const perPage = options?.perPage ?? 50;

  const [impressions, total] = await Promise.all([
    db.impression.findMany({
      where,
      include: { campaign: { select: { name: true, target_region: true } } },
      orderBy: { created_at: "desc" },
      skip: (page - 1) * perPage,
      take: perPage,
    }),
    db.impression.count({ where }),
  ]);

  return { impressions, total, page, perPage };
}
