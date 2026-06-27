import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  // TODO: Verify with stripe.webhooks.constructEvent
  // TODO: Handle checkout.session.completed event

  return NextResponse.json({ received: true });
}
