import { storage } from "../storage.js";
import { ModerationService } from "../moderation.js";
import { DataChartsComponent } from "./DataCharts.js";

export class ModeratorModalComponent {
  constructor(container, onRefresh) {
    this.container = container;
    this.onRefresh = onRefresh;
    this.isOpen = false;
    this.activeTab = "rankings";
    this.personSearchQuery = "";
  }

  render() {
    if (!this.isOpen) {
      this.container.innerHTML = `
        <button id="btn-open-moderator" class="admin-badge-btn" title="Panel de Moderación">
          <span>🛠️ Org</span>
        </button>
      `;
      const btn = document.getElementById("btn-open-moderator");
      if (btn) btn.addEventListener("click", () => this.open());
      return;
    }

    const allConfessions = storage.getConfessions(true);
    const pendingList = allConfessions.filter(c => c.status === "pending_review" || c.flagged);
    const approvedList = allConfessions.filter(c => c.status === "approved");
    const directory = storage.getDirectory();
    const blacklist = ModerationService.getBlacklist();

    const filteredDirectory = directory.filter(p => 
      !this.personSearchQuery || p.name.toLowerCase().includes(this.personSearchQuery.toLowerCase())
    );

    this.container.innerHTML = `
      <div class="modal-backdrop" id="modal-backdrop">
        <div class="modal-sheet fade-in" id="modal-sheet">
          <div class="modal-header">
            <div>
              <div style="display:flex; align-items:center; gap:8px;">
                <h3 style="font-family:var(--font-title); font-size:1.4rem; color:var(--color-wine); margin:0;">Panel de Moderación</h3>
                <span style="font-size:0.65rem; background:rgba(104,27,43,0.1); color:var(--color-wine); padding:2px 8px; border-radius:var(--radius-full); font-weight:700;">Admin 🔒</span>
              </div>
              <p style="font-size:0.75rem; color:rgba(104,27,43,0.7); margin-top:2px;">Control de contenidos, data y depuración</p>
            </div>
            <div style="display:flex; align-items:center; gap:6px;">
              <button id="btn-logout-admin-mod" class="btn-icon" title="Cerrar sesión de Administrador" style="font-size:0.75rem; color:var(--color-wine); border:1px solid var(--color-powder); border-radius:var(--radius-sm); padding:4px 8px; width:auto; height:auto;">
                🔒 Salir
              </button>
              <button id="btn-close-modal" class="btn-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>

          <div style="display:flex; gap:6px; margin-bottom:14px; overflow-x:auto; padding-bottom:4px;">
            <button class="option-chip ${this.activeTab === 'rankings' ? 'selected' : ''}" data-mod-tab="rankings" style="min-height:36px; padding:6px 12px; font-size:0.78rem; border-radius:var(--radius-full);">
              👥 Rankings (${directory.length})
            </button>
            <button class="option-chip ${this.activeTab === 'cola' ? 'selected' : ''}" data-mod-tab="cola" style="min-height:36px; padding:6px 12px; font-size:0.78rem; border-radius:var(--radius-full);">
              📋 Cola (${pendingList.length})
            </button>
            <button class="option-chip ${this.activeTab === 'muro' ? 'selected' : ''}" data-mod-tab="muro" style="min-height:36px; padding:6px 12px; font-size:0.78rem; border-radius:var(--radius-full);">
              💬 Muro (${approvedList.length})
            </button>
            <button class="option-chip ${this.activeTab === 'data' ? 'selected' : ''}" data-mod-tab="data" style="min-height:36px; padding:6px 12px; font-size:0.78rem; border-radius:var(--radius-full);">
              📊 Data
            </button>
            <button class="option-chip ${this.activeTab === 'bloqueos' ? 'selected' : ''}" data-mod-tab="bloqueos" style="min-height:36px; padding:6px 12px; font-size:0.78rem; border-radius:var(--radius-full);">
              🚫 Bloqueos (${blacklist.length})
            </button>
          </div>

          ${this.activeTab === 'rankings' ? `
            <div style="margin-bottom:16px;">
              <div style="font-size:0.85rem; font-weight:700; color:var(--color-wine); margin-bottom:6px;">
                Quitar personas ofensivas del ranking
              </div>
              <p style="font-size:0.75rem; color:rgba(104,27,43,0.7); margin-bottom:10px;">
                Al eliminar a una persona, se borra del Leaderboard W TOP, se purgan sus confesiones y su registro en la base de datos queda eliminado.
              </p>

              <input 
                type="text" 
                id="mod-search-person" 
                class="form-input" 
                placeholder="Buscar nombre en el ranking..." 
                value="${this.personSearchQuery}"
                style="min-height:40px; margin-bottom:10px; font-size:0.85rem;"
              >

              <div style="max-height:240px; overflow-y:auto; display:flex; flex-direction:column; gap:8px;">
                ${filteredDirectory.length === 0 ? `
                  <div style="background:var(--color-powder-soft); padding:16px; border-radius:var(--radius-sm); text-align:center; font-size:0.8rem; color:rgba(104,27,43,0.7);">
                    No hay personas registradas ${this.personSearchQuery ? 'con esa búsqueda' : 'en los rankings aún'}.
                  </div>
                ` : filteredDirectory.map(p => `
                  <div style="background:white; border:1px solid var(--color-powder); border-radius:var(--radius-md); padding:10px 14px; display:flex; justify-content:space-between; align-items:center;">
                    <div>
                      <div style="font-weight:700; font-size:0.9rem; color:var(--color-wine);">${p.name}</div>
                      <div style="font-size:0.72rem; color:rgba(104,27,43,0.65);">
                        ${p.type === 'profesor' ? '☕ Docente' : '🎒 Estudiante'} • ${p.faculty || 'Facultad'}
                      </div>
                      <div style="font-size:0.75rem; font-weight:700; color:var(--color-coral); margin-top:2px;">
                        ★ ${p.votes || 0} votos
                      </div>
                    </div>
                    <button class="btn-secondary btn-delete-person" data-name="${p.name}" style="min-height:36px; padding:6px 12px; font-size:0.75rem; color:var(--color-cherry); border-color:var(--color-cherry);" title="Eliminar del ranking y de la base de datos">
                      🗑️ Quitar
                    </button>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

          ${this.activeTab === 'cola' ? `
            <div style="margin-bottom:16px;">
              <div style="font-size:0.85rem; font-weight:700; color:var(--color-wine); margin-bottom:8px; display:flex; justify-content:space-between;">
                <span>Mensajes en Revisión (${pendingList.length})</span>
                <span style="font-size:0.75rem; color:var(--color-coral); font-weight:600;">Filtro Fonético Activo</span>
              </div>

              ${pendingList.length === 0 ? `
                <div style="background:var(--color-powder-soft); padding:20px; border-radius:var(--radius-sm); text-align:center; font-size:0.8rem; color:rgba(104,27,43,0.7);">
                  ✓ No hay mensajes pendientes o sospechosos.
                </div>
              ` : `
                <div style="display:flex; flex-direction:column; gap:10px; max-height:240px; overflow-y:auto;">
                  ${pendingList.map(item => `
                    <div style="background:white; border:1.5px solid var(--color-cherry); border-radius:var(--radius-md); padding:12px;">
                      <div style="font-size:0.75rem; color:var(--color-coral); font-weight:700;">Para: ${item.targetName} (${item.targetFaculty || 'Universidad'})</div>
                      <div style="font-size:0.85rem; font-style:italic; margin:6px 0;">"${item.message || 'Sin mensaje de texto'}"</div>
                      ${item.flagReasons && item.flagReasons.length > 0 ? `
                        <div style="font-size:0.72rem; color:var(--color-cherry); font-weight:700; margin-bottom:6px; background:#FFEBF0; padding:4px 8px; border-radius:var(--radius-sm);">
                          🚨 ${item.flagReasons.join(" • ")}
                        </div>
                      ` : `<div style="font-size:0.7rem; color:var(--color-cherry); font-weight:700; margin-bottom:6px;">⚠️ Marcado por revisión</div>`}
                      <div style="display:flex; gap:8px;">
                        <button class="btn-primary btn-approve" data-id="${item.id}" style="min-height:36px; padding:6px 12px; font-size:0.78rem;">
                          Aprobar y Sumar Voto
                        </button>
                        <button class="btn-secondary btn-reject" data-id="${item.id}" style="min-height:36px; padding:6px 12px; font-size:0.78rem; color:var(--color-cherry); border-color:var(--color-cherry);" title="Elimina de la moderación y de la base de datos">
                          Rechazar y Eliminar
                        </button>
                      </div>
                    </div>
                  `).join('')}
                </div>
              `}
            </div>
          ` : ''}

          ${this.activeTab === 'muro' ? `
            <div style="margin-bottom:16px;">
              <div style="font-size:0.85rem; font-weight:700; color:var(--color-wine); margin-bottom:6px;">
                Confesiones activas en el Muro (${approvedList.length})
              </div>
              <p style="font-size:0.75rem; color:rgba(104,27,43,0.7); margin-bottom:10px;">
                Al eliminar una publicación, se borra automáticamente del Muro y de la base de datos de respuestas.
              </p>

              <div style="display:flex; flex-direction:column; gap:10px; max-height:240px; overflow-y:auto;">
                ${approvedList.length === 0 ? `
                  <div style="background:var(--color-powder-soft); padding:20px; border-radius:var(--radius-sm); text-align:center; font-size:0.8rem; color:rgba(104,27,43,0.7);">
                    No hay confesiones publicadas en este momento.
                  </div>
                ` : approvedList.map(item => `
                  <div style="background:white; border:1px solid var(--color-powder); border-radius:var(--radius-md); padding:12px;">
                    <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                      <div style="font-size:0.8rem; font-weight:700; color:var(--color-wine);">Para: ${item.targetName}</div>
                      <button class="btn-secondary btn-delete-confession" data-id="${item.id}" style="min-height:28px; padding:2px 8px; font-size:0.7rem; color:var(--color-cherry); border-color:var(--color-cherry);">
                        🗑️ Eliminar
                      </button>
                    </div>
                    <div style="font-size:0.82rem; font-style:italic; margin:4px 0;">"${item.message}"</div>
                    ${item.song ? `<div style="font-size:0.72rem; color:var(--color-coral);">🎵 ${item.song}</div>` : ''}
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

          ${this.activeTab === 'data' ? `
            <div id="mod-data-container"></div>
          ` : ''}

          ${this.activeTab === 'bloqueos' ? `
            <div style="margin-bottom:16px;">
              <div style="font-size:0.85rem; font-weight:700; color:var(--color-wine); margin-bottom:6px;">
                Bloquear nombres o términos específicos
              </div>
              
              <div style="display:flex; gap:8px; margin-bottom:12px;">
                <input 
                  type="text" 
                  id="input-new-blacklist" 
                  class="form-input" 
                  placeholder="Escribe nombre o frase a bloquear..." 
                  style="min-height:42px; font-size:0.85rem; flex:1;"
                >
                <button id="btn-add-blacklist" class="btn-primary" style="min-height:42px; padding:8px 14px; font-size:0.8rem; width:auto;">
                  🚫 Bloquear
                </button>
              </div>

              <div style="max-height:180px; overflow-y:auto; display:flex; flex-wrap:wrap; gap:6px;">
                ${blacklist.length === 0 ? `
                  <div style="font-size:0.78rem; color:rgba(104,27,43,0.6); padding:8px;">
                    No hay términos en la lista negra manual.
                  </div>
                ` : blacklist.map(term => `
                  <span style="background:var(--color-powder-soft); border:1px solid var(--color-powder); border-radius:var(--radius-full); padding:4px 10px; font-size:0.75rem; display:inline-flex; align-items:center; gap:6px; color:var(--color-wine);">
                    <span>${term}</span>
                    <button class="btn-remove-blacklist" data-term="${term}" style="background:none; border:none; cursor:pointer; color:var(--color-cherry); font-weight:bold; font-size:0.85rem; padding:0 2px;">
                      ×
                    </button>
                  </span>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <div style="border-top:1px solid rgba(104,27,43,0.1); padding-top:12px; display:flex; flex-direction:column; gap:8px;">
            <button id="btn-unseal-device" class="btn-secondary" style="width:100%; border-color:var(--color-coral); color:var(--color-coral); font-size:0.82rem;">
              🔄 Resetear Mi Dispositivo (Probar Formulario de Nuevo)
            </button>
            <div style="display:flex; gap:8px;">
              <button id="modal-export-csv" class="btn-secondary" style="flex:1; font-size:0.8rem;">Descargar CSV</button>
              <button id="modal-export-json" class="btn-secondary" style="flex:1; font-size:0.8rem;">🔒 Descargar JSON (Admin)</button>
            </div>
            <button id="btn-reset-all-data" class="btn-secondary" style="width:100%; background:var(--color-cherry); color:white; border:none; font-weight:700; font-size:0.82rem; padding:10px 14px; border-radius:var(--radius-sm); cursor:pointer; margin-top:2px;">
              ⚠️ Reiniciar Datos Recopilados (Descarga Backup JSON)
            </button>
          </div>
        </div>
      </div>
    `;

    if (this.activeTab === 'data') {
      const dataMount = document.getElementById("mod-data-container");
      if (dataMount) {
        new DataChartsComponent(dataMount).render();
      }
    }

    this.bindEvents();
  }

  open() {
    if (!storage.hasAdminPermission()) {
      const pin = prompt("🔒 Acceso Restringido: Ingresa la contraseña de Administrador para abrir el Panel de Moderación:");
      if (!pin || !storage.authorizeAdmin(pin)) {
        alert("⛔ Acceso denegado: Contraseña de administrador incorrecta.");
        return;
      }
    }
    this.isOpen = true;
    this.render();
  }

  close() {
    this.isOpen = false;
    this.render();
  }

  bindEvents() {
    const btnClose = document.getElementById("btn-close-modal");
    const backdrop = document.getElementById("modal-backdrop");

    if (btnClose) btnClose.addEventListener("click", () => this.close());
    if (backdrop) {
      backdrop.addEventListener("click", (e) => {
        if (e.target === backdrop) this.close();
      });
    }

    const tabs = this.container.querySelectorAll("[data-mod-tab]");
    tabs.forEach(t => {
      t.addEventListener("click", () => {
        this.activeTab = t.dataset.modTab;
        this.render();
      });
    });

    const searchInput = document.getElementById("mod-search-person");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.personSearchQuery = e.target.value;
        this.render();
        const inputRef = document.getElementById("mod-search-person");
        if (inputRef) {
          inputRef.focus();
          inputRef.setSelectionRange(inputRef.value.length, inputRef.value.length);
        }
      });
    }

    const deletePersonBtns = this.container.querySelectorAll(".btn-delete-person");
    deletePersonBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const name = btn.dataset.name;
        if (confirm(`¿Estás seguro de que deseas eliminar a "${name}" del ranking universitario y purgar sus registros de la base de datos?`)) {
          storage.removePersonFromDirectory(name, true);
          this.render();
          if (this.onRefresh) this.onRefresh();
          alert(`✓ "${name}" ha sido retirado y sus registros eliminados de la base de datos.`);
        }
      });
    });

