// Global Modals & Command Palette Component

export class ModalManager {
  constructor(app) {
    this.app = app;
    this.modalContainer = document.getElementById('modal-container');
    this.activeModal = null;

    if (this.modalContainer) {
      this.modalContainer.addEventListener('click', (e) => {
        if (e.target === this.modalContainer) {
          this.close();
        }
      });

      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.activeModal) {
          this.close();
        }
      });
    }
  }

  close() {
    if (!this.modalContainer) return;
    this.modalContainer.classList.add('hidden');
    this.modalContainer.innerHTML = '';
    this.activeModal = null;
  }

  // 1. Post Project Modal
  openPostProjectModal() {
    if (!this.modalContainer) return;
    this.activeModal = 'post_project';

    this.modalContainer.innerHTML = `
      <div class="modal-dialog">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px;">
          <div>
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
              <span class="status-dot"></span>
              <span style="font-family: var(--font-mono); font-size: 10px; color: var(--color-secondary); letter-spacing: 0.1em;">NEW CAPABILITY SPECIFICATION</span>
            </div>
            <h2 style="font-family: var(--font-headline); font-size: 24px; color: #FFFFFF; font-weight: 700;">Initiate Project Post</h2>
          </div>
          <button id="modal-close-btn" class="header-icon-btn" style="border: none;">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>

        <form id="post-project-form" style="display: flex; flex-direction: column; gap: 16px;">
          <div>
            <label style="display: block; font-family: var(--font-mono); font-size: 11px; color: var(--color-text-secondary); text-transform: uppercase; margin-bottom: 6px;">
              Project Title *
            </label>
            <input type="text" id="post-title" required class="search-input" style="padding-left: 14px; font-size: 13px;" placeholder="e.g. Photonic Network Controller" />
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
            <div>
              <label style="display: block; font-family: var(--font-mono); font-size: 11px; color: var(--color-text-secondary); text-transform: uppercase; margin-bottom: 6px;">
                Category / Domain *
              </label>
              <select id="post-category" class="search-input" style="padding-left: 14px; font-size: 13px;">
                <option value="High Signal">High Signal Computing</option>
                <option value="Deep Tech">Deep Tech / Photonics</option>
                <option value="Audio / DSP">Audio & Signal Processing</option>
                <option value="Decentralized AI">Decentralized AI / ML</option>
                <option value="Robotics">Robotics & Spatial 3D</option>
                <option value="Biotech">Biotech Synthesis</option>
              </select>
            </div>
            <div>
              <label style="display: block; font-family: var(--font-mono); font-size: 11px; color: var(--color-text-secondary); text-transform: uppercase; margin-bottom: 6px;">
                Estimated Duration *
              </label>
              <input type="text" id="post-duration" required class="search-input" style="padding-left: 14px; font-size: 13px;" placeholder="e.g. 3-4 mos" value="3 mos" />
            </div>
          </div>

          <div>
            <label style="display: block; font-family: var(--font-mono); font-size: 11px; color: var(--color-text-secondary); text-transform: uppercase; margin-bottom: 6px;">
              High-Level Tagline *
            </label>
            <input type="text" id="post-tagline" required class="search-input" style="padding-left: 14px; font-size: 13px;" placeholder="One-line mission statement" />
          </div>

          <div>
            <label style="display: block; font-family: var(--font-mono); font-size: 11px; color: var(--color-text-secondary); text-transform: uppercase; margin-bottom: 6px;">
              Full Description & Technical Architecture *
            </label>
            <textarea id="post-description" rows="3" required class="search-input" style="padding: 10px 14px; font-size: 13px; resize: vertical;" placeholder="Outline the team topology requirements, system stack, and current bottlenecks..."></textarea>
          </div>

          <div>
            <label style="display: block; font-family: var(--font-mono); font-size: 11px; color: var(--color-text-secondary); text-transform: uppercase; margin-bottom: 6px;">
              Required Capability Tags (Comma-Separated) *
            </label>
            <input type="text" id="post-capabilities" required class="search-input" style="padding-left: 14px; font-size: 13px;" placeholder="e.g. WebGL, Rust, Three.js, Distributed Systems" value="WebGL, React.js, Three.js" />
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
            <div>
              <label style="display: block; font-family: var(--font-mono); font-size: 11px; color: var(--color-text-secondary); text-transform: uppercase; margin-bottom: 6px;">
                Total Team Capacity Slots
              </label>
              <input type="number" id="post-slots" min="1" max="12" value="4" class="search-input" style="padding-left: 14px; font-size: 13px;" />
            </div>
            <div>
              <label style="display: block; font-family: var(--font-mono); font-size: 11px; color: var(--color-text-secondary); text-transform: uppercase; margin-bottom: 6px;">
                Initial Target Resonance
              </label>
              <div style="padding: 10px 14px; background: rgba(139, 92, 246, 0.1); border: 1px solid rgba(208, 188, 255, 0.3); border-radius: var(--radius-lg); color: var(--color-primary); font-family: var(--font-mono); font-size: 13px; font-weight: 600;">
                AI Synthesis Active (90%+)
              </div>
            </div>
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 10px; padding-top: 14px; border-top: 1px solid rgba(255, 255, 255, 0.08);">
            <button type="button" id="modal-cancel-btn" class="btn-ghost">Cancel</button>
            <button type="submit" class="btn-primary">
              <span class="material-symbols-outlined" style="font-size: 18px;">rocket_launch</span>
              Deploy Specification
            </button>
          </div>
        </form>
      </div>
    `;

    this.modalContainer.classList.remove('hidden');

    document.getElementById('modal-close-btn')?.addEventListener('click', () => this.close());
    document.getElementById('modal-cancel-btn')?.addEventListener('click', () => this.close());

    document.getElementById('post-project-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('post-title').value.trim();
      const category = document.getElementById('post-category').value;
      const duration = document.getElementById('post-duration').value.trim();
      const tagline = document.getElementById('post-tagline').value.trim();
      const description = document.getElementById('post-description').value.trim();
      const capsStr = document.getElementById('post-capabilities').value.trim();
      const totalSlots = parseInt(document.getElementById('post-slots').value) || 4;

      const capabilities = capsStr.split(',').map(s => s.trim()).filter(Boolean);

      const newProject = {
        id: 'proj_' + Date.now(),
        title,
        matchScore: Math.floor(Math.random() * 8 + 90),
        category,
        tagline,
        description,
        duration,
        slotsFilled: 1,
        totalSlots,
        capabilities,
        matchingCapabilities: capabilities.slice(0, 2),
        lead: this.app.state.profile.name,
        leadAvatar: this.app.state.profile.avatar,
        whyThisMatch: 'Created by your profile. System prioritizes matching candidate profiles with complementary topology nodes.',
        bookmarked: false,
        colorAccent: 'primary'
      };

      this.app.addProject(newProject);
      this.close();
    });
  }

  // 2. Project Details Modal
  openProjectDetailModal(project) {
    if (!this.modalContainer || !project) return;
    this.activeModal = 'project_detail';

    const isBookmarked = project.bookmarked;

    this.modalContainer.innerHTML = `
      <div class="modal-dialog">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px;">
          <div style="flex: 1;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
              <span class="badge-high-signal">${project.category || 'High Signal'}</span>
              <span style="font-family: var(--font-mono); font-size: 11px; color: var(--color-text-muted);">
                Duration: ${project.duration}
              </span>
              <span style="font-family: var(--font-mono); font-size: 11px; color: var(--color-text-muted);">
                Slots: ${project.slotsFilled}/${project.totalSlots}
              </span>
            </div>
            <h2 style="font-family: var(--font-headline); font-size: 26px; color: #FFFFFF; font-weight: 700; line-height: 1.2;">
              ${project.title}
            </h2>
          </div>
          <button id="modal-close-btn" class="header-icon-btn" style="border: none;">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>

        <!-- Resonance Match Meter -->
        <div style="background: rgba(18, 19, 22, 0.7); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: var(--radius-lg); padding: 16px; margin-bottom: 20px; display: flex; align-items: center; gap: 20px;">
          <div style="position: relative; width: 64px; height: 64px; flex-shrink: 0; display: flex; align-items: center; justify-content: center;">
            <svg style="width: 100%; height: 100%; transform: rotate(-90deg);">
              <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="4"></circle>
              <circle cx="32" cy="32" r="28" fill="none" stroke="var(--color-primary)" stroke-width="4" stroke-dasharray="175" stroke-dashoffset="${175 - (175 * project.matchScore) / 100}"></circle>
            </svg>
            <div style="position: absolute; font-family: var(--font-headline); font-size: 18px; font-weight: 700; color: #FFFFFF;">
              ${project.matchScore}<span style="font-size: 11px;">%</span>
            </div>
          </div>
          <div style="flex: 1;">
            <div style="font-family: var(--font-mono); font-size: 11px; color: var(--color-primary); text-transform: uppercase; font-weight: 700; margin-bottom: 3px;">
              AI Match Rationale
            </div>
            <p style="font-size: 13px; color: var(--color-on-surface-variant); line-height: 1.4;">
              ${project.whyThisMatch}
            </p>
          </div>
        </div>

        <!-- Description -->
        <div style="margin-bottom: 20px;">
          <h4 style="font-family: var(--font-mono); font-size: 11px; color: var(--color-text-secondary); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 8px;">
            Mission & Architecture
          </h4>
          <p style="color: var(--color-on-surface); font-size: 14px; line-height: 1.6;">
            ${project.description}
          </p>
        </div>

        <!-- Required Capabilities -->
        <div style="margin-bottom: 24px;">
          <h4 style="font-family: var(--font-mono); font-size: 11px; color: var(--color-text-secondary); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 10px;">
            Required Capability Topology
          </h4>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${project.capabilities.map(cap => {
              const isMatch = project.matchingCapabilities?.includes(cap);
              return `<span class="tech-chip ${isMatch ? 'match' : ''}">
                ${isMatch ? '<span class="material-symbols-outlined" style="font-size: 14px;">check_circle</span>' : ''}
                ${cap}
              </span>`;
            }).join('')}
          </div>
        </div>

        <!-- Lead Info & Actions -->
        <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 16px; border-top: 1px solid rgba(255, 255, 255, 0.08);">
          <div style="display: flex; align-items: center; gap: 10px;">
            <img src="${project.leadAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'}" alt="${project.lead}" style="width: 36px; height: 36px; border-radius: var(--radius-md); object-fit: cover; border: 1px solid rgba(255,255,255,0.15);" />
            <div>
              <div style="font-family: var(--font-body); font-size: 13px; font-weight: 600; color: #FFFFFF;">${project.lead}</div>
              <div style="font-family: var(--font-mono); font-size: 10px; color: var(--color-text-muted);">Project Initiator</div>
            </div>
          </div>

          <div style="display: flex; gap: 10px;">
            <button id="modal-bookmark-btn" class="btn-ghost" style="padding: 10px 14px;">
              <span class="material-symbols-outlined" style="font-size: 18px; color: ${isBookmarked ? 'var(--color-primary)' : 'inherit'}; font-variation-settings: 'FILL' ${isBookmarked ? 1 : 0};">
                ${isBookmarked ? 'bookmark' : 'bookmark_border'}
              </span>
            </button>
            <button id="modal-propose-match-btn" class="btn-primary">
              <span class="material-symbols-outlined" style="font-size: 18px;">handshake</span>
              Propose Match
            </button>
          </div>
        </div>
      </div>
    `;

    this.modalContainer.classList.remove('hidden');

    document.getElementById('modal-close-btn')?.addEventListener('click', () => this.close());

    document.getElementById('modal-bookmark-btn')?.addEventListener('click', () => {
      this.app.toggleBookmark(project.id);
      this.openProjectDetailModal(this.app.state.projects.find(p => p.id === project.id));
    });

    document.getElementById('modal-propose-match-btn')?.addEventListener('click', () => {
      this.app.sendMatchProposal(project);
      this.close();
    });
  }

  // 3. Command Palette / Search Modal
  openCommandPalette() {
    if (!this.modalContainer) return;
    this.activeModal = 'command_palette';

    this.modalContainer.innerHTML = `
      <div class="modal-dialog" style="max-width: 580px; padding: 16px;">
        <div style="position: relative; margin-bottom: 12px;">
          <span class="material-symbols-outlined" style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: var(--color-primary); font-size: 22px;">
            search
          </span>
          <input type="text" id="palette-search-input" autofocus class="search-input" style="padding: 14px 14px 14px 48px; font-size: 15px; background: var(--color-surface-container-lowest);" placeholder="Search projects, capabilities, commands..." />
        </div>

        <div id="palette-results" style="max-height: 380px; overflow-y: auto; display: flex; flex-direction: column; gap: 4px;"></div>

        <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 10px; margin-top: 10px; border-top: 1px solid rgba(255,255,255,0.06); font-family: var(--font-mono); font-size: 11px; color: var(--color-text-muted);">
          <span>Navigation: <kbd style="background: rgba(255,255,255,0.08); padding: 2px 6px; border-radius: 4px;">TAB</kbd> / <kbd style="background: rgba(255,255,255,0.08); padding: 2px 6px; border-radius: 4px;">ENTER</kbd></span>
          <span>Close: <kbd style="background: rgba(255,255,255,0.08); padding: 2px 6px; border-radius: 4px;">ESC</kbd></span>
        </div>
      </div>
    `;

    this.modalContainer.classList.remove('hidden');

    const input = document.getElementById('palette-search-input');
    const resultsContainer = document.getElementById('palette-results');
    input?.focus();

    const renderResults = (query) => {
      const q = query.toLowerCase().trim();
      const matchingProjects = this.app.state.projects.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.capabilities.some(c => c.toLowerCase().includes(q))
      );

      const navItems = [
        { name: 'Overview / Command Center', view: 'overview', icon: 'dashboard' },
        { name: 'Discover Projects', view: 'discover', icon: 'explore' },
        { name: 'Projects Management', view: 'projects', icon: 'folder_shared' },
        { name: 'Connection Activity', view: 'requests', icon: 'notifications_active' },
        { name: 'Maya Chen Profile', view: 'profile', icon: 'person' }
      ].filter(item => item.name.toLowerCase().includes(q));

      let html = '';

      if (navItems.length > 0) {
        html += `<div style="font-family: var(--font-mono); font-size: 10px; color: var(--color-text-secondary); text-transform: uppercase; padding: 8px 12px;">Views & Navigation</div>`;
        html += navItems.map(item => `
          <div class="palette-item" data-action="navigate" data-view="${item.view}" style="display: flex; align-items: center; gap: 12px; padding: 10px 14px; border-radius: var(--radius-md); cursor: pointer; transition: background 0.15s;">
            <span class="material-symbols-outlined" style="font-size: 20px; color: var(--color-primary);">${item.icon}</span>
            <span style="font-size: 13px; font-weight: 500; color: #FFFFFF;">${item.name}</span>
          </div>
        `).join('');
      }

      if (matchingProjects.length > 0) {
        html += `<div style="font-family: var(--font-mono); font-size: 10px; color: var(--color-text-secondary); text-transform: uppercase; padding: 8px 12px; margin-top: 6px;">Projects & Topology</div>`;
        html += matchingProjects.map(proj => `
          <div class="palette-item" data-action="project" data-id="${proj.id}" style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; border-radius: var(--radius-md); cursor: pointer; transition: background 0.15s;">
            <div>
              <div style="font-size: 13px; font-weight: 600; color: #FFFFFF;">${proj.title}</div>
              <div style="font-size: 11px; color: var(--color-text-secondary); line-clamp: 1;">${proj.tagline}</div>
            </div>
            <div class="badge-high-signal">${proj.matchScore}%</div>
          </div>
        `).join('');
      }

      if (navItems.length === 0 && matchingProjects.length === 0) {
        html = `<div style="padding: 24px; text-align: center; color: var(--color-text-muted); font-size: 13px;">No results found for "${query}"</div>`;
      }

      if (resultsContainer) {
        resultsContainer.innerHTML = html;

        resultsContainer.querySelectorAll('.palette-item').forEach(el => {
          el.addEventListener('mouseenter', () => {
            el.style.background = 'rgba(139, 92, 246, 0.15)';
          });
          el.addEventListener('mouseleave', () => {
            el.style.background = 'transparent';
          });
          el.addEventListener('click', () => {
            const action = el.getAttribute('data-action');
            if (action === 'navigate') {
              const v = el.getAttribute('data-view');
              this.app.navigateTo(v);
              this.close();
            } else if (action === 'project') {
              const pId = el.getAttribute('data-id');
              const p = this.app.state.projects.find(x => x.id === pId);
              if (p) {
                this.close();
                this.openProjectDetailModal(p);
              }
            }
          });
        });
      }
    };

    renderResults('');

    input?.addEventListener('input', (e) => {
      renderResults(e.target.value);
    });
  }

  // 4. Node Detail Modal (from 3D Topology click)
  openTopologyNodeModal(nodeData) {
    if (!this.modalContainer || !nodeData) return;
    this.activeModal = 'topology_node';

    this.modalContainer.innerHTML = `
      <div class="modal-dialog" style="max-width: 520px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
          <div>
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
              <span class="status-dot" style="background: #22D3EE;"></span>
              <span style="font-family: var(--font-mono); font-size: 10px; color: var(--color-secondary); letter-spacing: 0.1em;">CAPABILITY RESONANCE NODE</span>
            </div>
            <h2 style="font-family: var(--font-headline); font-size: 24px; color: #FFFFFF; font-weight: 700;">
              ${nodeData.name}
            </h2>
          </div>
          <button id="modal-close-btn" class="header-icon-btn" style="border: none;">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>

        <div style="background: rgba(18, 19, 22, 0.7); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: var(--radius-lg); padding: 16px; margin-bottom: 20px;">
          <div style="display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: 12px; margin-bottom: 8px;">
            <span style="color: var(--color-on-surface);">Topology Saturation</span>
            <span style="color: var(--color-primary); font-weight: 700;">${nodeData.score || 94}%</span>
          </div>
          <div style="height: 6px; background: var(--color-surface-deep); border-radius: 4px; overflow: hidden; margin-bottom: 12px;">
            <div style="height: 100%; width: ${nodeData.score || 94}%; background: linear-gradient(90deg, #8B5CF6, #22D3EE); border-radius: 4px;"></div>
          </div>
          <p style="font-size: 13px; color: var(--color-on-surface-variant); line-height: 1.5;">
            ${nodeData.info || 'High-performance capability cluster verified across recent code repositories and architectural deliverables.'}
          </p>
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 10px;">
          <button type="button" id="modal-filter-cap-btn" class="btn-primary" style="width: 100%;">
            <span class="material-symbols-outlined" style="font-size: 18px;">explore</span>
            Find Projects Requiring ${nodeData.name}
          </button>
        </div>
      </div>
    `;

    this.modalContainer.classList.remove('hidden');

    document.getElementById('modal-close-btn')?.addEventListener('click', () => this.close());
    document.getElementById('modal-filter-cap-btn')?.addEventListener('click', () => {
      this.close();
      this.app.navigateTo('discover');
      this.app.filterByCapability(nodeData.name);
    });
  }
}
