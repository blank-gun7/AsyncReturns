import { redirect } from "next/navigation";
import { getCurrentUser } from "@/dal/users";
import { getDevEarnings } from "@/dal/impressions";
import { formatCurrency } from "@/utils/currency";
import { devEarningPerImpression, CPM_INDIA_USD, CPM_GLOBAL_USD } from "@/utils/constants";
import styles from "../../dashboard.module.css";

export default async function EarningsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const params = await searchParams;
  const page = parseInt(params.page || "1", 10);

  const { impressions, total, perPage } = await getDevEarnings(user.id, { page });
  const totalPages = Math.ceil(total / perPage);

  return (
    <>
      <h1 className={styles.pageTitle}>Earnings History</h1>

      <table className={styles.dataTable}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Campaign</th>
            <th>Tool</th>
            <th>Duration</th>
            <th>Earned</th>
          </tr>
        </thead>
        <tbody>
          {impressions.map((imp) => {
            const cpm = imp.campaign.target_region === "GLOBAL" ? CPM_GLOBAL_USD : CPM_INDIA_USD;
            const earned = devEarningPerImpression(cpm);
            return (
              <tr key={imp.id}>
                <td>{new Date(imp.created_at).toLocaleDateString()}</td>
                <td style={{ color: "var(--text-primary)" }}>{imp.campaign.name}</td>
                <td>{imp.tool_type.toLowerCase()}</td>
                <td>{(imp.duration_ms / 1000).toFixed(1)}s</td>
                <td style={{ color: "var(--neon-green)" }}>
                  {formatCurrency(earned, user.region)}
                </td>
              </tr>
            );
          })}
          {impressions.length === 0 && (
            <tr>
              <td colSpan={5} style={{ textAlign: "center", padding: "2rem" }}>
                No earnings yet. Connect your CLI to start earning.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.5rem", justifyContent: "center" }}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <a
              key={p}
              href={`/developer/earnings?page=${p}`}
              style={{
                padding: "0.5rem 0.75rem",
                borderRadius: "6px",
                border: "1px solid rgba(255,255,255,0.1)",
                color: p === page ? "var(--neon-green)" : "var(--text-secondary)",
                background: p === page ? "rgba(57,255,20,0.1)" : "transparent",
                textDecoration: "none",
                fontSize: "0.85rem",
              }}
            >
              {p}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
