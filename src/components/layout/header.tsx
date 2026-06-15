import { Link } from "@tanstack/react-router";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useState } from "react";
import { useTheme } from "./theme-provider";
import { Button } from "@/components/ui/button";

const TOOLS = [
  { to: "/password-generator", label: "Password Generator" },
  { to: "/password-strength", label: "Strength Checker" },
  { to: "/username-generator", label: "Username Generator" },
  { to: "/passphrase-generator", label: "Passphrase Generator" },
  { to: "/uuid-generator", label: "UUID Generator" },
  { to: "/qr-generator", label: "QR Code Generator" },
  { to: "/hash-generator", label: "Hash Generator" },
] as const;

export function Header() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full glass-nav">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 max-w-7xl">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="font-display font-bold text-2xl tracking-tight">Secure<span className="gradient-text">Gen</span></span>
          </Link>
        <nav className="hidden md:flex items-center gap-1">
          <Link to="/" className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Home</Link>
          <div className="relative" onMouseEnter={() => setToolsOpen(true)} onMouseLeave={() => setToolsOpen(false)}>
            <button className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Tools</button>
            {toolsOpen && (
              <div className="absolute top-full left-0 pt-2 w-64">
                <div className="glass rounded-xl p-2 shadow-xl border border-border/60">
                  {TOOLS.map(t => (
                    <Link key={t.to} to={t.to} className="block px-3 py-2 text-sm rounded-lg hover:bg-accent/10 hover:text-accent-foreground transition">{t.label}</Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          <Link to="/blog" className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Blog</Link>
          <Link to="/about" className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">About</Link>
          <Link to="/contact" className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Link to="/password-generator" className="hidden md:inline-flex">
            <Button className="rounded-xl h-9 px-4 text-sm shadow-md" style={{ background: "var(--gradient-primary)" }}>Generate →</Button>
          </Link>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-border/40 glass">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-1 max-w-7xl">
            <Link to="/" onClick={() => setOpen(false)} className="px-3 py-2 text-sm rounded-lg hover:bg-accent/10">Home</Link>
            {TOOLS.map(t => (
              <Link key={t.to} to={t.to} onClick={() => setOpen(false)} className="px-3 py-2 text-sm rounded-lg hover:bg-accent/10">{t.label}</Link>
            ))}
            <Link to="/blog" onClick={() => setOpen(false)} className="px-3 py-2 text-sm rounded-lg hover:bg-accent/10">Blog</Link>
            <Link to="/about" onClick={() => setOpen(false)} className="px-3 py-2 text-sm rounded-lg hover:bg-accent/10">About</Link>
            <Link to="/contact" onClick={() => setOpen(false)} className="px-3 py-2 text-sm rounded-lg hover:bg-accent/10">Contact</Link>
          </nav>
        </div>
      )}
    </header>
  );
}