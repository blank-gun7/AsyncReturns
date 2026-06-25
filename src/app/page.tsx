"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./page.module.css";

// Reusable Tilt Card Component
const TiltCard = ({ children, className = "" }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top;  
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    cardRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `rotateX(0deg) rotateY(0deg)`;
  };

  return (
    <div className={styles.tiltWrapper}>
      <div 
        ref={cardRef}
        className={`${styles.tiltInner} ${className}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
    </div>
  );
};

export default function Home() {
  const [balance, setBalance] = useState(0);
  const [waitStates, setWaitStates] = useState(200);
  const [mousePos, setMousePos] = useState({ x: '50vw', y: '50vh' });
  const [copied, setCopied] = useState(false);
  const [copiedCommand, setCopiedCommand] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [activeIde, setActiveIde] = useState('vscode');
  const [adVisible, setAdVisible] = useState(false);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  const B2B_ADS = [
    { text: "Vercel — Ship. Optimize. Scale.", icon: "▲", color: "#fff" },
    { text: "Supabase — The open source Firebase alt", icon: "🟢", color: "#3ECF8E" },
    { text: "Postman — Test APIs faster with AI", icon: "🔷", color: "#FF6C37" },
    { text: "Stripe — Financial Infrastructure", icon: "🟣", color: "#635BFF" }
  ];

  useEffect(() => {
    const adInterval = setInterval(() => {
      setAdVisible((prev) => {
        if (prev) {
          setCurrentAdIndex((idx) => (idx + 1) % B2B_ADS.length);
          return false;
        }
        return true;
      });
    }, 3500);
    return () => clearInterval(adInterval);
  }, []);
  
  const monthlyEarnings = Math.round((waitStates * 30 * 249) / 1000);
  const referralLink = "asyncreturns.com/r/dev1337";

  // Easing function for cinematic number counter
  useEffect(() => {
    const targetBalance = 845.50;
    const duration = 2500; 
    const startTime = performance.now();

    const easeOut = (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const currentVal = targetBalance * easeOut(progress);
      setBalance(currentVal);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setBalance(targetBalance);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  // Track global mouse position for spotlight
  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      setMousePos({ x: `${e.clientX}px`, y: `${e.clientY}px` });
    };
    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyCommand = () => {
    navigator.clipboard.writeText('npx asyncreturns login');
    setCopiedCommand(true);
    setTimeout(() => setCopiedCommand(false), 2000);
  };

  const progressPercentage = Math.min((balance / 1000) * 100, 100);

  return (
    <>
      <div className="ambient-glow"></div>
      <div 
        className={styles.spotlight} 
        style={{ '--mouse-x': mousePos.x, '--mouse-y': mousePos.y } as React.CSSProperties}
      ></div>
      
      {/* Navigation */}
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <span>₹</span> Async Returns
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button className={styles.loginBtn}>Login</button>
          <button className={styles.primaryBtn} style={{ padding: '0.5rem 1.5rem', fontSize: '0.9rem' }}>
            Get Started
          </button>
        </div>
      </nav>

      <main className={styles.container}>
        
        {/* Wallet Hero */}
        <section className={styles.walletHero}>
          <div className={styles.balanceLabel}>Total Value Earned</div>
          <div className={styles.balance} data-text={`₹${balance.toFixed(2)}`}>
            ₹{balance.toFixed(2)}
          </div>
          <p className={styles.subtitle}>
            Monetize your wait state. The attention marketplace for Indian devs.
          </p>
          <button className={styles.primaryBtn} onClick={() => setIsModalOpen(true)}>
            Connect Your Terminal
          </button>

          {/* Live Clients Hook */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className={styles.liveClients}>
              <div className={styles.pulsingDot}></div>
              <span>Live Advertiser Bids: </span>
              <div className={styles.clientAvatars}>
                <div className={styles.avatar}>P</div>
                <div className={styles.avatar}>V</div>
                <div className={styles.avatar}>S</div>
              </div>
              <span style={{ color: '#fff', fontWeight: 600 }}>$5.00 CPM</span>
            </div>
          </div>
        </section>

        {/* IDE Showcase Mockup */}
        <section className={styles.ideShowcase}>
          <div className={styles.ideTabs}>
            <button className={`${styles.ideTab} ${activeIde === 'terminal' ? styles.active : ''}`} onClick={() => setActiveIde('terminal')}>Native Terminal</button>
            <button className={`${styles.ideTab} ${activeIde === 'vscode' ? styles.active : ''}`} onClick={() => setActiveIde('vscode')}>VS Code</button>
            <button className={`${styles.ideTab} ${activeIde === 'cursor' ? styles.active : ''}`} onClick={() => setActiveIde('cursor')}>Cursor</button>
          </div>

          <div className={styles.mockupContainer}>
            <div className={styles.mockupHeader}>
              <div className={styles.macDots}>
                <div className={styles.macDot}></div><div className={styles.macDot}></div><div className={styles.macDot}></div>
              </div>
              <div className={styles.mockupTitle}>
                {activeIde === 'terminal' ? 'dev@acme: ~' : activeIde === 'vscode' ? 'src/dashboard/model.py - VS Code' : 'Cursor AI Chat'}
              </div>
            </div>

            {/* VS CODE LAYOUT */}
            {activeIde === 'vscode' && (
              <div className={styles.vscodeLayout}>
                <div className={styles.vscodeSidebar}>
                  <div className={styles.vscodeSidebarIcon}>📄</div>
                  <div className={styles.vscodeSidebarIcon}>🔍</div>
                  <div className={styles.vscodeSidebarIcon}>🔀</div>
                  <div className={styles.vscodeSidebarIcon}>🐛</div>
                </div>
                <div className={styles.vscodeMain}>
                  <div className={styles.vscodeEditor}>
                    <div className={styles.vscodeFileTabs}>
                      <span className={styles.activeFile}>model.py</span>
                      <span>utils.py</span>
                    </div>
                    <div className={styles.vscodeCode}>
                      <div><span style={{ color: '#C678DD' }}>import</span> pandas <span style={{ color: '#C678DD' }}>as</span> pd</div>
                      <div><span style={{ color: '#C678DD' }}>from</span> sklearn.ensemble <span style={{ color: '#C678DD' }}>import</span> RandomForestClassifier</div>
                      <br/>
                      <div><span style={{ color: '#C678DD' }}>def</span> <span style={{ color: '#61AFEF' }}>train_model</span>(X_train, y_train):</div>
                      <div style={{ paddingLeft: '20px' }}><span style={{ color: '#5C6370' }}># Initialize high-performance classifier</span></div>
                      <div style={{ paddingLeft: '20px' }}>clf = RandomForestClassifier(n_estimators=<span style={{ color: '#D19A66' }}>100</span>)</div>
                      <div style={{ paddingLeft: '20px' }}>clf.fit(X_train, y_train)</div>
                      <div style={{ paddingLeft: '20px' }}><span style={{ color: '#C678DD' }}>return</span> clf</div>
                      <br/>
                      <div className={styles.blinkingCursor}></div>
                    </div>
                  </div>
                  <div className={styles.vscodeTerminal}>
                    <div className={styles.vscodeTerminalTabs}>
                      <span>PROBLEMS</span><span>OUTPUT</span><span>DEBUG CONSOLE</span><span className={styles.activeTab}>TERMINAL</span><span>PORTS</span>
                    </div>
                    <div className={styles.vscodeTerminalContent}>
                      <div style={{ color: '#98C379', marginBottom: '8px' }}>➜ claude "how does model.py work?"</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {adVisible ? (
                          <>
                            <div style={{ color: '#ABB2BF' }}>Analyzing src/dashboard/model.py... Done.</div>
                            <div className={styles.adInjectBlock}>
                              <span className={styles.adTag}>AD</span> 
                              <span style={{ color: B2B_ADS[currentAdIndex].color, marginRight: '4px' }}>{B2B_ADS[currentAdIndex].icon}</span> {B2B_ADS[currentAdIndex].text}
                            </div>
                            <div style={{ color: '#61AFEF', marginTop: '4px' }}>The model.py file defines a random forest classifier...</div>
                          </>
                        ) : (
                          <div style={{ color: '#E5C07B' }}><span className={styles.spinner}>⠋</span> Reading repository context...</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TERMINAL LAYOUT */}
            {activeIde === 'terminal' && (
              <div className={styles.terminalLayout}>
                <div style={{ color: '#98C379', marginBottom: '1rem' }}>dev@acme ~ % <span style={{ color: '#ABB2BF' }}>npm run build</span></div>
                <div style={{ color: '#ABB2BF', marginBottom: '0.5rem' }}>&gt; acme-web@1.0.0 build</div>
                <div style={{ color: '#ABB2BF', marginBottom: '1rem' }}>&gt; next build</div>
                
                {adVisible ? (
                  <>
                    <div className={styles.adInjectBlock} style={{ background: 'transparent', border: 'none', padding: '0', marginBottom: '1rem' }}>
                      <span className={styles.adTag}>AD</span> 
                      <span style={{ color: B2B_ADS[currentAdIndex].color, marginRight: '4px' }}>{B2B_ADS[currentAdIndex].icon}</span> {B2B_ADS[currentAdIndex].text}
                    </div>
                    <div style={{ color: '#61AFEF' }}>✓ Compiled successfully</div>
                    <div style={{ color: '#98C379', marginTop: '0.5rem' }}>dev@acme ~ % <span className={styles.blinkingCursor}></span></div>
                  </>
                ) : (
                  <div style={{ color: '#E5C07B' }}><span className={styles.spinner}>⠋</span> Creating an optimized production build...</div>
                )}
              </div>
            )}

            {/* CURSOR LAYOUT */}
            {activeIde === 'cursor' && (
              <div className={styles.cursorLayout}>
                <div className={styles.vscodeCode} style={{ flex: 1, opacity: 0.5 }}>
                   <div className={styles.vscodeLine} style={{width: '60%'}}></div>
                   <div className={styles.vscodeLine} style={{width: '40%'}}></div>
                   <div className={styles.vscodeLine} style={{width: '80%'}}></div>
                </div>
                <div className={styles.cursorChat}>
                  <div className={styles.cursorPrompt}>
                    Generate a high-converting pricing table component...
                  </div>
                  <div className={styles.cursorResponse}>
                    {adVisible ? (
                      <div className={styles.cursorAd}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ color: B2B_ADS[currentAdIndex].color }}>{B2B_ADS[currentAdIndex].icon}</span> 
                          <span>{B2B_ADS[currentAdIndex].text}</span>
                        </div>
                        <span className={styles.adTag}>AD</span>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ABB2BF' }}>
                        <span className={styles.pulseDot}>●</span> Generating code...
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ₹1000 Milestone Tracker */}
        <TiltCard className={`${styles.trackerSection} ${styles.glassCard}`}>
          <div className={styles.trackerHeader}>
            <span style={{ color: 'var(--text-secondary)' }}>Next UPI Cash Out</span>
            <span style={{ color: 'var(--neon-green)' }}>₹1000.00</span>
          </div>
          <div className={styles.progressContainer}>
            <div className={styles.progressBar} style={{ width: `${progressPercentage}%` }}></div>
          </div>
          <div className={styles.trackerFooter}>
            You are <span>₹{(1000 - balance).toFixed(2)}</span> away from unlocking instant transfer.
          </div>
        </TiltCard>

        {/* 3-Step Consumer Flow */}
        <section className={styles.flowSection}>
          <h2 className={styles.sectionTitle}>How it works</h2>
          <div className={styles.flowGrid}>
            <TiltCard className={`${styles.flowStep} ${styles.glassCard}`}>
              <div className={styles.stepNumber}>1</div>
              <h3>Authenticate</h3>
              <p>Run <code style={{ color: 'var(--text-primary)' }}>npx asyncreturns login</code>. We securely link your CLI and IDEs to your wallet.</p>
            </TiltCard>
            <TiltCard className={`${styles.flowStep} ${styles.glassCard}`}>
              <div className={styles.stepNumber}>2</div>
              <h3>Generate</h3>
              <p>Code normally. We replace boring AI loading spinners with ultra-subtle, premium B2B footers.</p>
            </TiltCard>
            <TiltCard className={`${styles.flowStep} ${styles.glassCard}`}>
              <div className={styles.stepNumber}>3</div>
              <h3>Withdraw</h3>
              <p>Hit ₹1,000 and instantly route the cash to your bank account via Razorpay UPI.</p>
            </TiltCard>
          </div>
        </section>

        {/* Hype Calculator */}
        <TiltCard className={`${styles.calcSection} ${styles.glassCard}`}>
          <h2 className={styles.sectionTitle} style={{ marginBottom: '1rem' }}>Track Your Earnings</h2>
          <p className={styles.calcDesc}>How many AI prompts do you run per day?</p>
          
          <div className={styles.sliderContainer}>
            <input 
              type="range" 
              min="50" 
              max="1000" 
              step="50"
              value={waitStates}
              onChange={(e) => setWaitStates(parseInt(e.target.value))}
              className={styles.rangeInput}
            />
            <div style={{ marginTop: '1rem', fontWeight: 'bold' }}>{waitStates} prompts / day</div>
          </div>

          <div className={styles.calcResult}>
            ₹{monthlyEarnings.toLocaleString('en-IN')}
          </div>
          <p className={styles.calcDesc}>Estimated passive income per month.</p>
        </TiltCard>

        {/* Referral Hook Section */}
        <div className={styles.referralBox}>
          <div className={styles.referralText}>
            Invite your team. Earn <span>5%</span> of their payouts forever.
          </div>
          <div className={styles.copyInput}>
            <input type="text" value={referralLink} readOnly />
            <button className={styles.copyBtn} onClick={handleCopy}>
              {copied ? 'COPIED!' : 'COPY'}
            </button>
          </div>
        </div>

      </main>

      <footer className={styles.footer}>
        © 2026 Async Returns. Monetize the wait state. <br />
        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
          <a href="#">Support</a>
        </div>
      </footer>

      {/* Installation Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeModalBtn} onClick={() => setIsModalOpen(false)} aria-label="Close modal">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            
            <h2 className={styles.modalTitle}>Connect to Async Returns</h2>
            <p className={styles.modalSubtitle}>
              Run this single command in your terminal. We'll authenticate your CLI and instantly link it to your wallet. No complex setup required.
            </p>
            
            <div className={styles.heroCodeBlock} style={{ margin: '0', maxWidth: '100%' }}>
              <div className={styles.heroCodeHeader}>
                <span>Terminal</span>
              </div>
              <div className={styles.heroCodeBody}>
                <span className={styles.heroCodePrompt}>$</span>
                <span className={styles.heroCodeCommand}>npx asyncreturns login</span>
                <button className={styles.heroCodeCopy} onClick={handleCopyCommand} aria-label="Copy code">
                  {copiedCommand ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--neon-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
