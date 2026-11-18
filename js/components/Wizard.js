import { FACULTIES, CAREERS_BY_FACULTY, CAREER_DESCRIPTIONS, AGE_RANGES, GENDERS, CRUSH_GENDERS } from "../data.js";
import { storage } from "../storage.js";
import { ModerationService } from "../moderation.js";

export class WizardComponent {
  constructor(container, onComplete) {
    this.container = container;
    this.onComplete = onComplete;
    this.currentStep = 0;

    this.formData = {
      consentAccepted: false,
      emitterRole: "estudiante",
      emitterGender: "Mujer",
      emitterFaculty: FACULTIES[0],
      emitterAge: "20-22",
      targetType: "estudiante",
      targetGender: "Hombre",
      targetName: "",
      targetFaculty: FACULTIES[0],
      targetCareer: CAREERS_BY_FACULTY[FACULTIES[0]][0] || "",
      targetSemester: 4,
      targetEstimatedAge: "",
      interactionLevel: "Solo de lejos",
      message: "",
      song: "",
      isBrave: false,
      authorName: ""
    };

    this.autocompleteItems = [];
    this.showAutocomplete = false;
  }

  render() {
    this.container.innerHTML = "";

    const headerHtml = `
      <header class="mobile-header">
        <div class="brand-badge">
          <span class="brand-heart-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </span>
          <span class="brand-title">XOXO</span>
        </div>
        <span class="badge-tag">100% Anónimo</span>
      </header>
    `;

    const contentWrapper = document.createElement("div");
    contentWrapper.className = "mobile-content no-bottom-pad fade-in";

    if (this.currentStep > 0) {
      contentWrapper.innerHTML += this.renderProgressBar();
    }

    const stepBody = document.createElement("div");
    stepBody.id = "wizard-step-body";

    switch (this.currentStep) {
      case 0:
        stepBody.innerHTML = this.renderStep0Welcome();
        break;
      case 1:
        stepBody.innerHTML = this.renderStep1Emitter();
        break;
      case 2:
        stepBody.innerHTML = this.renderStep2Target();
        break;
      case 3:
        stepBody.innerHTML = this.renderStep3Confession();
        break;
      case 4:
        stepBody.innerHTML = this.renderStep4Confirmation();
        break;
    }

    contentWrapper.appendChild(stepBody);
    this.container.innerHTML = headerHtml;
    this.container.appendChild(contentWrapper);

    this.bindEvents();
  }

  renderProgressBar() {
    const totalSteps = 4;
    const progressPercent = (this.currentStep / totalSteps) * 100;
    const stepNames = ["", "Tu Perfil", "Tu Crush Secreto", "Tu Confesión", "Confirmación"];

    return `
      <div class="progress-container">
        <div class="progress-header">
          <span class="progress-step-text">Paso ${this.currentStep} de ${totalSteps}</span>
          <span class="progress-step-name">${stepNames[this.currentStep]}</span>
        </div>
        <div class="progress-track">
          <div class="progress-fill" style="width: ${progressPercent}%;"></div>
        </div>
      </div>
    `;
  }

  renderStep0Welcome() {
    return `
      <div class="card-romantic">
        <img src="img/xoxo_hero_cover.jpg" alt="XOXO Anónimos" class="hero-visual" onerror="this.style.display='none'">
        
        <h1 class="title-display">Dilo sin decir tu nombre.</h1>
        <p class="subtitle-desc">
          Declara tu crush universitario, dedica esa canción que no te sacas de la cabeza y forma parte del ranking oficial del campus de forma completamente anónima.
        </p>

        <div class="consent-box">
          <input type="checkbox" id="consent-check" class="consent-checkbox" ${this.formData.consentAccepted ? "checked" : ""}>
          <label for="consent-check" class="consent-text">
            <strong>Consentimiento informado (Ley 1581 de 2012):</strong> Acepto el tratamiento de datos sociodemográficos estrictamente anonimizados para estadísticas universitarias y el evento XOXO.
          </label>
        </div>

        <button id="btn-start" class="btn-primary" style="margin-top: 10px;" ${!this.formData.consentAccepted ? "disabled style='opacity:0.6; cursor:not-allowed;'" : ""}>
          <span>Comenzar ahora</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
      </div>
    `;
  }

