// Navigation Shell Component (Desktop SideNav, Desktop TopHeader, Mobile BottomNav)

export class Navigation {
  constructor(onNavigate, onPostProjectClick, onSearchClick) {
    this.onNavigate = onNavigate;
    this.onPostProjectClick = onPostProjectClick;
    this.onSearchClick = onSearchClick;
    this.currentView = 'overview';

    this.sideNavEl = document.getElementById('side-nav');
    this.topHeaderEl = document.getElementById('top-header');
    this.mobileNavEl = document.getElementById('mobile-nav');

    this.init();
  }

  init() {
    this.renderSideNav();
    this.renderTopHeader();
    this.renderMobileNav();
    this.setupShortcuts();
  }

  setCurrentView(viewId) {
    this.currentView = viewId;
    this.updateActiveNavStates();
  }

  renderSideNav() {
    if (!this.sideNavEl) return;

    this.sideNavEl.innerHTML = `
      <!-- Brand Header -->
      <a href="#overview" class="nav-brand" data-view="overview">
        <div class="nav-brand-logo">
          <span class="material-symbols-outlined" style="font-size: 22px;">all_inclusive</span>
        </div>
        <div class="nav-brand-text">
          <h1>ProjectMatch</h1>
          <div class="nav-brand-status">
            <div class="status-dot"></div>
            <span class="status-text">MATCH ENGINE ● ONLINE</span>
          </div>
        </div>
      </a>

      <!-- Nav Menu Items -->
      <ul class="nav-menu">
        <li>
          <button class="nav-item-btn active" data-view="overview">
            <span class="material-symbols-outlined">dashboard</span>
            <span>Overview</span>
          </button>
        </li>
        <li>
          <button class="nav-item-btn" data-view="discover">
            <span class="material-symbols-outlined">explore</span>
            <span>Discover</span>
          </button>
        </li>
        <li>
          <button class="nav-item-btn" data-view="projects">
            <span class="material-symbols-outlined">folder_shared</span>
            <span>Projects</span>
            <span class="nav-badge" id="nav-projects-badge">6</span>
          </button>
        </li>
        <li>
          <button class="nav-item-btn" data-view="requests">
            <span class="material-symbols-outlined">notifications_active</span>
            <span>Requests</span>
            <span class="nav-badge" id="nav-requests-badge">3</span>
          </button>
        </li>
        <li>
          <button class="nav-item-btn" data-view="profile">
            <span class="material-symbols-outlined">person</span>
            <span>Profile</span>
          </button>
        </li>
      </ul>

      <!-- Footer CTA & Utilities -->
      <div class="nav-footer">
        <button class="btn-primary" id="side-nav-post-btn" style="width: 100%; border-radius: var(--radius-lg); padding: 13px 16px;">
          <span class="material-symbols-outlined" style="font-size: 18px;">add</span>
          Post Project
        </button>

        <div class="nav-footer-links">
          <button class="nav-footer-btn" id="btn-open-settings">
            <span class="material-symbols-outlined" style="font-size: 18px;">settings</span>
            <span>Settings & Vector Tuner</span>
          </button>
          <button class="nav-footer-btn" id="btn-open-docs">
            <span class="material-symbols-outlined" style="font-size: 18px;">help_outline</span>
            <span>Synthesis Guide</span>
          </button>
        </div>
      </div>
    `;

    // Event listeners
    this.sideNavEl.querySelectorAll('[data-view]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const view = el.getAttribute('data-view');
        if (view && this.onNavigate) {
          this.onNavigate(view);
        }
      });
    });

    const postBtn = document.getElementById('side-nav-post-btn');
    if (postBtn && this.onPostProjectClick) {
      postBtn.addEventListener('click', this.onPostProjectClick);
    }
  }

  renderTopHeader() {
    if (!this.topHeaderEl) return;

    this.topHeaderEl.innerHTML = `
      <div class="header-search-box" id="header-search-trigger">
        <span class="material-symbols-outlined">search</span>
        <input type="text" class="search-input" placeholder="SEARCH PROJECTS & CAPABILITIES" readonly />
        <span class="search-kbd">CTRL+K</span>
      </div>

      <div class="header-actions">
        <button class="header-icon-btn" title="Topology Visualizer" id="header-btn-topology">
          <span class="material-symbols-outlined" style="font-size: 20px;">account_tree</span>
        </button>
        <button class="header-icon-btn" title="Live Resonance Sensors" id="header-btn-sensors">
          <span class="material-symbols-outlined" style="font-size: 20px;">sensors</span>
          <span class="header-badge-dot"></span>
        </button>

        <div class="header-user-badge" id="header-user-profile-trigger">
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" alt="Maya Chen" class="header-user-avatar" />
          <span class="header-user-name">Maya Chen</span>
          <span class="material-symbols-outlined" style="font-size: 16px; color: var(--color-text-muted);">expand_more</span>
        </div>
      </div>
    `;

    const searchBox = document.getElementById('header-search-trigger');
    if (searchBox && this.onSearchClick) {
      searchBox.addEventListener('click', this.onSearchClick);
    }

    const topologyBtn = document.getElementById('header-btn-topology');
    if (topologyBtn) {
      topologyBtn.addEventListener('click', () => {
        if (this.onNavigate) this.onNavigate('overview');
      });
    }

    const userBadge = document.getElementById('header-user-profile-trigger');
    if (userBadge) {
      userBadge.addEventListener('click', () => {
        if (this.onNavigate) this.onNavigate('profile');
      });
    }
  }

  renderMobileNav() {
    if (!this.mobileNavEl) return;

    this.mobileNavEl.innerHTML = `
      <button class="mobile-nav-btn active" data-view="overview">
        <span class="material-symbols-outlined">dashboard</span>
        <span>Home</span>
      </button>
      <button class="mobile-nav-btn" data-view="discover">
        <span class="material-symbols-outlined">explore</span>
        <span>Explore</span>
      </button>
      <button class="mobile-nav-btn" data-view="projects">
        <span class="material-symbols-outlined">folder_shared</span>
        <span>Projects</span>
      </button>
      <button class="mobile-nav-btn" data-view="requests">
        <span class="material-symbols-outlined">notifications</span>
        <span>Alerts</span>
      </button>
      <button class="mobile-nav-btn" data-view="profile">
        <span class="material-symbols-outlined">person</span>
        <span>Profile</span>
      </button>
    `;

    this.mobileNavEl.querySelectorAll('[data-view]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const view = btn.getAttribute('data-view');
        if (view && this.onNavigate) {
          this.onNavigate(view);
        }
      });
    });
  }

  updateActiveNavStates() {
    // Desktop SideNav buttons
    if (this.sideNavEl) {
      this.sideNavEl.querySelectorAll('.nav-item-btn').forEach(btn => {
        if (btn.getAttribute('data-view') === this.currentView) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    }

    // Mobile BottomNav buttons
    if (this.mobileNavEl) {
      this.mobileNavEl.querySelectorAll('.mobile-nav-btn').forEach(btn => {
        if (btn.getAttribute('data-view') === this.currentView) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    }
  }

  setupShortcuts() {
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (this.onSearchClick) {
          this.onSearchClick();
        }
      }
    });
  }
}
