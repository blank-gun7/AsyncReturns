"use client";

import { TiltCard } from "@/components/ui/tilt-card";
import styles from "@/app/(marketing)/page.module.css";

interface MilestoneTrackerProps {
  balance: number;
}

export function MilestoneTracker({ balance }: MilestoneTrackerProps) {
  const progressPercentage = Math.min((balance / 1000) * 100, 100);

  return (
    <TiltCard className={`${styles.trackerSection} ${styles.glassCard}`}>
      <div className={styles.trackerHeader}>
        <span style={{ color: 'var(--text-secondary)' }}>Next UPI Cash Out</span>
        <span style={{ color: 'var(--neon-green)' }}>₹1000.00</span>
      </div>
      <div className={styles.progressContainer}>
        <div className={styles.progressBar} style={{ width: `${progressPercentage}%` }}></div>
      </div>
      <div className={styles.trackerFooter}>
        You are <span>₹{(1000 - balance).toFixed(2)}</span> away from unlocking instant transfer.
      </div>
    </TiltCard>
  );
}
