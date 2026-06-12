import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | SecureGen" },
      { name: "description", content: "SecureGen privacy policy. We don't collect, store, or transmit your data." },
      { property: "og:title", content: "Privacy Policy | SecureGen" },
      { property: "og:description", content: "How SecureGen handles (or doesn't handle) your data." },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-4xl md:text-5xl font-bold mb-2">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground mb-10">Last updated: June 12, 2026</p>
      <div className="space-y-6 text-foreground/90 leading-relaxed">
        <Section title="Summary">SecureGen runs entirely in your browser. We never see, store, or transmit the passwords, text, or other inputs you provide to our tools.</Section>
        <Section title="What we don't collect">We do not collect personal information through our security tools. Passwords you generate, text you hash, and QR codes you create are processed locally and never sent to our servers.</Section>
        <Section title="Analytics">We may use privacy-respecting, aggregate analytics (such as page view counts) to understand which tools are most useful. These analytics never include the content you enter into any tool.</Section>
        <Section title="Cookies">SecureGen uses only essential storage required for the site to function — for example, remembering your theme preference. We do not use tracking cookies.</Section>
        <Section title="Third-party services">When you click outbound links to recommended tools or sponsors, those services have their own privacy policies that govern your interaction with them.</Section>
        <Section title="Children">SecureGen is suitable for all ages and does not knowingly collect data from children.</Section>
        <Section title="Contact">For privacy questions, contact us at hello@securegen.app.</Section>
      </div>
    </div>
  );
}
function Section({ title, children }: { title: string; children: ReactNode }) {
  return <section><h2 className="text-xl font-semibold mb-2">{title}</h2><p className="text-muted-foreground">{children}</p></section>;
}