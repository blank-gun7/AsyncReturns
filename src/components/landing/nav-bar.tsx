"use client";

import styles from "@/app/(marketing)/page.module.css";

interface NavBarProps {
  onGetStarted?: () => void;
}

export function NavBar({ onGetStarted }: NavBarProps) {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <span>₹</span> Async Returns
      </div>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <button className={styles.loginBtn}>Login</button>
        <button
          className={styles.primaryBtn}
          style={{ padding: "0.5rem 1.5rem", fontSize: "0.9rem" }}
          onClick={onGetStarted}
        >
          Get Started
        </button>
      </div>
    </nav>
  );
}
