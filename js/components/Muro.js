import { storage } from "../storage.js";

export class MuroComponent {
  constructor(container) {
    this.container = container;
    this.activeFilter = "todas";
  }

  render() {
    let confessions = storage.getConfessions();

    if (this.activeFilter === "canciones") {
      confessions = confessions.filter(c => c.song && c.song.trim().length > 0);
    } else if (this.activeFilter === "valientes") {
      confessions = confessions.filter(c => c.isBrave);
    }

    this.container.innerHTML = `
      <div class="fade-in">
        <div style="text-align: center; margin-bottom: 16px;">
          <h2 class="title-display">Muro Anónimo</h2>
          <p class="subtitle-desc" style="margin-bottom: 12px;">Confesiones aprobadas de la comunidad universitaria.</p>

          <div style="display: flex; gap: 8px; justify-content: center; overflow-x: auto; padding-bottom: 4px;">
            <button class="option-chip ${this.activeFilter === 'todas' ? 'selected' : ''}" data-filter="todas" style="min-height: 38px; padding: 6px 14px; font-size: 0.8rem; border-radius: var(--radius-full);">
              Todas (${storage.getConfessions().length})
            </button>
            <button class="option-chip ${this.activeFilter === 'canciones' ? 'selected' : ''}" data-filter="canciones" style="min-height: 38px; padding: 6px 14px; font-size: 0.8rem; border-radius: var(--radius-full);">
              🎵 Con Canción
            </button>
            <button class="option-chip ${this.activeFilter === 'valientes' ? 'selected' : ''}" data-filter="valientes" style="min-height: 38px; padding: 6px 14px; font-size: 0.8rem; border-radius: var(--radius-full);">
              ⚡ Valientes
            </button>
          </div>
        </div>

        <div class="confessions-feed">
          ${confessions.length === 0 ? `
            <div style="text-align:center; padding: 40px 20px; color: rgba(104,27,43,0.6);">
              <span style="font-size: 2.5rem; display:block; margin-bottom:10px;">💌</span>
              <p style="font-weight:600;">No hay confesiones en este filtro aún.</p>
              <p style="font-size:0.85rem; margin-top:4px;">¡Sé el primero en compartir la tuya!</p>
            </div>
          ` : confessions.map(c => {
            const isLiked = storage.isLiked(c.id);
            return `
              <article class="confession-card" id="conf-${c.id}">
                <div class="confession-header">
                  <div class="confession-target">
                    <span style="font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.5px; color: var(--color-coral); font-weight: 700;">Para:</span>
                    <span class="confession-target-name">${c.targetName}</span>
                    <span class="confession-target-faculty">${c.targetFaculty || 'Universidad'}</span>
                  </div>
                  <span style="font-size: 0.72rem; color: rgba(104,27,43,0.5);">${c.displayTimestamp || 'Reciente'}</span>
                </div>

                <div class="confession-body">
                  ${(c.message && c.message.trim().length > 0)
                    ? `“${c.message.trim()}”`
                    : (c.song && c.song.trim().length > 0)
                      ? `<span style="font-style:italic; color:rgba(104,27,43,0.75);">🎵 Te ha dedicado una canción especial.</span>`
                      : `<span style="font-style:italic; color:rgba(104,27,43,0.75);">💌 Eres el crush secreto de alguien en el campus.</span>`
                  }
                </div>

                ${c.song ? `
                  <div>
                    <a href="${c.songUrl || '#'}" target="_blank" rel="noopener noreferrer" class="confession-song-pill" title="Escuchar en Spotify">
                      <span>🎵</span>
                      <span>${c.song}</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    </a>
                  </div>
                ` : ''}

                <div class="confession-footer">
                  <div class="confession-author">
                    ${c.isBrave ? `
                      <span class="confession-brave-tag">
                        <span>⚡ Valiente:</span>
                        <strong>${c.authorName || 'Identidad Revelada'}</strong>
                      </span>
                    ` : `
                      <span style="background:var(--color-powder-soft); padding:3px 8px; border-radius:var(--radius-full); font-size:0.75rem; font-weight:600;">
                        🔒 ${c.emitterGender || 'Anónimo'} • ${c.emitterAge || 'Campus'}
                      </span>
                    `}
                  </div>

                  <button class="like-button ${isLiked ? 'liked' : ''}" data-id="${c.id}">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="${isLiked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                    <span class="like-count">${c.likes || 0}</span>
                  </button>
                </div>
              </article>
            `;
          }).join('')}
        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const chips = this.container.querySelectorAll("[data-filter]");
    chips.forEach(chip => {
      chip.addEventListener("click", () => {
        this.activeFilter = chip.dataset.filter;
        this.render();
      });
    });

    const likeButtons = this.container.querySelectorAll(".like-button");
    likeButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        const result = storage.toggleLike(id);
        const countSpan = btn.querySelector(".like-count");
        if (countSpan) countSpan.textContent = result.newCount;

        if (result.liked) {
          btn.classList.add("liked");
          btn.querySelector("svg").setAttribute("fill", "currentColor");
        } else {
          btn.classList.remove("liked");
          btn.querySelector("svg").setAttribute("fill", "none");
        }
      });
    });
  }
}
