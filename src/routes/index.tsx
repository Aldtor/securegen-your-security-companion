import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Shield, KeyRound, Gauge, AtSign, Type, Hash, QrCode, Fingerprint, Sparkles, Lock, Zap, Eye, ArrowRight, Check, Star } from "lucide-react";
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
  { to: "/password-generator", icon: KeyRound, name: "Password Generator", desc: "Cryptographically strong passwords in one click." },
  { to: "/password-strength", icon: Gauge, name: "Strength Checker", desc: "Real-time entropy and crack-time analysis." },
  { to: "/username-generator", icon: AtSign, name: "Username Generator", desc: "Unique handles for social, gaming, and pro use." },
  { to: "/passphrase-generator", icon: Type, name: "Passphrase Generator", desc: "XKCD-style passphrases that you can remember." },
  { to: "/uuid-generator", icon: Fingerprint, name: "UUID Generator", desc: "RFC 4122 v4 identifiers, single or bulk." },
  { to: "/qr-generator", icon: QrCode, name: "QR Code Generator", desc: "Text, URL, WiFi, email, SMS. PNG & SVG export." },
  { to: "/hash-generator", icon: Hash, name: "Hash Generator", desc: "MD5, SHA-1, SHA-256, SHA-512 hashing." },
];

const FAQS = [
  { q: "Are these tools really free?", a: "Yes. Every tool on SecureGen is completely free with no limits, accounts, or paywalls." },
  { q: "Do you store my passwords?", a: "Never. All generation, hashing, and analysis runs entirely in your browser. Nothing is sent to a server." },
  { q: "How random are the passwords?", a: "We use the Web Crypto API's cryptographically secure random source — the same standard used by banks and security software." },
  { q: "Can I use SecureGen for business?", a: "Absolutely. Our tools are suitable for personal, professional, and enterprise use." },
  { q: "Why entropy instead of complexity rules?", a: "Entropy measures the actual mathematical strength of a password. Arbitrary rules like 'one special character' provide a false sense of security." },
];

