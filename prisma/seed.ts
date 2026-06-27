import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const db = new PrismaClient();

function hashKey(key: string) {
  return crypto.createHash("sha256").update(key).digest("hex");
}

async function main() {
  const admin = await db.user.create({
    data: {
      email: "admin@asyncreturns.com",
      name: "Admin",
      role: "ADMIN",
      region: "INDIA",
      referral_code: "admin001",
      wallet: { create: {} },
    },
  });

  const devIndia = await db.user.create({
    data: {
      email: "dev.india@example.com",
      name: "Raj Kumar",
      role: "DEVELOPER",
      region: "INDIA",
      referral_code: "rajdev01",
      wallet: {
        create: {
          balance_usd: 2.50,
          lifetime_earned_usd: 8.40,
        },
      },
    },
  });

  const devGlobal = await db.user.create({
    data: {
      email: "dev.global@example.com",
      name: "Alex Chen",
      role: "DEVELOPER",
      region: "GLOBAL",
      referral_code: "alexdev1",
      referred_by_id: devIndia.id,
      wallet: {
        create: {
          balance_usd: 6.75,
          lifetime_earned_usd: 15.30,
        },
      },
    },
  });

  const advertiser = await db.user.create({
    data: {
      email: "marketing@vercel.com",
      name: "Vercel Marketing",
      role: "ADVERTISER",
      region: "GLOBAL",
      referral_code: "vercel01",
      wallet: { create: {} },
    },
  });

  const campaign1 = await db.campaign.create({
    data: {
      advertiser_id: advertiser.id,
      name: "Vercel Ship Campaign",
      ad_text: "Ship. Optimize. Scale.",
      ad_icon: "▲",
      ad_color: "#ffffff",
      ad_url: "https://vercel.com",
      target_region: "ALL",
      priority: 80,
      status: "ACTIVE",
      blocks_purchased: 50,
      impressions_remaining: 48500,
      impressions_delivered: 1500,
      clicks: 23,
    },
  });

  const campaign2 = await db.campaign.create({
    data: {
      advertiser_id: advertiser.id,
      name: "Supabase India Push",
      ad_text: "The open source Firebase alternative",
      ad_icon: "S",
      ad_color: "#3ECF8E",
      ad_url: "https://supabase.com",
      target_region: "INDIA",
      priority: 50,
      status: "ACTIVE",
      blocks_purchased: 25,
      impressions_remaining: 24200,
      impressions_delivered: 800,
      clicks: 12,
    },
  });

  const testApiKey = "test_key_for_development_only_12345";
  await db.apiKey.create({
    data: {
      user_id: devIndia.id,
      key_hash: hashKey(testApiKey),
      key_prefix: testApiKey.slice(0, 8),
      name: "Test CLI Key",
    },
  });

  for (let i = 0; i < 20; i++) {
    await db.impression.create({
      data: {
        campaign_id: i % 2 === 0 ? campaign1.id : campaign2.id,
        developer_id: i % 3 === 0 ? devGlobal.id : devIndia.id,
        cli_session_id: `seed-session-${i}`,
        duration_ms: 10000 + Math.floor(Math.random() * 2000),
        ip_hash: "seeded_hash_" + i,
        tool_type: ["VSCODE", "TERMINAL", "CURSOR"][i % 3] as "VSCODE" | "TERMINAL" | "CURSOR",
        valid: true,
        clicked: i % 7 === 0,
      },
    });
  }

  console.log("Seed complete:");
  console.log(`  Admin: ${admin.email}`);
  console.log(`  Dev (India): ${devIndia.email}`);
  console.log(`  Dev (Global): ${devGlobal.email}`);
  console.log(`  Advertiser: ${advertiser.email}`);
  console.log(`  Campaigns: ${campaign1.name}, ${campaign2.name}`);
  console.log(`  Test API key: ${testApiKey}`);
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect());
