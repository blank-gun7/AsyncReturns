import { redirect } from "next/navigation";
import { getCurrentUser, getUserStats } from "@/dal/users";
import { formatCurrency } from "@/utils/currency";
import styles from "../dashboard.module.css";

export default async function DeveloperDashboard() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const stats = await getUserStats(user.id);
  const wallet = user.wallet;

  const balanceUsd = wallet ? Number(wallet.balance_usd) : 0;
  const lifetimeUsd = wallet ? Number(wallet.lifetime_earned_usd) : 0;
  const pendingUsd = wallet ? Number(wallet.pending_usd) : 0;

  return (
    <>
      <h1 className={styles.pageTitle}>Developer Dashboard</h1>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Balance</div>
          <div className={styles.statValueGreen}>
            {formatCurrency(balanceUsd, user.region)}
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Lifetime Earned</div>
          <div className={styles.statValue}>
            {formatCurrency(lifetimeUsd, user.region)}
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Pending Payout</div>
          <div className={styles.statValue}>
            {formatCurrency(pendingUsd, user.region)}
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Impressions This Month</div>
          <div className={styles.statValue}>
            {stats.monthlyImpressions.toLocaleString()}
          </div>
        </div>
      </div>
    </>
  );
}
