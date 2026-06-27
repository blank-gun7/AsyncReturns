import { redirect } from "next/navigation";
import { getCurrentUser } from "@/dal/users";
import { getCampaignsByAdvertiser } from "@/dal/campaigns";
import styles from "../dashboard.module.css";

export default async function AdvertiserDashboard() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const campaigns = await getCampaignsByAdvertiser(user.id);

  const totalSpend = campaigns.reduce((sum, c) => sum + c.blocks_purchased * 8, 0);
  const totalImpressions = campaigns.reduce((sum, c) => sum + c.impressions_delivered, 0);
  const totalClicks = campaigns.reduce((sum, c) => sum + c.clicks, 0);
  const activeCampaigns = campaigns.filter((c) => c.status === "ACTIVE").length;

  return (
    <>
      <h1 className={styles.pageTitle}>Advertiser Dashboard</h1>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Active Campaigns</div>
          <div className={styles.statValueGreen}>{activeCampaigns}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Total Impressions</div>
          <div className={styles.statValue}>{totalImpressions.toLocaleString()}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Total Clicks</div>
          <div className={styles.statValue}>{totalClicks.toLocaleString()}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Total Spend</div>
          <div className={styles.statValue}>${totalSpend.toLocaleString()}</div>
        </div>
      </div>
    </>
  );
}
