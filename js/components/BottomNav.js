export class BottomNavComponent {
  constructor(container, onTabChange) {
    this.container = container;
    this.onTabChange = onTabChange;
    this.activeTab = "wtop";
  }

  render(currentTab = this.activeTab) {
    this.activeTab = currentTab;
    this.container.innerHTML = `
      <nav class="bottom-nav-bar" aria-label="Navegación principal">
        <button class="nav-item ${this.activeTab === 'wtop' ? 'active' : ''}" data-tab="wtop">
          <div class="nav-icon-wrapper">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
              <path d="M4 22h16"></path>
              <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
              <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
              <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
            </svg>
          </div>
          <span>W TOP</span>
        </button>

        <button class="nav-item ${this.activeTab === 'muro' ? 'active' : ''}" data-tab="muro">
          <div class="nav-icon-wrapper">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
          <span>MURO</span>
        </button>
      </nav>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const buttons = this.container.querySelectorAll(".nav-item");
    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        const tab = btn.dataset.tab;
        if (tab !== this.activeTab) {
          this.activeTab = tab;
          this.render(tab);
          if (typeof this.onTabChange === "function") {
            this.onTabChange(tab);
          }
        }
      });
    });
  }
}
