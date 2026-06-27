import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { getUserByApiKey } from "@/dal/users";
import { recordImpression } from "@/dal/impressions";
import { checkImpressionFraud, hashIp } from "@/utils/fraud";
import { impressionRequestSchema } from "@/utils/validation";

const JWT_SECRET = new TextEncoder().encode(process.env.IMPRESSION_JWT_SECRET || "async-returns-secret");

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Missing API key" }, { status: 401 });
  }

  const apiKey = authHeader.slice(7);
  const user = await getUserByApiKey(apiKey);

  if (!user) {
    return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = impressionRequestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { impression_token, duration_ms, tool_type, cli_session_id } = parsed.data;

  let payload;
  try {
    const { payload: p } = await jwtVerify(impression_token, JWT_SECRET);
    payload = p as { campaign_id: string; developer_id: string };
  } catch {
    return NextResponse.json({ error: "Invalid or expired impression token" }, { status: 400 });
  }

  if (payload.developer_id !== user.id) {
    return NextResponse.json({ error: "Token mismatch" }, { status: 403 });
  }

  const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
  const ipHashed = hashIp(ip);

  const fraudCheck = checkImpressionFraud(user.id, duration_ms, ipHashed);

  const result = await recordImpression({
    campaignId: payload.campaign_id,
    developerId: user.id,
    cliSessionId: cli_session_id,
    durationMs: duration_ms,
    ipHash: ipHashed,
    toolType: tool_type as "TERMINAL" | "VSCODE" | "CURSOR" | "OTHER",
    valid: fraudCheck.valid,
  });

  return NextResponse.json({
    success: true,
    earned_usd: result.earned_usd,
  });
}
