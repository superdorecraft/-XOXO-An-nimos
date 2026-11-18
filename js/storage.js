import { UNIVERSITY_DIRECTORY, SEED_CONFESSIONS, PROHIBITED_WORDS, FACULTIES } from "./data.js";
import { ModerationService } from "./moderation.js";

const STORAGE_KEYS = {
  SEALED: "xoxo_device_sealed",
  USER_DATA: "xoxo_user_profile",
  CONFESSIONS: "xoxo_confessions_store",
  DIRECTORY: "xoxo_directory_store",
  LIKES: "xoxo_user_likes",
  SUBMISSIONS_LOG: "xoxo_raw_submissions_log"
};

export class StorageService {
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

export const storage = new StorageService();
