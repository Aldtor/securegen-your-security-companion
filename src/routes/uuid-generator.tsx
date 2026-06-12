import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ToolShell } from "@/components/tool-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Fingerprint, Copy, Download, RefreshCw } from "lucide-react";
import { generateUUID } from "@/lib/generators";
import { toast } from "sonner";

export const Route = createFileRoute("/uuid-generator")({
  head: () => ({
    meta: [
      { title: "UUID Generator | SecureGen" },
      { name: "description", content: "Generate UUID v4 (RFC 4122) identifiers. Single or bulk generation with export." },
      { property: "og:title", content: "UUID Generator | SecureGen" },
      { property: "og:description", content: "Generate RFC 4122 compliant UUIDs in bulk." },
      { property: "og:url", content: "/uuid-generator" },
    ],
    links: [{ rel: "canonical", href: "/uuid-generator" }],
  }),
  component: Page,
});

function Page() {
  const [single, setSingle] = useState(generateUUID());
  const [count, setCount] = useState(10);
  const [bulk, setBulk] = useState<string[]>([]);
  const copy = (v: string) => { navigator.clipboard.writeText(v); toast.success("Copied"); };
  const copyAll = () => { navigator.clipboard.writeText(bulk.join("\n")); toast.success(`${bulk.length} UUIDs copied`); };
  const exportTxt = () => {
    const blob = new Blob([bulk.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = "uuids.txt"; a.click(); URL.revokeObjectURL(url);
  };
  return (
    <ToolShell title="UUID Generator" description="RFC 4122 compliant UUID v4 identifiers. Single or bulk." icon={<Fingerprint className="h-7 w-7" />}>
      <Card className="p-6 md:p-8 glass border-border/60 mb-6 animate-fade-up">
        <Label className="text-sm text-muted-foreground mb-3 block">Single UUID</Label>
        <div className="font-mono text-base md:text-lg break-all p-4 rounded-xl bg-muted/50 border border-border mb-4 select-all">{single}</div>
        <div className="flex gap-2">
          <Button onClick={() => copy(single)} className="flex-1"><Copy className="mr-2 h-4 w-4" />Copy</Button>
          <Button variant="outline" onClick={() => setSingle(generateUUID())} className="flex-1"><RefreshCw className="mr-2 h-4 w-4" />New</Button>
        </div>
      </Card>
      <Card className="p-6 md:p-8 glass border-border/60">
        <h2 className="font-semibold mb-4">Bulk generation</h2>
        <div className="flex flex-wrap gap-2 items-end mb-4">
          <div className="flex-1 min-w-[120px]"><Label className="text-xs text-muted-foreground">Count</Label><Input type="number" min={1} max={1000} value={count} onChange={e => setCount(Math.min(1000, Math.max(1, +e.target.value || 1)))} /></div>
          <Button onClick={() => setBulk(Array.from({ length: count }, generateUUID))}>Generate {count}</Button>
          {bulk.length > 0 && (
            <>
              <Button variant="outline" onClick={copyAll}><Copy className="mr-2 h-4 w-4" />Copy all</Button>
              <Button variant="outline" onClick={exportTxt}><Download className="mr-2 h-4 w-4" />Export</Button>
            </>
          )}
        </div>
        {bulk.length > 0 && (
          <div className="max-h-96 overflow-auto rounded-xl border border-border bg-muted/30 divide-y divide-border">
            {bulk.map((u, i) => (
              <div key={i} className="flex items-center justify-between px-3 py-2 text-sm font-mono group">
                <span className="truncate">{u}</span>
                <button onClick={() => copy(u)} className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground"><Copy className="h-3.5 w-3.5" /></button>
              </div>
            ))}
          </div>
        )}
      </Card>
    </ToolShell>
  );
}