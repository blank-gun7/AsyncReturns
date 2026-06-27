import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const protectedPaths = ["/developer", "/advertiser", "/admin"];
  const isProtected = protectedPaths.some((p) => path.startsWith(p));

  if (!isProtected) return NextResponse.next();

  const session = await auth();

  if (!session?.user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const role = session.user.role;

  if (path.startsWith("/admin") && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/developer", request.url));
  }

  if (path.startsWith("/advertiser") && role !== "ADVERTISER" && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/developer", request.url));
  }

  if (path.startsWith("/developer") && role !== "DEVELOPER" && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/advertiser", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/auth|api/ads|api/webhooks).*)",
  ],
};
