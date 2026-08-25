// Synthesis Request Center View (Requests / Connection Activity)

export class RequestsView {
  constructor(app) {
    this.app = app;
    this.activeTab = 'ALL';
  }

  render(container) {
    const state = this.app.state;
    let requests = [...state.requests];

    if (this.activeTab === 'SENT') {
      requests = requests.filter(r => r.type === 'SENT');
    } else if (this.activeTab === 'RECEIVED') {
      requests = requests.filter(r => r.type === 'RECEIVED');
    }

    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 28px; padding-bottom: 24px;">
        
        <!-- Header -->
        <div class="slide-up">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
            <span class="status-dot" style="background: var(--color-tertiary);"></span>
            <span style="font-family: var(--font-mono); font-size: 11px; color: var(--color-tertiary); letter-spacing: 0.08em; text-transform: uppercase; font-weight: 600;">
              RESONANCE INBOX ● SYNCED
            </span>
          </div>
          <h1 style="font-family: var(--font-headline); font-size: clamp(28px, 4vw, 42px); font-weight: 700; color: #FFFFFF; letter-spacing: -0.03em; margin-bottom: 6px;">
            CONNECTION ACTIVITY
          </h1>
          <p style="font-size: 15px; color: var(--color-on-surface-variant); max-width: 600px;">
            Track the teams and technical leaders you're building toward with high-compatibility matching.
          </p>
        </div>

        <!-- Glass Panel Wrapper -->
        <div class="glass-panel slide-up delay-100" style="padding: 24px; display: flex; flex-direction: column; gap: 24px;">
          
          <!-- Tabs & Filter Bar -->
          <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); padding-bottom: 16px;">
            <div style="display: flex; gap: 24px;">
              <button class="req-tab-btn ${this.activeTab === 'ALL' ? 'active' : ''}" data-tab="ALL" style="background: none; border: none; font-family: var(--font-mono); font-size: 12px; font-weight: 700; color: ${this.activeTab === 'ALL' ? 'var(--color-primary)' : 'var(--color-text-secondary)'}; border-bottom: 2px solid ${this.activeTab === 'ALL' ? 'var(--color-primary)' : 'transparent'}; padding-bottom: 16px; margin-bottom: -17px; cursor: pointer; letter-spacing: 0.08em;">
                ALL ACTIVITY (${state.requests.length})
              </button>
              <button class="req-tab-btn ${this.activeTab === 'RECEIVED' ? 'active' : ''}" data-tab="RECEIVED" style="background: none; border: none; font-family: var(--font-mono); font-size: 12px; font-weight: 700; color: ${this.activeTab === 'RECEIVED' ? 'var(--color-primary)' : 'var(--color-text-secondary)'}; border-bottom: 2px solid ${this.activeTab === 'RECEIVED' ? 'var(--color-primary)' : 'transparent'}; padding-bottom: 16px; margin-bottom: -17px; cursor: pointer; letter-spacing: 0.08em;">
                RECEIVED (${state.requests.filter(r => r.type === 'RECEIVED').length})
              </button>
              <button class="req-tab-btn ${this.activeTab === 'SENT' ? 'active' : ''}" data-tab="SENT" style="background: none; border: none; font-family: var(--font-mono); font-size: 12px; font-weight: 700; color: ${this.activeTab === 'SENT' ? 'var(--color-primary)' : 'var(--color-text-secondary)'}; border-bottom: 2px solid ${this.activeTab === 'SENT' ? 'var(--color-primary)' : 'transparent'}; padding-bottom: 16px; margin-bottom: -17px; cursor: pointer; letter-spacing: 0.08em;">
                SENT (${state.requests.filter(r => r.type === 'SENT').length})
              </button>
            </div>

            <div style="font-family: var(--font-mono); font-size: 11px; color: var(--color-text-muted);">
              AUTO-EXPIRY: 72 HOURS
            </div>
          </div>

          <!-- Requests Rows List -->
          <div style="display: flex; flex-direction: column; gap: 16px;">
            ${requests.length === 0 ? `
              <div style="padding: 40px; text-align: center; color: var(--color-text-muted);">
                <span class="material-symbols-outlined" style="font-size: 40px; margin-bottom: 8px;">notifications_paused</span>
                <p style="font-size: 14px;">No connection requests found in this view.</p>
              </div>
            ` : ''}

