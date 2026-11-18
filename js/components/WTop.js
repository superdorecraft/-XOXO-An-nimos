import { storage } from "../storage.js";

export class WTopComponent {
  constructor(container) {
    this.container = container;
    this.activeType = "estudiante";
  }

  render() {
    const isFacultyTab = this.activeType === "facultad";
    const crushList = isFacultyTab ? [] : storage.getRankings(this.activeType);
    const analytics = isFacultyTab ? storage.getAnalyticsData() : null;
    const facultiesList = isFacultyTab ? (analytics.topProvenance && analytics.topProvenance.length > 0 ? analytics.topProvenance : (analytics.topFaculties || [])) : [];
    const maxFacultyVotes = facultiesList.length > 0 && facultiesList[0].count > 0 ? facultiesList[0].count : 1;

    this.container.innerHTML = `
      <div class="fade-in">
        <div style="text-align: center; margin-bottom: 16px;">
          <h2 class="title-display">W TOP Campus</h2>
          <p class="subtitle-desc" style="margin-bottom: 12px;">Los crushes y facultades más votados de toda la universidad.</p>
          
          <div class="ranking-tabs">
            <button id="tab-students" class="ranking-tab-btn ${this.activeType === 'estudiante' ? 'active' : ''}">
              🎒 Estudiantes
            </button>
            <button id="tab-profs" class="ranking-tab-btn ${this.activeType === 'profesor' ? 'active' : ''}">
              ☕ Docentes
            </button>
            <button id="tab-faculties" class="ranking-tab-btn ${this.activeType === 'facultad' ? 'active' : ''}">
              🏛️ Facultades
            </button>
          </div>
        </div>

        <div class="ranking-list">
          ${isFacultyTab ? (
            facultiesList.length === 0 ? `
              <div style="text-align: center; padding: 36px 16px; background: white; border-radius: var(--radius-md); border: 1.5px dashed var(--color-powder);">
                <div style="font-size: 2.5rem; margin-bottom: 8px;">🏛️</div>
                <div style="font-weight: 700; color: var(--color-wine); margin-bottom: 4px;">Aún no hay votos para facultades</div>
                <p style="font-size: 0.8rem; color: rgba(104,27,43,0.7); line-height: 1.4;">
                  El ranking de popularidad por facultad es 100% público y se actualizará automáticamente con cada confesión.
                </p>
              </div>
            ` : facultiesList.map((f, index) => {
              const rank = index + 1;
              let badgeClass = "rank-other";
              if (rank === 1) badgeClass = "rank-1";
              else if (rank === 2) badgeClass = "rank-2";
              else if (rank === 3) badgeClass = "rank-3";
              const pct = Math.round((f.count / maxFacultyVotes) * 100);

              return `
                <div class="rank-card">
                  <div class="rank-card-header">
                    <div class="rank-badge ${badgeClass}">
                      ${rank <= 3 ? ['👑', '🥈', '🥉'][rank - 1] : `#${rank}`}
                    </div>
                    <div class="rank-info">
                      <div class="rank-name">${f.name}</div>
                      <div class="rank-sub" style="color:var(--color-coral); font-weight:600;">Acceso público • Todo el campus</div>
                    </div>
                    <div class="rank-votes">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                      <span>${f.count} ${f.count === 1 ? 'voto' : 'votos'}</span>
                    </div>
                  </div>

                  <div style="margin-top:10px;">
                    <div class="bar-track" style="height:8px; border-radius:var(--radius-full); background:var(--color-powder-soft); overflow:hidden;">
                      <div class="bar-fill" style="width: ${pct}%; height:100%; border-radius:var(--radius-full); background:linear-gradient(90deg, var(--color-coral), var(--color-cherry)); transition:width 0.4s ease;"></div>
                    </div>
                  </div>
                </div>
              `;
            }).join('')
          ) : (
            crushList.length === 0 ? `
              <div style="text-align: center; padding: 36px 16px; background: white; border-radius: var(--radius-md); border: 1.5px dashed var(--color-powder);">
                <div style="font-size: 2.5rem; margin-bottom: 8px;">👑</div>
                <div style="font-weight: 700; color: var(--color-wine); margin-bottom: 4px;">Aún no hay votos registrados</div>
                <p style="font-size: 0.8rem; color: rgba(104,27,43,0.7); line-height: 1.4;">
                  El ranking de ${this.activeType === 'estudiante' ? 'estudiantes' : 'docentes'} se actualizará en tiempo real a medida que las personas participen.
                </p>
              </div>
            ` : crushList.map((item, index) => {
              const rank = index + 1;
              let badgeClass = "rank-other";
              if (rank === 1) badgeClass = "rank-1";
              else if (rank === 2) badgeClass = "rank-2";
              else if (rank === 3) badgeClass = "rank-3";

              const demo = storage.getTargetVoterDemographics(item.name);

              return `
                <div class="rank-card">
                  <div class="rank-card-header">
                    <div class="rank-badge ${badgeClass}">
                      ${rank <= 3 ? ['👑', '🥈', '🥉'][rank - 1] : `#${rank}`}
                    </div>
                    <div class="rank-info">
                      <div class="rank-name">${item.name}</div>
                      <div class="rank-sub">${item.faculty} ${item.career ? '• ' + item.career : ''}</div>
                    </div>
                    <div class="rank-votes">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                      <span>${item.votes || 0}</span>
                    </div>
                  </div>

                  <div class="voter-demographics-box">
                    <div class="voter-demographics-header">
                      <span class="voter-demographics-title">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                        </svg>
                        Atracción por género de votantes:
                      </span>
                      <span class="voter-demographics-count">${demo.total} ${demo.total === 1 ? 'voto analizado' : 'votos analizados'}</span>
                    </div>

                    ${demo.total > 0 ? `
                      <div class="voter-gender-bar">
                        ${demo.pctMujer > 0 ? `<div class="voter-bar-slice slice-mujer" style="width: ${demo.pctMujer}%;" title="Mujeres: ${demo.pctMujer}% (${demo.mujerCount})"></div>` : ''}
                        ${demo.pctHombre > 0 ? `<div class="voter-bar-slice slice-hombre" style="width: ${demo.pctHombre}%;" title="Hombres: ${demo.pctHombre}% (${demo.hombreCount})"></div>` : ''}
                        ${demo.pctOtro > 0 ? `<div class="voter-bar-slice slice-otro" style="width: ${demo.pctOtro}%;" title="Otro / Privado: ${demo.pctOtro}% (${demo.otroCount})"></div>` : ''}
                      </div>

                      <div class="voter-gender-legend">
                        <span class="legend-chip">
                          <span class="dot dot-mujer"></span>
                          Mujeres: <strong>${demo.pctMujer}%</strong> (${demo.mujerCount})
                        </span>
                        <span class="legend-chip">
                          <span class="dot dot-hombre"></span>
                          Hombres: <strong>${demo.pctHombre}%</strong> (${demo.hombreCount})
                        </span>
                        ${demo.otroCount > 0 ? `
                          <span class="legend-chip">
                            <span class="dot dot-otro"></span>
                            Otro: <strong>${demo.pctOtro}%</strong> (${demo.otroCount})
                          </span>
                        ` : ''}
                      </div>
                    ` : `
                      <div class="voter-demographics-empty">
                        Esperando votos para calcular la atracción por género.
                      </div>
                    `}
                  </div>
                </div>
              `;
            }).join('')
          )}
        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const tabStudents = document.getElementById("tab-students");
    const tabProfs = document.getElementById("tab-profs");
    const tabFaculties = document.getElementById("tab-faculties");

    if (tabStudents) {
      tabStudents.addEventListener("click", () => {
        if (this.activeType !== "estudiante") {
          this.activeType = "estudiante";
          this.render();
        }
      });
    }

    if (tabProfs) {
      tabProfs.addEventListener("click", () => {
        if (this.activeType !== "profesor") {
          this.activeType = "profesor";
          this.render();
        }
      });
    }

    if (tabFaculties) {
      tabFaculties.addEventListener("click", () => {
        if (this.activeType !== "facultad") {
          this.activeType = "facultad";
          this.render();
        }
      });
    }
  }
}
