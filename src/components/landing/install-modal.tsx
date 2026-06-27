"use client";

import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import styles from "@/app/(marketing)/page.module.css";

interface InstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InstallModal({ isOpen, onClose }: InstallModalProps) {
  const { copied, copy } = useCopyToClipboard();

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeModalBtn} onClick={onClose} aria-label="Close modal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <h2 className={styles.modalTitle}>Connect to Async Returns</h2>
        <p className={styles.modalSubtitle}>
          Run this single command in your terminal. We&apos;ll authenticate your CLI and instantly link it to your wallet. No complex setup required.
        </p>

        <div className={styles.heroCodeBlock} style={{ margin: '0', maxWidth: '100%' }}>
          <div className={styles.heroCodeHeader}>
            <span>Terminal</span>
          </div>
          <div className={styles.heroCodeBody}>
            <span className={styles.heroCodePrompt}>$</span>
            <span className={styles.heroCodeCommand}>npx asyncreturns login</span>
            <button className={styles.heroCodeCopy} onClick={() => copy('npx asyncreturns login')} aria-label="Copy code">
              {copied ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--neon-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
