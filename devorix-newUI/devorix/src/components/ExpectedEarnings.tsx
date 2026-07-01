import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Terminal, 
  Copy,
  CheckCircle2,
  Users,
  ArrowRight,
  TrendingUp,
  Mail,
  Zap
} from "lucide-react";

export default function ExpectedEarnings() {
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationState, setSimulationState] = useState<"idle" | "running" | "done">("idle");
  const [logs, setLogs] = useState<string[]>([]);
  const [calculatedEarnings, setCalculatedEarnings] = useState<number>(0);

  const command = "curl -sL https://devorix.ai/calc.sh | bash";

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if(email) setJoined(true);
  };

  const runSimulation = () => {
    setSimulationState("running");
    setIsSimulating(true);
    setLogs(["$ curl -sL https://devorix.ai/calc.sh | bash", "→ Scanning local log directories..."]);
    
    setTimeout(() => {
      setLogs(prev => [...prev, "→ Found Cursor session logs: ~/.cursor/logs"]);
      setLogs(prev => [...prev, "→ Found VS Code wait states: ~/.vscode/extensions/wait-states"]);
    }, 1000);

    setTimeout(() => {
      setLogs(prev => [...prev, "→ Analyzing active vibe coding hours..."]);
      setLogs(prev => [...prev, "→ Total AI compile/wait time detected: 48.2 hours (last 30 days)"]);
    }, 2500);

    setTimeout(() => {
      setLogs(prev => [...prev, "→ Calculating expected earnings model..."]);
      setSimulationState("done");
      setCalculatedEarnings(240.50); // random sample
    }, 4000);
  };

  return (
    <div id="expected-earnings-section" className="space-y-16 max-w-7xl mx-auto px-4 py-8">
      {/* Title */}
      <div className="text-center space-y-5 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-indigo-400 text-xs font-mono tracking-[0.2em] uppercase">
          <TrendingUp className="w-3.5 h-3.5 text-indigo-400" /> EARNINGS TRACKER
        </div>
        <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight leading-tight">
          Calculate your <span className="font-bold italic text-white underline decoration-indigo-500 underline-offset-8">expected earnings</span>
        </h2>
        <p className="text-gray-400 text-sm md:text-base font-sans font-light leading-relaxed max-w-xl mx-auto">
          We use a lightweight script to securely fetch your local Claude/coding session logs and calculate your exact wait-state durations. Find out exactly how much you are about to earn.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
        
        {/* Left Card: Terminal Command Script */}
        <div className="bg-gradient-to-br from-[#16191F] to-[#111317] border border-white/10 p-8 md:p-10 rounded-[32px] space-y-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -z-10" />
          
          <div className="space-y-3">
            <h3 className="text-xl font-display font-semibold text-white flex items-center gap-2">
              <Terminal className="w-5 h-5 text-indigo-400" /> Run the analysis script
            </h3>
            <p className="text-sm text-gray-400 font-sans font-light leading-relaxed">
              Copy and paste this one-line command into your terminal. It locally analyzes your dev logs to compute active vibe coding time and estimates your passive income.
            </p>
          </div>

          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative flex items-center justify-between bg-[#0b0c0f] border border-white/10 rounded-xl p-4">
              <code className="text-xs md:text-sm font-mono text-gray-300 overflow-x-auto whitespace-nowrap scrollbar-hide">
                <span className="text-indigo-400 select-none">$ </span>
                {command}
              </code>
              <button
                onClick={handleCopy}
                className="ml-4 p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-all shrink-0 cursor-pointer"
                aria-label="Copy command"
              >
                {copied ? <CheckCircle2 className="w-4 h-4 text-cyan-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
              </button>
            </div>
          </div>

          {!isSimulating ? (
            <button 
              onClick={runSimulation}
              className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Terminal className="w-4 h-4" /> Simulate Script Run
            </button>
          ) : (
            <div className="rounded-xl border border-white/10 bg-[#0b0c0f] overflow-hidden">
              <div className="bg-[#16191F] border-b border-white/5 px-4 py-2 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                <span className="ml-2 font-mono text-[10px] text-gray-500">Terminal (Expected Earnings)</span>
              </div>
              <div className="p-4 font-mono text-xs leading-relaxed space-y-1.5 h-[180px] overflow-y-auto">
                {logs.map((log, i) => (
                  <div key={i} className={log.startsWith("$") ? "text-indigo-400 font-bold" : "text-gray-400"}>
                    {log}
                  </div>
                ))}
                {simulationState === "running" && (
                  <span className="terminal-cursor text-indigo-400 inline-block w-2 h-3 bg-indigo-400 animate-pulse ml-1" />
                )}
                {simulationState === "done" && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 border border-cyan-500/30 bg-cyan-500/10 rounded-xl"
                  >
                    <div className="text-[10px] uppercase tracking-widest text-cyan-400 font-bold mb-1">Results Computed</div>
                    <div className="text-gray-200">
                      Expected Passive Earnings: <span className="text-2xl font-black text-white ml-2">₹{calculatedEarnings.toFixed(2)} / mo</span>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          )}

          <div className="p-5 rounded-2xl bg-[#0F1115] border border-white/5 text-xs text-gray-400 font-sans font-light flex items-start gap-3">
            <Zap className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
            <p>
              The script runs entirely locally. It parses standard log files from VS Code, Cursor, and AI agents to calculate wait times. No source code or personal data leaves your machine.
            </p>
          </div>
        </div>

        {/* Right Card: Waitlist Form */}
        <div className="bg-gradient-to-br from-[#1A1D23] to-[#12141A] border border-white/10 p-8 md:p-10 rounded-[32px] space-y-8 shadow-2xl">
          <div className="space-y-3">
            <h3 className="text-xl font-display font-semibold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-400" /> Join the Developer Waitlist
            </h3>
            <p className="text-sm text-gray-400 font-sans font-light leading-relaxed">
              We are currently rolling out access in batches to ensure maximum ad inventory fill rates. Secure your spot in the next cohort.
            </p>
          </div>

          {!joined ? (
            <form onSubmit={handleJoin} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">
                  Work or Personal Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="dev@example.com"
                    className="w-full bg-[#0F1115] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-indigo-500 text-gray-300 font-sans"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-white text-black font-bold text-sm hover:bg-gray-200 transition-all flex items-center justify-center gap-2 font-display cursor-pointer shadow-lg"
              >
                Join Waitlist <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-center space-y-4"
            >
              <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 className="w-6 h-6 text-indigo-400" />
              </div>
              <h4 className="text-lg font-bold text-white">You're on the list!</h4>
              <p className="text-sm text-gray-400 font-sans font-light">
                Keep an eye on your inbox. We'll email you the moment your account is ready to activate.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
