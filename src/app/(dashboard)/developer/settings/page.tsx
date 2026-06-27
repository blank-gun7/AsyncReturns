import { redirect } from "next/navigation";
import { getCurrentUser } from "@/dal/users";
import styles from "../../dashboard.module.css";

export default async function SettingsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const wallet = user.wallet;

  return (
    <>
      <h1 className={styles.pageTitle}>Settings</h1>

      <div className={styles.statCard} style={{ maxWidth: "600px", marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.2rem", marginBottom: "1.5rem" }}>Profile</h2>
        <div style={{ display: "grid", gap: "1rem" }}>
          <div>
            <div className={styles.statLabel}>Email</div>
            <div style={{ color: "var(--text-primary)" }}>{user.email}</div>
          </div>
          <div>
            <div className={styles.statLabel}>Region</div>
            <div style={{ color: "var(--text-primary)" }}>{user.region}</div>
          </div>
          <div>
            <div className={styles.statLabel}>Payment Method</div>
            <div style={{ color: "var(--text-primary)" }}>
              {wallet?.payment_method === "NONE" ? "Not configured" : wallet?.payment_method || "Not configured"}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.statCard} style={{ maxWidth: "600px" }}>
        <h2 style={{ fontSize: "1.2rem", marginBottom: "1.5rem" }}>API Key</h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: "1rem" }}>
          Use this key to authenticate the CLI tool. Run <code style={{ color: "var(--text-primary)" }}>npx asyncreturns login</code> to connect automatically.
        </p>
      </div>
    </>
  );
}
