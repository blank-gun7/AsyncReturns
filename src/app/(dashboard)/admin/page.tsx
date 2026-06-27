import { redirect } from "next/navigation";
import { getCurrentUser } from "@/dal/users";
import { getActiveCampaignCount } from "@/dal/campaigns";
import { db } from "@/lib/db";
import styles from "../dashboard.module.css";

export default async function AdminDashboard() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") redirect("/login");

  const [totalUsers, totalDevs, totalAdvertisers, activeCampaigns, pendingPayouts] =
    await Promise.all([
      db.user.count(),
      db.user.count({ where: { role: "DEVELOPER" } }),
      db.user.count({ where: { role: "ADVERTISER" } }),
      getActiveCampaignCount(),
      db.payout.count({ where: { status: "REQUESTED" } }),
    ]);

  return (
    <>
      <h1 className={styles.pageTitle}>Admin Overview</h1>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Total Users</div>
          <div className={styles.statValue}>{totalUsers}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Developers</div>
          <div className={styles.statValue}>{totalDevs}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Advertisers</div>
          <div className={styles.statValue}>{totalAdvertisers}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Active Campaigns</div>
          <div className={styles.statValueGreen}>{activeCampaigns}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Pending Payouts</div>
          <div className={styles.statValue} style={{ color: pendingPayouts > 0 ? "#ffbd2e" : "inherit" }}>
            {pendingPayouts}
          </div>
        </div>
      </div>
    </>
  );
}
