import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ToolShell } from "@/components/tool-shell";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Gauge, Eye, EyeOff, AlertTriangle, Check } from "lucide-react";
import { calcEntropy, strengthLabel, crackTime } from "@/lib/generators";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/password-strength")({
  head: () => ({
    meta: [
      { title: "Password Strength Checker | SecureGen" },
      { name: "description", content: "Test password strength with real-time entropy, crack-time and security recommendations. Runs locally in your browser." },
      { property: "og:title", content: "Password Strength Checker | SecureGen" },
      { property: "og:description", content: "Real-time password strength analysis." },
      { property: "og:url", content: "/password-strength" },
    ],
    links: [{ rel: "canonical", href: "/password-strength" }],
  }),
  component: Page,
});

const COMMON = new Set(["password","123456","12345678","qwerty","abc123","letmein","admin","welcome","monkey","iloveyou","password1","123123","football","000000"]);

function Page() {
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const entropy = useMemo(() => calcEntropy(pw), [pw]);
  const strength = strengthLabel(entropy);
  const checks = useMemo(() => ({
    length: pw.length >= 12,
    upper: /[A-Z]/.test(pw),
    lower: /[a-z]/.test(pw),
    num: /[0-9]/.test(pw),
    sym: /[^A-Za-z0-9]/.test(pw),
    common: !COMMON.has(pw.toLowerCase()),
    unique: new Set(pw).size > Math.min(pw.length, 8),
  }), [pw]);
  const score = (entropy / 100) * 100;

  return (
    <ToolShell title="Password Strength Checker" description="See exactly how strong your password is — entropy, crack time, and what to improve." icon={<Gauge className="h-7 w-7" />}>
      <Card className="p-6 md:p-8 glass border-border/60 mb-6 animate-fade-up">
        <Label className="mb-2 block">Enter a password to test</Label>
        <div className="relative mb-6">
          <Input type={show ? "text" : "password"} value={pw} onChange={e => setPw(e.target.value)} placeholder="Type or paste a password..." className="pr-10 text-base h-12 font-mono" />
          <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1" onClick={() => setShow(s => !s)} aria-label="Toggle visibility">{show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</Button>
        </div>

        {pw && (
          <>
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">{strength.label}</span>
                <span className="text-sm text-muted-foreground">{entropy.toFixed(1)} bits</span>
              </div>
              <div className="h-3 rounded-full bg-muted overflow-hidden">
                <div className={`h-full ${strength.color} transition-all`} style={{ width: `${Math.min(100, score)}%` }} />
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
              <Stat label="Length" value={String(pw.length)} />
              <Stat label="Entropy" value={`${entropy.toFixed(1)}b`} />
              <Stat label="Crack time" value={crackTime(entropy)} />
              <Stat label="Unique chars" value={String(new Set(pw).size)} />
            </div>

            {COMMON.has(pw.toLowerCase()) && (
              <div className="flex gap-3 p-4 rounded-xl border border-destructive/40 bg-destructive/10 text-destructive mb-4">
                <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <div><div className="font-semibold">Breach risk: very high</div><div className="text-sm opacity-90">This password appears on common-passwords lists. Change it immediately on every account where it's used.</div></div>
              </div>
            )}

            <h3 className="font-semibold mb-3">Recommendations</h3>
            <div className="space-y-2">
              <CheckRow ok={checks.length} text="At least 12 characters" />
              <CheckRow ok={checks.upper} text="Contains uppercase letters" />
              <CheckRow ok={checks.lower} text="Contains lowercase letters" />
              <CheckRow ok={checks.num} text="Contains numbers" />
              <CheckRow ok={checks.sym} text="Contains symbols" />
              <CheckRow ok={checks.unique} text="Sufficient character variety" />
              <CheckRow ok={checks.common} text="Not a commonly used password" />
            </div>
          </>
        )}
      </Card>
      <Card className="p-6 glass border-border/60 text-sm text-muted-foreground">
        <div className="flex gap-3">
          <Eye className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
          <div>Your password is analyzed entirely in your browser. Nothing is sent over the network and nothing is stored.</div>
        </div>
      </Card>
    </ToolShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return <div className="px-3 py-2 rounded-lg bg-muted/50 border border-border text-xs"><div className="text-muted-foreground">{label}</div><div className="font-semibold truncate">{value}</div></div>;
}
function CheckRow({ ok, text }: { ok: boolean; text: string }) {
  return (
    <div className={`flex items-center gap-2 text-sm ${ok ? "text-foreground" : "text-muted-foreground"}`}>
      <div className={`h-5 w-5 rounded-full flex items-center justify-center ${ok ? "bg-emerald-500/20 text-emerald-500" : "bg-muted text-muted-foreground"}`}>{ok ? <Check className="h-3 w-3" /> : <span className="h-1.5 w-1.5 rounded-full bg-current" />}</div>
      {text}
    </div>
  );
}