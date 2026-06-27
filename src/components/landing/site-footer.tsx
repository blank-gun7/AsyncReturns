"use client";

import styles from "@/app/(marketing)/page.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      © 2026 Async Returns. Monetize the wait state. <br />
      <div style={{ marginTop: "1rem", display: "flex", justifyContent: "center", gap: "1rem" }}>
        <a href="#">Terms</a>
        <a href="#">Privacy</a>
        <a href="#">Support</a>
      </div>
    </footer>
  );
}