  renderStep1Emitter() {
    return `
      <div class="card-romantic">
        <div class="card-header-icon">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>

        <h2 class="title-display">¿Quién eres tú?</h2>
        <p class="subtitle-desc">Tus datos nunca serán revelados públicamente. Solo alimentan las estadísticas generales del campus.</p>

        <div class="form-group">
          <label class="form-label">¿Quién eres tú? <span class="required-dot">•</span></label>
          <div class="options-grid-3">
            <button type="button" class="option-chip ${this.formData.emitterRole === 'estudiante' ? 'selected' : ''}" data-field="emitterRole" data-value="estudiante" style="font-size:0.8rem; padding:10px 4px;">
              🎒 Estudiante
            </button>
            <button type="button" class="option-chip ${this.formData.emitterRole === 'administrativo' ? 'selected' : ''}" data-field="emitterRole" data-value="administrativo" style="font-size:0.8rem; padding:10px 4px;">
              💼 Administrativo
            </button>
            <button type="button" class="option-chip ${this.formData.emitterRole === 'externo' ? 'selected' : ''}" data-field="emitterRole" data-value="externo" style="font-size:0.8rem; padding:10px 4px;">
              🌐 Externo
            </button>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Tu género <span class="required-dot">•</span></label>
          <div class="options-grid-3">
            ${GENDERS.map(g => `
              <button type="button" class="option-chip ${this.formData.emitterGender === g.id ? 'selected' : ''}" data-field="emitterGender" data-value="${g.id}">
                ${g.label}
              </button>
            `).join('')}
          </div>
        </div>

        ${this.formData.emitterRole !== 'externo' ? `
          <div class="form-group">
            <label class="form-label" for="emitter-faculty">Tu facultad <span class="required-dot">•</span></label>
            <select id="emitter-faculty" class="form-select">
              ${FACULTIES.map(f => `<option value="${f}" ${this.formData.emitterFaculty === f ? 'selected' : ''}>${f}</option>`).join('')}
            </select>
          </div>
        ` : ''}

        <div class="form-group">
          <label class="form-label">Tu rango de edad <span class="required-dot">•</span></label>
          <div class="options-grid-2" style="grid-template-columns: repeat(4, 1fr);">
            ${AGE_RANGES.map(a => `
              <button type="button" class="option-chip ${this.formData.emitterAge === a ? 'selected' : ''}" data-field="emitterAge" data-value="${a}">
                ${a}
              </button>
            `).join('')}
          </div>
        </div>

        <div style="display:flex; gap:12px; margin-top:20px;">
          <button id="btn-back" class="btn-secondary" style="flex:1;">Atrás</button>
          <button id="btn-next" class="btn-primary" style="flex:2;">Continuar</button>
        </div>
      </div>
    `;
  }

