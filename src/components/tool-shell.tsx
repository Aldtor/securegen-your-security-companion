import type { ReactNode } from "react";

export function ToolShell({ title, description, icon, children }: { title: string; description: string; icon: ReactNode; children: ReactNode }) {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
      <div className="absolute inset-0 mesh-bg pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-[28rem] h-[28rem] rounded-full bg-primary/30 blur-3xl animate-float pointer-events-none" />
      <div className="absolute -top-20 right-0 w-[24rem] h-[24rem] rounded-full bg-accent/25 blur-3xl pointer-events-none" />
      <div className="container mx-auto px-4 py-16 max-w-5xl relative">
        <div className="text-center mb-12 animate-fade-up">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl text-primary-foreground shadow-[var(--shadow-elegant)] mb-5"
               style={{ background: "var(--gradient-primary)" }}>
            {icon}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            <span className="gradient-text">{title}</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{description}</p>
        </div>
        <div className="relative">{children}</div>
      </div>
    </div>
  );
}