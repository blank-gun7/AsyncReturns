import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/dal/users";
import { getCampaignById } from "@/dal/campaigns";
import { formatUsd } from "@/utils/currency";
import { IMPRESSIONS_PER_BLOCK } from "@/utils/constants";
import styles from "../../../dashboard.module.css";

export default async function CampaignDetailPage({
  params,
}: {
  params: Promise<{ campaignId: string }>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const { campaignId } = await params;
  const campaign = await getCampaignById(campaignId);

  if (!campaign || campaign.advertiser_id !== user.id) {
    notFound();
  }

  const totalImpressions =
    campaign.impressions_delivered + campaign.impressions_remaining;
  const deliveryPercent =
    totalImpressions > 0
      ? Math.round((campaign.impressions_delivered / totalImpressions) * 100)
      : 0;
  const ctr =
    campaign.impressions_delivered > 0
      ? ((campaign.clicks / campaign.impressions_delivered) * 100).toFixed(2)
      : "0.00";

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
      <div style={{ marginBottom: "2rem" }}>
        <Link
          href="/advertiser/campaigns"
          style={{
            color: "var(--text-secondary)",
            textDecoration: "none",
            fontSize: "0.85rem",
          }}
        >
          &larr; Back to Campaigns
        </Link>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <div>
          <h1 className={styles.pageTitle} style={{ marginBottom: "0.5rem" }}>
            {campaign.name}
          </h1>
          <span className={statusBadge(campaign.status)}>
            {campaign.status.toLowerCase()}
          </span>
        </div>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Impressions Delivered</div>
          <div className={styles.statValue}>
            {campaign.impressions_delivered.toLocaleString()}
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Remaining</div>
          <div className={styles.statValue}>
            {campaign.impressions_remaining.toLocaleString()}
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Clicks</div>
          <div className={styles.statValue}>
            {campaign.clicks.toLocaleString()}
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>CTR</div>
          <div className={styles.statValue}>{ctr}%</div>
        </div>
      </div>

      <div className={styles.statsGrid} style={{ gridTemplateColumns: "1fr 1fr" }}>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Delivery Progress</div>
          <div
            style={{
              marginTop: "0.75rem",
              background: "rgba(255, 255, 255, 0.05)",
              borderRadius: "8px",
              height: "8px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${deliveryPercent}%`,
                height: "100%",
                background: "var(--neon-green)",
                borderRadius: "8px",
                transition: "width 0.3s ease",
              }}
            />
          </div>
          <div
            style={{
              marginTop: "0.5rem",
              fontSize: "0.8rem",
              color: "var(--text-secondary)",
            }}
          >
            {deliveryPercent}% delivered
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Priority</div>
          <div className={styles.statValueGreen}>{campaign.priority}</div>
        </div>
      </div>

      <h2
        className={styles.pageTitle}
        style={{ fontSize: "1.25rem", marginTop: "2rem" }}
      >
        Ad Creative
      </h2>
      <div className={styles.statCard} style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: campaign.ad_color || "rgba(255,255,255,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.5rem",
              flexShrink: 0,
            }}
          >
            {campaign.ad_icon}
          </div>
          <div>
            <div style={{ fontWeight: 600, color: "var(--text-primary)" }}>
              {campaign.ad_text}
            </div>
            <div
              style={{
                fontSize: "0.8rem",
                color: "var(--text-secondary)",
                marginTop: "0.25rem",
              }}
            >
              {campaign.ad_url}
            </div>
          </div>
        </div>
      </div>

      <h2
        className={styles.pageTitle}
        style={{ fontSize: "1.25rem", marginTop: "2rem" }}
      >
        Details
      </h2>
      <div className={styles.statCard}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            <tr>
              <td style={{ padding: "0.5rem 0", color: "var(--text-secondary)", width: "200px" }}>
                Target Region
              </td>
              <td style={{ padding: "0.5rem 0", color: "var(--text-primary)" }}>
                {campaign.target_region}
              </td>
            </tr>
            <tr>
              <td style={{ padding: "0.5rem 0", color: "var(--text-secondary)" }}>
                Blocks Purchased
              </td>
              <td style={{ padding: "0.5rem 0", color: "var(--text-primary)" }}>
                {campaign.blocks_purchased.toLocaleString()} ({(campaign.blocks_purchased * IMPRESSIONS_PER_BLOCK).toLocaleString()} impressions)
              </td>
            </tr>
            <tr>
              <td style={{ padding: "0.5rem 0", color: "var(--text-secondary)" }}>
                Created
              </td>
              <td style={{ padding: "0.5rem 0", color: "var(--text-primary)" }}>
                {campaign.created_at.toLocaleDateString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {campaign.block_purchases && campaign.block_purchases.length > 0 && (
        <>
          <h2
            className={styles.pageTitle}
            style={{ fontSize: "1.25rem", marginTop: "2rem" }}
          >
            Purchase History
          </h2>
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Blocks</th>
                <th>Total</th>
                <th>Provider</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {campaign.block_purchases.map((bp) => (
                <tr key={bp.id}>
                  <td>{bp.created_at.toLocaleDateString()}</td>
                  <td>{bp.blocks.toLocaleString()}</td>
                  <td>{formatUsd(bp.total_usd)}</td>
                  <td>{bp.payment_provider.toLowerCase()}</td>
                  <td>
                    <span
                      className={
                        bp.status === "COMPLETED"
                          ? styles.badgeCompleted
                          : bp.status === "PENDING"
                            ? styles.badgePending
                            : styles.badgeDraft
                      }
                    >
                      {bp.status.toLowerCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}
