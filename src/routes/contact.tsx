import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare, Send } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact SecureGen" },
      { name: "description", content: "Get in touch with the SecureGen team. We'd love to hear from you." },
      { property: "og:title", content: "Contact SecureGen" },
      { property: "og:description", content: "Send us your questions, feedback, or tool requests." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <div className="mesh-bg min-h-[calc(100vh-4rem)]">
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <div className="text-center mb-10 animate-fade-up">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-[var(--shadow-elegant)] mb-4"><MessageSquare className="h-7 w-7" /></div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Get in touch</h1>
          <p className="text-lg text-muted-foreground">Questions, feedback, or feature requests — we read everything.</p>
        </div>
        <Card className="p-6 md:p-8 glass border-border/60">
          {sent ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mb-4"><Send className="h-7 w-7" /></div>
              <h2 className="text-xl font-semibold mb-2">Message sent</h2>
              <p className="text-muted-foreground">Thanks for reaching out. We'll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); toast.success("Message sent"); }} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div><Label htmlFor="name">Name</Label><Input id="name" required /></div>
                <div><Label htmlFor="email">Email</Label><Input id="email" type="email" required /></div>
              </div>
              <div><Label htmlFor="subject">Subject</Label><Input id="subject" required /></div>
              <div><Label htmlFor="message">Message</Label><Textarea id="message" rows={6} required /></div>
              <Button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground"><Send className="mr-2 h-4 w-4" />Send message</Button>
            </form>
          )}
        </Card>
        <div className="text-center mt-8 text-sm text-muted-foreground"><Mail className="h-4 w-4 inline mr-1" />hello@securegen.app</div>
      </div>
    </div>
  );
}