  renderStep2Target() {
    const isProfessor = this.formData.targetType === "profesor";
    const availableCareers = CAREERS_BY_FACULTY[this.formData.targetFaculty] || [];

    return `
      <div class="card-romantic">
        <div class="card-header-icon" style="color:var(--color-cherry); background-color:#FFEBF0;">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>

        <h2 class="title-display">Tu Crush Secreto</h2>
        <p class="subtitle-desc">Selecciona o escribe el nombre de la persona que hace que tus días universitarios valgan la pena.</p>

        <div class="form-group">
          <label class="form-label">¿Tu crush es estudiante o docente? <span class="required-dot">•</span></label>
          <div class="options-grid-2">
            <button type="button" class="option-chip ${this.formData.targetType === 'estudiante' ? 'selected' : ''}" data-field="targetType" data-value="estudiante">
              Estudiante
            </button>
            <button type="button" class="option-chip ${this.formData.targetType === 'profesor' ? 'selected' : ''}" data-field="targetType" data-value="profesor">
              Docente
            </button>
          </div>
        </div>

        <div class="form-group autocomplete-container">
          <label class="form-label" for="target-name-input">Nombre y Apellido <span class="required-dot">•</span></label>
          <input 
            type="text" 
            id="target-name-input" 
            class="form-input" 
            placeholder="Escribe el nombre y apellido real..."
            value="${this.formData.targetName}"
            autocomplete="off"
          >
          <div id="autocomplete-list" class="autocomplete-dropdown" style="display:none;"></div>
          <div id="name-validation-warning" style="display:none; color:var(--color-cherry); font-size:0.8rem; font-weight:600; margin-top:6px; background:#FFEBF0; padding:8px 12px; border-radius:var(--radius-sm); border:1px solid var(--color-powder);"></div>
        </div>

        <div class="form-group">
          <label class="form-label">Género del crush <span class="required-dot">•</span></label>
          <div class="options-grid-3">
            ${CRUSH_GENDERS.map(g => `
              <button type="button" class="option-chip ${this.formData.targetGender === g.id ? 'selected' : ''}" data-field="targetGender" data-value="${g.id}">
                ${g.label}
              </button>
            `).join('')}
          </div>
        </div>

        <div class="form-group">
          <label class="form-label" for="target-faculty">Facultad de tu crush <span class="required-dot">•</span></label>
          <select id="target-faculty" class="form-select">
            ${FACULTIES.map(f => `<option value="${f}" ${this.formData.targetFaculty === f ? 'selected' : ''}>${f}</option>`).join('')}
          </select>
        </div>

        ${!isProfessor ? `
          <div class="form-group">
            <label class="form-label" for="target-career">Carrera en curso <span class="required-dot">•</span></label>
            <select id="target-career" class="form-select">
              ${availableCareers.map(c => `<option value="${c}" ${this.formData.targetCareer === c ? 'selected' : ''}>${c} (${CAREER_DESCRIPTIONS[c] || ''})</option>`).join('')}
            </select>
          </div>

          <div class="form-group">
            <label class="form-label" for="target-semester">Semestre aproximado</label>
            <select id="target-semester" class="form-select">
              ${[1,2,3,4,5,6,7,8,9,10].map(s => `<option value="${s}" ${this.formData.targetSemester == s ? 'selected' : ''}>Semestre ${s}</option>`).join('')}
            </select>
          </div>
        ` : `
          <div class="form-group">
            <label class="form-label">Edad estimada (opcional)</label>
            <div class="options-grid-3">
              ${["25-35", "36-45", "46+"].map(age => `
                <button type="button" class="option-chip ${this.formData.targetEstimatedAge === age ? 'selected' : ''}" data-field="targetEstimatedAge" data-value="${age}">
                  ${age} años
                </button>
              `).join('')}
            </div>
          </div>
        `}

        <div class="form-group">
          <label class="form-label">¿Qué nivel de cercanía tienes con él/ella? <span class="required-dot">•</span></label>
          <div class="options-grid-2">
            <button type="button" class="option-chip ${this.formData.interactionLevel === 'Le he hablado' ? 'selected' : ''}" data-field="interactionLevel" data-value="Le he hablado">
              🗣️ Le he hablado
            </button>
            <button type="button" class="option-chip ${this.formData.interactionLevel === 'Solo de lejos' ? 'selected' : ''}" data-field="interactionLevel" data-value="Solo de lejos">
              👀 Solo de lejos
            </button>
          </div>
        </div>

        <div style="display:flex; gap:12px; margin-top:20px;">
          <button id="btn-back" class="btn-secondary" style="flex:1;">Atrás</button>
          <button id="btn-next" class="btn-primary" style="flex:2;">Continuar</button>
        </div>
      </div>
    `;
  }

