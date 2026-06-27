import { redirect } from "next/navigation";
import { getCurrentUser } from "@/dal/users";
import { getReferralStats } from "@/dal/referrals";
import { formatCurrency } from "@/utils/currency";
import styles from "../../dashboard.module.css";

export default async function ReferralsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const stats = await getReferralStats(user.id);
  const referralLink = `asyncreturns.com/r/${user.referral_code}`;

  return (
    <>
      <h1 className={styles.pageTitle}>Referrals</h1>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Referred Developers</div>
          <div className={styles.statValue}>{stats.referredCount}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Referral Earnings</div>
          <div className={styles.statValueGreen}>
            {formatCurrency(stats.totalEarningsUsd, user.region)}
          </div>
        </div>
      </div>

      <div style={{
        background: "rgba(57, 255, 20, 0.05)",
        border: "1px dashed rgba(57, 255, 20, 0.3)",
        borderRadius: "12px",
        padding: "1.5rem",
        marginBottom: "2rem",
      }}>
        <p style={{ color: "var(--text-secondary)", marginBottom: "0.75rem", fontSize: "0.9rem" }}>
          Share your referral link. Earn <span style={{ color: "var(--neon-green)", fontWeight: 700 }}>5%</span> of their payouts forever.
        </p>
        <div style={{
          display: "flex",
          background: "#000",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "8px",
          overflow: "hidden",
        }}>
          <input
            type="text"
            value={referralLink}
            readOnly
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              color: "var(--text-secondary)",
              padding: "0.75rem 1rem",
              outline: "none",
              fontFamily: "monospace",
              fontSize: "0.9rem",
            }}
          />
        </div>
      </div>

      {stats.referredUsers.length > 0 && (
        <>
          <h2 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>Referred Users</h2>
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {stats.referredUsers.map((u) => (
                <tr key={u.id}>
                  <td style={{ color: "var(--text-primary)" }}>{u.name || u.email}</td>
                  <td>{new Date(u.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}
