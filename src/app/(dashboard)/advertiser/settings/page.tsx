import { redirect } from "next/navigation";
import { getCurrentUser } from "@/dal/users";
import styles from "../../dashboard.module.css";

export default async function AdvertiserSettingsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <>
      <h1 className={styles.pageTitle}>Settings</h1>
      <div className={styles.statCard} style={{ maxWidth: "600px" }}>
        <div style={{ display: "grid", gap: "1rem" }}>
          <div>
            <div className={styles.statLabel}>Email</div>
            <div style={{ color: "var(--text-primary)" }}>{user.email}</div>
          </div>
          <div>
            <div className={styles.statLabel}>Account Type</div>
            <div style={{ color: "var(--text-primary)" }}>Advertiser</div>
          </div>
        </div>
      </div>
    </>
  );
}
