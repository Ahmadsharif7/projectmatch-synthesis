// Synthesis Projects Discovery View (Discover)

export class DiscoverView {
  constructor(app) {
    this.app = app;
    this.selectedTechFilter = 'ALL';
    this.selectedSort = 'SCORE_DESC';
    this.searchQuery = '';
  }

  render(container) {
    const state = this.app.state;
    let filteredProjects = [...state.projects];

    // Apply Search
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      filteredProjects = filteredProjects.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.capabilities.some(c => c.toLowerCase().includes(q))
      );
    }

    // Apply Tech Filter
    if (this.selectedTechFilter !== 'ALL') {
      filteredProjects = filteredProjects.filter(p =>
        p.capabilities.some(c => c.toLowerCase().includes(this.selectedTechFilter.toLowerCase()))
      );
    }

    // Apply Sort
    if (this.selectedSort === 'SCORE_DESC') {
      filteredProjects.sort((a, b) => b.matchScore - a.matchScore);
    } else if (this.selectedSort === 'DURATION') {
      filteredProjects.sort((a, b) => a.duration.localeCompare(b.duration));
    }

    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 28px; padding-bottom: 24px;">
        
        <!-- Header Section -->
        <section class="slide-up">
          <div style="display: flex; flex-direction: column; gap: 6px; margin-bottom: 20px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="status-dot" style="background: var(--color-secondary);"></span>
              <span style="font-family: var(--font-mono); font-size: 11px; color: var(--color-secondary); letter-spacing: 0.1em; text-transform: uppercase; font-weight: 600;">
                Discovery Engine Active • Live Matching
              </span>
            </div>
            <h1 style="font-family: var(--font-headline); font-size: clamp(28px, 4vw, 42px); font-weight: 700; color: #FFFFFF; letter-spacing: -0.03em; line-height: 1.1;">
              FIND WHERE YOUR SKILLS MATTER.
            </h1>
            <p style="font-size: 15px; color: var(--color-on-surface-variant); max-width: 650px;">
              Projects ranked by how naturally your capabilities complete the team topology and bridge technical bottlenecks.
            </p>
          </div>

          <!-- Quick Filters Bar -->
          <div class="glass-panel" style="padding: 14px 18px; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px;">
            <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 10px;">
              <span style="font-family: var(--font-mono); font-size: 11px; color: var(--color-text-muted); font-weight: 600;">
                SYS.FILTERS:
              </span>
              
              <button class="tech-filter-btn tech-chip ${this.selectedTechFilter === 'ALL' ? 'match' : ''}" data-filter="ALL">
                ALL STACKS
              </button>
              <button class="tech-filter-btn tech-chip ${this.selectedTechFilter === 'WebGL' ? 'match' : ''}" data-filter="WebGL">
                <span class="status-dot" style="width: 5px; height: 5px; background: var(--color-primary);"></span>
                WebGL / 3D
              </button>
              <button class="tech-filter-btn tech-chip ${this.selectedTechFilter === 'Rust' ? 'match' : ''}" data-filter="Rust">
                <span class="status-dot" style="width: 5px; height: 5px; background: var(--color-secondary);"></span>
                Rust Systems
              </button>
              <button class="tech-filter-btn tech-chip ${this.selectedTechFilter === 'React' ? 'match' : ''}" data-filter="React">
                <span class="status-dot" style="width: 5px; height: 5px; background: var(--color-tertiary);"></span>
                React Architecture
              </button>
              <button class="tech-filter-btn tech-chip ${this.selectedTechFilter === 'DSP' ? 'match' : ''}" data-filter="DSP">
                <span class="status-dot" style="width: 5px; height: 5px; background: var(--color-emerald);"></span>
                Audio / DSP
              </button>
            </div>

            <div style="display: flex; align-items: center; gap: 12px; margin-left: auto;">
              <button id="clear-filters-btn" style="background: none; border: none; font-family: var(--font-mono); font-size: 11px; color: var(--color-secondary); cursor: pointer; text-decoration: underline; text-underline-offset: 4px;">
                RESET FILTERS
              </button>
            </div>
          </div>
        </section>

        <!-- Bento Grid Layout: Catalog (Left) + Telemetry Vector (Right) -->
        <div style="display: grid; grid-template-columns: 1fr; gap: 24px;" class="discover-grid-layout">
          
          <!-- Opportunities List -->
          <div style="display: flex; flex-direction: column; gap: 20px;">
            ${filteredProjects.length === 0 ? `
              <div class="glass-panel" style="padding: 48px; text-align: center;">
                <span class="material-symbols-outlined" style="font-size: 48px; color: var(--color-text-muted); margin-bottom: 12px;">search_off</span>
                <h3 style="font-family: var(--font-headline); font-size: 20px; color: #FFFFFF; margin-bottom: 6px;">No Matching Projects Found</h3>
                <p style="color: var(--color-text-secondary); font-size: 14px; margin-bottom: 16px;">Try clearing your tech filters or search query.</p>
                <button class="btn-primary" id="empty-clear-filters-btn">Clear All Filters</button>
              </div>
            ` : ''}

            ${filteredProjects.map((p, idx) => `
              <div class="glass-card slide-up delay-${Math.min(idx * 100, 400)}" data-project-id="${p.id}" style="padding: 24px; position: relative; overflow: hidden; cursor: pointer;">
                
                <!-- Ambient Score Blur Gradient -->
                <div style="position: absolute; right: -50px; top: -50px; width: 180px; height: 180px; background: rgba(139, 92, 246, 0.1); border-radius: 50%; filter: blur(50px); pointer-events: none;"></div>

                <div style="display: flex; flex-direction: column; md-flex-direction: row; justify-content: space-between; gap: 20px; position: relative; z-index: 2;" class="project-card-inner">
                  
                  <!-- Left Info -->
                  <div style="flex: 1;">
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px; flex-wrap: wrap;">
                      <span class="badge-high-signal">${p.category}</span>
                      <span style="font-family: var(--font-mono); font-size: 11px; color: var(--color-text-muted); display: flex; align-items: center; gap: 4px;">
                        <span class="material-symbols-outlined" style="font-size: 14px;">schedule</span> ${p.duration}
                      </span>
                      <span style="font-family: var(--font-mono); font-size: 11px; color: var(--color-text-muted); display: flex; align-items: center; gap: 4px;">
                        <span class="material-symbols-outlined" style="font-size: 14px;">group</span> ${p.slotsFilled}/${p.totalSlots} Slots
                      </span>
                    </div>

                    <h3 style="font-family: var(--font-headline); font-size: 22px; color: #FFFFFF; font-weight: 700; margin-bottom: 8px;">
                      ${p.title}
                    </h3>
                    <p style="font-size: 14px; color: var(--color-on-surface-variant); line-height: 1.5; margin-bottom: 18px; max-width: 600px;">
                      ${p.description}
                    </p>

                    <!-- Required Capabilities -->
                    <div>
                      <div style="font-family: var(--font-mono); font-size: 10px; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 8px;">
                        Required Topology & Stack
                      </div>
                      <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                        ${p.capabilities.map(cap => {
                          const isMatch = p.matchingCapabilities?.includes(cap);
                          return `<span class="tech-chip ${isMatch ? 'match' : ''}">
                            ${isMatch ? '<span class="material-symbols-outlined" style="font-size: 13px;">check_circle</span>' : ''}
                            ${cap}
                          </span>`;
                        }).join('')}
                      </div>
                    </div>
                  </div>

                  <!-- Right Circular Match Gauge & Actions -->
                  <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; min-width: 140px; border-left: 1px solid rgba(255, 255, 255, 0.08); padding-left: 20px;" class="project-score-col">
                    <div style="text-align: center;">
                      <div style="position: relative; width: 72px; height: 72px; display: inline-flex; align-items: center; justify-content: center;">
                        <svg style="width: 100%; height: 100%; transform: rotate(-90deg);">
                          <circle cx="36" cy="36" r="30" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="4"></circle>
                          <circle cx="36" cy="36" r="30" fill="none" stroke="${p.matchScore >= 90 ? 'var(--color-primary)' : 'var(--color-secondary)'}" stroke-width="4" stroke-dasharray="188" stroke-dashoffset="${188 - (188 * p.matchScore) / 100}"></circle>
                        </svg>
                        <div style="position: absolute; font-family: var(--font-headline); font-size: 20px; font-weight: 700; color: #FFFFFF;">
                          ${p.matchScore}<span style="font-size: 12px;">%</span>
                        </div>
                      </div>
                      <div style="font-family: var(--font-mono); font-size: 10px; color: var(--color-primary); text-transform: uppercase; margin-top: 4px; letter-spacing: 0.06em;">
                        Match Resonance
                      </div>
                    </div>

                    <button class="btn-primary view-details-btn" data-id="${p.id}" style="width: 100%; padding: 8px 12px; font-size: 11px;">
                      View Details
                    </button>
                  </div>
                </div>

                <!-- AI Rationale Footer -->
                <div style="margin-top: 18px; padding-top: 14px; border-top: 1px solid rgba(255, 255, 255, 0.08); display: flex; align-items: flex-start; gap: 10px;">
                  <span class="material-symbols-outlined" style="color: var(--color-secondary); font-size: 18px; margin-top: 1px;">auto_awesome</span>
                  <div>
                    <div style="font-family: var(--font-mono); font-size: 10px; color: var(--color-secondary); text-transform: uppercase; font-weight: 700; margin-bottom: 2px;">
                      Why This Match
                    </div>
                    <p style="font-size: 12.5px; color: var(--color-text-secondary); line-height: 1.45;">
                      ${p.whyThisMatch}
                    </p>
                  </div>
                </div>

              </div>
            `).join('')}
          </div>

          <!-- Contextual Sidebar: Capability Vector & Market Velocity -->
          <div style="display: flex; flex-direction: column; gap: 20px;" class="discover-sidebar">
            
            <!-- User Telemetry Vector -->
            <div class="glass-panel" style="padding: 22px; border-top: 2px solid var(--color-primary);">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
                <h3 style="font-family: var(--font-mono); font-size: 11px; color: var(--color-text-secondary); text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700;">
                  Your Capability Vector
                </h3>
                <span class="status-dot" style="background: var(--color-primary);"></span>
              </div>

              <div style="display: flex; flex-direction: column; gap: 16px;">
                ${state.profile.capabilityVector.map(vec => `
                  <div>
                    <div style="display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: 11.5px; margin-bottom: 6px;">
                      <span style="color: var(--color-on-surface);">${vec.label}</span>
                      <span style="color: var(--color-${vec.color}); font-weight: 700;">${vec.value} v</span>
                    </div>
                    <div style="height: 5px; background: var(--color-surface-deep); border-radius: 4px; overflow: hidden;">
                      <div style="height: 100%; width: ${vec.score}; background: var(--color-${vec.color}); border-radius: 4px; box-shadow: 0 0 8px var(--color-${vec.color});"></div>
                    </div>
                  </div>
                `).join('')}
              </div>

              <div style="margin-top: 20px; padding-top: 14px; border-top: 1px solid rgba(255, 255, 255, 0.06);">
                <p style="font-size: 12px; color: var(--color-text-secondary); line-height: 1.5;">
                  Matches currently prioritize <span style="color: var(--color-primary); font-weight: 600;">Frontend & Data Viz</span> density based on recent production telemetry.
                </p>
              </div>
            </div>

            <!-- Market Velocity Insights -->
            <div class="glass-panel" style="padding: 22px;">
              <h3 style="font-family: var(--font-mono); font-size: 11px; color: var(--color-text-secondary); text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700; margin-bottom: 14px;">
                Market Velocity
              </h3>

              <div style="display: flex; align-items: center; gap: 12px; padding: 12px; background: rgba(7, 10, 15, 0.6); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: var(--radius-md); margin-bottom: 12px;">
                <span class="material-symbols-outlined" style="color: var(--color-emerald); font-size: 24px;">trending_up</span>
                <div>
                  <div style="font-family: var(--font-mono); font-size: 10px; color: var(--color-emerald); text-transform: uppercase; font-weight: 700;">
                    High Demand Stack
                  </div>
                  <div style="font-family: var(--font-headline); font-size: 14px; color: #FFFFFF; font-weight: 600;">
                    WebGL & Three.js (94% Surge)
                  </div>
                </div>
              </div>

              <p style="font-size: 12px; color: var(--color-text-secondary); line-height: 1.5;">
                <strong style="color: #FFFFFF;">14 new projects</strong> requiring your primary stack posted in the last 48 hours across scientific and deep-tech sectors.
              </p>
            </div>

          </div>

        </div>

      </div>
    `;

    // Add inline responsive styles for the grid
    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
      @media (min-width: 992px) {
        .discover-grid-layout {
          grid-template-columns: 1fr 340px !important;
        }
        .project-card-inner {
          flex-direction: row !important;
        }
        .project-score-col {
          border-left: 1px solid rgba(255, 255, 255, 0.08) !important;
          padding-left: 20px !important;
          border-top: none !important;
          padding-top: 0 !important;
        }
      }
      @media (max-width: 991px) {
        .project-card-inner {
          flex-direction: column !important;
        }
        .project-score-col {
          border-left: none !important;
          padding-left: 0 !important;
          border-top: 1px solid rgba(255, 255, 255, 0.08) !important;
          padding-top: 16px !important;
        }
      }
    `;
    container.appendChild(styleEl);

    // Event listeners
    container.querySelectorAll('.tech-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.selectedTechFilter = btn.getAttribute('data-filter') || 'ALL';
        this.render(container);
      });
    });

    document.getElementById('clear-filters-btn')?.addEventListener('click', () => {
      this.selectedTechFilter = 'ALL';
      this.searchQuery = '';
      this.render(container);
    });

    document.getElementById('empty-clear-filters-btn')?.addEventListener('click', () => {
      this.selectedTechFilter = 'ALL';
      this.searchQuery = '';
      this.render(container);
    });

    container.querySelectorAll('.glass-card[data-project-id]').forEach(card => {
      card.addEventListener('click', () => {
        const pId = card.getAttribute('data-project-id');
        const proj = this.app.state.projects.find(p => p.id === pId);
        if (proj) {
          this.app.modals.openProjectDetailModal(proj);
        }
      });
    });
  }

  filterByCapability(capName) {
    this.selectedTechFilter = capName;
    const container = document.getElementById('view-container');
    if (container) this.render(container);
  }

  destroy() {}
}
