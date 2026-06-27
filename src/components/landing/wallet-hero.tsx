"use client";

import styles from "@/app/(marketing)/page.module.css";

interface WalletHeroProps {
  balance: number;
  onConnect: () => void;
}

export function WalletHero({ balance, onConnect }: WalletHeroProps) {
  return (
    <section className={styles.walletHero}>
      <div className={styles.balanceLabel}>Total Value Earned</div>
      <div className={styles.balance} data-text={`₹${balance.toFixed(2)}`}>
        ₹{balance.toFixed(2)}
      </div>
      <p className={styles.subtitle}>
        Monetize your wait state. The attention marketplace for Indian devs.
      </p>
      <button className={styles.primaryBtn} onClick={onConnect}>
        Connect Your Terminal
      </button>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className={styles.liveClients}>
          <div className={styles.pulsingDot}></div>
          <span>Live Advertiser Bids: </span>
          <div className={styles.clientAvatars}>
            <div className={styles.avatar}>P</div>
            <div className={styles.avatar}>V</div>
            <div className={styles.avatar}>S</div>
          </div>
          <span style={{ color: '#fff', fontWeight: 600 }}>$5.00 CPM</span>
        </div>
      </div>
    </section>
  );
}
