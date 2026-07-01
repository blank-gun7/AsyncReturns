import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Terminal as TerminalIcon, 
  ArrowRight, 
  Lock, 
  Code2, 
  Wallet, 
  Check, 
  Play, 
  RefreshCw, 
  Cpu, 
  Laptop, 
  FileCode,
  Sparkles
} from "lucide-react";

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [terminalTab, setTerminalTab] = useState<"Native" | "VSCode" | "Cursor">("Native");
  const [earnings, setEarnings] = useState<number>(8.806);
  const [isRunningDemo, setIsRunningDemo] = useState<boolean>(true);
  const [demoState, setDemoState] = useState<string>("idle");
  const [logLines, setLogLines] = useState<string[]>([]);
  
  // Interactive Terminal Log effect
  useEffect(() => {
    if (!isRunningDemo) return;

    let timer: any;
    if (demoState === "idle") {
      setLogLines(["$ npx devorix login"]);
      timer = setTimeout(() => setDemoState("authenticating"), 1200);
    } else if (demoState === "authenticating") {
      setLogLines(prev => [...prev, "→ Authenticating with GitHub..."]);
      timer = setTimeout(() => setDemoState("linked"), 1500);
    } else if (demoState === "linked") {
      setLogLines(prev => [
        ...prev, 
        "→ Terminal linked successfully. ✓", 
        "→ Wallet established: devorix.ai/dashboard/ranacv"
      ]);
      timer = setTimeout(() => setDemoState("ready"), 1500);
    } else if (demoState === "ready") {
      timer = setTimeout(() => {
        setDemoState("idle");
        setLogLines([]);
      }, 5000);
    }

    return () => clearTimeout(timer);
  }, [demoState, isRunningDemo]);

  // Income accumulation ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setEarnings(prev => {
        const next = prev + 0.003;
        return parseFloat(next.toFixed(3));
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="how-it-works-section" className="space-y-16 max-w-7xl mx-auto px-4 py-8">
      {/* Hero Header */}
      <div className="text-center space-y-5 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-indigo-400 text-xs font-mono tracking-[0.2em] uppercase">
          <Cpu className="w-3.5 h-3.5 text-indigo-400" /> THE PRODUCT
        </div>
        <h1 className="text-4xl md:text-6xl font-light tracking-tight text-white leading-tight">
          How <span className="font-bold italic text-white underline decoration-indigo-500 underline-offset-8">Devorix</span> works
        </h1>
        <p className="text-gray-400 text-lg md:text-xl font-sans max-w-xl mx-auto font-light leading-relaxed">
          One command. Zero friction. Passive income from day one.
        </p>
      </div>

      {/* 3 Step Visual Pipeline */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {/* Step 1 */}
        <motion.div 
          onClick={() => setActiveStep(1)}
          className={`cursor-pointer group relative p-8 rounded-[32px] border transition-all duration-300 overflow-hidden ${
            activeStep === 1 
              ? "bg-gradient-to-br from-[#1C1F26] to-[#12141A] border-indigo-500/50 shadow-[0_0_25px_rgba(99,102,241,0.15)]" 
              : "bg-gradient-to-br from-[#16191F] to-[#111317] border-white/5 hover:border-white/15"
          }`}
          whileHover={{ y: -4 }}
        >
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-indigo-500/10 blur-2xl rounded-full"></div>
          <div className="flex items-center justify-between mb-6 relative z-10">
            <span className={`flex items-center justify-center w-10 h-10 rounded-full font-mono font-bold text-sm border ${
              activeStep === 1 
                ? "bg-indigo-500 text-white border-indigo-500" 
                : "bg-bg-dark text-gray-500 border-white/10"
            }`}>
              1
            </span>
            <Lock className={`w-5 h-5 ${activeStep === 1 ? "text-indigo-400" : "text-gray-600"}`} />
          </div>
          <h3 className="text-xl font-display font-semibold text-white group-hover:text-indigo-400 transition-colors relative z-10">
            Authenticate
          </h3>
          <p className="text-gray-400 text-sm mt-3 leading-relaxed relative z-10">
            Run the login command. We securely link your terminal CLI and IDE code assistants directly to your digital developer wallet.
          </p>
        </motion.div>

        {/* Step 2 */}
        <motion.div 
          onClick={() => setActiveStep(2)}
          className={`cursor-pointer group relative p-8 rounded-[32px] border transition-all duration-300 overflow-hidden ${
            activeStep === 2 
              ? "bg-gradient-to-br from-[#1C1F26] to-[#12141A] border-indigo-500/50 shadow-[0_0_25px_rgba(99,102,241,0.15)]" 
              : "bg-gradient-to-br from-[#16191F] to-[#111317] border-white/5 hover:border-white/15"
          }`}
          whileHover={{ y: -4 }}
        >
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-cyan-500/10 blur-2xl rounded-full"></div>
          <div className="flex items-center justify-between mb-6 relative z-10">
            <span className={`flex items-center justify-center w-10 h-10 rounded-full font-mono font-bold text-sm border ${
              activeStep === 2 
                ? "bg-indigo-500 text-white border-indigo-500" 
                : "bg-bg-dark text-gray-500 border-white/10"
            }`}>
              2
            </span>
            <Code2 className={`w-5 h-5 ${activeStep === 2 ? "text-cyan-400" : "text-gray-600"}`} />
          </div>
          <h3 className="text-xl font-display font-semibold text-white group-hover:text-cyan-400 transition-colors relative z-10">
            Generate
          </h3>
          <p className="text-gray-400 text-sm mt-3 leading-relaxed relative z-10">
            Code normally. We replace boring loading spinners and compilation wait states with ultra-subtle, elegant developer footers.
          </p>
        </motion.div>

        {/* Step 3 */}
        <motion.div 
          onClick={() => setActiveStep(3)}
          className={`cursor-pointer group relative p-8 rounded-[32px] border transition-all duration-300 overflow-hidden ${
            activeStep === 3 
              ? "bg-gradient-to-br from-[#1C1F26] to-[#12141A] border-indigo-500/50 shadow-[0_0_25px_rgba(99,102,241,0.15)]" 
              : "bg-gradient-to-br from-[#16191F] to-[#111317] border-white/5 hover:border-white/15"
          }`}
          whileHover={{ y: -4 }}
        >
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-indigo-500/10 blur-2xl rounded-full"></div>
          <div className="flex items-center justify-between mb-6 relative z-10">
            <span className={`flex items-center justify-center w-10 h-10 rounded-full font-mono font-bold text-sm border ${
              activeStep === 3 
                ? "bg-indigo-500 text-white border-indigo-500" 
                : "bg-bg-dark text-gray-500 border-white/10"
            }`}>
              3
            </span>
            <Wallet className={`w-5 h-5 ${activeStep === 3 ? "text-indigo-400" : "text-gray-600"}`} />
          </div>
          <h3 className="text-xl font-display font-semibold text-white group-hover:text-indigo-400 transition-colors relative z-10">
            Withdraw
          </h3>
          <p className="text-gray-400 text-sm mt-3 leading-relaxed relative z-10">
            Reach ₹1,000 threshold and instantly route your accumulated passive earnings to your account via automated UPI payouts.
          </p>
        </motion.div>
      </div>

      {/* Interactive Demonstration Workspace */}
      <div className="space-y-6">
        {/* Toggle bar */}
        <div className="flex justify-center gap-3">
          {(["Native Terminal", "VS Code", "Cursor"] as const).map((tab) => (
            <button
              key={tab}
              id={`tab-btn-${tab.replace(" ", "-")}`}
              onClick={() => {
                if (tab === "Native Terminal") setTerminalTab("Native");
                else if (tab === "VS Code") setTerminalTab("VSCode");
                else setTerminalTab("Cursor");
                setDemoState("idle");
              }}
              className={`px-5 py-2.5 rounded-full font-mono text-xs transition-all flex items-center gap-2 border ${
                (terminalTab === "Native" && tab === "Native Terminal") || 
                (terminalTab === "VSCode" && tab === "VS Code") || 
                (terminalTab === "Cursor" && tab === "Cursor")
                  ? "bg-white/10 text-white border-white/20"
                  : "bg-[#1A1D23] border-white/5 text-gray-500 hover:text-gray-300"
              }`}
            >
              {tab === "Native Terminal" ? <TerminalIcon className="w-3.5 h-3.5" /> : <Laptop className="w-3.5 h-3.5" />}
              {tab}
            </button>
          ))}
        </div>

        {/* Live Terminal Frame */}
        <div className="max-w-4xl mx-auto rounded-[32px] overflow-hidden border border-white/10 bg-[#16191F] shadow-2xl terminal-glow">
          {/* Editor Header Bar */}
          <div className="bg-[#0b0c0f] border-b border-white/5 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-4 font-mono text-xs text-gray-500">
                {terminalTab === "Native" ? "sh / devorix" : `src/dashboard/model.py - ${terminalTab}`}
              </span>
            </div>
            <button 
              onClick={() => {
                setDemoState("idle");
                setLogLines([]);
              }}
              title="Restart Demo simulation"
              className="p-1.5 rounded bg-[#0F1115] text-gray-500 hover:text-indigo-400 transition-all hover:bg-gray-900"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Dynamic Inner Display */}
          <div className="p-8 font-mono text-sm leading-relaxed min-h-[300px] overflow-y-auto bg-[#0F1115]/50">
            {terminalTab === "Native" ? (
              // STEP 1: SHELL CLI SIMULATION
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-gray-500 border-b border-white/5 pb-2">
                  <span className="text-xs">SHELL ACTIVE</span>
                  <span className="text-xs bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded font-bold">1.0.4-LATEST</span>
                </div>
                <div className="space-y-2">
                  {logLines.map((line, idx) => (
                    <div 
                      key={idx} 
                      className={
                        line.startsWith("$") 
                          ? "text-indigo-400 font-semibold" 
                          : line.includes("successfully") 
                            ? "text-cyan-400 font-medium" 
                            : "text-gray-300"
                      }
                    >
                      {line}
                    </div>
                  ))}
                  {demoState !== "ready" && (
                    <span className="terminal-cursor text-indigo-400" />
                  )}
                </div>

                {demoState === "ready" && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-5 rounded-2xl bg-indigo-950/20 border border-indigo-500/20 text-indigo-300 text-xs flex items-start gap-3 mt-4"
                  >
                    <Check className="w-4 h-4 mt-0.5 shrink-0 text-cyan-400" />
                    <div>
                      <p className="font-semibold text-white">Shell Connected & Ready!</p>
                      <p className="mt-1 text-gray-400">
                        Devorix has successfully hooked into terminal wait states. Next time you run a compile, test-suite, or AI prompt, passive income begins accumulating.
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            ) : (
              // STEP 2: IDE / VS CODE OR CURSOR SIMULATION
              <div className="space-y-6">
                {/* File Header Tab */}
                <div className="flex items-center gap-2 border-b border-white/5 pb-3">
                  <FileCode className="w-4 h-4 text-indigo-400" />
                  <span className="text-xs text-white font-medium">model.py</span>
                  <span className="text-xs text-gray-500">utils.py</span>
                </div>

                {/* Simulated Python Code */}
                <div className="text-xs md:text-sm text-gray-400 space-y-1">
                  <div><span className="text-indigo-400">import</span> pandas <span className="text-indigo-400">as</span> pd</div>
                  <div><span className="text-indigo-400">from</span> sklearn.ensemble <span className="text-indigo-400">import</span> RandomForestClassifier</div>
                  <br />
                  <div><span className="text-cyan-400">def</span> <span className="text-blue-400">train_model</span>(X_train, y_train):</div>
                  <div className="pl-4 text-gray-500"># Initialize high-performance classifier</div>
                  <div className="pl-4">clf = RandomForestClassifier(n_estimators=<span className="text-cyan-300">100</span>)</div>
                  <div className="pl-4">clf.fit(X_train, y_train)</div>
                  <div className="pl-4"><span className="text-indigo-400">return</span> clf</div>
                </div>

                {/* Inline Waiting assistant & subtle ad */}
                <div className="border-t border-white/5 pt-4 mt-6">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <span className="flex items-center gap-1.5 font-bold"><Sparkles className="w-3 h-3 text-cyan-400 animate-pulse" /> CURSOR AI ASSISTANT</span>
                    <span className="text-[10px] uppercase bg-indigo-950/40 text-indigo-300 px-1.5 py-0.5 rounded">Prompt Pending</span>
                  </div>
                  <div className="bg-[#0b0c0f] p-4 rounded-xl border border-white/5 space-y-3">
                    <p className="text-xs text-gray-300">
                      <span className="text-cyan-400">→</span> claude "how does model.py work?"
                    </p>
                    
                    {/* Simulator Loading spinner with Subtle Sponsorship Banner replacement */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
                        <span>Generating explanation...</span>
                      </div>
                      
                      {/* SUBTLE B2B AD ACCENT */}
                      <motion.div 
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="py-2 px-4 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-xs flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[9px] uppercase font-bold tracking-widest bg-indigo-500 text-white px-2 py-0.5 rounded font-sans">Sponsored</span>
                          <span className="text-gray-300 font-sans">
                            ▲ Vercel - Ship, Optimize, Scale. While you wait, push your next branch live.
                          </span>
                        </div>
                        <span className="text-[10px] text-indigo-400 shrink-0 font-mono">+₹0.42</span>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Demo Earning feedback bar */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-400 font-sans font-light">
            You earned <span className="font-mono text-cyan-400 font-bold text-base">₹{earnings.toFixed(3)}</span> watching this live dashboard preview.
          </p>
        </div>
      </div>

      {/* Under Section: CTA banner */}
      <div className="mt-16 bg-gradient-to-br from-[#1A1D23] to-[#12141A] p-8 md:p-14 rounded-[32px] border border-white/10 text-center space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full -z-10" />
        <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight leading-tight">
          Ready to <span className="font-bold italic text-white underline decoration-cyan-500 underline-offset-8">monetise</span> the margins?
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base font-sans font-light">
          Start earning real passive income today. Authenticate with a single terminal execution. High security, zero impact on editor response latencies.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
          <div className="flex items-center gap-2 bg-[#0F1115] border border-white/10 rounded-xl px-4 py-3 font-mono text-xs w-full text-left text-gray-300 select-all">
            <span className="text-indigo-400">$</span> npx devorix login
          </div>
          <a
            href="#expected-earnings-section"
            className="w-full sm:w-auto px-8 py-3 rounded-full bg-white text-black font-bold text-sm hover:bg-gray-200 transition-all flex items-center justify-center gap-2 shrink-0 font-display shadow-lg shadow-white/5"
          >
            Get Started Free <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