  renderStep3Confession() {
    const charsRemaining = 200 - (this.formData.message ? this.formData.message.length : 0);

    return `
      <div class="card-romantic">
        <div class="card-header-icon" style="color:var(--color-coral);">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </div>

        <h2 class="title-display">Mensaje & Canción</h2>
        <p class="subtitle-desc">Exprésate libremente (opcional). Los mensajes aprobados saldrán en el Muro Anónimo del campus.</p>

        <div class="form-group">
          <label class="form-label" for="message-input">Tu confesión o mensaje</label>
          <textarea 
            id="message-input" 
            class="form-textarea" 
            maxlength="200" 
            placeholder="Escribe lo que nunca te has atrevido a decirle en persona..."
          >${this.formData.message}</textarea>
          <div class="char-counter" id="char-count">${charsRemaining} caracteres restantes</div>
        </div>

        <div class="form-group">
          <label class="form-label" for="song-input">Dedícale una canción 🎵</label>
          <p style="font-size:0.75rem; color:rgba(104,27,43,0.7); margin-top:-2px; margin-bottom:6px; line-height:1.35;">
            Ingresa el <strong>nombre de la canción más el artista separados por un guion</strong> (ej. <em>Canción - Artista</em>) o el <strong>enlace directo de Spotify</strong>.
          </p>
          <input 
            type="text" 
            id="song-input" 
            class="form-input" 
            placeholder="Ej: Golden Hour - JVKE o https://open.spotify.com/track/..."
            value="${this.formData.song}"
          >
        </div>

        <div class="brave-card">
          <div class="brave-header">
            <div class="brave-info">
              <span class="brave-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </span>
              <div>
                <div class="brave-title">¿Eres valiente?</div>
                <div class="brave-desc">¿Quieres que tu nombre y carrera aparezcan en el Muro para que tu crush sepa quién eres?</div>
              </div>
            </div>
            <label class="switch-label">
              <input type="checkbox" id="brave-switch" ${this.formData.isBrave ? 'checked' : ''}>
              <span class="switch-slider"></span>
            </label>
          </div>

          <div id="brave-name-container" style="margin-top:14px; display:${this.formData.isBrave ? 'block' : 'none'};">
            <label class="form-label" for="author-name-input">Tu nombre público</label>
            <input 
              type="text" 
              id="author-name-input" 
              class="form-input" 
              placeholder="Ej: Valentina M. (Semestre 5)"
              value="${this.formData.authorName}"
            >
          </div>
        </div>

        <div style="display:flex; gap:12px; margin-top:20px;">
          <button id="btn-back" class="btn-secondary" style="flex:1;">Atrás</button>
          <button id="btn-next" class="btn-primary" style="flex:2;">Revisar</button>
        </div>
      </div>
    `;
  }

  renderStep4Confirmation() {
    const roleLabels = {
      estudiante: "Estudiante",
      administrativo: "Administrativo",
      externo: "Externo"
    };

    return `
      <div class="card-romantic">
        <div style="text-align:center; margin-bottom:16px;">
          <span style="display:inline-block; font-size: 3rem; margin-bottom:8px;">💌</span>
          <h2 class="title-display">¿Listo para el envío?</h2>
          <p class="subtitle-desc" style="margin-bottom:12px;">Verifica el resumen de tu participación antes de sellarla.</p>
        </div>

        <div style="background-color:var(--color-powder-soft); border-radius:var(--radius-md); padding:16px; margin-bottom:18px;">
          <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:0.85rem;">
            <span style="color:rgba(104,27,43,0.7);">Tu Rol:</span>
            <strong>${roleLabels[this.formData.emitterRole] || 'Estudiante'} (${this.formData.emitterGender})</strong>
          </div>
          <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:0.85rem;">
            <span style="color:rgba(104,27,43,0.7);">${this.formData.emitterRole === 'externo' ? 'Procedencia:' : 'Tu Facultad:'}</span>
            <span>${this.formData.emitterFaculty || (this.formData.emitterRole === 'externo' ? 'Externo' : 'No especificada')}</span>
          </div>
          <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:0.85rem;">
            <span style="color:rgba(104,27,43,0.7);">Tu Crush:</span>
            <strong style="color:var(--color-coral);">${this.formData.targetName || "No especificado"}</strong>
          </div>
          <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:0.85rem;">
            <span style="color:rgba(104,27,43,0.7);">Facultad:</span>
            <span>${this.formData.targetFaculty}</span>
          </div>
          ${this.formData.song ? `
            <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:0.85rem;">
              <span style="color:rgba(104,27,43,0.7);">Canción:</span>
              <span style="font-weight:600;">🎵 ${this.formData.song}</span>
            </div>
          ` : ''}
          <div style="display:flex; justify-content:space-between; font-size:0.85rem;">
            <span style="color:rgba(104,27,43,0.7);">Anonimato:</span>
            <span>${this.formData.isBrave ? `<span class="confession-brave-tag">Público: ${this.formData.authorName}</span>` : '🔒 100% Anónimo'}</span>
          </div>
        </div>

        <div style="font-size:0.78rem; color:rgba(104,27,43,0.75); text-align:center; margin-bottom:18px; line-height:1.4;">
          🔒 Al enviar tu confesión, tu dispositivo quedará registrado para evitar votos duplicados y desbloquearás el <strong>Dashboard con los Rankings y el Muro en vivo</strong>.
        </div>

        <div style="display:flex; gap:12px;">
          <button id="btn-back" class="btn-secondary" style="flex:1;">Editar</button>
          <button id="btn-submit" class="btn-primary" style="flex:2;">
            <span>Enviar Confesión</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </div>
    `;
  }

