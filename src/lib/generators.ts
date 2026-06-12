const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = "abcdefghijklmnopqrstuvwxyz";
const DIGITS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`";
const SIMILAR = /[il1Lo0O]/g;
const AMBIGUOUS = /[{}\[\]()\/\\'"`~,;:.<>]/g;

function randomInt(max: number) {
  const a = new Uint32Array(1);
  crypto.getRandomValues(a);
  return a[0] % max;
}

export interface PasswordOptions {
  length: number;
  upper: boolean;
  lower: boolean;
  numbers: boolean;
  symbols: boolean;
  excludeSimilar: boolean;
  excludeAmbiguous: boolean;
}

export function generatePassword(opts: PasswordOptions): string {
  let pool = "";
  if (opts.upper) pool += UPPER;
  if (opts.lower) pool += LOWER;
  if (opts.numbers) pool += DIGITS;
  if (opts.symbols) pool += SYMBOLS;
  if (opts.excludeSimilar) pool = pool.replace(SIMILAR, "");
  if (opts.excludeAmbiguous) pool = pool.replace(AMBIGUOUS, "");
  if (!pool) return "";
  let out = "";
  for (let i = 0; i < opts.length; i++) out += pool[randomInt(pool.length)];
  return out;
}

export function calcEntropy(password: string): number {
  let pool = 0;
  if (/[a-z]/.test(password)) pool += 26;
  if (/[A-Z]/.test(password)) pool += 26;
  if (/[0-9]/.test(password)) pool += 10;
  if (/[^A-Za-z0-9]/.test(password)) pool += 32;
  return password.length * Math.log2(pool || 1);
}

export function strengthLabel(entropy: number) {
  if (entropy < 28) return { label: "Very Weak", score: 0, color: "bg-red-500" };
  if (entropy < 36) return { label: "Weak", score: 1, color: "bg-orange-500" };
  if (entropy < 60) return { label: "Fair", score: 2, color: "bg-yellow-500" };
  if (entropy < 80) return { label: "Strong", score: 3, color: "bg-emerald-500" };
  return { label: "Very Strong", score: 4, color: "bg-green-500" };
}

export function crackTime(entropy: number): string {
  const guesses = Math.pow(2, entropy);
  const seconds = guesses / 1e10; // 10B guesses/sec
  if (seconds < 1) return "instantly";
  if (seconds < 60) return `${Math.round(seconds)} seconds`;
  if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
  if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
  if (seconds < 31536000) return `${Math.round(seconds / 86400)} days`;
  const years = seconds / 31536000;
  if (years < 1000) return `${Math.round(years)} years`;
  if (years < 1e6) return `${Math.round(years / 1000)}K years`;
  if (years < 1e9) return `${Math.round(years / 1e6)}M years`;
  if (years < 1e12) return `${Math.round(years / 1e9)}B years`;
  return "centuries+";
}

export function generateUUID(): string {
  return crypto.randomUUID();
}

const ADJ = ["swift","silent","brave","cosmic","neon","cyber","quantum","stellar","midnight","golden","crimson","azure","mystic","electric","arctic","velvet","shadow","crystal","iron","solar","lunar","frost","ember","wild","silver"];
const NOUNS = ["fox","wolf","raven","tiger","phoenix","dragon","falcon","hawk","panther","viper","cobra","eagle","lynx","jaguar","orca","bear","shark","owl","stag","hunter","ranger","knight","ninja","samurai","pilot"];

export type UsernameStyle = "social" | "gaming" | "professional" | "random";

export function generateUsername(style: UsernameStyle): string {
  const adj = ADJ[randomInt(ADJ.length)];
  const noun = NOUNS[randomInt(NOUNS.length)];
  const num = randomInt(999);
  switch (style) {
    case "gaming":
      return `xX_${adj}${noun}_Xx${num}`;
    case "professional":
      return `${adj}.${noun}`.toLowerCase();
    case "social":
      return `${adj}${noun.charAt(0).toUpperCase()}${noun.slice(1)}${num}`;
    default:
      return `${adj}_${noun}_${num}`;
  }
}

