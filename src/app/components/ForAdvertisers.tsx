"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Building2,
  Sparkles,
  Cpu,
  Terminal,
  Eye,
  Megaphone,
  BadgeCheck,
  RefreshCw,
  Laptop,
  Smile,
  Compass,
  FileCode2
} from "lucide-react";
import { AdVariation } from "../types";

export default function ForAdvertisers() {
  const [brand, setBrand] = useState<string>("Supabase");
  const [productDescription, setProductDescription] = useState<string>("Instant PostgreSQL database with real-time subscriptions, secure auth, and storage endpoints.");
  const [primaryColor, setPrimaryColor] = useState<string>("emerald");

  const [variations, setVariations] = useState<AdVariation[]>([
    {
      type: "terminal",
      badgeText: "Sponsored",
      copy: "Supabase: While your PostgreSQL migrations run, grab a coffee. We handle the rest.",
      badgeColor: "emerald",
      humorLevel: "High",
      rationale: "Relatable developer pain point (slow migrations) with immediate solution placement."
    },
    {
      type: "ide",
      badgeText: "DevTools",
      copy: "Supabase - The open source Firebase alternative. Build in a weekend, scale to millions.",
      badgeColor: "emerald",
      humorLevel: "Low",
      rationale: "Clean value-proposition statement comparing immediately to a known B2C platform."
    },
    {
      type: "terminal-badge",
      badgeText: "Featured",
      copy: "⚡ Fast-track auth. Supabase manages users, OAuth, and row-level security out of the box.",
      badgeColor: "emerald",
      humorLevel: "Medium",
      rationale: "Focuses on complex features (Auth, RLS) that developers hate building from scratch."
    }
  ]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedVariationIdx, setSelectedVariationIdx] = useState<number>(0);
  const [previewFrame, setPreviewFrame] = useState<"Terminal" | "VSCode">("Terminal");

  const generateAICampaign = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/gemini/generate-ad", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brand, productDescription, primaryColor })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to generate ad variations.");

      if (data.variations && data.variations.length > 0) {
        setVariations(data.variations);
        setSelectedVariationIdx(0);
      } else {
        throw new Error("No variations returned. Please try again.");
      }
    } catch (err: any) {
      setError(err.message || "Failed to contact AI copywriter.");
    } finally {
      setIsLoading(false);
    }
  };

  const currentAd = variations[selectedVariationIdx] || variations[0];

  return (
    <div id="advertisers-section" className="space-y-16 max-w-7xl mx-auto px-4 py-8">
      {/* Header section */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/10 bg-white/5 text-indigo-400 text-xs font-mono">
          <Megaphone className="w-3.5 h-3.5" /> B2B ADVERTISER PLATFORM
        </div>
        <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight leading-tight">
          For <span className="font-bold italic text-white underline decoration-indigo-500 underline-offset-8">Advertisers</span>
        </h2>
        <p className="text-gray-400 text-sm md:text-base font-sans font-light">
          Build, preview, and deploy context-aware B2B sponsorships directly inside developer loading wait-states.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

        {/* Left Card: Input Campaign Builder */}
        <div className="bg-gradient-to-br from-[#16191F] to-[#111317] border border-white/10 p-8 rounded-[32px] space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl -z-10" />

          <div className="flex items-center gap-2 border-b border-white/5 pb-4">
            <Building2 className="w-5 h-5 text-indigo-400" />
            <h3 className="text-sm font-mono font-semibold text-gray-400 uppercase tracking-widest">Campaign Details</h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-mono text-gray-400">Advertiser Brand / Product Name</label>
              <input
                id="adv-brand-input"
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="e.g., Resend"
                className="w-full bg-[#0F1115] border border-white/10 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-indigo-500 text-gray-300 font-medium font-sans"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-gray-400">Core Feature / Value Proposition (to optimize copy for)</label>
              <textarea
                id="adv-desc-textarea"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                placeholder="e.g., Transactional email platform designed specifically for software developers."
                className="w-full bg-[#0F1115] border border-white/10 rounded-xl p-4 text-xs focus:outline-none focus:border-indigo-500 min-h-[80px] text-gray-300 leading-relaxed font-sans"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-gray-400 block">Brand Color Palette</label>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: "emerald", label: "🟢 Emerald", color: "border-green-500/30" },
                  { name: "blue", label: "🔵 Blue", color: "border-blue-500/30" },
                  { name: "amber", label: "🟡 Amber", color: "border-amber-500/30" },
                  { name: "sky", label: "🌐 Sky", color: "border-sky-500/30" },
                  { name: "violet", label: "🟣 Violet", color: "border-violet-500/30" }
                ].map((col) => (
                  <button
                    key={col.name}
                    id={`adv-color-${col.name}`}
                    onClick={() => setPrimaryColor(col.name)}
                    className={`px-3 py-1.5 rounded-lg font-mono text-xs border transition-all ${
                      primaryColor === col.name
                        ? "bg-indigo-500/15 text-indigo-400 border-indigo-500/30 font-bold"
                        : "bg-[#0F1115] border-white/10 text-gray-400"
                    }`}
                  >
                    {col.label}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-950/20 border border-red-500/20 rounded-xl text-xs text-red-400">
                {error}
              </div>
            )}

            <button
              id="generate-campaign-btn"
              onClick={generateAICampaign}
              disabled={isLoading}
              className="w-full py-3.5 rounded-full bg-white text-black font-bold text-xs hover:bg-gray-200 disabled:opacity-50 transition-all flex items-center justify-center gap-2 font-display cursor-pointer shadow-lg"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-black" />
                  Gemini Copywriter crafting contextual angles...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-black animate-pulse" />
                  Generate Developer-Centric Footers (Gemini AI)
                </>
              )}
            </button>
          </div>

          {variations.length > 0 && (
            <div className="space-y-3 pt-6 border-t border-white/5">
              <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">
                Select Generated Sponsorship Line:
              </label>
              <div className="space-y-2">
                {variations.map((v, idx) => (
                  <button
                    key={idx}
                    id={`variation-select-${idx}`}
                    onClick={() => setSelectedVariationIdx(idx)}
                    className={`w-full p-4 rounded-2xl text-left border transition-all text-xs flex flex-col gap-1.5 ${
                      selectedVariationIdx === idx
                        ? "bg-indigo-500/5 border-indigo-500/40 shadow-lg"
                        : "bg-[#0F1115]/50 border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="flex justify-between items-center w-full">
                      <span className="font-mono text-[9px] uppercase tracking-wider bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded border border-indigo-500/10 font-bold">
                        {v.badgeText} ({v.type})
                      </span>
                      <span className="font-mono text-[9px] text-gray-500">Humor: {v.humorLevel}</span>
                    </div>
                    <p className="text-gray-300 font-medium font-sans leading-normal">{v.copy}</p>
                    <p className="text-[10px] text-gray-500 font-sans italic mt-1 font-light">
                      <span className="font-bold font-mono uppercase not-italic text-[9px] text-gray-600">Rationale:</span> {v.rationale}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Card: Interactive Real-Time Sponsorship Previewer */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-[#16191F] to-[#111317] border border-white/10 p-8 rounded-[32px] space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center gap-2">
                <Eye className="w-4.5 h-4.5 text-indigo-400" />
                <h3 className="text-sm font-mono font-semibold text-gray-400 uppercase tracking-widest">Live Developer Preview</h3>
              </div>

              <div className="flex gap-1 bg-[#0F1115] border border-white/10 p-1 rounded-xl">
                {(["Terminal", "VSCode"] as const).map((mode) => (
                  <button
                    key={mode}
                    id={`preview-toggle-${mode}`}
                    onClick={() => setPreviewFrame(mode)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-mono transition-all cursor-pointer ${
                      previewFrame === mode
                        ? "bg-indigo-500/15 text-indigo-400 border border-indigo-500/20 font-bold"
                        : "text-gray-500 hover:text-gray-300"
                    }`}
                  >
                    {mode === "Terminal" ? "shell" : "VS Code"}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0b0c0f] min-h-[220px] shadow-inner">

              <div className="bg-[#16191F] border-b border-white/5 px-4 py-2.5 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                <span className="ml-3 font-mono text-[10px] text-gray-500">
                  {previewFrame === "Terminal" ? "zsh - devorix_waitstate" : "src/index.tsx - VS Code"}
                </span>
              </div>

              <div className="p-4 font-mono text-xs leading-relaxed">
                {previewFrame === "Terminal" ? (
                  <div className="space-y-3">
                    <p className="text-gray-400">$ npm run deploy</p>
                    <p className="text-gray-500">→ building bundles for client-side distribution...</p>
                    <div className="flex items-center gap-2 text-gray-500">
                      <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-ping shrink-0" />
                      <span>transpiling bundle components (4.2 seconds remaining)...</span>
                    </div>

                    <div className="h-4" />
                    <div className="p-3 border border-indigo-500/20 rounded-xl bg-indigo-950/10 text-indigo-400 flex items-start gap-2 max-w-lg">
                      <span className="bg-indigo-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded uppercase shrink-0 font-sans mt-0.5">
                        {currentAd?.badgeText || "Sponsored"}
                      </span>
                      <p className="text-[11px] text-gray-300 font-sans leading-tight font-light">
                        {currentAd?.copy}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                      <FileCode2 className="w-3.5 h-3.5 text-blue-400" />
                      <span className="text-[10px] text-gray-400">authController.ts</span>
                    </div>

                    <div className="text-gray-500 text-[11px] space-y-1">
                      <p>export const checkAuthStatus = async (token: string) =&gt; &#123;</p>
                      <p className="pl-4">const verifiedToken = await jwt.verify(token, SECRET);</p>
                      <p className="pl-4">if (!verifiedToken) throw new AuthError();</p>
                      <p className="pl-4">return verifiedToken.user;</p>
                      <p>&#125;</p>
                    </div>

                    <div className="bg-[#0e1116] border border-white/5 p-2 rounded-xl flex items-center justify-between text-[11px] max-w-lg mt-4 text-gray-400">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                        <span className="font-sans font-bold text-violet-300">CURSOR AI WAIT-STATE:</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[8px] font-bold bg-indigo-500 text-white px-1.5 py-0.5 rounded uppercase font-sans">
                          {currentAd?.badgeText || "Sponsor"}
                        </span>
                        <span className="text-gray-300 font-sans truncate max-w-[200px] md:max-w-[280px] font-light">
                          {currentAd?.copy}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed text-center font-sans font-light mt-2">
              Developers see this line <span className="font-bold text-white">only</span> during passive loading states (API calls, server hot-reloads, tests, compilations), keeping active focus fully clean and uninterrupted.
            </p>
          </div>

          {/* Advertiser USP info */}
          <div className="p-8 bg-gradient-to-br from-[#16191F] to-[#111317] border border-white/10 rounded-[32px] space-y-4 shadow-2xl">
            <h4 className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <BadgeCheck className="w-4 h-4" /> Why Dev-Tool Brands Sponsor Devorix
            </h4>
            <ul className="space-y-3.5 text-xs text-gray-400 font-sans font-light">
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 font-bold mt-0.5">•</span>
                <span><strong>100% Active Attention</strong>: Reach engineers during their high-cognition waiting moments while the brain is actively focused on compilation or prompt execution logs.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 font-bold mt-0.5">•</span>
                <span><strong>Zero Ad-Blocker Noise</strong>: Our footers render natively inside the CLI terminal buffers and IDE status bars via secure JSON streams—rendering standard web adblockers entirely useless.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 font-bold mt-0.5">•</span>
                <span><strong>Ultra-Segmented Alignment</strong>: Align sponsorships by programming language, development tool, framework imports, or compiler target for maximum relevance and performance.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
