import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import { ToolShell } from "@/components/tool-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Type, Copy, RefreshCw } from "lucide-react";
import { generatePassphrase, calcEntropy, strengthLabel, crackTime } from "@/lib/generators";
import { toast } from "sonner";

export const Route = createFileRoute("/passphrase-generator")({
  head: () => ({
    meta: [
      { title: "Passphrase Generator | SecureGen" },
      { name: "description", content: "Generate memorable, XKCD-style secure passphrases. Easy to remember, hard to crack." },
      { property: "og:title", content: "Passphrase Generator | SecureGen" },
      { property: "og:description", content: "Easy-to-remember secure passphrases." },
      { property: "og:url", content: "/passphrase-generator" },
    ],
    links: [{ rel: "canonical", href: "/passphrase-generator" }],
  }),
  component: Page,
});

function Page() {
  const [words, setWords] = useState(5);
  const [num, setNum] = useState(true);
  const [sym, setSym] = useState(false);
  const [sep, setSep] = useState("-");
  const [out, setOut] = useState("");
  const regen = () => setOut(generatePassphrase(words, num, sym, sep));
  useEffect(() => { regen(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [words, num, sym, sep]);
  const entropy = useMemo(() => calcEntropy(out), [out]);
  const strength = strengthLabel(entropy);

  return (
    <ToolShell title="Passphrase Generator" description="XKCD-style passphrases — long, memorable, and devastatingly hard to crack." icon={<Type className="h-7 w-7" />}>
      <Card className="p-6 md:p-8 glass border-border/60 mb-6 animate-fade-up">
        <div className="flex items-center justify-between mb-3">
          <Label className="text-sm text-muted-foreground">Your passphrase</Label>
          <span className={`text-xs px-2 py-1 rounded-full text-white ${strength.color}`}>{strength.label}</span>
        </div>
        <div className="font-mono text-lg md:text-2xl break-all p-4 rounded-xl bg-muted/50 border border-border mb-4 select-all">{out}</div>
        <div className="flex flex-wrap gap-2 mb-4 text-xs">
          <div className="px-3 py-1.5 rounded-lg bg-muted/50 border border-border"><span className="text-muted-foreground">Entropy:</span> <span className="font-semibold">{entropy.toFixed(1)} bits</span></div>
          <div className="px-3 py-1.5 rounded-lg bg-muted/50 border border-border"><span className="text-muted-foreground">Crack time:</span> <span className="font-semibold">{crackTime(entropy)}</span></div>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => { navigator.clipboard.writeText(out); toast.success("Copied"); }} className="flex-1"><Copy className="mr-2 h-4 w-4" />Copy</Button>
          <Button variant="outline" onClick={regen} className="flex-1"><RefreshCw className="mr-2 h-4 w-4" />Regenerate</Button>
        </div>
      </Card>
      <Card className="p-6 md:p-8 glass border-border/60">
        <h2 className="font-semibold mb-6">Options</h2>
        <div className="mb-6">
          <div className="flex justify-between mb-2"><Label>Word count</Label><span className="font-mono text-sm">{words}</span></div>
          <Slider value={[words]} min={3} max={10} step={1} onValueChange={([v]) => setWords(v)} />
        </div>
        <div className="mb-6">
          <Label className="mb-2 block">Separator</Label>
          <div className="flex gap-2">{["-", ".", " ", "_"].map(s => (
            <button key={s} onClick={() => setSep(s)} className={`px-4 py-2 rounded-lg border font-mono ${sep === s ? "border-primary bg-primary/10" : "border-border bg-muted/30"}`}>{s === " " ? "␣" : s}</button>
          ))}</div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border"><Label>Append number</Label><Switch checked={num} onCheckedChange={setNum} /></div>
          <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border"><Label>Append symbol</Label><Switch checked={sym} onCheckedChange={setSym} /></div>
        </div>
      </Card>
    </ToolShell>
  );
}