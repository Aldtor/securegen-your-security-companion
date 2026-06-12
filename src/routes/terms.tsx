import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service | SecureGen" },
      { name: "description", content: "Terms of service for using SecureGen's free security tools." },
      { property: "og:title", content: "Terms of Service | SecureGen" },
      { property: "og:description", content: "The terms that govern your use of SecureGen." },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: Terms,
});

function Terms() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-4xl md:text-5xl font-bold mb-2">Terms of Service</h1>
      <p className="text-sm text-muted-foreground mb-10">Last updated: June 12, 2026</p>
      <div className="space-y-6 text-foreground/90 leading-relaxed">
        <Section title="Acceptance">By using SecureGen you agree to these terms. If you do not agree, please do not use the site.</Section>
        <Section title="Use of the service">SecureGen tools are provided free of charge for personal and commercial use. You agree not to use the service for any unlawful purpose.</Section>
        <Section title="No warranty">The tools are provided &quot;as is&quot; without warranty of any kind. While we use cryptographically secure methods, you should follow defense-in-depth practices including 2FA and password managers.</Section>
        <Section title="Limitation of liability">SecureGen and its operators are not liable for any damages arising from the use or inability to use the service.</Section>
        <Section title="Changes">We may update these terms periodically. Continued use of the service after changes constitutes acceptance.</Section>
        <Section title="Contact">Questions about these terms? Email hello@securegen.app.</Section>
      </div>
    </div>
  );
}
function Section({ title, children }: { title: string; children: ReactNode }) {
  return <section><h2 className="text-xl font-semibold mb-2">{title}</h2><p className="text-muted-foreground">{children}</p></section>;
}