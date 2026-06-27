import { redirect } from "next/navigation";
import { getCurrentUser } from "@/dal/users";
import { getPayoutsByDeveloper, canRequestPayout } from "@/dal/payouts";
import { formatCurrency } from "@/utils/currency";
import { PayoutRequestButton } from "@/components/dashboard/payout-request-button";
import styles from "../../dashboard.module.css";

export default async function PayoutsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [payouts, eligibility] = await Promise.all([
    getPayoutsByDeveloper(user.id),
    canRequestPayout(user.id),
  ]);

  return (
    <>
      <h1 className={styles.pageTitle}>Payouts</h1>

      <div className={styles.statCard} style={{ marginBottom: "2rem", maxWidth: "400px" }}>
        <div className={styles.statLabel}>Available Balance</div>
        <div className={styles.statValueGreen}>
          {formatCurrency(eligibility.balance, user.region)}
        </div>
        <div style={{ marginTop: "0.5rem", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
          Threshold: {formatCurrency(eligibility.threshold, user.region)}
        </div>
        <PayoutRequestButton
          eligible={eligibility.eligible}
          reason={eligibility.reason}
        />
      </div>

      <h2 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>Payout History</h2>
      <table className={styles.dataTable}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {payouts.map((p) => (
            <tr key={p.id}>
              <td>{new Date(p.requested_at).toLocaleDateString()}</td>
              <td style={{ color: "var(--text-primary)" }}>
                {formatCurrency(Number(p.amount_usd), user.region)}
              </td>
              <td>{p.method.toLowerCase()}</td>
              <td>
                <span className={
                  p.status === "COMPLETED" ? styles.badgeCompleted :
                  p.status === "FAILED" ? styles.badgeExhausted :
                  styles.badgePending
                }>
                  {p.status.toLowerCase()}
                </span>
              </td>
            </tr>
          ))}
          {payouts.length === 0 && (
            <tr>
              <td colSpan={4} style={{ textAlign: "center", padding: "2rem" }}>
                No payouts yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
