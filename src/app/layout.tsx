import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Devorix — Turn AI Wait Time Into Real Money",
  description:
    "India's first passive income platform for developers. Earn ₹200–₹2,000/month from your AI coding wait states. One command. Zero extra effort.",
  keywords: "developer income, passive income, AI coding, terminal monetization, India fintech",
  openGraph: {
    title: "Devorix — Turn AI Wait Time Into Real Money",
    description: "Earn passively while your AI generates code. ₹200–₹2,000/month. Install in 30 seconds.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
