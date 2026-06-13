import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { KeyRound, Gauge, AtSign, Type, Hash, QrCode, Fingerprint, ArrowUpRight, RefreshCw, Copy } from "lucide-react";
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
];

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
    <section className="relative border-b border-border">
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-70" />
      <div className="container mx-auto px-6 pt-20 pb-24 max-w-7xl relative">
        <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground mb-16">
          <span>Vol. 01 — Browser-only security</span>
          <span className="hidden md:inline">Est. 2026 · No accounts · No telemetry</span>
          <span>{new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" })}</span>
        </div>
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <h1 className="font-display text-[3.4rem] sm:text-[5rem] lg:text-[7rem] leading-[0.92] tracking-[-0.02em]">
              Secrets,<br />
              <span className="italic">generated</span> in<br />
              your browser.
            </h1>
            <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground">
              SecureGen is a small set of tools for the boring, important parts of being online: making a password you can't remember, a passphrase you can, an identifier that won't collide. Nothing leaves the tab.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 items-center text-sm">
              <Link to="/password-generator" className="inline-flex items-center gap-2 group">
                <span className="border-b border-foreground pb-0.5">Open the password tool</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">Read the approach →</Link>
            </div>
          </div>
          <div className="lg:col-span-5">
            <figure className="border border-border bg-card">
              <figcaption className="flex items-center justify-between px-4 py-2.5 border-b border-border text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
                <span>Fig. 1 — live sample</span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent animate-glow" />
                  csprng
                </span>
              </figcaption>
              <div className="p-5">
                <div className="font-mono text-[15px] md:text-base leading-relaxed break-all text-foreground select-all">{pw}</div>
              </div>
              <div className="grid grid-cols-3 border-t border-border text-[11px] font-mono uppercase tracking-[0.14em]">
                <div className="px-4 py-3 border-r border-border">
                  <div className="text-muted-foreground">Entropy</div>
                  <div className="mt-1 text-foreground normal-case tracking-normal text-sm">{entropy.toFixed(1)} bits</div>
                </div>
                <div className="px-4 py-3 border-r border-border">
                  <div className="text-muted-foreground">Strength</div>
                  <div className="mt-1 text-foreground normal-case tracking-normal text-sm">{strength.label}</div>
                </div>
                <div className="px-4 py-3">
                  <div className="text-muted-foreground">Crack</div>
                  <div className="mt-1 text-foreground normal-case tracking-normal text-sm">{crackTime(entropy)}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 border-t border-border">
                <button onClick={copy} className="px-4 py-3 text-sm font-medium hover:bg-foreground hover:text-background transition-colors inline-flex items-center justify-center gap-2 border-r border-border">
                  <Copy className="h-3.5 w-3.5" /> Copy
                </button>
                <button onClick={regen} className="px-4 py-3 text-sm font-medium hover:bg-foreground hover:text-background transition-colors inline-flex items-center justify-center gap-2">
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
    <section className="border-b border-border overflow-hidden">
      <div className="py-5 flex gap-10 whitespace-nowrap font-display text-3xl md:text-5xl italic text-foreground/80 [animation:marquee_40s_linear_infinite]">
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
    <section className="border-b border-border">
      <div className="container mx-auto px-6 py-20 max-w-7xl">
        <div className="flex items-end justify-between mb-12 gap-6 flex-wrap">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground mb-3">§ 01 — The index</div>
            <h2 className="font-display text-4xl md:text-6xl tracking-tight">Seven small tools.<br /><span className="italic">Each does one thing.</span></h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">No dashboards, no sign-in, no upsell. Pick the one you need and close the tab.</p>
        </div>
        <ul className="border-t border-border">
          {TOOLS.map((t, i) => {
            const Icon = t.icon;
            return (
              <li key={t.to} className="border-b border-border">
                <Link to={t.to} className="group grid grid-cols-12 gap-4 items-baseline py-6 px-1 hover:bg-foreground/[0.03] transition-colors">
                  <span className="col-span-2 md:col-span-1 font-mono text-xs text-muted-foreground tabular-nums">0{i + 1}</span>
                  <span className="col-span-10 md:col-span-3 font-display text-2xl md:text-3xl flex items-center gap-3">
                    <Icon className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    {t.name}
                  </span>
                  <span className="hidden md:block md:col-span-6 text-sm text-muted-foreground">{t.desc}</span>
                  <span className="col-span-12 md:col-span-2 text-right text-sm inline-flex items-center justify-end gap-1 text-muted-foreground group-hover:text-foreground transition-colors">
                    Open <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section className="border-b border-border">
      <div className="container mx-auto px-6 py-24 md:py-32 max-w-7xl">
        <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground mb-8">§ 02 — A short manifesto</div>
        <p className="font-display text-3xl md:text-5xl leading-[1.15] max-w-4xl">
          Most security tools want a sign-up, a sync, a sidebar of upsells. <span className="italic text-muted-foreground">We don't.</span> A password generator should generate a password, then disappear. We removed the parts that were never about you.
        </p>
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
    <section className="border-b border-border">
      <div className="container mx-auto px-6 py-20 max-w-7xl">
        <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground mb-10">§ 03 — Field notes</div>
        <div className="grid md:grid-cols-3 gap-px bg-border border border-border">
          {notes.map(n => (
            <article key={n.n} className="bg-background p-8">
              <div className="font-mono text-xs text-muted-foreground mb-6">{n.n}</div>
              <h3 className="font-display text-2xl mb-3">{n.t}</h3>
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
    <section className="border-b border-border">
      <div className="container mx-auto px-6 py-20 max-w-7xl grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground mb-3">§ 04 — Q&amp;A</div>
          <h2 className="font-display text-4xl md:text-5xl tracking-tight">Honest answers,<br /><span className="italic">no fine print.</span></h2>
        </div>
        <div className="lg:col-span-8">
          <Accordion type="single" collapsible className="border-t border-border">
            {FAQS.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b border-border">
                <AccordionTrigger className="py-5 text-left font-display text-xl md:text-2xl hover:no-underline">{f.q}</AccordionTrigger>
                <AccordionContent className="pb-5 text-muted-foreground text-base leading-relaxed max-w-2xl">{f.a}</AccordionContent>
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
    <section>
      <div className="container mx-auto px-6 py-20 max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground mb-4">Colophon</div>
            <h2 className="font-display text-5xl md:text-7xl leading-[0.95] tracking-tight">
              Set <span className="italic">in Instrument Serif &amp;</span> Inter.<br />
              Built to outlive the trend cycle.
            </h2>
          </div>
          <div className="lg:col-span-4">
            <Link to="/password-generator" className="block group">
              <Button variant="default" className="w-full h-14 rounded-none text-base font-medium inline-flex items-center justify-between px-5">
                <span>Generate a password</span>
                <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
              <p className="mt-3 text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">No account · Works offline · Free</p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
