"use client";

import styles from "@/app/(marketing)/page.module.css";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

interface ReferralBoxProps {
  referralLink: string;
}

export function ReferralBox({ referralLink }: ReferralBoxProps) {
  const { copied, copy } = useCopyToClipboard();

  return (
    <div className={styles.referralBox}>
      <div className={styles.referralText}>
        Invite your team. Earn <span>5%</span> of their payouts forever.
      </div>
      <div className={styles.copyInput}>
        <input type="text" value={referralLink} readOnly />
        <button className={styles.copyBtn} onClick={() => copy(referralLink)}>
          {copied ? "COPIED!" : "COPY"}
        </button>
      </div>
    </div>
  );
}
