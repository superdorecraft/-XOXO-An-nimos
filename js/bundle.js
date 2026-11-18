(function () {
  'use strict';


  const FACULTIES = [
    "Facultad de Ingenierías",
    "Facultad de Diseño y Comunicación",
    "Facultad de Ciencias Administrativas y Negocios"
  ];
  
  const CAREERS_BY_FACULTY = {
    "Facultad de Ingenierías": [
      "Ingeniería de Software",
      "Ingeniería en Ciencia de Datos",
      "Ingeniería Industrial",
      "Ingeniería Mecatrónica"
    ],
    "Facultad de Diseño y Comunicación": [
      "Diseño Visual Digital",
      "Publicidad Digital y Mercadeo"
    ],
    "Facultad de Ciencias Administrativas y Negocios": [
      "Marketing",
      "Negocios Digitales",
      "Administración de Empresas",
      "Negocios Internacionales",
      "Contaduría Pública"
    ]
  };
  
  const CAREER_DESCRIPTIONS = {
    "Ingeniería de Software": "Desarrollo cloud, IA y apps móviles",
    "Ingeniería en Ciencia de Datos": "Machine Learning y modelos predictivos",
    "Ingeniería Industrial": "Optimización de procesos y logística 4.0",
    "Ingeniería Mecatrónica": "Robótica, automatización y software",
    "Diseño Visual Digital": "Interfaces interactivas e identidad gráfica",
    "Publicidad Digital y Mercadeo": "Growth marketing y medios digitales",
    "Marketing": "Estrategias digitales",
    "Negocios Digitales": "Comercio electrónico",
    "Administración de Empresas": "Liderazgo ejecutivo y nuevos negocios",
    "Negocios Internacionales": "Comercio global y mercados digitales",
    "Contaduría Pública": "Auditoría, finanzas y tributaria"
  };
  
  const AGE_RANGES = ["17-19", "20-22", "23-25", "26+"];
  
  const GENDERS = [
    { id: "Hombre", label: "Hombre" },
    { id: "Mujer", label: "Mujer" },
    { id: "Prefiero no decir", label: "Prefiero no decir" }
  ];
  
  const CRUSH_GENDERS = [
    { id: "Hombre", label: "Hombre" },
    { id: "Mujer", label: "Mujer" },
    { id: "Otro", label: "Otro / No binario" }
  ];
  
  const UNIVERSITY_DIRECTORY = [];
  
  const SEED_CONFESSIONS = [];
  
  const PROHIBITED_WORDS = [
    "idiota", "estupido", "estupida", "imbecil", "maldito", "maldita",
    "perra", "puta", "puto", "marica", "gonorrea", "hp", "pirobo", "malparido"
  ];
  

  const ALBUR_PATTERNS = [
    { pattern: /abrah?am.*el?h?oy[oa]/i, label: "Albur (Abraham Eloyo / Abran el hoyo)" },
    { pattern: /abran?m?e?.*el?h?oy[oa]/i, label: "Albur (Abran el hoyo)" },
    { pattern: /lol?a.*mont?er[oa]/i, label: "Albur (Lola Montero / Lo lamo entero)" },
    { pattern: /lol?am[oe].*ent?er[oa]/i, label: "Albur (Lo lamo entero)" },
    { pattern: /lol?a.*ment?o/i, label: "Albur (Lola Mento / Lo lamento)" },
    { pattern: /ros?a.*mel?an[oa]/i, label: "Albur (Rosa Melano / Roza mi ano)" },
    { pattern: /ros?a.*melc?ul[oa]/i, label: "Albur (Rosa Melculo)" },
    { pattern: /ros?a.*melch?ot[oa]/i, label: "Albur (Rosa Melchoto)" },
    { pattern: /el[bv]er.*gal?arg[oa]/i, label: "Albur (Elver Galarga / El verga larga)" },
    { pattern: /el[bv]er.*gud[oa]/i, label: "Albur (Elver Gudo / El vergudo)" },
    { pattern: /el[bv]er.*gon[sz]al?e[sz]/i, label: "Albur (Elver Gonzalez)" },
    { pattern: /[bv]enit[oa].*cam?el[oa]/i, label: "Albur (Benito Camelo / Ven y tócame)" },
    { pattern: /[bv]enit[oa].*cam?elas/i, label: "Albur (Benito Camelas)" },
    { pattern: /d[eé]?[bv]or[ah]?.*mel[oa]/i, label: "Albur (Débora Melo / Devórame lo...)" },
    { pattern: /d[eé]?[bv]or[ah]?.*test?as/i, label: "Albur (Débora Testas)" },
    { pattern: /ak?il?es.*[bv]ae[sz]a/i, label: "Albur (Aquiles Baeza / Aquí les va esa)" },
    { pattern: /ak?il?es.*[bv]rinco/i, label: "Albur (Aquiles Brinco)" },
    { pattern: /ak?il?es.*pico/i, label: "Albur (Aquiles Pico)" },
    { pattern: /alm?a.*marc?el?a.*go[sz][oa]/i, label: "Albur (Alma Marcela Gozo)" },
    { pattern: /marc?el?a.*go[sz][oa]/i, label: "Albur (Marcela Gozo)" },
    { pattern: /tom?[aá]s.*turbad[oa]/i, label: "Albur (Tomás Turbado / Masturbado)" },
    { pattern: /el[bv]a.*[sz]urit[oa]/i, label: "Albur (Elba Zurita / Basurita)" },
    { pattern: /el[bv]a.*[gj]in[oa]/i, label: "Albur (Elba Gina / Vagina)" },
    { pattern: /el[bv]a.*[gj]anad[oa]/i, label: "Albur (Elba Ganado)" },
    { pattern: /se[bv]el?ind?a.*parad?a/i, label: "Albur (Sevelinda Parada / Se ve linda parada)" },
    { pattern: /el[bv]i[oa].*la[oa]/i, label: "Albur (Elvio Lao / El violao)" },
    { pattern: /[sz]oil?a.*c?erd?a/i, label: "Albur (Zoila Cerda / Soy la cerda)" },
    { pattern: /[sz]oil?a.*[bv]ac?a/i, label: "Albur (Zoila Vaca / Soy la vaca)" },
    { pattern: /mich?el?e?.*pin[oa]/i, label: "Albur (Michele Pino / Mi chele y pino)" },
    { pattern: /paco.*[gj]ert?e/i, label: "Albur (Paco Jerte / Pa' cogerte)" },
    { pattern: /anal?is?a.*mel?an[oa]/i, label: "Albur (Analisa Melano)" },
    { pattern: /anal?is?a.*melc?ul[oa]/i, label: "Albur (Analisa Melculo)" },
    { pattern: /el?en?a.*nit[oa]/i, label: "Albur (Elena Nito / El enanito)" },
    { pattern: /in[eé]s.*esari[oa]/i, label: "Albur (Inés Esario / Innecesario)" },
    { pattern: /karen.*lach?up[oa]/i, label: "Albur (Karen Lachupa)" },
    { pattern: /luc?as.*priet[oa]/i, label: "Albur (Lucas Prieto / Lo escupo y lo aprieto)" },
    { pattern: /ch?up?a.*mel[oa]/i, label: "Albur (Chupamelo)" },
    { pattern: /toco.*tulam?b?e/i, label: "Albur (Toco Tulambe)" },
    { pattern: /[gj]org?e.*nit?al?es?/i, label: "Albur (Jorge Nitales / Genitales)" }
  ];
  
  const PROFANITY_ROOTS = [
    "idiota", "estupido", "estupida", "imbecil", "maldito", "maldita",
    "perra", "puta", "puto", "marica", "maricon", "gonorrea", "hp", "hpt",
    "pirobo", "piroba", "malparido", "malparida", "carechimba", "chimba",
    "careverga", "verga", "pito", "culo", "chucha", "guevon", "guevona",
    "wevon", "wevona", "huevon", "huevona", "tetas", "senos", "coño",
    "pene", "vagina", "clitoris", "chupapollas", "follo", "follar", "semen",
    "zorra", "zorrita", "perrita", "bastardo", "bastarda", "culiao", "carepicha",
    "picha", "marrano", "cerdo", "mojon", "sidoso", "sidosa"
  ];
  
  const TROLL_GENERIC_NAMES = [
    "nadie", "ninguno", "ninguna", "alguien", "yo", "yo mismo", "yo misma",
    "tu mama", "tu papa", "tu madre", "tu padre", "tu tia", "tu abuela",
    "anonimo", "anonima", "desconocido", "desconocida", "todos", "todas",
    "test", "testing", "prueba", "pruebas", "admin", "administrador",
    "null", "undefined", "asdf", "qwerty", "xxx", "xxx69", "crush", "mi crush"
  ];
  
  class ModerationService {
    static normalizeText(text) {
      if (!text) return "";
      return text
        .toLowerCase()
        .replace(/@/g, "a")
        .replace(/4/g, "a")
        .replace(/3/g, "e")
        .replace(/1/g, "i")
        .replace(/!/g, "i")
        .replace(/0/g, "o")
        .replace(/5/g, "s")
        .replace(/7/g, "t")
        .replace(/8/g, "b")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/(.)\1+/g, "$1")
        .trim();
    }
  
    static validateName(rawName) {
      if (!rawName || typeof rawName !== "string") {
        return { isValid: false, error: "El nombre es obligatorio." };
      }
  
      const trimmed = rawName.trim();
  
      if (trimmed.length < 3) {
        return { isValid: false, error: "El nombre debe tener al menos 3 caracteres." };
      }
      if (trimmed.length > 50) {
        return { isValid: false, error: "El nombre es demasiado extenso (máximo 50 caracteres)." };
      }
  
      if (/\d/.test(trimmed)) {
        return { isValid: false, error: "Un nombre real no puede contener números." };
      }
  
      if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s\.\-']+$/.test(trimmed)) {
        return { isValid: false, error: "El nombre solo puede contener letras y espacios válidos." };
      }
  
      if (/(.)\1{2,}/.test(trimmed)) {
        return { isValid: false, error: "El nombre contiene letras repetidas de forma no natural." };
      }
  
      const normalized = this.normalizeText(trimmed);
      const compactNoSpaces = normalized.replace(/[\s\.\-']/g, "");
  
      if (/[bcdfghjklmnpqrstvwxyz]{5,}/i.test(compactNoSpaces)) {
        return { isValid: false, error: "El nombre parece una combinación de teclas al azar." };
      }
  
      if (!/[aeiou]/.test(compactNoSpaces)) {
        return { isValid: false, error: "El nombre no contiene vocales válidas." };
      }
  
      const cleanLower = trimmed.toLowerCase();
      if (TROLL_GENERIC_NAMES.includes(cleanLower)) {
        return { isValid: false, error: "Ingresa el nombre de una persona real de la universidad." };
      }
  
      if (this.isBlacklisted(trimmed)) {
        return {
          isValid: false,
          error: "Este nombre ha sido retirado o bloqueado por el comité de moderación.",
          flagReason: "Bloqueado manualmente por moderador"
        };
      }
  
      const alburMatch = this.detectAlbur(trimmed);
      if (alburMatch) {
        return { 
          isValid: false, 
          error: "Nombre no admitido. Por favor escribe un nombre universitario real y respetuoso.",
          flagReason: alburMatch.label
        };
      }
  
      const profanityMatch = this.detectProfanity(trimmed);
      if (profanityMatch) {
        return {
          isValid: false,
          error: "El nombre contiene términos ofensivos no permitidos.",
          flagReason: `Grosería detectada: "${profanityMatch}"`
        };
      }
  
      return { isValid: true };
    }
  
    static detectAlbur(name) {
      if (!name) return null;
      const clean = this.normalizeText(name);
  
      for (const item of ALBUR_PATTERNS) {
        if (item.pattern.test(clean)) {
          return item;
        }
      }
      return null;
    }
  
    static detectProfanity(text) {
      if (!text) return null;
      const normalized = this.normalizeText(text);
  
      for (const root of PROFANITY_ROOTS) {
        const regex = new RegExp(`(^|\\s|[.,;:])${root}($|\\s|[.,;:])`, "i");
        if (regex.test(normalized) || normalized.includes(root)) {
          return root;
        }
      }
      return null;
    }
  
    static auditSubmission(payload) {
      const flags = [];
  
      const targetValidation = this.validateName(payload.targetName);
      if (!targetValidation.isValid) {
        flags.push({ field: "targetName", reason: targetValidation.flagReason || targetValidation.error });
      }
  
      if (payload.isBrave && payload.authorName) {
        const authorValidation = this.validateName(payload.authorName);
        if (!authorValidation.isValid) {
          flags.push({ field: "authorName", reason: authorValidation.flagReason || authorValidation.error });
        }
      }
  
      if (payload.message && payload.message.trim().length > 0) {
        const msgProfanity = this.detectProfanity(payload.message);
        if (msgProfanity) {
          flags.push({ field: "message", reason: `Lenguaje prohibido en mensaje ("${msgProfanity}")` });
        }
  
        const msgAlbur = this.detectAlbur(payload.message);
        if (msgAlbur) {
          flags.push({ field: "message", reason: `Albur en mensaje (${msgAlbur.label})` });
        }
      }
  
      return {
        isClean: flags.length === 0,
        flags,
        status: flags.length === 0 ? "approved" : "pending_review"
      };
    }
  
    static isBlacklisted(name) {
      if (!name) return false;
      try {
        const stored = localStorage.getItem("xoxo_custom_blacklist");
        if (!stored) return false;
        const list = JSON.parse(stored);
        const clean = this.normalizeText(name);
        return list.some(item => clean.includes(this.normalizeText(item)));
      } catch {
        return false;
      }
    }
  
    static addToBlacklist(term) {
      if (!term || !term.trim()) return false;
      try {
        const stored = localStorage.getItem("xoxo_custom_blacklist");
        const list = stored ? JSON.parse(stored) : [];
        const clean = term.trim().toLowerCase();
        if (!list.includes(clean)) {
          list.push(clean);
          localStorage.setItem("xoxo_custom_blacklist", JSON.stringify(list));
        }
        return true;
      } catch {
        return false;
      }
    }
  
    static getBlacklist() {
      try {
        const stored = localStorage.getItem("xoxo_custom_blacklist");
        return stored ? JSON.parse(stored) : [];
      } catch {
        return [];
      }
    }
  
    static removeFromBlacklist(term) {
      try {
        const stored = localStorage.getItem("xoxo_custom_blacklist");
        if (!stored) return false;
        let list = JSON.parse(stored);
        list = list.filter(item => item !== term.trim().toLowerCase());
        localStorage.setItem("xoxo_custom_blacklist", JSON.stringify(list));
        return true;
      } catch {
        return false;
      }
    }
  }
  

  
  const STORAGE_KEYS = {
    SEALED: "xoxo_device_sealed",
    USER_DATA: "xoxo_user_profile",
    CONFESSIONS: "xoxo_confessions_store",
    DIRECTORY: "xoxo_directory_store",
    LIKES: "xoxo_user_likes",
    SUBMISSIONS_LOG: "xoxo_raw_submissions_log"
  };
  
  class StorageService {
    constructor() {
      this.init();
    }
  
    init() {
      const storedVersion = localStorage.getItem("xoxo_app_version");
      const CURRENT_VERSION = "v6_externo_songs_clean";
  
      if (storedVersion !== CURRENT_VERSION) {
        localStorage.setItem(STORAGE_KEYS.DIRECTORY, JSON.stringify([]));
        localStorage.setItem(STORAGE_KEYS.CONFESSIONS, JSON.stringify([]));
        localStorage.setItem(STORAGE_KEYS.SUBMISSIONS_LOG, JSON.stringify([]));
        localStorage.setItem(STORAGE_KEYS.LIKES, JSON.stringify([]));
        localStorage.setItem("xoxo_app_version", CURRENT_VERSION);
      } else {
        if (!localStorage.getItem(STORAGE_KEYS.DIRECTORY)) {
          localStorage.setItem(STORAGE_KEYS.DIRECTORY, JSON.stringify([]));
        }
        if (!localStorage.getItem(STORAGE_KEYS.CONFESSIONS)) {
          localStorage.setItem(STORAGE_KEYS.CONFESSIONS, JSON.stringify([]));
        }
        if (!localStorage.getItem(STORAGE_KEYS.SUBMISSIONS_LOG)) {
          localStorage.setItem(STORAGE_KEYS.SUBMISSIONS_LOG, JSON.stringify([]));
        }
        if (!localStorage.getItem(STORAGE_KEYS.LIKES)) {
          localStorage.setItem(STORAGE_KEYS.LIKES, JSON.stringify([]));
        }
      }
    }
  
    isDeviceSealed() {
      return localStorage.getItem(STORAGE_KEYS.SEALED) === "true";
    }
  
    getUserProfile() {
      try {
        const data = localStorage.getItem(STORAGE_KEYS.USER_DATA);
        return data ? JSON.parse(data) : null;
      } catch {
        return null;
      }
    }
  
    sealDevice(submissionData) {
      localStorage.setItem(STORAGE_KEYS.SEALED, "true");
      localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(submissionData));
    }
  
    unsealDevice() {
      localStorage.removeItem(STORAGE_KEYS.SEALED);
      localStorage.removeItem(STORAGE_KEYS.USER_DATA);
    }
  
    containsProhibitedWords(text) {
      if (!text) return false;
      const lower = text.toLowerCase();
      return PROHIBITED_WORDS.some(word => lower.includes(word));
    }
  
    submitConfession(payload) {
      const audit = ModerationService.auditSubmission(payload);
      const cleanSong = payload.song ? payload.song.trim() : "";
      const cleanMessage = payload.message ? payload.message.trim() : "";
  
      let songUrl = "";
      if (cleanSong) {
        songUrl = cleanSong.startsWith("http://") || cleanSong.startsWith("https://")
          ? cleanSong
          : `https://open.spotify.com/search/${encodeURIComponent(cleanSong)}`;
      }
  
      const submissionRecord = {
        id: "sub-" + Date.now() + "-" + Math.random().toString(36).substr(2, 4),
        timestamp: new Date().toISOString(),
        displayTimestamp: "Hace un momento",
        emitterRole: payload.emitterRole,
        emitterGender: payload.emitterGender,
        emitterFaculty: payload.emitterRole === "externo" ? "Externo" : (payload.emitterFaculty || "Externo"),
        emitterAge: payload.emitterAge,
        targetType: payload.targetType,
        targetName: payload.targetName,
        targetFaculty: payload.targetFaculty,
        targetCareer: payload.targetCareer || null,
        targetSemester: payload.targetSemester || null,
        targetEstimatedAge: payload.targetEstimatedAge || null,
        interactionLevel: payload.interactionLevel,
        message: cleanMessage,
        song: cleanSong,
        songUrl: songUrl,
        isBrave: !!payload.isBrave,
        authorName: payload.isBrave ? payload.authorName : null,
        likes: 0,
        flagged: !audit.isClean,
        flagReasons: audit.flags.map(f => f.reason),
        status: audit.status
      };
  
      const submissions = this.getRawSubmissions();
      submissions.push(submissionRecord);
      localStorage.setItem(STORAGE_KEYS.SUBMISSIONS_LOG, JSON.stringify(submissions));
  
      if (submissionRecord.status === "approved") {
        this.incrementTargetVotes(payload.targetName, payload.targetType, payload.targetFaculty);
      }
  
      const confessions = this.getConfessions(true);
      confessions.unshift(submissionRecord);
      localStorage.setItem(STORAGE_KEYS.CONFESSIONS, JSON.stringify(confessions));
  
      this.sealDevice({
        emitterRole: payload.emitterRole,
        emitterFaculty: submissionRecord.emitterFaculty,
        targetName: payload.targetName,
        submittedAt: submissionRecord.timestamp
      });
  
      return submissionRecord;
    }
  
    updateConfessionStatus(id, newStatus) {
      const confessions = this.getConfessions(true);
      const target = confessions.find(c => c.id === id);
      if (target) {
        const oldStatus = target.status;
        target.status = newStatus;
        
        if (oldStatus !== "approved" && newStatus === "approved") {
          this.incrementTargetVotes(target.targetName, target.targetType, target.targetFaculty);
        }
        
        localStorage.setItem(STORAGE_KEYS.CONFESSIONS, JSON.stringify(confessions));
  
        let submissions = this.getRawSubmissions();
        const sub = submissions.find(s => s.id === id);
        if (sub) {
          sub.status = newStatus;
          localStorage.setItem(STORAGE_KEYS.SUBMISSIONS_LOG, JSON.stringify(submissions));
        }
  
        return true;
      }
      return false;
    }
  
    deleteConfession(confessionId) {
      const confessions = this.getConfessions(true);
      const targetConf = confessions.find(c => c.id === confessionId);
  
      const updatedConfessions = confessions.filter(c => c.id !== confessionId);
      localStorage.setItem(STORAGE_KEYS.CONFESSIONS, JSON.stringify(updatedConfessions));
  
      let submissions = this.getRawSubmissions();
      submissions = submissions.filter(s => s.id !== confessionId);
      localStorage.setItem(STORAGE_KEYS.SUBMISSIONS_LOG, JSON.stringify(submissions));
  
      try {
        let likes = JSON.parse(localStorage.getItem(STORAGE_KEYS.LIKES)) || [];
        likes = likes.filter(id => id !== confessionId);
        localStorage.setItem(STORAGE_KEYS.LIKES, JSON.stringify(likes));
      } catch {}
  
      if (targetConf && targetConf.status === "approved" && targetConf.targetName) {
        this.decrementTargetVotes(targetConf.targetName);
      }
      return true;
    }
  
    removePersonFromDirectory(targetName, andBlacklist = true) {
      if (!targetName) return false;
      const cleanName = targetName.toLowerCase();
      let directory = this.getDirectory();
      directory = directory.filter(p => p.name.toLowerCase() !== cleanName);
      localStorage.setItem(STORAGE_KEYS.DIRECTORY, JSON.stringify(directory));
  
      let confessions = this.getConfessions(true);
      confessions = confessions.filter(c => !c.targetName || c.targetName.toLowerCase() !== cleanName);
      localStorage.setItem(STORAGE_KEYS.CONFESSIONS, JSON.stringify(confessions));
  
      let submissions = this.getRawSubmissions();
      submissions = submissions.filter(s => !s.targetName || s.targetName.toLowerCase() !== cleanName);
      localStorage.setItem(STORAGE_KEYS.SUBMISSIONS_LOG, JSON.stringify(submissions));
  
      if (andBlacklist) {
        ModerationService.addToBlacklist(targetName);
      }
      return true;
    }
  
    incrementTargetVotes(targetName, targetType, faculty) {
      const directory = this.getDirectory();
      let target = directory.find(item => item.name.toLowerCase() === targetName.toLowerCase());
  
      if (target) {
        target.votes = (target.votes || 0) + 1;
      } else {
        target = {
          id: "custom-" + Date.now(),
          type: targetType,
          name: targetName,
          faculty: faculty || "No especificada",
          votes: 1
        };
        directory.push(target);
      }
  
      localStorage.setItem(STORAGE_KEYS.DIRECTORY, JSON.stringify(directory));
    }
  
    decrementTargetVotes(targetName) {
      if (!targetName) return;
      const directory = this.getDirectory();
      const target = directory.find(item => item.name.toLowerCase() === targetName.toLowerCase());
      if (target && (target.votes || 0) > 0) {
        target.votes -= 1;
        localStorage.setItem(STORAGE_KEYS.DIRECTORY, JSON.stringify(directory));
      }
    }
  
    getDirectory() {
      try {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.DIRECTORY)) || UNIVERSITY_DIRECTORY;
      } catch {
        return UNIVERSITY_DIRECTORY;
      }
    }
  
    getRawSubmissions() {
      try {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.SUBMISSIONS_LOG)) || [];
      } catch {
        return [];
      }
    }
  
    getConfessions(includeAll = false) {
      try {
        const all = JSON.parse(localStorage.getItem(STORAGE_KEYS.CONFESSIONS)) || SEED_CONFESSIONS;
        if (includeAll) return all;
        return all.filter(c => c.status === "approved");
      } catch {
        return SEED_CONFESSIONS;
      }
    }
  
    toggleLike(confessionId) {
      let likes = [];
      try {
        likes = JSON.parse(localStorage.getItem(STORAGE_KEYS.LIKES)) || [];
      } catch {}
  
      const alreadyLiked = likes.includes(confessionId);
      const confessions = this.getConfessions(true);
      const item = confessions.find(c => c.id === confessionId);
  
      if (item) {
        if (alreadyLiked) {
          item.likes = Math.max(0, (item.likes || 1) - 1);
          likes = likes.filter(id => id !== confessionId);
        } else {
          item.likes = (item.likes || 0) + 1;
          likes.push(confessionId);
        }
        localStorage.setItem(STORAGE_KEYS.CONFESSIONS, JSON.stringify(confessions));
        localStorage.setItem(STORAGE_KEYS.LIKES, JSON.stringify(likes));
        return { liked: !alreadyLiked, newCount: item.likes };
      }
      return { liked: false, newCount: 0 };
    }
  
    isLiked(confessionId) {
      try {
        const likes = JSON.parse(localStorage.getItem(STORAGE_KEYS.LIKES)) || [];
        return likes.includes(confessionId);
      } catch {
        return false;
      }
    }
  
    getRankings(type = "estudiante") {
      const directory = this.getDirectory();
      return directory
        .filter(item => item.type === type)
        .sort((a, b) => (b.votes || 0) - (a.votes || 0))
        .slice(0, 10);
    }
  
    getTargetVoterDemographics(targetName) {
      if (!targetName) {
        return { total: 0, mujerCount: 0, hombreCount: 0, otroCount: 0, pctMujer: 0, pctHombre: 0, pctOtro: 0 };
      }
      const submissions = this.getRawSubmissions();
      const cleanTarget = targetName.trim().toLowerCase();
      
      const targetSubmissions = submissions.filter(s => 
        s.targetName && s.targetName.trim().toLowerCase() === cleanTarget && s.status !== "rejected"
      );
  
      let mujerCount = 0;
      let hombreCount = 0;
      let otroCount = 0;
  
      targetSubmissions.forEach(s => {
        const g = (s.emitterGender || "").trim().toLowerCase();
        if (g === "mujer") {
          mujerCount++;
        } else if (g === "hombre") {
          hombreCount++;
        } else {
          otroCount++;
        }
      });
  
      const total = mujerCount + hombreCount + otroCount;
      const pctMujer = total > 0 ? Math.round((mujerCount / total) * 100) : 0;
      const pctHombre = total > 0 ? Math.round((hombreCount / total) * 100) : 0;
      const pctOtro = total > 0 ? Math.max(0, 100 - pctMujer - pctHombre) : 0;
  
      return {
        total,
        mujerCount,
        hombreCount,
        otroCount,
        pctMujer,
        pctHombre,
        pctOtro
      };
    }
  
    hasAdminPermission() {
      return sessionStorage.getItem("xoxo_admin_authorized") === "true";
    }
  
    authorizeAdmin(pin) {
      const ADMIN_KEY = "X0x0#2026!Adm1n$Secur3";
      if (pin && pin.trim() === ADMIN_KEY) {
        sessionStorage.setItem("xoxo_admin_authorized", "true");
        return true;
      }
      return false;
    }
  
    revokeAdmin() {
      sessionStorage.removeItem("xoxo_admin_authorized");
    }
  
    getAnalyticsData() {
      const rawSubmissions = this.getRawSubmissions();
      const directory = this.getDirectory();
      const confessions = this.getConfessions(true);
  
      const facultyVotesMap = {};
      if (typeof FACULTIES !== "undefined" && Array.isArray(FACULTIES)) {
        FACULTIES.forEach(f => { facultyVotesMap[f] = 0; });
      }
      facultyVotesMap["Externo"] = 0;
  
      directory.forEach(p => {
        const fac = p.faculty || "Facultad de Ingenierías";
        facultyVotesMap[fac] = (facultyVotesMap[fac] || 0) + (p.votes || 0);
      });
  
      const topFaculties = Object.entries(facultyVotesMap)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count);
  
      const provenanceMap = {};
      if (typeof FACULTIES !== "undefined" && Array.isArray(FACULTIES)) {
        FACULTIES.forEach(f => { provenanceMap[f] = 0; });
      }
      provenanceMap["Externo"] = 0;
  
      rawSubmissions.forEach(sub => {
        const p = (sub.emitterRole === "externo" || sub.emitterFaculty === "Externo") 
          ? "Externo" 
          : (sub.emitterFaculty || "Facultad de Ingenierías");
        provenanceMap[p] = (provenanceMap[p] || 0) + 1;
      });
  
      const topProvenance = Object.entries(provenanceMap)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count);
  
      const genderDist = { Hombre: 0, Mujer: 0, "Prefiero no decir": 0 };
      rawSubmissions.forEach(sub => {
        if (genderDist[sub.emitterGender] !== undefined) {
          genderDist[sub.emitterGender]++;
        }
      });
  
      const songMap = {};
      confessions.forEach(c => {
        if (c.song && c.song.trim()) {
          const clean = c.song.trim();
          songMap[clean] = (songMap[clean] || 0) + 1;
        }
      });
  
      const topSongs = Object.entries(songMap)
        .map(([title, count]) => ({ title, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);
  
      const interactionMap = { "Le he hablado": 0, "Solo de lejos": 0, "No": 0 };
      rawSubmissions.forEach(sub => {
        const key = sub.interactionLevel;
        if (interactionMap[key] !== undefined) {
          interactionMap[key]++;
        } else {
          interactionMap["Solo de lejos"]++;
        }
      });
  
      return {
        totalSubmissions: rawSubmissions.length,
        totalVotes: directory.reduce((acc, curr) => acc + (curr.votes || 0), 0),
        topFaculties,
        topProvenance,
        genderDist,
        topSongs,
        interactionMap
      };
    }
  
    exportToJSON(bypassPrompt = false) {
      if (!this.hasAdminPermission() && !bypassPrompt) {
        const pin = prompt("🔒 Acceso Restringido: Ingresa la clave de Administrador para exportar datos en JSON:");
        if (!pin || !this.authorizeAdmin(pin)) {
          alert("⛔ Acceso denegado: Se requieren permisos de Administrador.");
          return false;
        }
      }
  
      const data = {
        version: "2.0",
        exportedAt: new Date().toISOString(),
        rawSubmissions: this.getRawSubmissions(),
        directoryStats: this.getDirectory(),
        confessions: this.getConfessions(true),
        blacklist: ModerationService.getBlacklist()
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `xoxo_datos_capturados_${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      return true;
    }
  
    exportToCSV() {
      const submissions = this.getRawSubmissions();
      if (!submissions.length) {
        alert("Aún no hay respuestas registradas en esta sesión.");
        return;
      }
  
      const headers = [
        "ID", "Fecha", "Rol_Emisor", "Genero_Emisor", "Facultad_Emisor", "Edad_Emisor",
        "Tipo_Crush", "Nombre_Crush", "Facultad_Crush", "Interaccion", "Cancion", "Es_Valiente", "Autor_Publico", "Mensaje"
      ];
  
      const rows = submissions.map(s => [
        `"${s.id}"`,
        `"${s.timestamp}"`,
        `"${s.emitterRole}"`,
        `"${s.emitterGender}"`,
        `"${s.emitterFaculty}"`,
        `"${s.emitterAge}"`,
        `"${s.targetType}"`,
        `"${s.targetName}"`,
        `"${s.targetFaculty}"`,
        `"${s.interactionLevel}"`,
        `"${(s.song || '').replace(/"/g, '""')}"`,
        s.isBrave ? "SI" : "NO",
        `"${s.authorName || 'Anonimo'}"`,
        `"${(s.message || '').replace(/"/g, '""')}"`
      ]);
  
      const csvContent = "\uFEFF" + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `xoxo_data_recolectada_${Date.now()}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    }
  
    resetAllData(backupFirst = true) {
      if (backupFirst) {
        this.exportToJSON(true);
      }
      localStorage.setItem(STORAGE_KEYS.DIRECTORY, JSON.stringify([]));
      localStorage.setItem(STORAGE_KEYS.CONFESSIONS, JSON.stringify([]));
      localStorage.setItem(STORAGE_KEYS.SUBMISSIONS_LOG, JSON.stringify([]));
      localStorage.setItem(STORAGE_KEYS.LIKES, JSON.stringify([]));
      localStorage.removeItem(STORAGE_KEYS.SEALED);
      localStorage.removeItem(STORAGE_KEYS.USER_DATA);
      return true;
    }
  }
  
  const storage = new StorageService();
  

  
  class WizardComponent {
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
  

  class BottomNavComponent {
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
  

  
  class WTopComponent {
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
  

  
  class DataChartsComponent {
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
  

  
  class MuroComponent {
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
  

  
  class ModeratorModalComponent {
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
  

})();
