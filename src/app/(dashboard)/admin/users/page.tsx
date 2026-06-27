import { redirect } from "next/navigation";
import { getCurrentUser } from "@/dal/users";
import { db } from "@/lib/db";
import styles from "../../dashboard.module.css";

export default async function AdminUsersPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") redirect("/login");

  const users = await db.user.findMany({
    include: { wallet: { select: { lifetime_earned_usd: true } } },
    orderBy: { created_at: "desc" },
    take: 100,
  });

  return (
    <>
      <h1 className={styles.pageTitle}>Users</h1>

      <table className={styles.dataTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Region</th>
            <th>Lifetime Earned</th>
            <th>Joined</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td style={{ color: "var(--text-primary)" }}>{u.name || "—"}</td>
              <td>{u.email}</td>
              <td>
                <span className={
                  u.role === "ADMIN" ? styles.badgeActive :
                  u.role === "ADVERTISER" ? styles.badgePending :
                  styles.badgeDraft
                }>
                  {u.role.toLowerCase()}
                </span>
              </td>
              <td>{u.region}</td>
              <td>${Number(u.wallet?.lifetime_earned_usd ?? 0).toFixed(2)}</td>
              <td>{new Date(u.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
