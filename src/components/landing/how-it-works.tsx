"use client";

import styles from "@/app/(marketing)/page.module.css";
import { TiltCard } from "@/components/ui/tilt-card";

export function HowItWorks() {
  return (
    <section className={styles.flowSection}>
      <h2 className={styles.sectionTitle}>How it works</h2>
      <div className={styles.flowGrid}>
        <TiltCard className={`${styles.flowStep} ${styles.glassCard}`}>
          <div className={styles.stepNumber}>1</div>
          <h3>Authenticate</h3>
          <p>Run <code style={{ color: "var(--text-primary)" }}>npx asyncreturns login</code>. We securely link your CLI and IDEs to your wallet.</p>
        </TiltCard>
        <TiltCard className={`${styles.flowStep} ${styles.glassCard}`}>
          <div className={styles.stepNumber}>2</div>
          <h3>Generate</h3>
          <p>Code normally. We replace boring AI loading spinners with ultra-subtle, premium B2B footers.</p>
        </TiltCard>
        <TiltCard className={`${styles.flowStep} ${styles.glassCard}`}>
          <div className={styles.stepNumber}>3</div>
          <h3>Withdraw</h3>
          <p>Hit ₹1,000 and instantly route the cash to your bank account via Razorpay UPI.</p>
        </TiltCard>
      </div>
    </section>
  );
}
