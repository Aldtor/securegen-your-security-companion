import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ToolShell } from "@/components/tool-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Hash, Copy } from "lucide-react";
import { hashText } from "@/lib/generators";
import { toast } from "sonner";

export const Route = createFileRoute("/hash-generator")({
  head: () => ({
    meta: [
      { title: "Hash Generator (MD5, SHA-1, SHA-256, SHA-512) | SecureGen" },
      { name: "description", content: "Generate MD5, SHA-1, SHA-256 and SHA-512 hashes for any text in real time." },
      { property: "og:title", content: "Hash Generator | SecureGen" },
      { property: "og:description", content: "MD5, SHA-1, SHA-256, SHA-512 hashing in your browser." },
      { property: "og:url", content: "/hash-generator" },
    ],
    links: [{ rel: "canonical", href: "/hash-generator" }],
  }),
  component: Page,
});

const ALGOS = ["MD5", "SHA-1", "SHA-256", "SHA-512"] as const;

function Page() {
  const [text, setText] = useState("Hello, SecureGen!");
  const [hashes, setHashes] = useState<Record<string, string>>({});

  useEffect(() => {
    (async () => {
      const r: Record<string, string> = {};
      for (const a of ALGOS) r[a] = await hashText(text, a);
      setHashes(r);
    })();
  }, [text]);

  const copy = (v: string) => { navigator.clipboard.writeText(v); toast.success("Hash copied"); };

  return (
    <ToolShell title="Hash Generator" description="Generate MD5, SHA-1, SHA-256, and SHA-512 hashes in real time." icon={<Hash className="h-7 w-7" />}>
      <Card className="p-6 md:p-8 glass border-border/60 mb-6 animate-fade-up">
        <Label className="mb-2 block">Input text</Label>
        <Textarea value={text} onChange={e => setText(e.target.value)} className="font-mono min-h-32" placeholder="Enter text to hash..." />
      </Card>
      <div className="space-y-3">
        {ALGOS.map(a => (
          <Card key={a} className="p-5 glass border-border/60">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-sm">{a}</span>
              <Button size="sm" variant="ghost" onClick={() => copy(hashes[a] || "")}><Copy className="h-3.5 w-3.5 mr-1" />Copy</Button>
            </div>
            <div className="font-mono text-sm break-all text-muted-foreground select-all">{hashes[a]}</div>
          </Card>
        ))}
      </div>
    </ToolShell>
  );
}