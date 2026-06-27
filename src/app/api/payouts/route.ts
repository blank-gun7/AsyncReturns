import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getPayoutsByDeveloper, canRequestPayout, createPayout } from "@/dal/payouts";
import { requestPayoutSchema } from "@/utils/validation";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payouts = await getPayoutsByDeveloper(session.user.id);
  return NextResponse.json(payouts);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = requestPayoutSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const eligibility = await canRequestPayout(session.user.id);
  if (!eligibility.eligible) {
    return NextResponse.json(
      { error: eligibility.reason },
      { status: 400 }
    );
  }

  const [payout] = await createPayout(session.user.id, parsed.data.method);
  return NextResponse.json(payout, { status: 201 });
}