            ${requests.map(r => {
              const isPending = r.status === 'PENDING';
              const isAccepted = r.status === 'ACCEPTED';
              const isDeclined = r.status === 'DECLINED';

              const stripeColor = isPending ? 'var(--color-tertiary)' : isAccepted ? 'var(--color-secondary)' : 'var(--color-error)';

              return `
                <div class="glass-card" style="padding: 20px; position: relative; overflow: hidden; display: flex; flex-direction: column; gap: 14px;">
                  
                  <!-- Left Colored Indicator Stripe -->
                  <div style="position: absolute; top: 0; left: 0; bottom: 0; width: 4px; background: ${stripeColor}; box-shadow: 0 0 10px ${stripeColor};"></div>

                  <div style="display: flex; flex-direction: column; md-flex-direction: row; justify-content: space-between; align-items: flex-start; md-align-items: center; gap: 16px;" class="request-row-inner">
                    
                    <!-- Left: Initiator & Project -->
                    <div style="display: flex; align-items: center; gap: 14px; flex: 1.2;">
                      <div style="width: 48px; height: 48px; border-radius: var(--radius-md); overflow: hidden; background: var(--color-surface-container-high); flex-shrink: 0; border: 1px solid rgba(255, 255, 255, 0.12); display: flex; align-items: center; justify-content: center;">
                        ${r.initiatorAvatar ? `
                          <img src="${r.initiatorAvatar}" alt="${r.initiatorName}" style="width: 100%; height: 100%; object-fit: cover;" />
                        ` : `
                          <span class="material-symbols-outlined" style="color: var(--color-secondary); font-size: 26px;">domain</span>
                        `}
                      </div>
                      <div>
                        <div style="display: flex; align-items: center; gap: 8px;">
                          <h3 style="font-family: var(--font-headline); font-size: 17px; color: #FFFFFF; font-weight: 700;">
                            ${r.initiatorName}
                          </h3>
                          <span style="font-family: var(--font-mono); font-size: 10px; color: var(--color-text-muted); background: rgba(255, 255, 255, 0.05); padding: 2px 6px; border-radius: 4px;">
                            ${r.type}
                          </span>
                        </div>
                        <p style="font-size: 13px; color: var(--color-text-secondary); margin-top: 2px;">
                          Project: <strong style="color: var(--color-on-surface);">${r.projectName}</strong> • <span style="color: var(--color-primary);">${r.role}</span>
                        </p>
                      </div>
                    </div>

                    <!-- Center Metrics: Compatibility & Key Skills -->
                    <div style="display: flex; align-items: center; gap: 28px; flex: 1;">
                      <div>
                        <div style="font-family: var(--font-mono); font-size: 10px; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 4px;">
                          COMPATIBILITY
                        </div>
                        <div style="display: flex; align-items: center; gap: 6px; color: ${r.compatibility >= 80 ? 'var(--color-secondary)' : 'var(--color-text-secondary)'}; font-family: var(--font-mono); font-weight: 700; font-size: 14px;">
                          <span class="material-symbols-outlined" style="font-size: 18px;">donut_large</span>
                          ${r.compatibility}%
                        </div>
                      </div>

                      <div>
                        <div style="font-family: var(--font-mono); font-size: 10px; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 4px;">
                          KEY SKILLS
                        </div>
                        <div style="display: flex; gap: 6px;">
                          ${r.keySkills.map(s => `<span class="tech-chip" style="font-size: 10px; padding: 2px 6px;">${s}</span>`).join('')}
                        </div>
                      </div>
                    </div>

                    <!-- Right: Status Badge & Timing -->
                    <div style="display: flex; flex-direction: column; align-items: flex-start; md-align-items: flex-end; gap: 6px; flex: 0.9;">
                      ${isPending ? `
                        <div class="status-chip-pending">
                          <span class="status-dot" style="width: 5px; height: 5px; background: var(--color-tertiary);"></span>
                          PENDING REVIEW
                        </div>
                        <span style="font-family: var(--font-mono); font-size: 11px; color: var(--color-text-muted);">
                          T-Minus ${r.timeRemaining || '14:02:11'}
                        </span>
                      ` : ''}

                      ${isAccepted ? `
                        <div class="status-chip-accepted">
                          <span class="material-symbols-outlined" style="font-size: 13px; font-weight: 700;">check</span>
                          ACCEPTED & CONNECTED
                        </div>
                        <span style="font-family: var(--font-mono); font-size: 11px; color: var(--color-text-muted);">
                          Workspace Synced
                        </span>
                      ` : ''}

                      ${isDeclined ? `
                        <div class="status-chip-declined">
                          <span class="material-symbols-outlined" style="font-size: 13px; font-weight: 700;">close</span>
                          DECLINED
                        </div>
                        <span style="font-family: var(--font-mono); font-size: 11px; color: var(--color-text-muted);">
                          Topology Mismatch
                        </span>
                      ` : ''}
                    </div>

                  </div>

                  <!-- Optional Action Bar for Pending Requests -->
                  ${isPending && r.type === 'RECEIVED' ? `
                    <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 12px; border-top: 1px solid rgba(255, 255, 255, 0.06); font-size: 12.5px; color: var(--color-text-secondary);">
                      <div>
                        <em>"${r.note || 'Looking forward to connecting on topology specifications.'}"</em>
                      </div>
                      <div style="display: flex; gap: 8px;">
                        <button class="btn-danger req-action-btn" data-action="decline" data-id="${r.id}">
                          <span class="material-symbols-outlined" style="font-size: 16px;">close</span>
                          Decline
                        </button>
                        <button class="btn-primary req-action-btn" data-action="accept" data-id="${r.id}" style="padding: 7px 16px; font-size: 11px;">
                          <span class="material-symbols-outlined" style="font-size: 16px;">handshake</span>
                          Accept & Form Team
                        </button>
                      </div>
                    </div>
                  ` : ''}

                </div>
              `;
            }).join('')}
          </div>

        </div>

      </div>
    `;

    // Add inline responsive styles
    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
      @media (min-width: 860px) {
        .request-row-inner {
          flex-direction: row !important;
        }
      }
      @media (max-width: 859px) {
        .request-row-inner {
          flex-direction: column !important;
        }
      }
    `;
    container.appendChild(styleEl);

    // Event listeners
    container.querySelectorAll('.req-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.activeTab = btn.getAttribute('data-tab') || 'ALL';
        this.render(container);
      });
    });

    container.querySelectorAll('.req-action-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.getAttribute('data-action');
        const reqId = btn.getAttribute('data-id');
        if (action === 'accept') {
          this.app.acceptRequest(reqId);
        } else if (action === 'decline') {
          this.app.declineRequest(reqId);
        }
        this.render(container);
      });
    });
  }

  destroy() {}
}
