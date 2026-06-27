"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { NavBar } from "@/components/landing/nav-bar";
import { WalletHero } from "@/components/landing/wallet-hero";
import { IdeShowcase } from "@/components/landing/ide-showcase";
import { MilestoneTracker } from "@/components/landing/milestone-tracker";
import { HowItWorks } from "@/components/landing/how-it-works";
import { EarningsCalculator } from "@/components/landing/earnings-calculator";
import { ReferralBox } from "@/components/landing/referral-box";
import { SiteFooter } from "@/components/landing/site-footer";
import { InstallModal } from "@/components/landing/install-modal";
import { useAnimatedCounter } from "@/hooks/use-animated-counter";
import { useMouseSpotlight } from "@/hooks/use-mouse-spotlight";
import { useAdCycle } from "@/hooks/use-ad-cycle";

const REFERRAL_LINK = "asyncreturns.com/r/dev1337";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const balance = useAnimatedCounter(845.5, 2500);
  const mousePos = useMouseSpotlight();
  const { adVisible, currentAd, spinnerFrame } = useAdCycle();

  return (
    <>
      <div className="ambient-glow"></div>
      <div
        className={styles.spotlight}
        style={{ "--mouse-x": mousePos.x, "--mouse-y": mousePos.y } as React.CSSProperties}
      ></div>

      <NavBar onGetStarted={() => setIsModalOpen(true)} />

      <main className={styles.container}>
        <WalletHero balance={balance} onConnect={() => setIsModalOpen(true)} />
        <IdeShowcase
          adVisible={adVisible}
          currentAd={currentAd}
          spinnerFrame={spinnerFrame}
        />
        <MilestoneTracker balance={balance} />
        <HowItWorks />
        <EarningsCalculator />
        <ReferralBox referralLink={REFERRAL_LINK} />
      </main>

      <SiteFooter />
      <InstallModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
