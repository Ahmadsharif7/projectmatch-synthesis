// Synthesis Command Center View (Overview)
import { CapabilityTopology3D } from '../components/CapabilityTopology3D.js';

export class OverviewView {
  constructor(app) {
    this.app = app;
    this.topology3D = null;
  }

  render(container) {
    const projects = this.app.state.projects.slice(0, 3);

    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 32px; padding-bottom: 24px;">
        
        <!-- Hero Section -->
        <header class="slide-up" style="display: flex; flex-direction: column; gap: 16px;">
          <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-end; gap: 20px;">
            <div style="max-width: 680px;">
              <div style="display: inline-flex; align-items: center; gap: 8px; margin-bottom: 12px; padding: 4px 12px; background: rgba(30, 32, 34, 0.7); border-radius: var(--radius-full); border: 1px solid rgba(255, 255, 255, 0.1);">
                <div class="status-dot"></div>
                <span style="font-family: var(--font-mono); font-size: 11px; color: var(--color-secondary); letter-spacing: 0.08em; font-weight: 600;">
                  SYSTEM OPERATIONAL ● TOPOLOGY SYNCED
                </span>
              </div>
              <h1 style="font-family: var(--font-headline); font-size: clamp(30px, 4.5vw, 48px); font-weight: 700; color: #FFFFFF; line-height: 1.1; letter-spacing: -0.03em; margin-bottom: 12px;">
                BUILD SOMETHING REMARKABLE.
              </h1>
              <p style="font-size: 16px; color: var(--color-on-surface-variant); line-height: 1.5; max-width: 580px;">
                Discover the people who complete your team's capabilities. AI-driven capability mapping and orbital resonance analysis initiated.
              </p>
            </div>

            <div style="display: flex; gap: 12px;">
              <button class="btn-ghost" id="hero-quick-filter-btn">
                <span class="material-symbols-outlined" style="font-size: 18px;">tune</span>
                FILTERS
              </button>
              <button class="btn-primary" id="hero-post-proj-btn">
                <span class="material-symbols-outlined" style="font-size: 18px;">add</span>
                POST PROJECT
              </button>
            </div>
          </div>
        </header>

        <!-- 3D Capability Topology Central Stage -->
        <section class="glass-panel lens-flare slide-up delay-100" style="position: relative; height: 440px; border-radius: var(--radius-xl); overflow: hidden; background: var(--color-surface-deep); box-shadow: 0 20px 50px rgba(0,0,0,0.6);">
          
          <!-- Top Overlay UI -->
          <div style="position: absolute; top: 0; left: 0; right: 0; z-index: 20; padding: 20px; display: flex; justify-content: space-between; align-items: center; pointer-events: none;">
            <div style="display: flex; align-items: center; gap: 10px; background: rgba(7, 10, 15, 0.7); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.08); padding: 6px 14px; border-radius: var(--radius-md);">
              <span class="material-symbols-outlined" style="color: var(--color-primary); font-size: 20px;">view_in_ar</span>
              <span style="font-family: var(--font-headline); font-size: 14px; font-weight: 700; color: #FFFFFF; letter-spacing: 0.05em;">CAPABILITY TOPOLOGY</span>
            </div>

            <div id="topology-hover-badge" style="display: flex; align-items: center; gap: 8px; font-family: var(--font-mono); font-size: 11px; color: var(--color-text-secondary); background: rgba(7, 10, 15, 0.85); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.1); padding: 6px 14px; border-radius: var(--radius-md); transition: all 0.2s;">
              <span class="status-dot"></span>
              <span>TOPOLOGY ACTIVE: 4,092 NODES</span>
            </div>
          </div>

          <!-- Center Interactive Instruction Pill -->
          <div style="position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); z-index: 20; pointer-events: none;">
            <div style="background: rgba(7, 10, 15, 0.85); backdrop-filter: blur(16px); padding: 8px 20px; border-radius: var(--radius-full); border: 1px solid rgba(208, 188, 255, 0.3); box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5); pointer-events: auto; cursor: grab; display: flex; align-items: center; gap: 8px;">
              <span class="material-symbols-outlined" style="font-size: 16px; color: var(--color-primary);">drag_pan</span>
              <span style="font-family: var(--font-mono); font-size: 11px; font-weight: 700; color: var(--color-primary); letter-spacing: 0.1em; text-transform: uppercase;">
                Drag to Rotate • Click Node to Inspect
              </span>
            </div>
          </div>

          <!-- Three.js Canvas Container -->
          <div id="topology-3d-container" style="width: 100%; height: 100%; position: absolute; inset: 0;"></div>
        </section>

        <!-- High-Signal Projects Section -->
        <section class="slide-up delay-200" style="display: flex; flex-direction: column; gap: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 1px solid rgba(255, 255, 255, 0.08); padding-bottom: 14px;">
            <div>
              <div style="font-family: var(--font-mono); font-size: 11px; color: var(--color-primary); font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 4px;">
                RESONANCE FILTER: 80%+ OVERLAP
              </div>
              <h2 style="font-family: var(--font-headline); font-size: 22px; color: #FFFFFF; font-weight: 700;">
                HIGH-SIGNAL PROJECTS
              </h2>
            </div>

            <button class="btn-ghost" id="view-all-projects-btn" style="border: none; color: var(--color-secondary); font-size: 12px; padding: 6px 10px;">
              VIEW ALL DISCOVERIES
              <span class="material-symbols-outlined" style="font-size: 16px;">arrow_forward</span>
            </button>
          </div>

          <!-- Grid of High-Signal Projects -->
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px;">
            ${projects.map((p, idx) => `
              <div class="glass-card" data-project-id="${p.id}" style="padding: 22px; display: flex; flex-direction: column; gap: 16px; cursor: pointer; position: relative;">
                
                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                  <div style="background: rgba(139, 92, 246, 0.18); color: var(--color-primary); font-family: var(--font-mono); font-size: 12px; font-weight: 700; padding: 4px 10px; border-radius: var(--radius-sm); border: 1px solid rgba(208, 188, 255, 0.35); box-shadow: 0 0 12px rgba(139, 92, 246, 0.2);">
                    MATCH: <span class="counter-score" data-target="${p.matchScore}">0</span>%
                  </div>

                  <button class="header-icon-btn bookmark-btn" data-id="${p.id}" style="width: 32px; height: 32px; border: none;" title="Bookmark Project">
                    <span class="material-symbols-outlined" style="font-size: 20px; color: ${p.bookmarked ? 'var(--color-primary)' : 'var(--color-text-secondary)'}; font-variation-settings: 'FILL' ${p.bookmarked ? 1 : 0};">
                      ${p.bookmarked ? 'bookmark' : 'bookmark_border'}
                    </span>
                  </button>
                </div>

                <div>
                  <h3 style="font-family: var(--font-headline); font-size: 19px; color: #FFFFFF; font-weight: 700; margin-bottom: 6px; line-height: 1.3;">
                    ${p.title}
                  </h3>
                  <p style="font-size: 13px; color: var(--color-text-secondary); line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                    ${p.tagline}
                  </p>
                </div>

                <div style="margin-top: auto; padding-top: 12px; border-top: 1px solid rgba(255, 255, 255, 0.06); display: flex; flex-wrap: wrap; gap: 6px;">
                  ${p.capabilities.slice(0, 3).map(cap => `<span class="tech-chip ${p.matchingCapabilities?.includes(cap) ? 'match' : ''}">${cap}</span>`).join('')}
                  ${p.capabilities.length > 3 ? `<span class="tech-chip">+${p.capabilities.length - 3}</span>` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        </section>

      </div>
    `;

    // Initialize 3D Capability Topology
    const topologyContainer = document.getElementById('topology-3d-container');
    if (topologyContainer) {
      this.topology3D = new CapabilityTopology3D(topologyContainer, (nodeData) => {
        this.app.modals.openTopologyNodeModal(nodeData);
      });
    }

    // Animate match score counters
    this.animateCounters(container);

    // Event handlers
    document.getElementById('hero-quick-filter-btn')?.addEventListener('click', () => {
      this.app.navigateTo('discover');
    });

    document.getElementById('hero-post-proj-btn')?.addEventListener('click', () => {
      this.app.modals.openPostProjectModal();
    });

    document.getElementById('view-all-projects-btn')?.addEventListener('click', () => {
      this.app.navigateTo('discover');
    });

    container.querySelectorAll('.glass-card[data-project-id]').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.bookmark-btn')) return;
        const pId = card.getAttribute('data-project-id');
        const proj = this.app.state.projects.find(p => p.id === pId);
        if (proj) {
          this.app.modals.openProjectDetailModal(proj);
        }
      });
    });

    container.querySelectorAll('.bookmark-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const pId = btn.getAttribute('data-id');
        this.app.toggleBookmark(pId);
      });
    });
  }

  animateCounters(container) {
    container.querySelectorAll('.counter-score').forEach(el => {
      const target = parseInt(el.getAttribute('data-target')) || 90;
      let current = 0;
      const duration = 1200;
      const stepTime = Math.max(15, Math.floor(duration / target));

      const timer = setInterval(() => {
        current += 2;
        if (current >= target) {
          el.innerText = target;
          clearInterval(timer);
        } else {
          el.innerText = current;
        }
      }, stepTime);
    });
  }

  destroy() {
    if (this.topology3D) {
      this.topology3D.destroy();
      this.topology3D = null;
    }
  }
}
