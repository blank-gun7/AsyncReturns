"use client";

import { useState } from "react";
import styles from "@/app/(marketing)/page.module.css";


interface IdeShowcaseProps {
  adVisible: boolean;
  currentAd: { text: string; icon: string; color: string };
  spinnerFrame: string;
}

export function IdeShowcase({ adVisible, currentAd, spinnerFrame }: IdeShowcaseProps) {
  const [activeIde, setActiveIde] = useState<'vscode' | 'terminal' | 'cursor'>('vscode');

  return (
    <section className={styles.ideShowcase}>
      <div className={styles.ideTabs}>
        <button
          className={`${styles.ideTab} ${activeIde === 'terminal' ? styles.active : ''}`}
          onClick={() => setActiveIde('terminal')}
        >
          Native Terminal
        </button>
        <button
          className={`${styles.ideTab} ${activeIde === 'vscode' ? styles.active : ''}`}
          onClick={() => setActiveIde('vscode')}
        >
          VS Code
        </button>
        <button
          className={`${styles.ideTab} ${activeIde === 'cursor' ? styles.active : ''}`}
          onClick={() => setActiveIde('cursor')}
        >
          Cursor
        </button>
      </div>

      <div className={styles.mockupContainer}>
        <div className={styles.mockupHeader}>
          <div className={styles.macDots}>
            <div className={styles.macDot}></div>
            <div className={styles.macDot}></div>
            <div className={styles.macDot}></div>
          </div>
          <div className={styles.mockupTitle}>
            {activeIde === 'terminal'
              ? 'dev@acme: ~'
              : activeIde === 'vscode'
              ? 'src/dashboard/model.py - VS Code'
              : 'Cursor AI Chat'}
          </div>
        </div>

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
                  <br />
                  <div><span style={{ color: '#C678DD' }}>def</span> <span style={{ color: '#61AFEF' }}>train_model</span>(X_train, y_train):</div>
                  <div style={{ paddingLeft: '20px' }}><span style={{ color: '#5C6370' }}># Initialize high-performance classifier</span></div>
                  <div style={{ paddingLeft: '20px' }}>clf = RandomForestClassifier(n_estimators=<span style={{ color: '#D19A66' }}>100</span>)</div>
                  <div style={{ paddingLeft: '20px' }}>clf.fit(X_train, y_train)</div>
                  <div style={{ paddingLeft: '20px' }}><span style={{ color: '#C678DD' }}>return</span> clf</div>
                  <br />
                  <div className={styles.blinkingCursor}></div>
                </div>
              </div>
              <div className={styles.vscodeTerminal}>
                <div className={styles.vscodeTerminalTabs}>
                  <span>PROBLEMS</span><span>OUTPUT</span><span>DEBUG CONSOLE</span>
                  <span className={styles.activeTab}>TERMINAL</span><span>PORTS</span>
                </div>
                <div className={styles.vscodeTerminalContent}>
                  <div style={{ color: '#98C379', marginBottom: '8px' }}>➜ claude &quot;how does model.py work?&quot;</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {adVisible ? (
                      <>
                        <div style={{ color: '#ABB2BF' }}>Analyzing src/dashboard/model.py... Done.</div>
                        <div className={styles.adInjectBlock}>
                          <span className={styles.adTag}>AD</span>
                          <span style={{ color: currentAd.color, marginRight: '4px' }}>{currentAd.icon}</span> {currentAd.text}
                        </div>
                        <div style={{ color: '#61AFEF', marginTop: '4px' }}>The model.py file defines a random forest classifier...</div>
                      </>
                    ) : (
                      <div style={{ color: '#E5C07B' }}><span>{spinnerFrame}</span> Reading repository context...</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeIde === 'terminal' && (
          <div className={styles.terminalLayout}>
            <div style={{ color: '#98C379', marginBottom: '1rem' }}>dev@acme ~ % <span style={{ color: '#ABB2BF' }}>npm run build</span></div>
            <div style={{ color: '#ABB2BF', marginBottom: '0.5rem' }}>&gt; acme-web@1.0.0 build</div>
            <div style={{ color: '#ABB2BF', marginBottom: '1rem' }}>&gt; next build</div>

            {adVisible ? (
              <>
                <div className={styles.adInjectBlock} style={{ background: 'transparent', border: 'none', padding: '0', marginBottom: '1rem' }}>
                  <span className={styles.adTag}>AD</span>
                  <span style={{ color: currentAd.color, marginRight: '4px' }}>{currentAd.icon}</span> {currentAd.text}
                </div>
                <div style={{ color: '#61AFEF' }}>✓ Compiled successfully</div>
                <div style={{ color: '#98C379', marginTop: '0.5rem' }}>dev@acme ~ % <span className={styles.blinkingCursor}></span></div>
              </>
            ) : (
              <div style={{ color: '#E5C07B' }}><span>{spinnerFrame}</span> Creating an optimized production build...</div>
            )}
          </div>
        )}

        {activeIde === 'cursor' && (
          <div className={styles.cursorLayout}>
            <div className={styles.vscodeCode} style={{ flex: 1, opacity: 0.5 }}>
              <div className={styles.vscodeLine} style={{ width: '60%' }}></div>
              <div className={styles.vscodeLine} style={{ width: '40%' }}></div>
              <div className={styles.vscodeLine} style={{ width: '80%' }}></div>
            </div>
            <div className={styles.cursorChat}>
              <div className={styles.cursorPrompt}>
                Generate a high-converting pricing table component...
              </div>
              <div className={styles.cursorResponse}>
                {adVisible ? (
                  <div className={styles.cursorAd}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: currentAd.color }}>{currentAd.icon}</span>
                      <span>{currentAd.text}</span>
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
  );
}
