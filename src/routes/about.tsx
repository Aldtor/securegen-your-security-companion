import { createFileRoute } from "@tanstack/react-router";
import { Shield, Eye, Zap, Lock, Heart } from "lucide-react";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About SecureGen" },
      { name: "description", content: "SecureGen builds free, browser-based security tools to help everyone create stronger passwords and stay safer online." },
      { property: "og:title", content: "About SecureGen" },
      { property: "og:description", content: "Our mission is to make professional-grade security accessible to everyone." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <div className="mesh-bg min-h-[calc(100vh-4rem)]">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-12 animate-fade-up">
          <Shield className="h-16 w-16 mx-auto text-primary mb-4" />
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">About <span className="gradient-text">SecureGen</span></h1>
          <p className="text-xl text-muted-foreground">Generate. Secure. Protect.</p>
        </div>
        <Card className="p-8 glass border-border/60 mb-6">
          <h2 className="text-2xl font-bold mb-4">Our mission</h2>
          <p className="text-muted-foreground leading-relaxed">SecureGen exists to make professional-grade security tools accessible to everyone — for free. Strong passwords and good security hygiene shouldn't be a paid privilege. Every tool runs entirely in your browser, so your data never leaves your device.</p>
        </Card>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {[
            { i: Lock, t: "Privacy first", d: "Zero data collection. Zero analytics on your inputs. Everything stays on your device." },
            { i: Zap, t: "Built for speed", d: "Instant generation with no roundtrips. Works offline once loaded." },
            { i: Eye, t: "Fully transparent", d: "Open methodology. We document exactly how each tool works." },
            { i: Heart, t: "Made with care", d: "Designed and engineered to feel polished, not bolted together." },
          ].map(v => (
            <Card key={v.t} className="p-6 glass border-border/60">
              <v.i className="h-8 w-8 text-accent mb-3" />
              <h3 className="font-semibold mb-2">{v.t}</h3>
              <p className="text-sm text-muted-foreground">{v.d}</p>
            </Card>
          ))}
        </div>
        <Card className="p-8 glass border-border/60">
          <h2 className="text-2xl font-bold mb-4">Recommended security tools</h2>
          <p className="text-muted-foreground mb-6">Beyond generation, here are the categories we recommend exploring for full account security. (Affiliate partnerships coming soon — we'll always disclose them.)</p>
          <div className="grid sm:grid-cols-3 gap-4">
            {["Password Managers","VPN Services","Security Software"].map(c => (
              <div key={c} className="p-4 rounded-xl border border-dashed border-border bg-muted/20 text-center text-sm text-muted-foreground">{c}<div className="text-xs mt-1 opacity-60">Coming soon</div></div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}