  bindEvents() {
    const consentCheck = document.getElementById("consent-check");
    const btnStart = document.getElementById("btn-start");
    if (consentCheck && btnStart) {
      consentCheck.addEventListener("change", (e) => {
        this.formData.consentAccepted = e.target.checked;
        if (e.target.checked) {
          btnStart.removeAttribute("disabled");
          btnStart.style.opacity = "1";
          btnStart.style.cursor = "pointer";
        } else {
          btnStart.setAttribute("disabled", "true");
          btnStart.style.opacity = "0.6";
          btnStart.style.cursor = "not-allowed";
        }
      });

      btnStart.addEventListener("click", () => {
        if (this.formData.consentAccepted) {
          this.currentStep = 1;
          this.render();
        }
      });
    }

    const btnNext = document.getElementById("btn-next");
    const btnBack = document.getElementById("btn-back");
    const btnSubmit = document.getElementById("btn-submit");

    if (btnBack) {
      btnBack.addEventListener("click", () => {
        if (this.currentStep > 0) {
          this.currentStep--;
          this.render();
        }
      });
    }

    if (btnNext) {
      btnNext.addEventListener("click", () => {
        if (this.validateCurrentStep()) {
          this.currentStep++;
          this.render();
        }
      });
    }

    if (btnSubmit) {
      btnSubmit.addEventListener("click", () => {
        this.submitForm();
      });
    }

    const chips = this.container.querySelectorAll(".option-chip");
    chips.forEach(chip => {
      chip.addEventListener("click", () => {
        const field = chip.dataset.field;
        const value = chip.dataset.value;
        this.formData[field] = value;

        if (field === "emitterRole") {
          if (value === "externo") {
            this.formData.emitterFaculty = "Externo";
          } else if (this.formData.emitterFaculty === "Externo") {
            this.formData.emitterFaculty = FACULTIES[0];
          }
          this.render();
          return;
        }

        if (field === "targetType") {
          this.render();
        } else {
          const siblings = chip.parentElement.querySelectorAll(".option-chip");
          siblings.forEach(s => s.classList.remove("selected"));
          chip.classList.add("selected");
        }
      });
    });

    const emitterFacultySelect = document.getElementById("emitter-faculty");
    if (emitterFacultySelect) {
      emitterFacultySelect.addEventListener("change", (e) => {
        this.formData.emitterFaculty = e.target.value;
      });
    }

    const targetFacultySelect = document.getElementById("target-faculty");
    if (targetFacultySelect) {
      targetFacultySelect.addEventListener("change", (e) => {
        this.formData.targetFaculty = e.target.value;
        const careers = CAREERS_BY_FACULTY[e.target.value] || [];
        this.formData.targetCareer = careers[0] || "";
        this.render();
      });
    }

    const targetCareerSelect = document.getElementById("target-career");
    if (targetCareerSelect) {
      targetCareerSelect.addEventListener("change", (e) => {
        this.formData.targetCareer = e.target.value;
      });
    }

    const targetSemesterSelect = document.getElementById("target-semester");
    if (targetSemesterSelect) {
      targetSemesterSelect.addEventListener("change", (e) => {
        this.formData.targetSemester = parseInt(e.target.value, 10);
      });
    }

    const targetNameInput = document.getElementById("target-name-input");
    const autocompleteList = document.getElementById("autocomplete-list");
    const warningEl = document.getElementById("name-validation-warning");

    if (targetNameInput) {
      targetNameInput.addEventListener("input", (e) => {
        const val = e.target.value;
        this.formData.targetName = val;

        if (val.trim().length >= 3) {
          const check = ModerationService.validateName(val);
          if (!check.isValid) {
            if (warningEl) {
              warningEl.textContent = `⚠️ ${check.error}`;
              warningEl.style.display = "block";
            }
            targetNameInput.style.borderColor = "var(--color-cherry)";
          } else {
            if (warningEl) warningEl.style.display = "none";
            targetNameInput.style.borderColor = "rgba(104, 27, 43, 0.2)";
          }
        } else {
          if (warningEl) warningEl.style.display = "none";
          targetNameInput.style.borderColor = "rgba(104, 27, 43, 0.2)";
        }

        const query = val.trim().toLowerCase();
        if (query.length < 2) {
          if (autocompleteList) autocompleteList.style.display = "none";
          return;
        }

        const directory = storage.getDirectory();
        const matches = directory
          .filter(item => item.type === this.formData.targetType && item.name.toLowerCase().includes(query))
          .slice(0, 5);

        if (matches.length > 0 && autocompleteList) {
          autocompleteList.innerHTML = matches.map(m => `
            <div class="autocomplete-item" data-name="${m.name}" data-faculty="${m.faculty || ''}" data-career="${m.career || ''}">
              <div>
                <div class="autocomplete-name">${m.name}</div>
                <div class="autocomplete-desc">${m.faculty || ''} ${m.career ? '• ' + m.career : ''}</div>
              </div>
              <span style="font-size:0.75rem; color:var(--color-coral); font-weight:700;">★ ${m.votes || 0}</span>
            </div>
          `).join('');

          autocompleteList.style.display = "block";

          autocompleteList.querySelectorAll(".autocomplete-item").forEach(item => {
            item.addEventListener("click", () => {
              this.formData.targetName = item.dataset.name;
              if (item.dataset.faculty) {
                this.formData.targetFaculty = item.dataset.faculty;
              }
              if (item.dataset.career) {
                this.formData.targetCareer = item.dataset.career;
              }
              if (autocompleteList) autocompleteList.style.display = "none";
              this.render();
            });
          });
        } else {
          if (autocompleteList) autocompleteList.style.display = "none";
        }
      });
    }

    const messageInput = document.getElementById("message-input");
    const charCount = document.getElementById("char-count");
    if (messageInput && charCount) {
      messageInput.addEventListener("input", (e) => {
        this.formData.message = e.target.value;
        const left = 200 - e.target.value.length;
        charCount.textContent = `${left} caracteres restantes`;
      });
    }

    const songInput = document.getElementById("song-input");
    if (songInput) {
      songInput.addEventListener("input", (e) => {
        this.formData.song = e.target.value;
      });
    }

    const braveSwitch = document.getElementById("brave-switch");
    const braveNameContainer = document.getElementById("brave-name-container");
    if (braveSwitch && braveNameContainer) {
      braveSwitch.addEventListener("change", (e) => {
        this.formData.isBrave = e.target.checked;
        braveNameContainer.style.display = e.target.checked ? "block" : "none";
      });
    }

    const authorNameInput = document.getElementById("author-name-input");
    if (authorNameInput) {
      authorNameInput.addEventListener("input", (e) => {
        this.formData.authorName = e.target.value;
      });
    }
  }

