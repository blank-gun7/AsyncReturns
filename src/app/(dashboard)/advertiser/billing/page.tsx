import { redirect } from "next/navigation";
import { getCurrentUser } from "@/dal/users";
import styles from "../../dashboard.module.css";

export default async function BillingPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <>
      <h1 className={styles.pageTitle}>Billing</h1>
      <div className={styles.statCard} style={{ maxWidth: "600px" }}>
        <p style={{ color: "var(--text-secondary)" }}>
          Purchase blocks from your campaign pages. Payment history will appear here.
        </p>
      </div>
    </>
  );
}
