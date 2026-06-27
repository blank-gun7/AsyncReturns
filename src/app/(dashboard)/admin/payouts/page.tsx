import { redirect } from "next/navigation";
import { getCurrentUser } from "@/dal/users";
import { getPendingPayouts } from "@/dal/payouts";
import styles from "../../dashboard.module.css";

export default async function AdminPayoutsPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") redirect("/login");

  const payouts = await getPendingPayouts();

  return (
    <>
      <h1 className={styles.pageTitle}>Payout Queue</h1>

      <table className={styles.dataTable}>
        <thead>
          <tr>
            <th>Developer</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Requested</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {payouts.map((p) => (
            <tr key={p.id}>
              <td style={{ color: "var(--text-primary)" }}>
                {p.developer.name || p.developer.email}
              </td>
              <td>
                ${Number(p.amount_usd).toFixed(2)}
                <span style={{ color: "var(--text-secondary)", marginLeft: "0.5rem" }}>
                  ({p.currency} {Number(p.amount_local).toFixed(2)})
                </span>
              </td>
              <td>{p.method.toLowerCase()}</td>
              <td>{new Date(p.requested_at).toLocaleDateString()}</td>
              <td>
                <span className={styles.badgePending}>pending review</span>
              </td>
            </tr>
          ))}
          {payouts.length === 0 && (
            <tr>
              <td colSpan={5} style={{ textAlign: "center", padding: "2rem" }}>
                No pending payouts.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