  validateCurrentStep() {
    if (this.currentStep === 1) {
      if (this.formData.emitterRole === "externo") {
        this.formData.emitterFaculty = "Externo";
        return true;
      }
      if (!this.formData.emitterFaculty) {
        alert("Por favor selecciona tu facultad.");
        return false;
      }
      return true;
    }

    if (this.currentStep === 2) {
      const nameCheck = ModerationService.validateName(this.formData.targetName);
      if (!nameCheck.isValid) {
        const warningEl = document.getElementById("name-validation-warning");
        const targetInput = document.getElementById("target-name-input");
        if (warningEl) {
          warningEl.textContent = `⚠️ ${nameCheck.error}`;
          warningEl.style.display = "block";
        }
        if (targetInput) {
          targetInput.style.borderColor = "var(--color-cherry)";
          targetInput.focus();
        }
        alert(`⚠️ ${nameCheck.error}`);
        return false;
      }
      return true;
    }

    if (this.currentStep === 3) {
      if (this.formData.isBrave) {
        const authorCheck = ModerationService.validateName(this.formData.authorName);
        if (!authorCheck.isValid) {
          alert(`⚠️ Nombre público no admitido: ${authorCheck.error}`);
          return false;
        }
      }
      return true;
    }

    return true;
  }

  submitForm() {
    storage.submitConfession(this.formData);
    if (typeof this.onComplete === "function") {
      this.onComplete();
    }
  }
}
