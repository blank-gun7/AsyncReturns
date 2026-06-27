import { redirect } from "next/navigation";
import { getCurrentUser } from "@/dal/users";

export default async function DashboardDefault() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  if (user.role === "ADMIN") redirect("/admin");
  if (user.role === "ADVERTISER") redirect("/advertiser");
  redirect("/developer");
}
