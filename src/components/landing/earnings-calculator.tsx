"use client";

import { useState } from "react";
import { TiltCard } from "@/components/ui/tilt-card";
import styles from "@/app/(marketing)/page.module.css";

export function EarningsCalculator() {
  const [waitStates, setWaitStates] = useState(200);

  const monthlyEarnings = Math.round((waitStates * 30 * 249) / 1000);

  return (
    <TiltCard className={`${styles.calcSection} ${styles.glassCard}`}>
      <h2 className={styles.sectionTitle} style={{ marginBottom: '1rem' }}>Track Your Earnings</h2>
      <p className={styles.calcDesc}>How many AI prompts do you run per day?</p>

      <div className={styles.sliderContainer}>
        <input
          type="range"
          min="50"
          max="1000"
          step="50"
          value={waitStates}
          onChange={(e) => setWaitStates(parseInt(e.target.value))}
          className={styles.rangeInput}
        />
        <div style={{ marginTop: '1rem', fontWeight: 'bold' }}>{waitStates} prompts / day</div>
      </div>

      <div className={styles.calcResult}>
        ₹{monthlyEarnings.toLocaleString('en-IN')}
      </div>
      <p className={styles.calcDesc}>Estimated passive income per month.</p>
    </TiltCard>
  );
}
