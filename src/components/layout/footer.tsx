import { Link } from "@tanstack/react-router";
import { Github, Twitter, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/40 mt-24">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <Link to="/" className="inline-block mb-4">
              <span className="font-display font-bold text-2xl tracking-tight">Secure<span className="gradient-text">Gen</span></span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm">A small set of browser-only security tools. Generate. Secure. Protect. Nothing leaves the tab.</p>
            <div className="flex gap-3 mt-4">
              <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-foreground"><Twitter className="h-5 w-5" /></a>
              <a href="#" aria-label="GitHub" className="text-muted-foreground hover:text-foreground"><Github className="h-5 w-5" /></a>
              <a href="#" aria-label="Email" className="text-muted-foreground hover:text-foreground"><Mail className="h-5 w-5" /></a>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-sm">Tools</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/password-generator" className="hover:text-foreground">Password Generator</Link></li>
              <li><Link to="/password-strength" className="hover:text-foreground">Strength Checker</Link></li>
              <li><Link to="/passphrase-generator" className="hover:text-foreground">Passphrase</Link></li>
              <li><Link to="/qr-generator" className="hover:text-foreground">QR Code</Link></li>
              <li><Link to="/hash-generator" className="hover:text-foreground">Hash</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-sm">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-foreground">About</Link></li>
              <li><Link to="/blog" className="hover:text-foreground">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-foreground">Privacy</Link></li>
              <li><Link to="/terms" className="hover:text-foreground">Terms</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border/40 text-sm text-muted-foreground flex flex-col md:flex-row justify-between gap-2">
          <p>&copy; {new Date().getFullYear()} SecureGen. All rights reserved.</p>
          <p>All tools run locally. We never see your data.</p>
        </div>
      </div>
    </footer>
  );
}