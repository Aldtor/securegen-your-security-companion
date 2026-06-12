import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ToolShell } from "@/components/tool-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { QrCode, Download } from "lucide-react";
import QRCode from "qrcode";
import { toast } from "sonner";

export const Route = createFileRoute("/qr-generator")({
  head: () => ({
    meta: [
      { title: "QR Code Generator | SecureGen" },
      { name: "description", content: "Create QR codes for text, URLs, email, phone, SMS and WiFi. Download as PNG or SVG." },
      { property: "og:title", content: "QR Code Generator | SecureGen" },
      { property: "og:description", content: "QR codes for text, URL, WiFi, email and more." },
      { property: "og:url", content: "/qr-generator" },
    ],
    links: [{ rel: "canonical", href: "/qr-generator" }],
  }),
  component: Page,
});

type Mode = "text" | "url" | "email" | "phone" | "sms" | "wifi";

function Page() {
  const [mode, setMode] = useState<Mode>("url");
  const [text, setText] = useState("");
  const [url, setUrl] = useState("https://securegen.app");
  const [email, setEmail] = useState(""); const [subject, setSubject] = useState(""); const [body, setBody] = useState("");
  const [phone, setPhone] = useState("");
  const [sms, setSms] = useState(""); const [smsBody, setSmsBody] = useState("");
  const [wifi, setWifi] = useState({ ssid: "", password: "", enc: "WPA" as "WPA" | "WEP" | "nopass", hidden: false });
  const [png, setPng] = useState(""); const [svg, setSvg] = useState("");

  const payload = (() => {
    switch (mode) {
      case "text": return text;
      case "url": return url;
      case "email": return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      case "phone": return `tel:${phone}`;
      case "sms": return `sms:${sms}?body=${encodeURIComponent(smsBody)}`;
      case "wifi": return `WIFI:T:${wifi.enc};S:${wifi.ssid};P:${wifi.password};${wifi.hidden ? "H:true;" : ""};`;
    }
  })();

  useEffect(() => {
    if (!payload) { setPng(""); setSvg(""); return; }
    QRCode.toDataURL(payload, { width: 512, margin: 2, color: { dark: "#000000", light: "#ffffff" } }).then(setPng).catch(() => {});
    QRCode.toString(payload, { type: "svg", margin: 2 }).then(setSvg).catch(() => {});
  }, [payload]);

  const downloadPng = () => { const a = document.createElement("a"); a.href = png; a.download = "qrcode.png"; a.click(); };
  const downloadSvg = () => {
    const blob = new Blob([svg], { type: "image/svg+xml" }); const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "qrcode.svg"; a.click(); URL.revokeObjectURL(url);
  };

  return (
    <ToolShell title="QR Code Generator" description="QR codes for text, URLs, WiFi, email, phone and SMS — exported as PNG or SVG." icon={<QrCode className="h-7 w-7" />}>
      <div className="grid md:grid-cols-2 gap-6 animate-fade-up">
        <Card className="p-6 md:p-8 glass border-border/60">
          <Tabs value={mode} onValueChange={v => setMode(v as Mode)}>
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="url">URL</TabsTrigger>
              <TabsTrigger value="text">Text</TabsTrigger>
              <TabsTrigger value="wifi">WiFi</TabsTrigger>
            </TabsList>
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="phone">Phone</TabsTrigger>
              <TabsTrigger value="sms">SMS</TabsTrigger>
            </TabsList>
            <TabsContent value="url"><Label>URL</Label><Input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://..." /></TabsContent>
            <TabsContent value="text"><Label>Text</Label><Textarea value={text} onChange={e => setText(e.target.value)} placeholder="Any text..." className="min-h-24" /></TabsContent>
            <TabsContent value="email" className="space-y-3"><div><Label>Email</Label><Input value={email} onChange={e => setEmail(e.target.value)} placeholder="me@example.com" /></div><div><Label>Subject</Label><Input value={subject} onChange={e => setSubject(e.target.value)} /></div><div><Label>Body</Label><Textarea value={body} onChange={e => setBody(e.target.value)} /></div></TabsContent>
            <TabsContent value="phone"><Label>Phone</Label><Input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+1234567890" /></TabsContent>
            <TabsContent value="sms" className="space-y-3"><div><Label>Phone</Label><Input value={sms} onChange={e => setSms(e.target.value)} /></div><div><Label>Message</Label><Textarea value={smsBody} onChange={e => setSmsBody(e.target.value)} /></div></TabsContent>
            <TabsContent value="wifi" className="space-y-3">
              <div><Label>Network name (SSID)</Label><Input value={wifi.ssid} onChange={e => setWifi({ ...wifi, ssid: e.target.value })} /></div>
              <div><Label>Password</Label><Input value={wifi.password} onChange={e => setWifi({ ...wifi, password: e.target.value })} /></div>
              <div><Label>Encryption</Label>
                <div className="flex gap-2 mt-1">{(["WPA","WEP","nopass"] as const).map(e => <button key={e} onClick={() => setWifi({ ...wifi, enc: e })} className={`px-3 py-2 rounded-lg border text-sm ${wifi.enc === e ? "border-primary bg-primary/10" : "border-border bg-muted/30"}`}>{e}</button>)}</div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
        <Card className="p-6 md:p-8 glass border-border/60 flex flex-col items-center justify-center">
          {png ? (
            <>
              <div className="p-4 bg-white rounded-2xl shadow-[var(--shadow-elegant)] mb-6">
                <img src={png} alt="QR Code" className="w-64 h-64" />
              </div>
              <div className="flex gap-2 w-full">
                <Button onClick={downloadPng} className="flex-1"><Download className="mr-2 h-4 w-4" />PNG</Button>
                <Button onClick={downloadSvg} variant="outline" className="flex-1"><Download className="mr-2 h-4 w-4" />SVG</Button>
              </div>
            </>
          ) : (
            <div className="text-muted-foreground text-sm text-center py-20">Enter data to generate QR code</div>
          )}
        </Card>
      </div>
    </ToolShell>
  );
}