"use client";

import { useState } from "react";

export function PayoutRequestButton({
  eligible,
  reason,
}: {
  eligible: boolean;
  reason?: string;
}) {
  const [loading, setLoading] = useState(false);

  const handleRequest = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/payouts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ method: "UPI" }),
      });
      if (res.ok) {
        window.location.reload();
      }
    } finally {
      setLoading(false);
    }
  };

  const getReasonText = () => {
    if (reason === "below_threshold") return "Balance below cashout threshold";
    if (reason === "pending_payout_exists") return "You have a pending payout";
    if (reason === "no_wallet") return "Wallet not set up";
    return "";
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      <button
        onClick={handleRequest}
        disabled={!eligible || loading}
        style={{
          padding: "0.625rem 1.5rem",
          borderRadius: "8px",
          border: eligible
            ? "1px solid rgba(57, 255, 20, 0.3)"
            : "1px solid rgba(255, 255, 255, 0.05)",
          background: eligible ? "rgba(57, 255, 20, 0.1)" : "rgba(255, 255, 255, 0.03)",
          color: eligible ? "var(--neon-green)" : "var(--text-secondary)",
          fontSize: "0.9rem",
          fontWeight: 600,
          cursor: eligible ? "pointer" : "not-allowed",
          opacity: loading ? 0.6 : 1,
        }}
      >
        {loading ? "Processing..." : "Request Payout"}
      </button>
      {!eligible && reason && (
        <p style={{ marginTop: "0.5rem", fontSize: "0.8rem", color: "var(--text-secondary)" }}>
          {getReasonText()}
        </p>
      )}
    </div>
  );
}
