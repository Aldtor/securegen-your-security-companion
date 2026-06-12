import type { ReactNode } from "react";

export function ToolShell({ title, description, icon, children }: { title: string; description: string; icon: ReactNode; children: ReactNode }) {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] mesh-bg">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="text-center mb-10 animate-fade-up">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-[var(--shadow-elegant)] mb-4">{icon}</div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">{title}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{description}</p>
        </div>
        {children}
      </div>
    </div>
  );
}