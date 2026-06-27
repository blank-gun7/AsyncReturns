"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import styles from "./sidebar.module.css";

interface SidebarProps {
  userName: string;
  userRole: string;
  userImage: string | null;
}

const NAV_ITEMS: Record<string, { label: string; href: string }[]> = {
  DEVELOPER: [
    { label: "Dashboard", href: "/developer" },
    { label: "Earnings", href: "/developer/earnings" },
    { label: "Payouts", href: "/developer/payouts" },
    { label: "Referrals", href: "/developer/referrals" },
    { label: "Settings", href: "/developer/settings" },
  ],
  ADVERTISER: [
    { label: "Dashboard", href: "/advertiser" },
    { label: "Campaigns", href: "/advertiser/campaigns" },
    { label: "Billing", href: "/advertiser/billing" },
    { label: "Settings", href: "/advertiser/settings" },
  ],
  ADMIN: [
    { label: "Overview", href: "/admin" },
    { label: "Users", href: "/admin/users" },
    { label: "Campaigns", href: "/admin/campaigns" },
    { label: "Payouts", href: "/admin/payouts" },
  ],
};

export function DashboardSidebar({ userName, userRole, userImage }: SidebarProps) {
  const pathname = usePathname();
  const items = NAV_ITEMS[userRole] || NAV_ITEMS.DEVELOPER;

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <Link href="/">
          <span className={styles.logoIcon}>₹</span> Async Returns
        </Link>
      </div>

      <nav className={styles.nav}>
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.navItem} ${pathname === item.href ? styles.active : ""}`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className={styles.userSection}>
        <div className={styles.userInfo}>
          {userImage ? (
            <img src={userImage} alt="" className={styles.userAvatar} />
          ) : (
            <div className={styles.userAvatarFallback}>
              {userName.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <div className={styles.userName}>{userName}</div>
            <div className={styles.userRole}>{userRole.toLowerCase()}</div>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className={styles.logoutBtn}
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}
