import { redirect } from "next/navigation";
import { getCurrentUser } from "@/dal/users";
import { getAllCampaigns } from "@/dal/campaigns";
import styles from "../../dashboard.module.css";

export default async function AdminCampaignsPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") redirect("/login");

  const { campaigns } = await getAllCampaigns();

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      ACTIVE: styles.badgeActive,
      PAUSED: styles.badgePaused,
      EXHAUSTED: styles.badgeExhausted,
      DRAFT: styles.badgeDraft,
    };
    return map[status] || styles.badgeDraft;
  };

  return (
    <>
      <h1 className={styles.pageTitle}>All Campaigns</h1>

      <table className={styles.dataTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Advertiser</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Delivered</th>
            <th>Remaining</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((c) => (
            <tr key={c.id}>
              <td style={{ color: "var(--text-primary)" }}>{c.name}</td>
              <td>{c.advertiser.name || c.advertiser.email}</td>
              <td><span className={statusBadge(c.status)}>{c.status.toLowerCase()}</span></td>
              <td>{c.priority}</td>
              <td>{c.impressions_delivered.toLocaleString()}</td>
              <td>{c.impressions_remaining.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
