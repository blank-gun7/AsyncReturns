import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";
import { getUserByApiKey } from "@/dal/users";
import { getNextAd } from "@/utils/priority-queue";
import { IMPRESSION_DURATION_SEC, IMPRESSION_TOKEN_TTL_SEC } from "@/utils/constants";

const JWT_SECRET = new TextEncoder().encode(process.env.IMPRESSION_JWT_SECRET || "async-returns-secret");

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Missing API key" }, { status: 401 });
  }

  const apiKey = authHeader.slice(7);
  const user = await getUserByApiKey(apiKey);

  if (!user) {
    return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
  }

  const ad = await getNextAd(user.region);

  if (!ad) {
    return new NextResponse(null, { status: 204 });
  }

  const impressionToken = await new SignJWT({
    campaign_id: ad.id,
    developer_id: user.id,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${IMPRESSION_TOKEN_TTL_SEC}s`)
    .sign(JWT_SECRET);

  return NextResponse.json({
    campaign_id: ad.id,
    ad_text: ad.ad_text,
    ad_icon: ad.ad_icon,
    ad_color: ad.ad_color,
    ad_url: ad.ad_url,
    impression_token: impressionToken,
    display_seconds: IMPRESSION_DURATION_SEC,
  });
}
