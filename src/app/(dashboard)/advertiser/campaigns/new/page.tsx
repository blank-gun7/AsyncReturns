"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../../dashboard.module.css";

export default function NewCampaignPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    ad_text: "",
    ad_icon: "▲",
    ad_color: "#ffffff",
    ad_url: "",
    target_region: "INDIA",
    priority: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        router.push("/advertiser/campaigns");
      }
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "0.75rem",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(0,0,0,0.3)",
    color: "#fff",
    fontSize: "0.9rem",
    outline: "none",
    fontFamily: "inherit",
  };

  const labelStyle = {
    display: "block",
    fontSize: "0.8rem",
    textTransform: "uppercase" as const,
    letterSpacing: "1px",
    color: "var(--text-secondary)",
    marginBottom: "0.5rem",
  };

  return (
    <>
      <h1 className={styles.pageTitle}>Create Campaign</h1>

      <form onSubmit={handleSubmit} style={{ maxWidth: "600px" }}>
        <div className={styles.statCard} style={{ display: "grid", gap: "1.5rem", padding: "2rem" }}>
          <div>
            <label style={labelStyle}>Campaign Name</label>
            <input
              style={inputStyle}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Q3 Developer Awareness"
              required
            />
          </div>

          <div>
            <label style={labelStyle}>Ad Text (max 60 chars)</label>
            <input
              style={inputStyle}
              value={form.ad_text}
              onChange={(e) => setForm({ ...form, ad_text: e.target.value.slice(0, 60) })}
              placeholder="e.g. Ship faster with Vercel"
              maxLength={60}
              required
            />
            <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>
              {form.ad_text.length}/60
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={labelStyle}>Icon</label>
              <input
                style={inputStyle}
                value={form.ad_icon}
                onChange={(e) => setForm({ ...form, ad_icon: e.target.value.slice(0, 4) })}
                maxLength={4}
                required
              />
            </div>
            <div>
              <label style={labelStyle}>Color</label>
              <input
                type="color"
                value={form.ad_color}
                onChange={(e) => setForm({ ...form, ad_color: e.target.value })}
                style={{ ...inputStyle, height: "42px", padding: "0.25rem" }}
              />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Click-through URL</label>
            <input
              type="url"
              style={inputStyle}
              value={form.ad_url}
              onChange={(e) => setForm({ ...form, ad_url: e.target.value })}
              placeholder="https://your-product.com"
              required
            />
          </div>

          <div>
            <label style={labelStyle}>Target Region</label>
            <select
              style={inputStyle}
              value={form.target_region}
              onChange={(e) => setForm({ ...form, target_region: e.target.value })}
            >
              <option value="INDIA">India ($5 CPM)</option>
              <option value="GLOBAL">Global ($15 CPM)</option>
              <option value="ALL">All Regions</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Priority (0-100)</label>
            <input
              type="range"
              min="0"
              max="100"
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: parseInt(e.target.value) })}
              style={{ width: "100%" }}
            />
            <div style={{ textAlign: "center", fontSize: "0.9rem", fontWeight: 600 }}>
              {form.priority}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "0.875rem",
              borderRadius: "12px",
              border: "1px solid rgba(57, 255, 20, 0.3)",
              background: "rgba(57, 255, 20, 0.1)",
              color: "var(--neon-green)",
              fontSize: "1rem",
              fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? "Creating..." : "Create Campaign"}
          </button>
        </div>
      </form>
    </>
  );
}
