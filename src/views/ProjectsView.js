// Synthesis Projects Management View (Projects)

export class ProjectsView {
  constructor(app) {
    this.app = app;
    this.activeFilter = 'ALL';
  }

  render(container) {
    const state = this.app.state;
    let projects = [...state.projects];

    if (this.activeFilter === 'BOOKMARKED') {
      projects = projects.filter(p => p.bookmarked);
    } else if (this.activeFilter === 'MY_PROJECTS') {
      projects = projects.filter(p => p.lead === state.profile.name);
    }

    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 28px; padding-bottom: 24px;">
        
        <!-- Header -->
        <div class="slide-up" style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-end; gap: 16px;">
          <div>
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
              <span class="status-dot"></span>
              <span style="font-family: var(--font-mono); font-size: 11px; color: var(--color-primary); letter-spacing: 0.08em; text-transform: uppercase; font-weight: 600;">
                ACTIVE TEAM TOPOLOGIES
              </span>
            </div>
            <h1 style="font-family: var(--font-headline); font-size: clamp(28px, 4vw, 42px); font-weight: 700; color: #FFFFFF; letter-spacing: -0.03em;">
              PROJECTS & TEAM CAPACITY
            </h1>
            <p style="font-size: 15px; color: var(--color-on-surface-variant); max-width: 600px;">
              Manage your active collaborations, tracked bookmarks, and open technical leadership seats.
            </p>
          </div>

          <button class="btn-primary" id="proj-post-btn">
            <span class="material-symbols-outlined" style="font-size: 18px;">add</span>
            Post New Project
          </button>
        </div>

        <!-- Filter Tabs -->
        <div class="glass-panel slide-up delay-100" style="padding: 6px 14px; display: flex; gap: 12px; border-radius: var(--radius-lg);">
          <button class="proj-tab-btn ${this.activeFilter === 'ALL' ? 'active' : ''}" data-tab="ALL" style="background: ${this.activeFilter === 'ALL' ? 'rgba(139, 92, 246, 0.2)' : 'transparent'}; color: ${this.activeFilter === 'ALL' ? 'var(--color-primary)' : 'var(--color-text-secondary)'}; border: none; font-family: var(--font-mono); font-size: 11.5px; font-weight: 700; padding: 8px 16px; border-radius: var(--radius-md); cursor: pointer; transition: all 0.2s;">
            ALL ACTIVE (${state.projects.length})
          </button>
          <button class="proj-tab-btn ${this.activeFilter === 'BOOKMARKED' ? 'active' : ''}" data-tab="BOOKMARKED" style="background: ${this.activeFilter === 'BOOKMARKED' ? 'rgba(139, 92, 246, 0.2)' : 'transparent'}; color: ${this.activeFilter === 'BOOKMARKED' ? 'var(--color-primary)' : 'var(--color-text-secondary)'}; border: none; font-family: var(--font-mono); font-size: 11.5px; font-weight: 700; padding: 8px 16px; border-radius: var(--radius-md); cursor: pointer; transition: all 0.2s;">
            BOOKMARKED (${state.projects.filter(p => p.bookmarked).length})
          </button>
          <button class="proj-tab-btn ${this.activeFilter === 'MY_PROJECTS' ? 'active' : ''}" data-tab="MY_PROJECTS" style="background: ${this.activeFilter === 'MY_PROJECTS' ? 'rgba(139, 92, 246, 0.2)' : 'transparent'}; color: ${this.activeFilter === 'MY_PROJECTS' ? 'var(--color-primary)' : 'var(--color-text-secondary)'}; border: none; font-family: var(--font-mono); font-size: 11.5px; font-weight: 700; padding: 8px 16px; border-radius: var(--radius-md); cursor: pointer; transition: all 0.2s;">
            DEPLOYED BY ME (${state.projects.filter(p => p.lead === state.profile.name).length})
          </button>
        </div>

        <!-- Project Cards Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 24px;">
          ${projects.length === 0 ? `
            <div class="glass-panel" style="grid-column: 1 / -1; padding: 48px; text-align: center;">
              <span class="material-symbols-outlined" style="font-size: 44px; color: var(--color-text-muted); margin-bottom: 8px;">folder_off</span>
              <h3 style="font-family: var(--font-headline); font-size: 18px; color: #FFFFFF; margin-bottom: 6px;">No Projects in This Filter</h3>
              <p style="color: var(--color-text-secondary); font-size: 13px;">Bookmark projects in the discovery view or post your own specification.</p>
            </div>
          ` : ''}

          ${projects.map(p => `
            <div class="glass-card slide-up" data-project-id="${p.id}" style="padding: 24px; display: flex; flex-direction: column; gap: 16px; cursor: pointer; position: relative;">
              
              <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <div>
                  <span class="badge-high-signal" style="margin-bottom: 6px;">${p.category}</span>
                  <h3 style="font-family: var(--font-headline); font-size: 20px; color: #FFFFFF; font-weight: 700; line-height: 1.2;">
                    ${p.title}
                  </h3>
                </div>

                <div class="badge-high-signal" style="background: rgba(93, 230, 255, 0.12); color: var(--color-secondary); border-color: rgba(93, 230, 255, 0.3);">
                  ${p.matchScore}%
                </div>
              </div>

              <p style="font-size: 13px; color: var(--color-text-secondary); line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                ${p.tagline}
              </p>

              <!-- Capacity Slot Meter -->
              <div style="background: rgba(7, 10, 15, 0.5); padding: 12px; border-radius: var(--radius-md); border: 1px solid rgba(255, 255, 255, 0.06);">
                <div style="display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: 11px; margin-bottom: 6px;">
                  <span style="color: var(--color-on-surface);">Team Slot Allocation</span>
                  <span style="color: var(--color-secondary); font-weight: 700;">${p.slotsFilled} of ${p.totalSlots} Seats</span>
                </div>
                <div style="height: 6px; background: var(--color-surface-deep); border-radius: 4px; overflow: hidden;">
                  <div style="height: 100%; width: ${(p.slotsFilled / p.totalSlots) * 100}%; background: linear-gradient(90deg, #8B5CF6, #22D3EE); border-radius: 4px;"></div>
                </div>
              </div>

              <!-- Footer with Lead & Duration -->
              <div style="margin-top: auto; padding-top: 12px; border-top: 1px solid rgba(255, 255, 255, 0.06); display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <img src="${p.leadAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}" style="width: 24px; height: 24px; border-radius: 50%; object-fit: cover;" />
                  <span style="font-size: 12px; color: var(--color-on-surface); font-weight: 500;">${p.lead}</span>
                </div>

                <span style="font-family: var(--font-mono); font-size: 11px; color: var(--color-text-muted);">
                  ${p.duration}
                </span>
              </div>

            </div>
          `).join('')}
        </div>

      </div>
    `;

    // Event handlers
    document.getElementById('proj-post-btn')?.addEventListener('click', () => {
      this.app.modals.openPostProjectModal();
    });

    container.querySelectorAll('.proj-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.activeFilter = btn.getAttribute('data-tab') || 'ALL';
        this.render(container);
      });
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

  destroy() {}
}
