export const ALBUR_PATTERNS = [
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

export const PROFANITY_ROOTS = [
  "idiota", "estupido", "estupida", "imbecil", "maldito", "maldita",
  "perra", "puta", "puto", "marica", "maricon", "gonorrea", "hp", "hpt",
  "pirobo", "piroba", "malparido", "malparida", "carechimba", "chimba",
  "careverga", "verga", "pito", "culo", "chucha", "guevon", "guevona",
  "wevon", "wevona", "huevon", "huevona", "tetas", "senos", "coño",
  "pene", "vagina", "clitoris", "chupapollas", "follo", "follar", "semen",
  "zorra", "zorrita", "perrita", "bastardo", "bastarda", "culiao", "carepicha",
  "picha", "marrano", "cerdo", "mojon", "sidoso", "sidosa"
];

export const TROLL_GENERIC_NAMES = [
  "nadie", "ninguno", "ninguna", "alguien", "yo", "yo mismo", "yo misma",
  "tu mama", "tu papa", "tu madre", "tu padre", "tu tia", "tu abuela",
  "anonimo", "anonima", "desconocido", "desconocida", "todos", "todas",
  "test", "testing", "prueba", "pruebas", "admin", "administrador",
  "null", "undefined", "asdf", "qwerty", "xxx", "xxx69", "crush", "mi crush"
];

export class ModerationService {
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
