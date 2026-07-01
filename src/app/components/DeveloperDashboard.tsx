"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Markdown from "react-markdown";
import {
  DollarSign,
  ArrowUpRight,
  TrendingUp,
  CheckCircle2,
  HelpCircle,
  UploadCloud,
  Activity,
  Coins,
  Copy,
  Check,
  Zap,
  Lock,
  Settings,
  Image as ImageIcon
} from "lucide-react";
import { Impression, DashboardStats } from "../types";

export default function DeveloperDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalEarned: 845.50,
    earnedToday: 12.40,
    referralEarned: 45.10,
    goalAmount: 1000.00,
    referralCode: "devorix.ai/r/dev1337"
  });

  const [copied, setCopied] = useState<boolean>(false);
  const [hoveredDay, setHoveredDay] = useState<{ day: string; val: number; x: number; y: number } | null>(null);

  const [impressions, setImpressions] = useState<Impression[]>([
    { id: "1", time: "09:14 AM", description: "Vercel ad shown during npm run build", amount: 0.42 },
    { id: "2", time: "09:01 AM", description: "Supabase ad shown during Cursor generation", amount: 0.38 },
    { id: "3", time: "08:45 AM", description: "Postman ad shown during Claude query", amount: 0.45 },
    { id: "4", time: "08:30 AM", description: "Stripe ad shown during last test run", amount: 0.39 },
    { id: "5", time: "07:55 AM", description: "Clerk Auth ad shown during local Docker start", amount: 0.44 }
  ]);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [scannerLoading, setScannerLoading] = useState<boolean>(false);
  const [scannerResult, setScannerResult] = useState<string | null>(null);
  const [scannerError, setScannerError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-ticking simulator for Live Impressions
  useEffect(() => {
    const brands = [
      { name: "Vercel", text: "shown during webpack compilation", pay: 0.42 },
      { name: "Supabase", text: "shown during database migration wait", pay: 0.38 },
      { name: "Postman", text: "shown during sandbox request loop", pay: 0.45 },
      { name: "Neon Postgres", text: "shown during connection handshake", pay: 0.40 },
      { name: "Clerk Auth", text: "shown during OAuth redirect wait", pay: 0.44 },
      { name: "Sentry", text: "shown during production build sourcemaps", pay: 0.41 }
    ];

    const interval = setInterval(() => {
      const brand = brands[Math.floor(Math.random() * brands.length)];
      const amountEarned = parseFloat((brand.pay + (Math.random() * 0.1 - 0.05)).toFixed(2));

      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      const newImpression: Impression = {
        id: Math.random().toString(),
        time: timeStr,
        description: `${brand.name} ad ${brand.text}`,
        amount: amountEarned
      };

      setImpressions(prev => [newImpression, ...prev.slice(0, 5)]);

      setStats(prev => {
        const nextTotal = parseFloat((prev.totalEarned + amountEarned).toFixed(2));
        const nextToday = parseFloat((prev.earnedToday + amountEarned).toFixed(2));
        return { ...prev, totalEarned: nextTotal, earnedToday: nextToday };
      });
    }, 18000);

    return () => clearInterval(interval);
  }, []);

  const copyReferral = () => {
    navigator.clipboard.writeText(stats.referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setScannerError("Please select a valid image file.");
      return;
    }
    setSelectedFile(file);
    setScannerError(null);
    setScannerResult(null);

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const analyzeWorkspaceImage = async () => {
    if (!imagePreview) return;
    setScannerLoading(true);
    setScannerError(null);
    setScannerResult(null);

    try {
      const response = await fetch("/api/gemini/analyze-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: imagePreview,
          promptText: "Inspect this IDE/Terminal setup. Identify 1) Active shell/IDE. 2) Theme colors. 3) Perfect custom hex values, dimensions and padding configurations so that Devorix footers blend into their layout seamlessly. Give an overall aesthetic score."
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to scan workspace image.");
      setScannerResult(data.text);
    } catch (err: any) {
      setScannerError(err.message || "Failed to process screenshot.");
    } finally {
      setScannerLoading(false);
    }
  };

  const chartData = [
    { day: "Mon", val: 5.40 },
    { day: "Tue", val: 7.20 },
    { day: "Wed", val: 6.80 },
    { day: "Thu", val: 9.10 },
    { day: "Fri", val: 12.40 },
    { day: "Sat", val: 3.10 },
    { day: "Sun", val: 4.80 }
  ];

  return (
    <div id="dashboard-section" className="space-y-12 max-w-7xl mx-auto px-4 py-8">
      {/* Dashboard Title */}
      <div className="space-y-3 border-b border-white/10 pb-6">
        <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-widest block">YOUR WALLET</span>
        <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight leading-tight">
          Developer <span className="font-bold italic text-white underline decoration-indigo-500 underline-offset-8">Dashboard</span>
        </h2>
        <p className="text-gray-400 text-sm font-sans font-light">Real-time passive earnings accumulated from your AI wait states.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left 2 Columns: Financial Metrics & Charts */}
        <div className="lg:col-span-2 space-y-8">

          {/* Metrics block */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* Total value card */}
            <div className="bg-gradient-to-br from-[#16191F] to-[#111317] border border-white/10 p-8 rounded-[32px] relative overflow-hidden group shadow-2xl">
              <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-all" />
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block mb-2">TOTAL VALUE EARNED</span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl md:text-5xl font-mono font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  ₹{stats.totalEarned.toFixed(2)}
                </span>
                <span className="text-xs text-cyan-400 font-mono flex items-center gap-0.5">
                  <ArrowUpRight className="w-3.5 h-3.5" /> +₹{stats.earnedToday.toFixed(2)} today
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-4 leading-relaxed font-sans font-light">
                UPI withdrawals unlock automatically once reaching the threshold limit of ₹1,000.
              </p>
            </div>

            {/* Next cashout goal tracker */}
            <div className="bg-gradient-to-br from-[#16191F] to-[#111317] border border-white/10 p-8 rounded-[32px] relative overflow-hidden shadow-2xl">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">NEXT UPI CASHOUT</span>
                <span className="text-xs text-indigo-400 font-mono font-bold">₹{stats.goalAmount.toFixed(0)} Goal</span>
              </div>

              <div className="mt-4 space-y-3">
                <div className="w-full bg-[#0F1115] border border-white/5 h-3 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-cyan-500 h-full rounded-full transition-all duration-1000"
                    style={{ width: `${Math.min(100, (stats.totalEarned / stats.goalAmount) * 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-gray-400">₹{(stats.goalAmount - stats.totalEarned).toFixed(2)} remaining</span>
                  <span className="text-indigo-400 font-bold">
                    {((stats.totalEarned / stats.goalAmount) * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-4 leading-relaxed font-sans font-light">
                Estimated cashout release date: <span className="text-white font-medium">July 12, 2026</span>
              </p>
            </div>
          </div>

          {/* This Week's Earnings SVG Bar Chart */}
          <div className="bg-gradient-to-br from-[#16191F] to-[#111317] border border-white/10 p-8 rounded-[32px] relative shadow-2xl">
            <h3 className="text-xs font-mono font-semibold text-gray-400 uppercase tracking-widest mb-6">
              This Week&apos;s Earnings History
            </h3>

            <div className="relative pt-6 pb-2">
              <div className="flex justify-between items-end h-[160px] gap-2.5 border-b border-white/5">
                {chartData.map((d, index) => {
                  const maxVal = Math.max(...chartData.map(o => o.val));
                  const percentHeight = (d.val / maxVal) * 100;
                  const isCurrentDay = d.day === "Fri";

                  return (
                    <div
                      key={d.day}
                      className="flex-1 flex flex-col items-center group relative cursor-pointer"
                      onMouseEnter={(e) => {
                        const bounds = e.currentTarget.getBoundingClientRect();
                        setHoveredDay({
                          day: d.day,
                          val: d.val,
                          x: bounds.left + bounds.width / 2,
                          y: bounds.top - 12
                        });
                      }}
                      onMouseLeave={() => setHoveredDay(null)}
                    >
                      <motion.div
                        className={`w-full rounded-t-lg transition-all ${
                          isCurrentDay
                            ? "bg-gradient-to-t from-indigo-500 to-cyan-500 shadow-[0_0_15px_rgba(99,102,241,0.25)]"
                            : "bg-[#1C1F26] hover:bg-gray-700"
                        }`}
                        style={{ height: `${percentHeight}%` }}
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ delay: index * 0.05 }}
                      />
                      <span className="text-[10px] font-mono text-gray-500 mt-2 block group-hover:text-white transition-colors">
                        {d.day}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Float Hover Tooltip */}
              {hoveredDay && (
                <div
                  className="absolute bg-[#0F1115] border border-indigo-500/30 text-white font-mono text-xs px-2.5 py-1 rounded shadow-lg pointer-events-none -translate-x-1/2"
                  style={{
                    left: `${(chartData.findIndex(o => o.day === hoveredDay.day) / (chartData.length - 1)) * 90 + 5}%`,
                    bottom: "200px"
                  }}
                >
                  <span className="text-gray-400">{hoveredDay.day}:</span> <span className="text-indigo-400 font-bold">₹{hoveredDay.val.toFixed(2)}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right 1 Column: Quick Actions & Live Impressions Feed */}
        <div className="space-y-8">

          {/* Quick Actions */}
          <div className="bg-gradient-to-br from-[#16191F] to-[#111317] border border-white/10 p-8 rounded-[32px] space-y-4 shadow-2xl">
            <h3 className="text-xs font-mono font-semibold text-gray-400 uppercase tracking-widest block">QUICK ACTIONS</h3>

            <div className="space-y-2.5">
              <button
                id="withdraw-action-btn"
                disabled={stats.totalEarned < stats.goalAmount}
                className="w-full py-3.5 rounded-full bg-white/5 disabled:bg-white/2 disabled:text-gray-600 border border-white/5 font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-not-allowed text-gray-400"
              >
                <Lock className="w-4 h-4 text-gray-600" />
                Withdraw ₹{stats.totalEarned.toFixed(2)}
                <span className="text-[10px] text-gray-500 block font-normal">(Needs ₹{(stats.goalAmount - stats.totalEarned).toFixed(2)} more)</span>
              </button>

              <button
                id="referral-copy-btn"
                onClick={copyReferral}
                className="w-full py-3.5 rounded-full bg-white text-black font-bold text-xs hover:bg-gray-200 transition-all flex items-center justify-center gap-2 cursor-pointer font-sans"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-green-500" /> Copied Referral Code!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" /> Invite Team (Get 5% Commission)
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Today's Impressions Live Ticker */}
          <div className="bg-gradient-to-br from-[#16191F] to-[#111317] border border-white/10 p-8 rounded-[32px] space-y-4 shadow-2xl">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-mono font-semibold text-gray-400 uppercase tracking-widest block">TODAY&apos;S IMPRESSIONS</h3>
              <span className="flex items-center gap-1.5 text-[9px] uppercase font-mono font-bold text-green-400 bg-green-950/40 px-2.5 py-1 rounded border border-green-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
                LIVE FEED
              </span>
            </div>

            <div className="space-y-3 min-h-[220px]">
              <AnimatePresence initial={false}>
                {impressions.map((imp) => (
                  <motion.div
                    key={imp.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="p-3.5 bg-[#0F1115]/50 border border-white/5 rounded-xl flex items-start justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1">
                      <p className="text-gray-400 font-mono text-[10px]">{imp.time}</p>
                      <p className="text-white font-medium leading-normal font-sans font-light">{imp.description}</p>
                    </div>
                    <span className="font-mono text-indigo-400 font-semibold text-right shrink-0">
                      +₹{imp.amount.toFixed(2)}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Workspace Aesthetics Scanner */}
      <div className="bg-gradient-to-br from-[#1A1D23] to-[#12141A] p-8 md:p-10 rounded-[32px] border border-white/10 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <ImageIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-display font-semibold text-white flex items-center gap-2">
              Workspace Aesthetics Scanner <span className="text-[10px] border border-white/10 bg-white/5 text-indigo-400 px-2 py-0.5 rounded font-mono font-bold uppercase tracking-wider">AI Scanner</span>
            </h3>
            <p className="text-xs text-gray-400 mt-1 font-sans font-light">
              Upload a screenshot of your VS Code, Cursor, or Terminal setup. Gemini will auto-scan your active theme layout and generate optimal padding configurations to blend sponsors seamlessly.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          <div className="space-y-4">
            <div
              id="drag-drop-area"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`p-10 border-2 border-dashed rounded-[24px] cursor-pointer text-center space-y-4 transition-all ${
                isDragging
                  ? "border-indigo-500 bg-indigo-500/5"
                  : "border-white/10 bg-[#0F1115]/50 hover:border-white/20"
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              <UploadCloud className="w-10 h-10 text-gray-500 mx-auto" />
              <div className="space-y-1">
                <p className="text-sm text-gray-300 font-semibold">
                  Drag and drop your screenshot here, or <span className="text-indigo-400 hover:underline">browse files</span>
                </p>
                <p className="text-xs text-gray-500 font-sans font-light">Supports PNG, JPG up to 10MB</p>
              </div>
            </div>

            {imagePreview && (
              <div className="flex items-center justify-between p-3.5 bg-[#0F1115] rounded-xl border border-white/5">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imagePreview} className="w-12 h-12 rounded object-cover border border-white/5" alt="Preview" />
                  <div>
                    <p className="text-xs text-gray-300 font-medium font-mono">{selectedFile?.name}</p>
                    <p className="text-[10px] text-gray-500 font-mono">{(selectedFile!.size / (1024 * 1024)).toFixed(2)} MB</p>
                  </div>
                </div>
                <button
                  id="scanner-scan-btn"
                  onClick={analyzeWorkspaceImage}
                  disabled={scannerLoading}
                  className="px-5 py-2.5 bg-white text-black rounded-full text-xs font-bold hover:bg-gray-200 disabled:opacity-50 transition-all font-display cursor-pointer"
                >
                  {scannerLoading ? "Analyzing..." : "Analyze Setup"}
                </button>
              </div>
            )}

            {scannerError && (
              <div className="p-3 bg-red-950/20 border border-red-500/20 rounded-xl text-xs text-red-400">
                {scannerError}
              </div>
            )}
          </div>

          {/* Scanner Output pane */}
          <div className="bg-[#0F1115]/50 border border-white/10 rounded-[24px] p-6 min-h-[160px] flex flex-col justify-between">
            {scannerLoading ? (
              <div className="space-y-4 my-auto text-center">
                <Activity className="w-8 h-8 text-indigo-400 animate-pulse mx-auto" />
                <p className="text-xs text-gray-400 animate-pulse font-mono">
                  Gemini 3.1 Pro scanning color palette, workspace dimensions, and pixel alignment...
                </p>
              </div>
            ) : scannerResult ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-3"
              >
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-[10px] font-mono text-indigo-400 font-bold">GEMINI SCAN REPORT</span>
                  <span className="text-[9px] uppercase font-mono font-bold text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/10">Scanned Successfully</span>
                </div>
                <div className="text-xs text-gray-300 leading-relaxed font-sans max-h-[300px] overflow-y-auto">
                  <Markdown>{scannerResult}</Markdown>
                </div>
              </motion.div>
            ) : (
              <div className="text-center my-auto space-y-2 py-8">
                <ImageIcon className="w-8 h-8 text-gray-700 mx-auto" />
                <p className="text-xs text-gray-500 font-sans font-light">
                  Scanner idle. Upload a workspace screenshot and hit Analyze to trigger Gemini image intelligence.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
