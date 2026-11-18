import { storage } from "../storage.js";

export class DataChartsComponent {
  constructor(container) {
    this.container = container;
  }

  render() {
    const analytics = storage.getAnalyticsData();
    const provenanceList = analytics.topProvenance && analytics.topProvenance.length > 0 
      ? analytics.topProvenance 
      : (analytics.topFaculties || []);
    const maxProvenanceVotes = provenanceList.length > 0 && provenanceList[0].count > 0 ? provenanceList[0].count : 1;

    const totalGender = (analytics.genderDist.Hombre || 0) + (analytics.genderDist.Mujer || 0) + (analytics.genderDist["Prefiero no decir"] || 0);
    const pctMujer = totalGender > 0 ? Math.round(((analytics.genderDist.Mujer || 0) / totalGender) * 100) : 0;
    const pctHombre = totalGender > 0 ? Math.round(((analytics.genderDist.Hombre || 0) / totalGender) * 100) : 0;
    const pctOtro = totalGender > 0 ? Math.max(0, 100 - pctMujer - pctHombre) : 0;

    this.container.innerHTML = `
      <div class="fade-in" style="margin-bottom: 16px;">
        <div style="font-size:0.85rem; font-weight:700; color:var(--color-wine); margin-bottom:8px;">
          Análisis Sociológico y Estadísticas del Evento
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 12px;">
          <div style="background:white; border:1px solid var(--color-powder); border-radius:var(--radius-sm); padding:10px; text-align:center;">
            <div style="font-size:1.4rem; font-weight:800; color:var(--color-coral);">${analytics.totalVotes}</div>
            <div style="font-size:0.7rem; color:rgba(104,27,43,0.7); text-transform:uppercase; font-weight:700;">Votos Totales</div>
          </div>
          <div style="background:white; border:1px solid var(--color-powder); border-radius:var(--radius-sm); padding:10px; text-align:center;">
            <div style="font-size:1.4rem; font-weight:800; color:var(--color-wine);">${analytics.totalSubmissions}</div>
            <div style="font-size:0.7rem; color:rgba(104,27,43,0.7); text-transform:uppercase; font-weight:700;">Participantes</div>
          </div>
        </div>

        <div style="max-height: 280px; overflow-y: auto; display: flex; flex-direction: column; gap: 10px;">
          <div style="background:white; border:1px solid var(--color-powder); border-radius:var(--radius-sm); padding:10px;">
            <div style="font-size:0.75rem; font-weight:700; color:var(--color-wine); margin-bottom:6px;">Participación por Facultad / Procedencia</div>
            ${provenanceList.length === 0 ? `
              <div style="font-size:0.75rem; color:rgba(104,27,43,0.6); text-align:center; padding:6px 0;">Sin registros aún.</div>
            ` : provenanceList.map(f => {
              const pct = Math.round((f.count / maxProvenanceVotes) * 100);
              return `
                <div style="margin-bottom:6px;">
                  <div style="display:flex; justify-content:space-between; font-size:0.74rem; margin-bottom:2px;">
                    <span style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:80%; font-weight:600;">${f.name}</span>
                    <strong style="color:var(--color-coral);">${f.count}</strong>
                  </div>
                  <div class="bar-track" style="height:6px; border-radius:var(--radius-full); background:var(--color-powder-soft); overflow:hidden;">
                    <div class="bar-fill" style="width: ${pct}%; height:100%; border-radius:var(--radius-full); background:var(--color-coral);"></div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <div style="background:white; border:1px solid var(--color-powder); border-radius:var(--radius-sm); padding:10px;">
            <div style="font-size:0.75rem; font-weight:700; color:var(--color-wine); margin-bottom:6px;">Distribución Género Emisores</div>
            <div style="display: flex; height: 12px; border-radius: var(--radius-full); overflow: hidden; margin-bottom: 8px;">
              <div style="width: ${pctMujer}%; background-color: var(--color-coral);" title="Mujeres: ${pctMujer}%"></div>
              <div style="width: ${pctHombre}%; background-color: var(--color-wine);" title="Hombres: ${pctHombre}%"></div>
              <div style="width: ${Math.max(2, pctOtro)}%; background-color: var(--color-powder);" title="Otro: ${pctOtro}%"></div>
            </div>
            <div style="display:flex; justify-content:space-between; font-size:0.72rem;">
              <span>Mujeres: <strong>${pctMujer}%</strong> (${analytics.genderDist.Mujer || 0})</span>
              <span>Hombres: <strong>${pctHombre}%</strong> (${analytics.genderDist.Hombre || 0})</span>
              <span>Otro: <strong>${pctOtro}%</strong> (${analytics.genderDist['Prefiero no decir'] || 0})</span>
            </div>
          </div>

          <div style="background:white; border:1px solid var(--color-powder); border-radius:var(--radius-sm); padding:10px;">
            <div style="font-size:0.75rem; font-weight:700; color:var(--color-wine); margin-bottom:6px;">Canciones más dedicadas 🎵</div>
            ${analytics.topSongs.length === 0 ? `
              <div style="font-size:0.75rem; color:rgba(104,27,43,0.6); text-align:center; padding:6px 0;">No hay canciones dedicadas todavía.</div>
            ` : analytics.topSongs.map((s, idx) => `
              <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.74rem; padding:3px 0; border-bottom:1px solid rgba(104,27,43,0.06);">
                <span>#${idx + 1} ${s.title}</span>
                <strong style="color:var(--color-coral);">${s.count}</strong>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }
}
