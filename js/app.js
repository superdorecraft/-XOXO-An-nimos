import { storage } from "./storage.js";
import { WizardComponent } from "./components/Wizard.js";
import { BottomNavComponent } from "./components/BottomNav.js";
import { WTopComponent } from "./components/WTop.js";
import { MuroComponent } from "./components/Muro.js";
import { ModeratorModalComponent } from "./components/ModeratorModal.js";

class XOXOApp {
  constructor() {
    this.appRoot = document.getElementById("app-root");
    this.adminRoot = document.getElementById("admin-root");
    this.activeDashboardTab = "wtop";
    this.init();
  }

  init() {
    this.moderatorModal = new ModeratorModalComponent(this.adminRoot, (action) => {
      if (action === "restart_wizard") {
        this.render();
      } else {
        this.refreshCurrentView();
      }
    });
    this.moderatorModal.render();
    this.render();
  }

  render() {
    const isSealed = storage.isDeviceSealed();
    if (!isSealed) {
      this.renderTunnelWizard();
    } else {
      this.renderRewardDashboard();
    }
  }

  renderTunnelWizard() {
    this.appRoot.innerHTML = `<div id="wizard-mount"></div>`;
    const mount = document.getElementById("wizard-mount");

    const wizard = new WizardComponent(mount, () => {
      this.activeDashboardTab = "wtop";
      this.render();
    });

    wizard.render();
  }

  renderRewardDashboard() {
    this.appRoot.innerHTML = `
      <header class="mobile-header">
        <div class="brand-badge">
          <span class="brand-heart-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </span>
          <span class="brand-title">XOXO</span>
        </div>
        <span class="badge-tag" style="background:var(--color-powder-soft); color:var(--color-wine); border-color:var(--color-coral);">
          ✓ Participación Enviada
        </span>
      </header>

      <main class="mobile-content" id="dashboard-content-mount"></main>
      <div id="bottom-nav-mount"></div>
    `;

    const navMount = document.getElementById("bottom-nav-mount");
    this.bottomNav = new BottomNavComponent(navMount, (newTab) => {
      this.activeDashboardTab = newTab;
      this.renderTabContent();
    });
    this.bottomNav.render(this.activeDashboardTab);

    this.renderTabContent();
  }

  renderTabContent() {
    const contentMount = document.getElementById("dashboard-content-mount");
    if (!contentMount) return;

    contentMount.innerHTML = "";

    if (this.activeDashboardTab === "muro") {
      new MuroComponent(contentMount).render();
    } else {
      new WTopComponent(contentMount).render();
    }
  }

  refreshCurrentView() {
    if (storage.isDeviceSealed()) {
      this.renderTabContent();
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.xoxoApp = new XOXOApp();
});
