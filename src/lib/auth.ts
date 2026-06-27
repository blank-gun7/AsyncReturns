import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import crypto from "crypto";

function generateReferralCode(): string {
  return crypto.randomBytes(4).toString("hex");
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const dbUser = await db.user.findUnique({
          where: { id: user.id },
          select: { role: true, region: true, referral_code: true },
        });
        if (dbUser) {
          token.role = dbUser.role;
          token.region = dbUser.region;
          token.referralCode = dbUser.referral_code;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.role = token.role as string;
        session.user.region = token.region as string;
        session.user.referralCode = token.referralCode as string;
      }
      return session;
    },
  },
  events: {
    async createUser({ user }) {
      await db.$transaction([
        db.user.update({
          where: { id: user.id! },
          data: { referral_code: generateReferralCode() },
        }),
        db.wallet.create({
          data: { user_id: user.id! },
        }),
      ]);
    },
  },
  pages: {
    signIn: "/login",
  },
});
