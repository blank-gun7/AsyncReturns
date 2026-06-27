import { redirect } from "next/navigation";
import { getCurrentUser } from "@/dal/users";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import styles from "./dashboard.module.css";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <div className={styles.dashboardContainer}>
      <DashboardSidebar
        userName={user.name || user.email}
        userRole={user.role}
        userImage={user.image}
      />
      <main className={styles.dashboardMain}>{children}</main>
    </div>
  );
}
