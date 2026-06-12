import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { POSTS, CATEGORIES } from "@/lib/blog-data";
import { BookOpen, ArrowRight, Calendar, Clock } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Security Blog | SecureGen" },
      { name: "description", content: "Articles on password security, cybersecurity, privacy and online safety." },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const [cat, setCat] = useState<string | null>(null);
  const filtered = cat ? POSTS.filter(p => p.category === cat) : POSTS;
  return (
    <div className="mesh-bg min-h-[calc(100vh-4rem)]">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="text-center mb-12 animate-fade-up">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-[var(--shadow-elegant)] mb-4"><BookOpen className="h-7 w-7" /></div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Security Blog</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Practical guides on passwords, privacy, and staying safe online.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button onClick={() => setCat(null)} className={`px-4 py-1.5 rounded-full text-sm border transition ${cat === null ? "border-primary bg-primary/10 text-primary" : "border-border bg-muted/30 text-muted-foreground hover:text-foreground"}`}>All</button>
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCat(c)} className={`px-4 py-1.5 rounded-full text-sm border transition ${cat === c ? "border-primary bg-primary/10 text-primary" : "border-border bg-muted/30 text-muted-foreground hover:text-foreground"}`}>{c}</button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(p => (
            <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="group">
              <Card className="p-6 h-full glass border-border/60 hover:border-primary/60 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]">
                <div className="text-xs text-accent font-medium mb-2">{p.category}</div>
                <h2 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">{p.title}</h2>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{p.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{p.date}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{p.readTime}</span>
                </div>
                <div className="mt-4 flex items-center text-sm text-primary font-medium">Read article <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" /></div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}