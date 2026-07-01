/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Cpu, 
  Sparkles, 
  TrendingUp, 
  Coins, 
  HelpCircle, 
  Users, 
  ArrowUpRight, 
  CornerDownRight, 
  ArrowRight,
  Menu,
  X
} from "lucide-react";
import HowItWorks from "./components/HowItWorks";
import ExpectedEarnings from "./components/ExpectedEarnings";
import DeveloperDashboard from "./components/DeveloperDashboard";
import ForAdvertisers from "./components/ForAdvertisers";

export default function App() {
  const [activeTab, setActiveTab] = useState<"how-it-works" | "expected-earnings" | "dashboard" | "advertisers">("how-it-works");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Quick switch tab helper
  const navigateTo = (tab: "how-it-works" | "expected-earnings" | "dashboard" | "advertisers") => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-bg-dark text-gray-100 flex flex-col justify-between selection:bg-brand-yellow selection:text-black">
      
      {/* Sticky Premium Header / Navigation Bar */}
      <header className="sticky top-0 z-50 bg-bg-dark/80 backdrop-blur-md border-b border-border-dark px-4 sm:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo */}
          <div 
            onClick={() => navigateTo("how-it-works")}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <span className="text-xl font-bold font-display text-indigo-400 bg-white/5 px-2.5 py-1 rounded-xl border border-white/10 flex items-center justify-center transition-all group-hover:scale-105 font-mono">
              ₹
            </span>
            <span className="font-display font-black text-xl tracking-tighter bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent italic group-hover:text-cyan-400 transition-all">
              DEVORIX.
            </span>
          </div>

          {/* Center Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 p-1 rounded-xl">
            {[
              { id: "how-it-works", label: "How it works" },
              { id: "expected-earnings", label: "Expected Earnings" },
              { id: "dashboard", label: "Dashboard" },
              { id: "advertisers", label: "For Advertisers ↗" }
            ].map((link) => (
              <button
                key={link.id}
                id={`nav-link-${link.id}`}
                onClick={() => navigateTo(link.id as any)}
                className={`px-4 py-1.5 rounded-lg text-xs font-mono transition-all font-medium cursor-pointer ${
                  activeTab === link.id
                    ? "bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-bold shadow-md shadow-indigo-500/10 border border-white/10"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Action buttons (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <div className="bg-white/5 border border-white/10 rounded-full px-4 py-1.5 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-gray-300">System Live</span>
            </div>
            <button
              id="header-login-btn"
              onClick={() => navigateTo("dashboard")}
              className="px-3 py-2 text-xs font-mono font-semibold text-gray-400 hover:text-white transition-all cursor-pointer"
            >
              Login
            </button>
            <button
              id="header-get-started-btn"
              onClick={() => navigateTo("expected-earnings")}
              className="px-5 py-2 rounded-full bg-white text-black font-bold text-xs hover:bg-gray-200 transition-all shadow-lg shadow-white/5 cursor-pointer"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-card-dark border border-border-dark text-gray-400 hover:text-white transition-all"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-border-dark mt-3 pt-3 pb-2 space-y-2 max-w-7xl mx-auto"
            >
              {[
                { id: "how-it-works", label: "How it works" },
                { id: "expected-earnings", label: "Expected Earnings" },
                { id: "dashboard", label: "Dashboard" },
                { id: "advertisers", label: "For Advertisers ↗" }
              ].map((link) => (
                <button
                  key={link.id}
                  id={`mobile-nav-${link.id}`}
                  onClick={() => navigateTo(link.id as any)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-mono transition-all ${
                    activeTab === link.id
                      ? "bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-bold"
                      : "text-gray-400 hover:bg-card-dark hover:text-white"
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <div className="grid grid-cols-2 gap-2 pt-2 px-4">
                <button
                  id="mobile-login-btn"
                  onClick={() => navigateTo("dashboard")}
                  className="py-2 text-center rounded-lg border border-border-dark text-xs font-mono font-bold text-gray-300"
                >
                  Login
                </button>
                <button
                  id="mobile-get-started-btn"
                  onClick={() => navigateTo("expected-earnings")}
                  className="py-2 text-center rounded-full bg-white text-black text-xs font-bold"
                >
                  Get Started
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Dynamic View Content area */}
      <main className="flex-grow py-8 relative">
        {/* Subtle decorative background circles */}
        <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-brand-yellow/2 rounded-full blur-[120px] pointer-events-none -z-20" />
        <div className="absolute bottom-[20%] right-[5%] w-[500px] h-[500px] bg-violet-600/2 rounded-full blur-[140px] pointer-events-none -z-20" />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {activeTab === "how-it-works" && <HowItWorks />}
            {activeTab === "expected-earnings" && <ExpectedEarnings />}
            {activeTab === "dashboard" && <DeveloperDashboard />}
            {activeTab === "advertisers" && <ForAdvertisers />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer bar */}
      <footer className="bg-card-dark border-t border-border-dark py-8 px-4 sm:px-8 mt-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold font-display text-brand-amber bg-brand-yellow/10 px-1.5 py-0.5 rounded border border-brand-yellow/20">
              ₹
            </span>
            <span className="font-display font-medium text-xs tracking-wider text-gray-400">
              © 2026 DEVORIX PLATFORM
            </span>
          </div>
          
          <div className="flex items-center gap-6 text-[11px] font-mono text-gray-500">
            <button onClick={() => navigateTo("how-it-works")} className="hover:text-white transition-colors">Documentation</button>
            <button onClick={() => navigateTo("advertisers")} className="hover:text-white transition-colors">API Specs</button>
            <button onClick={() => navigateTo("expected-earnings")} className="hover:text-white transition-colors">Pricing</button>
            <span className="text-gray-700">|</span>
            <span className="text-brand-amber">Crafted for Elite Developers</span>
          </div>
        </div>
      </footer>
      
    </div>
  );
}
