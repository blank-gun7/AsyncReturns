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
          A<span>$</span> Async Returns
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
          <div className={styles.balance} data-text={`$${balance.toFixed(2)}`}>
            ${balance.toFixed(2)}
          </div>
          <p className={styles.subtitle}>
            Monetize your wait state. The attention marketplace for Indian devs.
          </p>
          <button className={styles.primaryBtn}>
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

        {/* $1000 Milestone Tracker */}
        <TiltCard className={`${styles.trackerSection} ${styles.glassCard}`}>
          <div className={styles.trackerHeader}>
            <span style={{ color: 'var(--text-secondary)' }}>Next Cash Out</span>
            <span style={{ color: 'var(--neon-green)' }}>$1000.00</span>
          </div>
          <div className={styles.progressContainer}>
            <div className={styles.progressBar} style={{ width: `${progressPercentage}%` }}></div>
          </div>
          <div className={styles.trackerFooter}>
            You are <span>${(1000 - balance).toFixed(2)}</span> away from unlocking instant transfer.
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
              <p>Hit $1,000 and instantly route the cash to your bank account via Stripe/PayPal.</p>
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
            ${monthlyEarnings.toLocaleString('en-US')}
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
    </>
  );
}
