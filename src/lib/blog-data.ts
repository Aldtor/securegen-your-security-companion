export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  content: string;
}

export const POSTS: BlogPost[] = [
  {
    slug: "how-to-create-strong-passwords",
    title: "How to Create Strong Passwords That Actually Work",
    excerpt: "Length beats complexity. Learn the real rules behind passwords that resist modern brute-force attacks.",
    category: "Password Security",
    date: "2026-05-28",
    readTime: "6 min",
    content: `A strong password starts with length. Every additional character multiplies the search space an attacker must cover. Modern GPUs can try billions of combinations per second, so an 8-character password — even with symbols — often falls in hours.\n\nAim for 16 characters or more, mixing upper, lower, digits, and symbols. Better still: use a passphrase of 5–7 random words. "correct-horse-battery-staple" outperforms "P@ss1!" by orders of magnitude in entropy while being far easier to remember.\n\nNever reuse passwords across sites. A breach at one service shouldn't compromise the rest of your digital life. Use a password manager so every account gets a unique, generated credential, and enable two-factor authentication wherever possible.`,
  },
  {
    slug: "why-password-managers-matter",
    title: "Why Password Managers Matter in 2026",
    excerpt: "The average person has 100+ online accounts. A password manager isn't optional anymore — it's infrastructure.",
    category: "Authentication",
    date: "2026-05-20",
    readTime: "5 min",
    content: `Human memory wasn't built for 100 unique 20-character strings. When forced to manage that load alone, people reuse, weaken, or write down passwords — all catastrophic failure modes.\n\nA password manager generates, stores, and autofills strong credentials. It encrypts everything with a single master key only you know. Modern managers also detect breaches, warn about reused passwords, and sync securely across devices.\n\nThe upfront effort to set one up — an hour, maybe two — pays back for the rest of your digital life.`,
  },
  {
    slug: "what-is-two-factor-authentication",
    title: "What Is Two-Factor Authentication?",
    excerpt: "2FA adds a second lock to your accounts. Here's how it works and which methods are actually secure.",
    category: "Authentication",
    date: "2026-05-12",
    readTime: "4 min",
    content: `Two-factor authentication (2FA) means proving who you are with two independent things: something you know (password) and something you have (a phone, hardware key, or app).\n\nSMS codes are better than nothing but are vulnerable to SIM swap attacks. Authenticator apps (TOTP) are dramatically safer. Hardware security keys like YubiKey offer the strongest protection — phishing-resistant by design.\n\nEnable 2FA on email, banking, and any account that controls others. If your email falls, every linked account can be reset.`,
  },
  {
    slug: "password-security-best-practices",
    title: "Password Security Best Practices",
    excerpt: "A practical checklist to harden every account you own, from social media to online banking.",
    category: "Cybersecurity",
    date: "2026-05-04",
    readTime: "7 min",
    content: `Start with unique passwords for every account, generated and stored by a manager. Turn on 2FA everywhere it's offered. Review your account list once a quarter and delete what you no longer use — every dormant account is a liability.\n\nUse passkeys when available. They're phishing-resistant, eliminate password reuse, and don't transmit secrets over the wire. Check haveibeenpwned.com periodically to see if your email has appeared in known breaches and rotate exposed credentials immediately.`,
  },
  {
    slug: "common-password-mistakes",
    title: "5 Common Password Mistakes (And How to Fix Them)",
    excerpt: "Reusing, predictable substitutions, personal info — the most common failures and exactly how to avoid them.",
    category: "Online Safety",
    date: "2026-04-22",
    readTime: "5 min",
    content: `1. Reusing passwords. One breach cascades into every account that shares the credential. Fix: unique passwords per site.\n\n2. Predictable substitutions. "P@ssw0rd" is on every cracking dictionary. Real entropy beats fake complexity.\n\n3. Personal info. Birthdays, pet names, addresses are scraped from social media in seconds.\n\n4. Short passwords. Anything under 12 characters falls fast to GPU brute force.\n\n5. Sharing via plaintext. Email and SMS are not safe channels. Use a manager's secure sharing or a one-time encrypted link.`,
  },
];

export const CATEGORIES = ["Password Security", "Cybersecurity", "Privacy", "Authentication", "Online Safety"];