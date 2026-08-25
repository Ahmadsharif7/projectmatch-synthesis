// ProjectMatch Synthesis - Main Application Orchestrator
import { getAppState, saveAppState } from './data/mockData.js';
import { ShaderBackground } from './components/ShaderBackground.js';
import { Navigation } from './components/Navigation.js';
import { ModalManager } from './components/Modals.js';
import { OverviewView } from './views/OverviewView.js';
import { DiscoverView } from './views/DiscoverView.js';
import { ProjectsView } from './views/ProjectsView.js';
import { RequestsView } from './views/RequestsView.js';
import { ProfileView } from './views/ProfileView.js';

class App {
  constructor() {
    this.state = getAppState();
    this.currentViewId = 'overview';
    this.currentViewInstance = null;

    // Dom Containers
    this.viewContainer = document.getElementById('view-container');
    this.toastContainer = document.getElementById('toast-container');

    // Subsystems
    this.shaderBackground = null;
    this.navigation = null;
    this.modals = null;

    // View Registry
    this.views = {
      overview: new OverviewView(this),
      discover: new DiscoverView(this),
      projects: new ProjectsView(this),
      requests: new RequestsView(this),
      profile: new ProfileView(this)
    };

    this.init();
  }

  init() {
    // 1. Initialize WebGL Shader Background
    try {
      this.shaderBackground = new ShaderBackground('shader-canvas');
    } catch (e) {
      console.warn('WebGL shader initialization warning', e);
    }

    // 2. Initialize Modals
    this.modals = new ModalManager(this);

    // 3. Initialize Navigation
    this.navigation = new Navigation(
      (viewId) => this.navigateTo(viewId),
      () => this.modals.openPostProjectModal(),
      () => this.modals.openCommandPalette()
    );

    // 4. Setup Hash Routing
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.replace('#', '') || 'overview';
      if (this.views[hash]) {
        this.navigateTo(hash, false);
      }
    });

    const initialView = window.location.hash.replace('#', '') || 'overview';
    this.navigateTo(this.views[initialView] ? initialView : 'overview', true);

    this.updateBadges();
  }

  navigateTo(viewId, updateHash = true) {
    if (!this.views[viewId]) return;

    if (this.currentViewInstance && typeof this.currentViewInstance.destroy === 'function') {
      this.currentViewInstance.destroy();
    }

    this.currentViewId = viewId;
    this.currentViewInstance = this.views[viewId];

    if (updateHash) {
      window.location.hash = viewId;
    }

    this.navigation.setCurrentView(viewId);

    if (this.viewContainer) {
      this.viewContainer.innerHTML = '';
      this.currentViewInstance.render(this.viewContainer);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  filterByCapability(capName) {
    if (this.views.discover) {
      this.views.discover.filterByCapability(capName);
    }
  }

  // State Mutators
  saveState() {
    saveAppState(this.state);
    this.updateBadges();
  }

  toggleBookmark(projectId) {
    const proj = this.state.projects.find(p => p.id === projectId);
    if (proj) {
      proj.bookmarked = !proj.bookmarked;
      this.saveState();
      this.showToast(
        proj.bookmarked ? `Project "${proj.title}" bookmarked` : `Removed bookmark for "${proj.title}"`,
        'info'
      );
      if (this.currentViewInstance) {
        this.currentViewInstance.render(this.viewContainer);
      }
    }
  }

  addProject(project) {
    this.state.projects.unshift(project);
    this.saveState();
    this.showToast(`Project "${project.title}" published to match network!`, 'success');
    this.navigateTo('projects');
  }

  sendMatchProposal(project) {
    const newRequest = {
      id: 'req_' + Date.now(),
      type: 'SENT',
      status: 'PENDING',
      initiatorName: this.state.profile.name,
      initiatorTitle: 'Applicant (Lead Product Architect)',
      initiatorAvatar: this.state.profile.avatar,
      projectName: project.title,
      role: 'Capability Specialist',
      compatibility: project.matchScore,
      keySkills: project.matchingCapabilities || ['WEBGL', 'DESIGN-SYSTEMS'],
      timeRemaining: '72:00:00',
      timestamp: new Date().toISOString(),
      note: `Match proposal initiated based on ${project.matchScore}% resonance with project topology.`
    };

    this.state.requests.unshift(newRequest);
    this.saveState();
    this.showToast(`Match proposal sent for "${project.title}" (${project.matchScore}% match)`, 'success');
    this.navigateTo('requests');
  }

  acceptRequest(reqId) {
    const req = this.state.requests.find(r => r.id === reqId);
    if (req) {
      req.status = 'ACCEPTED';
      this.saveState();
      this.showToast(`Connection accepted with ${req.initiatorName}! Team workspace generated.`, 'success');
    }
  }

  declineRequest(reqId) {
    const req = this.state.requests.find(r => r.id === reqId);
    if (req) {
      req.status = 'DECLINED';
      this.saveState();
      this.showToast(`Request from ${req.initiatorName} declined.`, 'info');
    }
  }

  updateBadges() {
    const projBadge = document.getElementById('nav-projects-badge');
    if (projBadge) {
      projBadge.innerText = this.state.projects.length;
    }

    const reqBadge = document.getElementById('nav-requests-badge');
    if (reqBadge) {
      const pendingCount = this.state.requests.filter(r => r.status === 'PENDING').length;
      reqBadge.innerText = pendingCount || this.state.requests.length;
    }
  }

  // Toast Notification System
  showToast(message, type = 'info') {
    if (!this.toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    let iconName = 'info';
    if (type === 'success') iconName = 'check_circle';
    if (type === 'error') iconName = 'error';

    toast.innerHTML = `
      <span class="material-symbols-outlined" style="font-size: 20px;">${iconName}</span>
      <span style="flex: 1;">${message}</span>
    `;

    this.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => {
        if (toast.parentElement) {
          toast.parentElement.removeChild(toast);
        }
      }, 300);
    }, 3800);
  }
}

// Bootstrap on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.projectMatchApp = new App();
});