function Index() {
  return (
    <>
      <Hero />
      <Stats />
      <ToolsGrid />
      <Features />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}

function Hero() {
  const [pw, setPw] = useState("");
  useEffect(() => {
    setPw(generatePassword({ length: 20, upper: true, lower: true, numbers: true, symbols: true, excludeSimilar: false, excludeAmbiguous: false }));
  }, []);
  const entropy = useMemo(() => calcEntropy(pw), [pw]);
  const strength = strengthLabel(entropy);
  const regen = () => setPw(generatePassword({ length: 20, upper: true, lower: true, numbers: true, symbols: true, excludeSimilar: false, excludeAmbiguous: false }));
  const copy = () => { navigator.clipboard.writeText(pw); toast.success("Password copied"); };
  return (
    <section className="relative overflow-hidden mesh-bg">
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/20 blur-3xl animate-float" />
      <div className="absolute bottom-0 -right-32 w-96 h-96 rounded-full bg-secondary/20 blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      <div className="container mx-auto px-4 pt-20 pb-24 max-w-7xl relative">
        <div className="text-center max-w-4xl mx-auto animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-border/60 text-sm text-muted-foreground mb-6 shadow-[var(--shadow-elegant)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <Sparkles className="h-4 w-4 text-accent" />
            <span>Trusted by 100,000+ users worldwide</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-[-0.04em] leading-[1.02] mb-6">
            Generate. <span className="gradient-text">Secure.</span><br className="hidden md:block" /> Protect.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            A premium suite of security and privacy tools — passwords, passphrases, UUIDs, QR codes, hashes and more. 100% browser-based. Zero tracking.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
            <Link to="/password-generator">
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 shadow-[var(--shadow-elegant)] h-12 px-8 text-base">
                Generate Password <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/password-generator">
              <Button size="lg" variant="outline" className="h-12 px-8 text-base glass">Explore Tools</Button>
            </Link>
          </div>
        </div>
        <div className="max-w-3xl mx-auto animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <div className="glass rounded-2xl p-6 md:p-8 shadow-[var(--shadow-glow)] border border-border/60">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Lock className="h-4 w-4 text-accent" />
                <span>Live preview</span>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full text-white ${strength.color}`}>{strength.label}</span>
            </div>
            <div className="font-mono text-lg md:text-2xl break-all p-4 rounded-xl bg-muted/50 border border-border mb-4 select-all">{pw}</div>
            <div className="flex flex-wrap gap-2 mb-4">
              <div className="text-xs px-3 py-1.5 rounded-lg bg-muted/50 border border-border"><span className="text-muted-foreground">Entropy:</span> <span className="font-semibold">{entropy.toFixed(1)} bits</span></div>
              <div className="text-xs px-3 py-1.5 rounded-lg bg-muted/50 border border-border"><span className="text-muted-foreground">Crack time:</span> <span className="font-semibold">{crackTime(entropy)}</span></div>
            </div>
            <div className="flex gap-2">
              <Button onClick={copy} className="flex-1">Copy</Button>
              <Button onClick={regen} variant="outline" className="flex-1">Regenerate</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { v: "100K+", l: "Passwords generated" },
    { v: "0", l: "Data ever stored" },
    { v: "256-bit", l: "Cryptographic strength" },
    { v: "100%", l: "Free, forever" },
  ];
  return (
    <section className="container mx-auto px-4 py-16 max-w-7xl">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.l} className="text-center glass rounded-2xl p-6 border border-border/60">
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">{s.v}</div>
            <div className="text-sm text-muted-foreground">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ToolsGrid() {
  return (
    <section className="container mx-auto px-4 py-20 max-w-7xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Every tool you need</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">A complete suite of security and privacy utilities, free and browser-based.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {TOOLS.map(t => {
          const Icon = t.icon;
          return (
            <Link key={t.to} to={t.to} className="group">
              <Card className="p-6 h-full glass border-border/60 hover:border-primary/60 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary text-primary-foreground flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{t.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{t.desc}</p>
                <div className="flex items-center text-sm font-medium text-primary">
                  Open tool <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function Features() {
  const items = [
    { icon: Shield, t: "Privacy first", d: "Everything runs locally. Your data never leaves your browser." },
    { icon: Zap, t: "Blazing fast", d: "Instant generation with zero network roundtrips." },
    { icon: Lock, t: "Cryptographically secure", d: "Powered by the Web Crypto API — the same standard used by banks." },
    { icon: Eye, t: "No tracking", d: "No accounts, no cookies, no analytics on your inputs." },
  ];
  return (
    <section className="container mx-auto px-4 py-20 max-w-7xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Built for trust</h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map(i => (
          <div key={i.t} className="p-6 rounded-2xl glass border border-border/60">
            <i.icon className="h-8 w-8 text-accent mb-4" />
            <h3 className="font-semibold mb-2">{i.t}</h3>
            <p className="text-sm text-muted-foreground">{i.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  const reviews = [
    { q: "Genuinely the best password tool I've used. Fast, beautiful, and zero BS.", a: "Maya R.", r: "Security Engineer" },
    { q: "I switched from three different tools to just SecureGen. It does everything.", a: "Daniel K.", r: "Developer" },
    { q: "Love that nothing leaves my browser. Privacy done right.", a: "Priya S.", r: "Product Designer" },
  ];
  return (
    <section className="container mx-auto px-4 py-20 max-w-7xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Loved by professionals</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {reviews.map(r => (
          <Card key={r.a} className="p-6 glass border-border/60">
            <div className="flex gap-1 mb-3">{[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-accent text-accent" />)}</div>
            <p className="mb-4 text-foreground">&ldquo;{r.q}&rdquo;</p>
            <div>
              <div className="font-semibold text-sm">{r.a}</div>
              <div className="text-xs text-muted-foreground">{r.r}</div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section className="container mx-auto px-4 py-20 max-w-3xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Frequently asked</h2>
      </div>
      <Accordion type="single" collapsible className="glass rounded-2xl border border-border/60 p-2">
        {FAQS.map((f, i) => (
          <AccordionItem key={i} value={`item-${i}`} className="border-border/40 last:border-0">
            <AccordionTrigger className="px-4 text-left">{f.q}</AccordionTrigger>
            <AccordionContent className="px-4 text-muted-foreground">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

function CTA() {
  return (
    <section className="container mx-auto px-4 py-20 max-w-7xl">
      <div className="relative overflow-hidden rounded-3xl p-12 md:p-20 text-center text-white" style={{ background: "var(--gradient-hero)" }}>
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative">
          <Shield className="h-12 w-12 mx-auto mb-6 opacity-90" />
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Start securing your digital life</h2>
          <p className="text-lg opacity-90 max-w-xl mx-auto mb-8">Free forever. No signup. Works offline. Premium-grade security tools, instantly.</p>
          <Link to="/password-generator">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 h-12 px-8 text-base">
              Generate your first password <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm opacity-90">
            <div className="flex items-center gap-2"><Check className="h-4 w-4" /> No account needed</div>
            <div className="flex items-center gap-2"><Check className="h-4 w-4" /> 100% private</div>
            <div className="flex items-center gap-2"><Check className="h-4 w-4" /> Works offline</div>
          </div>
        </div>
      </div>
    </section>
  );
}