// EFF short wordlist (subset of common, easy-to-type words)
const WORDS = ["apple","brave","cloud","drift","ember","forge","grove","haven","ivory","jolly","koala","lemon","mango","noble","ocean","pearl","quiet","raven","stone","tiger","unity","vivid","whale","xenon","yacht","zebra","amber","blaze","crisp","dawn","echo","frost","glow","harbor","island","jewel","karma","light","music","north","orbit","piano","quest","river","storm","trail","urban","valley","wheat","zenith","alpha","bloom","comet","delta","earth","flame","ghost","honey","ivory","jungle","knight","linen","meadow","nebula","onyx","prism","quartz","rocket","silver","torch","umbra","vista","willow"];

export function generatePassphrase(words: number, addNumber: boolean, addSymbol: boolean, separator = "-"): string {
  const parts: string[] = [];
  for (let i = 0; i < words; i++) {
    const w = WORDS[randomInt(WORDS.length)];
    parts.push(w.charAt(0).toUpperCase() + w.slice(1));
  }
  let out = parts.join(separator);
  if (addNumber) out += separator + randomInt(99);
  if (addSymbol) out += SYMBOLS[randomInt(SYMBOLS.length)];
  return out;
}

async function digest(algo: string, text: string): Promise<string> {
  const buf = await crypto.subtle.digest(algo, new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

export async function hashText(text: string, algo: "MD5" | "SHA-1" | "SHA-256" | "SHA-512"): Promise<string> {
  if (algo === "MD5") return md5(text);
  return digest(algo, text);
}

// Minimal MD5 implementation (public domain, Joseph Myers)
function md5(s: string): string {
  function rh(n: number) { let s = "", j; for (j = 0; j <= 3; j++) s += ((n >> (j*8+4)) & 15).toString(16) + ((n >> (j*8)) & 15).toString(16); return s; }
  function ad(x: number, y: number) { const l = (x & 0xFFFF) + (y & 0xFFFF); return (((x >> 16) + (y >> 16) + (l >> 16)) << 16) | (l & 0xFFFF); }
  function rl(n: number, c: number) { return (n << c) | (n >>> (32 - c)); }
  function cm(q: number, a: number, b: number, x: number, s: number, t: number) { return ad(rl(ad(ad(a, q), ad(x, t)), s), b); }
  function ff(a: number,b: number,c: number,d: number,x: number,s: number,t: number) { return cm((b & c) | ((~b) & d), a, b, x, s, t); }
  function gg(a: number,b: number,c: number,d: number,x: number,s: number,t: number) { return cm((b & d) | (c & (~d)), a, b, x, s, t); }
  function hh(a: number,b: number,c: number,d: number,x: number,s: number,t: number) { return cm(b ^ c ^ d, a, b, x, s, t); }
  function ii(a: number,b: number,c: number,d: number,x: number,s: number,t: number) { return cm(c ^ (b | (~d)), a, b, x, s, t); }
  function c2b(str: string) {
    const u = unescape(encodeURIComponent(str));
    const nb = ((u.length + 8) >> 6) + 1; const b = new Array(nb * 16).fill(0);
    for (let i = 0; i < u.length; i++) b[i >> 2] |= u.charCodeAt(i) << ((i % 4) * 8);
    b[u.length >> 2] |= 0x80 << ((u.length % 4) * 8); b[nb * 16 - 2] = u.length * 8; return b;
  }
  const x = c2b(s);
  let a = 1732584193, b = -271733879, c = -1732584194, d = 271733878;
  for (let i = 0; i < x.length; i += 16) {
    const oa=a,ob=b,oc=c,od=d;
    a=ff(a,b,c,d,x[i],7,-680876936);d=ff(d,a,b,c,x[i+1],12,-389564586);c=ff(c,d,a,b,x[i+2],17,606105819);b=ff(b,c,d,a,x[i+3],22,-1044525330);
    a=ff(a,b,c,d,x[i+4],7,-176418897);d=ff(d,a,b,c,x[i+5],12,1200080426);c=ff(c,d,a,b,x[i+6],17,-1473231341);b=ff(b,c,d,a,x[i+7],22,-45705983);
    a=ff(a,b,c,d,x[i+8],7,1770035416);d=ff(d,a,b,c,x[i+9],12,-1958414417);c=ff(c,d,a,b,x[i+10],17,-42063);b=ff(b,c,d,a,x[i+11],22,-1990404162);
    a=ff(a,b,c,d,x[i+12],7,1804603682);d=ff(d,a,b,c,x[i+13],12,-40341101);c=ff(c,d,a,b,x[i+14],17,-1502002290);b=ff(b,c,d,a,x[i+15],22,1236535329);
    a=gg(a,b,c,d,x[i+1],5,-165796510);d=gg(d,a,b,c,x[i+6],9,-1069501632);c=gg(c,d,a,b,x[i+11],14,643717713);b=gg(b,c,d,a,x[i],20,-373897302);
    a=gg(a,b,c,d,x[i+5],5,-701558691);d=gg(d,a,b,c,x[i+10],9,38016083);c=gg(c,d,a,b,x[i+15],14,-660478335);b=gg(b,c,d,a,x[i+4],20,-405537848);
    a=gg(a,b,c,d,x[i+9],5,568446438);d=gg(d,a,b,c,x[i+14],9,-1019803690);c=gg(c,d,a,b,x[i+3],14,-187363961);b=gg(b,c,d,a,x[i+8],20,1163531501);
    a=gg(a,b,c,d,x[i+13],5,-1444681467);d=gg(d,a,b,c,x[i+2],9,-51403784);c=gg(c,d,a,b,x[i+7],14,1735328473);b=gg(b,c,d,a,x[i+12],20,-1926607734);
    a=hh(a,b,c,d,x[i+5],4,-378558);d=hh(d,a,b,c,x[i+8],11,-2022574463);c=hh(c,d,a,b,x[i+11],16,1839030562);b=hh(b,c,d,a,x[i+14],23,-35309556);
    a=hh(a,b,c,d,x[i+1],4,-1530992060);d=hh(d,a,b,c,x[i+4],11,1272893353);c=hh(c,d,a,b,x[i+7],16,-155497632);b=hh(b,c,d,a,x[i+10],23,-1094730640);
    a=hh(a,b,c,d,x[i+13],4,681279174);d=hh(d,a,b,c,x[i],11,-358537222);c=hh(c,d,a,b,x[i+3],16,-722521979);b=hh(b,c,d,a,x[i+6],23,76029189);
    a=hh(a,b,c,d,x[i+9],4,-640364487);d=hh(d,a,b,c,x[i+12],11,-421815835);c=hh(c,d,a,b,x[i+15],16,530742520);b=hh(b,c,d,a,x[i+2],23,-995338651);
    a=ii(a,b,c,d,x[i],6,-198630844);d=ii(d,a,b,c,x[i+7],10,1126891415);c=ii(c,d,a,b,x[i+14],15,-1416354905);b=ii(b,c,d,a,x[i+5],21,-57434055);
    a=ii(a,b,c,d,x[i+12],6,1700485571);d=ii(d,a,b,c,x[i+3],10,-1894986606);c=ii(c,d,a,b,x[i+10],15,-1051523);b=ii(b,c,d,a,x[i+1],21,-2054922799);
    a=ii(a,b,c,d,x[i+8],6,1873313359);d=ii(d,a,b,c,x[i+15],10,-30611744);c=ii(c,d,a,b,x[i+6],15,-1560198380);b=ii(b,c,d,a,x[i+13],21,1309151649);
    a=ii(a,b,c,d,x[i+4],6,-145523070);d=ii(d,a,b,c,x[i+11],10,-1120210379);c=ii(c,d,a,b,x[i+2],15,718787259);b=ii(b,c,d,a,x[i+9],21,-343485551);
    a=ad(a,oa);b=ad(b,ob);c=ad(c,oc);d=ad(d,od);
  }
  return rh(a)+rh(b)+rh(c)+rh(d);
}