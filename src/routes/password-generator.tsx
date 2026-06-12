import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useCallback, useEffect } from "react";
import { ToolShell } from "@/components/tool-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { KeyRound, Copy, RefreshCw, Download, History } from "lucide-react";
import { generatePassword, calcEntropy, strengthLabel, crackTime, type PasswordOptions } from "@/lib/generators";
import { toast } from "sonner";

export const Route = createFileRoute("/password-generator")({
  head: () => ({
    meta: [
      { title: "Free Password Generator | SecureGen" },
      { name: "description", content: "Generate strong, secure passwords up to 128 characters. Customize length, symbols, and exclusions. 100% browser-based." },
      { property: "og:title", content: "Free Password Generator | SecureGen" },
      { property: "og:description", content: "Generate cryptographically strong passwords instantly." },
      { property: "og:url", content: "/password-generator" },
    ],
    links: [{ rel: "canonical", href: "/password-generator" }],
  }),
  component: PasswordPage,
});

function PasswordPage() {
  const [opts, setOpts] = useState<PasswordOptions>({ length: 20, upper: true, lower: true, numbers: true, symbols: true, excludeSimilar: false, excludeAmbiguous: false });
  const [pw, setPw] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [bulkCount, setBulkCount] = useState(10);
  const [bulk, setBulk] = useState<string[]>([]);

  const regen = useCallback(() => {
    const p = generatePassword(opts);
    setPw(p);
    if (p) setHistory(h => [p, ...h].slice(0, 10));
  }, [opts]);

  useEffect(() => { regen(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [opts]);

  const entropy = useMemo(() => calcEntropy(pw), [pw]);
  const strength = strengthLabel(entropy);

  const copy = (v: string) => { navigator.clipboard.writeText(v); toast.success("Copied to clipboard"); };
  const exportAll = (list: string[], name: string) => {
    const blob = new Blob([list.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = name; a.click(); URL.revokeObjectURL(url);
  };

  const generateBulk = () => {
    const list = Array.from({ length: bulkCount }, () => generatePassword(opts));
    setBulk(list);
  };

  return (
    <ToolShell title="Password Generator" description="Generate cryptographically strong passwords with full control over length and character sets." icon={<KeyRound className="h-7 w-7" />}>
      <Card className="p-6 md:p-8 glass border-border/60 mb-6 animate-fade-up">
        <div className="flex items-center justify-between mb-3">
          <Label className="text-sm text-muted-foreground">Your password</Label>
          <span className={`text-xs px-2 py-1 rounded-full text-white ${strength.color}`}>{strength.label}</span>
        </div>
        <div className="font-mono text-lg md:text-2xl break-all p-4 rounded-xl bg-muted/50 border border-border mb-4 select-all min-h-[4rem]">{pw}</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4 text-xs">
          <Stat label="Length" value={String(pw.length)} />
          <Stat label="Entropy" value={`${entropy.toFixed(1)} bits`} />
          <Stat label="Crack time" value={crackTime(entropy)} />
          <Stat label="Charset" value={String(charsetSize(opts))} />
        </div>
        <div className="flex gap-2">
          <Button onClick={() => copy(pw)} className="flex-1"><Copy className="mr-2 h-4 w-4" />Copy</Button>
          <Button onClick={regen} variant="outline" className="flex-1"><RefreshCw className="mr-2 h-4 w-4" />Regenerate</Button>
        </div>
      </Card>

      <Card className="p-6 md:p-8 glass border-border/60 mb-6">
        <h2 className="font-semibold mb-6">Options</h2>
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <Label>Length</Label>
            <span className="font-mono text-sm">{opts.length}</span>
          </div>
          <Slider value={[opts.length]} min={4} max={128} step={1} onValueChange={([v]) => setOpts(o => ({ ...o, length: v }))} />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Toggle label="Uppercase (A-Z)" v={opts.upper} on={v => setOpts(o => ({ ...o, upper: v }))} />
          <Toggle label="Lowercase (a-z)" v={opts.lower} on={v => setOpts(o => ({ ...o, lower: v }))} />
          <Toggle label="Numbers (0-9)" v={opts.numbers} on={v => setOpts(o => ({ ...o, numbers: v }))} />
          <Toggle label="Symbols (!@#$)" v={opts.symbols} on={v => setOpts(o => ({ ...o, symbols: v }))} />
          <Toggle label="Exclude similar (il1Lo0O)" v={opts.excludeSimilar} on={v => setOpts(o => ({ ...o, excludeSimilar: v }))} />
          <Toggle label="Exclude ambiguous ({}[]/...)" v={opts.excludeAmbiguous} on={v => setOpts(o => ({ ...o, excludeAmbiguous: v }))} />
        </div>
      </Card>

      <Card className="p-6 md:p-8 glass border-border/60 mb-6">
        <h2 className="font-semibold mb-4">Bulk generation</h2>
        <div className="flex flex-wrap gap-2 items-end mb-4">
          <div className="flex-1 min-w-[120px]">
            <Label className="text-xs text-muted-foreground">Count</Label>
            <Input type="number" min={1} max={500} value={bulkCount} onChange={e => setBulkCount(Math.min(500, Math.max(1, +e.target.value || 1)))} />
          </div>
          <Button onClick={generateBulk}>Generate {bulkCount}</Button>
          {bulk.length > 0 && <Button variant="outline" onClick={() => exportAll(bulk, "passwords.txt")}><Download className="mr-2 h-4 w-4" />Export</Button>}
        </div>
        {bulk.length > 0 && (
          <div className="max-h-72 overflow-auto rounded-xl border border-border bg-muted/30 divide-y divide-border">
            {bulk.map((p, i) => (
              <div key={i} className="flex items-center justify-between px-3 py-2 text-sm font-mono group">
                <span className="truncate">{p}</span>
                <button onClick={() => copy(p)} className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground"><Copy className="h-3.5 w-3.5" /></button>
              </div>
            ))}
          </div>
        )}
      </Card>

      {history.length > 0 && (
        <Card className="p-6 md:p-8 glass border-border/60">
          <h2 className="font-semibold mb-4 flex items-center gap-2"><History className="h-4 w-4" />History</h2>
          <div className="space-y-1">
            {history.map((h, i) => (
              <div key={i} className="flex justify-between items-center px-3 py-2 rounded-lg hover:bg-muted/50 text-sm font-mono group">
                <span className="truncate">{h}</span>
                <button onClick={() => copy(h)} className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground"><Copy className="h-3.5 w-3.5" /></button>
              </div>
            ))}
          </div>
        </Card>
      )}
    </ToolShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return <div className="px-3 py-2 rounded-lg bg-muted/50 border border-border"><div className="text-muted-foreground">{label}</div><div className="font-semibold truncate">{value}</div></div>;
}
function Toggle({ label, v, on }: { label: string; v: boolean; on: (v: boolean) => void }) {
  return <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border"><Label className="cursor-pointer">{label}</Label><Switch checked={v} onCheckedChange={on} /></div>;
}
function charsetSize(o: PasswordOptions) {
  let n = 0;
  if (o.upper) n += 26; if (o.lower) n += 26; if (o.numbers) n += 10; if (o.symbols) n += 32;
  return n;
}