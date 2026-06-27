import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await request.text();
  const signature = request.headers.get("x-razorpay-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  // TODO: Verify signature with crypto.createHmac
  // TODO: Process payment event and update block_purchases + campaigns

  return NextResponse.json({ received: true });
}
