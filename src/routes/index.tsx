import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { KeyRound, Gauge, AtSign, Type, Hash, QrCode, Fingerprint, ArrowUpRight, RefreshCw, Copy, Sparkles, Shield, Zap } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { generatePassword, calcEntropy, strengthLabel, crackTime } from "@/lib/generators";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Free Password Generator & Security Tools | SecureGen" },
      { name: "description", content: "Generate strong passwords, check strength, create usernames, UUIDs, QR codes, and hashes. Free, fast, and 100% browser-based." },
      { property: "og:title", content: "SecureGen — Generate. Secure. Protect." },
      { property: "og:description", content: "Premium-grade security tools that run entirely in your browser. No tracking, no signup." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const TOOLS = [
  { to: "/password-generator", icon: KeyRound, name: "Password", desc: "Cryptographically strong, length-tunable strings." },
  { to: "/password-strength", icon: Gauge, name: "Strength", desc: "Entropy in bits and a realistic crack-time estimate." },
  { to: "/passphrase-generator", icon: Type, name: "Passphrase", desc: "Diceware-style word lists you can actually type." },
  { to: "/username-generator", icon: AtSign, name: "Username", desc: "Available-looking handles, no dictionary slop." },
  { to: "/uuid-generator", icon: Fingerprint, name: "UUID v4", desc: "RFC 4122 identifiers, single or batched." },
  { to: "/qr-generator", icon: QrCode, name: "QR Code", desc: "Text, URL, Wi-Fi, vCard. SVG and PNG export." },
  { to: "/hash-generator", icon: Hash, name: "Hash", desc: "MD5, SHA-1, SHA-256, SHA-512." },
] as const;

const FAQS = [
  { q: "Where does my data go?", a: "Nowhere. Every tool runs in your browser. There is no API call, no server log, no telemetry on inputs. You can verify that in your network tab." },
  { q: "What's the random source?", a: "window.crypto.getRandomValues — the platform CSPRNG. The same source modern key generation, TLS, and authenticators rely on." },
  { q: "Why entropy and not 'must contain a symbol'?", a: "Symbol rules are theatre. A 14-character random lowercase string beats Password1! on entropy. We show bits and a crack-time estimate so you can judge the actual cost to brute force." },
  { q: "Can I use these at work?", a: "Yes. There's no licence, no account, no rate limit. Bookmark a tool, generate, paste into your vault." },
  { q: "Open source?", a: "The crypto is the browser's. The UI is small and inspectable. We don't ship analytics on tool inputs." },
];

function Index() {
  return (
    <>
      <Hero />
      <Marquee />
      <ToolsGrid />
      <Manifesto />
      <Notes />
      <FAQ />
      <Colophon />
    </>
  );
}

function Hero() {
  const [pw, setPw] = useState("");
  useEffect(() => {
    setPw(generatePassword({ length: 24, upper: true, lower: true, numbers: true, symbols: true, excludeSimilar: false, excludeAmbiguous: false }));
  }, []);
  const entropy = useMemo(() => calcEntropy(pw), [pw]);
  const strength = strengthLabel(entropy);
  const regen = () => setPw(generatePassword({ length: 24, upper: true, lower: true, numbers: true, symbols: true, excludeSimilar: false, excludeAmbiguous: false }));
  const copy = () => { navigator.clipboard.writeText(pw); toast.success("Copied"); };
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 mesh-bg pointer-events-none" />
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-60" />
      <div className="absolute top-20 -left-32 w-[36rem] h-[36rem] rounded-full bg-primary/30 blur-3xl animate-float pointer-events-none" />
      <div className="absolute top-40 right-0 w-[30rem] h-[30rem] rounded-full bg-accent/25 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-[28rem] h-[28rem] rounded-full bg-fuchsia-400/20 blur-3xl pointer-events-none" />
      <div className="container mx-auto px-6 pt-24 pb-28 max-w-7xl relative">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-medium mb-8">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-accent animate-ping opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              100% browser-based · zero tracking
            </div>
            <h1 className="font-display font-bold text-5xl sm:text-7xl lg:text-8xl leading-[0.95] tracking-[-0.03em]">
              Generate.<br />
              Secure.<br />
              <span className="gradient-text">Protect.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
              A premium suite of cryptographic tools that run entirely in your browser. Passwords, passphrases, UUIDs, QR codes, hashes — generated by the platform CSPRNG. Nothing leaves the tab.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/password-generator">
                <Button size="lg" className="h-12 px-6 text-base rounded-2xl shadow-[var(--shadow-elegant)]" style={{ background: "var(--gradient-primary)" }}>
                  <Sparkles className="h-4 w-4 mr-2" /> Generate a password
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="h-12 px-6 text-base rounded-2xl glass">
                  Read the approach
                </Button>
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-6 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2"><Shield className="h-4 w-4 text-accent" /> No account required</span>
              <span className="inline-flex items-center gap-2"><Zap className="h-4 w-4 text-accent" /> Works offline</span>
              <span className="inline-flex items-center gap-2"><Fingerprint className="h-4 w-4 text-accent" /> Open & inspectable</span>
            </div>
          </div>
          <div className="lg:col-span-5 animate-fade-up" style={{ animationDelay: "120ms" }}>
            <figure className="glass rounded-3xl overflow-hidden shadow-[var(--shadow-elegant)]">
              <figcaption className="flex items-center justify-between px-5 py-3 border-b border-border/50 text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <span className="flex gap-1">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                  </span>
                  live sample
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent animate-glow" /> csprng
                </span>
              </figcaption>
              <div className="p-6">
                <div className="font-mono text-base md:text-lg leading-relaxed break-all text-foreground select-all">{pw}</div>
              </div>
              <div className="grid grid-cols-3 border-t border-border/50 text-[11px] font-mono uppercase tracking-[0.14em]">
                <div className="px-4 py-3 border-r border-border/50">
                  <div className="text-muted-foreground">Entropy</div>
                  <div className="mt-1 text-foreground normal-case tracking-normal text-sm font-sans font-semibold">{entropy.toFixed(1)} bits</div>
                </div>
                <div className="px-4 py-3 border-r border-border/50">
                  <div className="text-muted-foreground">Strength</div>
                  <div className="mt-1 text-foreground normal-case tracking-normal text-sm font-sans font-semibold">{strength.label}</div>
                </div>
                <div className="px-4 py-3">
                  <div className="text-muted-foreground">Crack</div>
                  <div className="mt-1 text-foreground normal-case tracking-normal text-sm font-sans font-semibold">{crackTime(entropy)}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 border-t border-border/50">
                <button onClick={copy} className="px-4 py-3.5 text-sm font-medium hover:bg-primary/10 transition-colors inline-flex items-center justify-center gap-2 border-r border-border/50">
                  <Copy className="h-3.5 w-3.5" /> Copy
                </button>
                <button onClick={regen} className="px-4 py-3.5 text-sm font-medium hover:bg-primary/10 transition-colors inline-flex items-center justify-center gap-2">
                  <RefreshCw className="h-3.5 w-3.5" /> Regenerate
                </button>
              </div>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const words = ["GENERATE", "·", "SECURE", "·", "PROTECT", "·", "NO TRACKING", "·", "NO ACCOUNT", "·", "WORKS OFFLINE", "·"];
  return (
    <section className="border-y border-border/50 overflow-hidden glass-nav">
      <div className="py-5 flex gap-10 whitespace-nowrap font-display font-semibold text-2xl md:text-4xl text-foreground/60 [animation:marquee_40s_linear_infinite]">
        {[...Array(3)].map((_, k) => (
          <span key={k} className="flex gap-10 shrink-0">
            {words.map((w, i) => <span key={i}>{w}</span>)}
          </span>
        ))}
      </div>
    </section>
  );
}

function ToolsGrid() {
  return (
    <section className="relative">
      <div className="container mx-auto px-6 py-24 max-w-7xl">
        <div className="text-center mb-16">
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-4">The toolkit</div>
          <h2 className="font-display font-bold text-4xl md:text-6xl tracking-[-0.02em]">
            Seven tools. <span className="gradient-text">One promise.</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">No dashboards, no sign-in, no upsell. Pick the one you need and close the tab.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TOOLS.map((t, i) => {
            const Icon = t.icon;
            return (
              <Link key={t.to} to={t.to} className="group relative glass rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300 hover:shadow-[var(--shadow-glow)] animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
                <div className="flex items-start justify-between mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl text-primary-foreground shadow-md" style={{ background: "var(--gradient-primary)" }}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:rotate-45 transition-all" />
                </div>
                <h3 className="font-display font-semibold text-xl mb-1.5">{t.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section className="relative">
      <div className="container mx-auto px-6 py-24 max-w-5xl">
        <div className="glass rounded-3xl p-10 md:p-16 text-center shadow-[var(--shadow-elegant)]">
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-6">Manifesto</div>
          <p className="font-display font-medium text-3xl md:text-5xl leading-[1.15] tracking-[-0.02em]">
            Most security tools want a sign-up, a sync, a sidebar of upsells. <span className="gradient-text">We don't.</span> A password generator should generate a password — then disappear.
          </p>
        </div>
      </div>
    </section>
  );
}

function Notes() {
  const notes = [
    { n: "01", t: "On entropy", b: "We report bits, not 'strong/weak'. A 12-char random lowercase string sits around 56 bits; add symbols and length and you climb fast. Anything past ~80 bits is fine for human accounts; ~128 for keys." },
    { n: "02", t: "On the random source", b: "getRandomValues is the platform CSPRNG. Math.random() is not. We never use Math.random for anything that matters, and neither should your password manager." },
    { n: "03", t: "On storage", b: "There isn't any. The tools have no database, no analytics on inputs, no server-side logging. Open devtools and watch — the network panel stays quiet." },
  ];
  return (
    <section className="relative">
      <div className="container mx-auto px-6 py-24 max-w-7xl">
        <div className="text-center mb-14">
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-4">Field notes</div>
          <h2 className="font-display font-bold text-4xl md:text-5xl tracking-[-0.02em]">Built on <span className="gradient-text">honest primitives</span>.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {notes.map(n => (
            <article key={n.n} className="glass rounded-2xl p-8">
              <div className="font-mono text-xs text-primary mb-5">{n.n}</div>
              <h3 className="font-display font-semibold text-2xl mb-3">{n.t}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{n.b}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section className="relative">
      <div className="container mx-auto px-6 py-24 max-w-5xl">
        <div className="text-center mb-12">
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-4">Q&amp;A</div>
          <h2 className="font-display font-bold text-4xl md:text-5xl tracking-[-0.02em]">Honest answers, <span className="gradient-text">no fine print.</span></h2>
        </div>
        <div className="glass rounded-3xl p-4 md:p-8">
          <Accordion type="single" collapsible>
            {FAQS.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b border-border/50 last:border-0">
                <AccordionTrigger className="py-5 text-left font-display font-semibold text-lg md:text-xl hover:no-underline">{f.q}</AccordionTrigger>
                <AccordionContent className="pb-5 text-muted-foreground text-base leading-relaxed">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

function Colophon() {
  return (
    <section className="relative pb-24">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="relative overflow-hidden rounded-3xl glass p-10 md:p-16 text-center shadow-[var(--shadow-elegant)]">
          <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-primary/40 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-accent/30 blur-3xl pointer-events-none" />
          <div className="relative">
            <h2 className="font-display font-bold text-4xl md:text-6xl leading-tight tracking-[-0.02em]">
              Ready to <span className="gradient-text">generate?</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Open the password tool. No account, no setup, no waiting.</p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <Link to="/password-generator">
                <Button size="lg" className="h-12 px-7 text-base rounded-2xl shadow-[var(--shadow-elegant)]" style={{ background: "var(--gradient-primary)" }}>
                  <Sparkles className="h-4 w-4 mr-2" /> Get started
                </Button>
              </Link>
              <Link to="/blog">
                <Button size="lg" variant="outline" className="h-12 px-7 text-base rounded-2xl glass">
                  Read the blog
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}