    const deleteConfBtns = this.container.querySelectorAll(".btn-delete-confession");
    deleteConfBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        if (confirm("¿Deseas eliminar permanentemente esta confesión del Muro y de la base de datos?")) {
          storage.deleteConfession(id);
          this.render();
          if (this.onRefresh) this.onRefresh();
        }
      });
    });

    const btnAddBlacklist = document.getElementById("btn-add-blacklist");
    const inputNewBlacklist = document.getElementById("input-new-blacklist");
    if (btnAddBlacklist && inputNewBlacklist) {
      btnAddBlacklist.addEventListener("click", () => {
        const term = inputNewBlacklist.value.trim();
        if (term.length >= 3) {
          ModerationService.addToBlacklist(term);
          storage.removePersonFromDirectory(term, false);
          inputNewBlacklist.value = "";
          this.render();
          if (this.onRefresh) this.onRefresh();
          alert(`✓ "${term}" ha sido bloqueado exitosamente.`);
        } else {
          alert("Ingresa un término o nombre de al menos 3 caracteres.");
        }
      });
    }

    const removeBlacklistBtns = this.container.querySelectorAll(".btn-remove-blacklist");
    removeBlacklistBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const term = btn.dataset.term;
        ModerationService.removeFromBlacklist(term);
        this.render();
      });
    });

    const approveBtns = this.container.querySelectorAll(".btn-approve");
    approveBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        storage.updateConfessionStatus(id, "approved");
        this.render();
        if (this.onRefresh) this.onRefresh();
      });
    });

    const rejectBtns = this.container.querySelectorAll(".btn-reject");
    rejectBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        if (confirm("¿Rechazar y eliminar definitivamente esta publicación de la base de datos?")) {
          storage.deleteConfession(id);
          this.render();
          if (this.onRefresh) this.onRefresh();
        }
      });
    });

    const btnUnseal = document.getElementById("btn-unseal-device");
    if (btnUnseal) {
      btnUnseal.addEventListener("click", () => {
        storage.unsealDevice();
        this.close();
        if (this.onRefresh) this.onRefresh("restart_wizard");
      });
    }

    const btnCsv = document.getElementById("modal-export-csv");
    const btnJson = document.getElementById("modal-export-json");
    if (btnCsv) btnCsv.addEventListener("click", () => storage.exportToCSV());
    if (btnJson) btnJson.addEventListener("click", () => storage.exportToJSON());

    const btnLogout = document.getElementById("btn-logout-admin-mod");
    if (btnLogout) {
      btnLogout.addEventListener("click", () => {
        storage.revokeAdmin();
        this.close();
        alert("🔒 Sesión de Administrador cerrada.");
        if (this.onRefresh) this.onRefresh();
      });
    }

    const btnResetAll = document.getElementById("btn-reset-all-data");
    if (btnResetAll) {
      btnResetAll.addEventListener("click", () => {
        const confirmed = confirm(
          "⚠️ ATENCIÓN: ¿Estás completamente seguro de que deseas reiniciar todos los datos recopilados?\n\n" +
          "Esta acción eliminará de forma irreversible:\n" +
          "• Todos los votos y personas del ranking W TOP\n" +
          "• Todas las confesiones y mensajes del Muro\n" +
          "• Todo el registro de participantes y estadísticas demográficas\n\n" +
          "Al confirmar, el sistema descargará automáticamente una copia de seguridad en formato JSON y vaciará la base de datos."
        );
        if (confirmed) {
          storage.resetAllData(true);
          alert("✓ Base de datos reiniciada con éxito.\n\nSe ha descargado la copia de seguridad en JSON. La plataforma ha retornado a su estado inicial limpio.");
          this.close();
          window.location.reload();
        }
      });
    }
  }
}
