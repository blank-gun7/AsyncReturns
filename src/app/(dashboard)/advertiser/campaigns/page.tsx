import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/dal/users";
import { getCampaignsByAdvertiser } from "@/dal/campaigns";
import styles from "../../dashboard.module.css";

export default async function CampaignsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const campaigns = await getCampaignsByAdvertiser(user.id);

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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1 className={styles.pageTitle} style={{ marginBottom: 0 }}>Campaigns</h1>
        <Link
          href="/advertiser/campaigns/new"
          style={{
            padding: "0.625rem 1.5rem",
            borderRadius: "8px",
            border: "1px solid rgba(57, 255, 20, 0.3)",
            background: "rgba(57, 255, 20, 0.1)",
            color: "var(--neon-green)",
            textDecoration: "none",
            fontSize: "0.9rem",
            fontWeight: 600,
          }}
        >
          + New Campaign
        </Link>
      </div>

      <table className={styles.dataTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Delivered</th>
            <th>Remaining</th>
            <th>Clicks</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((c) => (
            <tr key={c.id}>
              <td>
                <Link href={`/advertiser/campaigns/${c.id}`} style={{ color: "var(--text-primary)", textDecoration: "none" }}>
                  {c.name}
                </Link>
              </td>
              <td><span className={statusBadge(c.status)}>{c.status.toLowerCase()}</span></td>
              <td>{c.priority}</td>
              <td>{c.impressions_delivered.toLocaleString()}</td>
              <td>{c.impressions_remaining.toLocaleString()}</td>
              <td>{c.clicks.toLocaleString()}</td>
            </tr>
          ))}
          {campaigns.length === 0 && (
            <tr>
              <td colSpan={6} style={{ textAlign: "center", padding: "2rem" }}>
                No campaigns yet. Create your first one.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
