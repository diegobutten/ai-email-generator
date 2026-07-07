import Link from "next/link";
import { Mail, Github } from "lucide-react";

const footerLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Contact", href: "#" },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container flex flex-col items-center gap-6 py-10 sm:flex-row sm:justify-between">
        <Link href="/" className="flex items-center gap-2 font-display font-semibold">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-600 to-secondary-500 text-white">
            <Mail className="h-4 w-4" aria-hidden="true" />
          </span>
          <span>
            Mail<span className="text-gradient">craft</span>
          </span>
        </Link>

        <nav aria-label="Footer" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          {footerLinks.map((link) => (
            <a key={link.label} href={link.href} className="hover:text-foreground transition-colors">
              {link.label}
            </a>
          ))}
          <a
            href="#"
            aria-label="View source on GitHub"
            className="flex items-center gap-1.5 hover:text-foreground transition-colors"
          >
            <Github className="h-4 w-4" aria-hidden="true" />
            GitHub
          </a>
        </nav>

        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Mailcraft. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
