import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ToolShell } from "@/components/tool-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AtSign, Copy, Download, RefreshCw } from "lucide-react";
import { generateUsername, type UsernameStyle } from "@/lib/generators";
import { toast } from "sonner";

export const Route = createFileRoute("/username-generator")({
  head: () => ({
    meta: [
      { title: "Username Generator | SecureGen" },
      { name: "description", content: "Generate unique usernames for social media, gaming, and professional profiles. Bulk generation supported." },
      { property: "og:title", content: "Username Generator | SecureGen" },
      { property: "og:description", content: "Generate unique, creative usernames in one click." },
      { property: "og:url", content: "/username-generator" },
    ],
    links: [{ rel: "canonical", href: "/username-generator" }],
  }),
  component: Page,
});

function Page() {
  const [style, setStyle] = useState<UsernameStyle>("social");
  const [count, setCount] = useState(12);
  const [list, setList] = useState<string[]>(() => Array.from({ length: 12 }, () => generateUsername("social")));

  const regen = (s: UsernameStyle = style, n: number = count) => setList(Array.from({ length: n }, () => generateUsername(s)));
  const copy = (v: string) => { navigator.clipboard.writeText(v); toast.success("Username copied"); };
  const exportTxt = () => {
    const blob = new Blob([list.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = "usernames.txt"; a.click(); URL.revokeObjectURL(url);
  };

  return (
    <ToolShell title="Username Generator" description="Unique usernames for any platform — social, gaming, or professional." icon={<AtSign className="h-7 w-7" />}>
      <Card className="p-6 md:p-8 glass border-border/60 mb-6 animate-fade-up">
        <Tabs value={style} onValueChange={(v) => { const s = v as UsernameStyle; setStyle(s); regen(s); }}>
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="social">Social</TabsTrigger>
            <TabsTrigger value="gaming">Gaming</TabsTrigger>
            <TabsTrigger value="professional">Professional</TabsTrigger>
            <TabsTrigger value="random">Random</TabsTrigger>
          </TabsList>
          <TabsContent value={style}>
            <div className="flex flex-wrap gap-2 items-end mb-4">
              <div className="flex-1 min-w-[120px]">
                <Label className="text-xs text-muted-foreground">Count</Label>
                <Input type="number" min={1} max={100} value={count} onChange={e => setCount(Math.min(100, Math.max(1, +e.target.value || 1)))} />
              </div>
              <Button onClick={() => regen()}><RefreshCw className="mr-2 h-4 w-4" />Generate</Button>
              <Button variant="outline" onClick={exportTxt}><Download className="mr-2 h-4 w-4" />Export</Button>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
              {list.map((u, i) => (
                <button key={i} onClick={() => copy(u)} className="text-left px-4 py-3 rounded-xl bg-muted/30 border border-border hover:border-primary/60 hover:bg-muted/60 transition-all font-mono text-sm group flex justify-between items-center">
                  <span className="truncate">{u}</span>
                  <Copy className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 text-muted-foreground" />
                </button>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </ToolShell>
  );
}