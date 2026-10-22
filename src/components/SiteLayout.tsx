import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { contact, logoUrl } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen">
      <header className="fixed inset-x-0 top-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link to="/" className="flex shrink-0 items-center gap-3 md:gap-4" aria-label="AfriMce home">
            <img src={logoUrl} alt="AfriMce logo" className="h-16 w-16 object-contain md:h-20 md:w-20" />
            <span className="font-display text-3xl font-semibold text-primary md:text-4xl">AFRIMCE</span>
          </Link>
          <nav className="hidden gap-8 md:flex">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }}
                className="text-xs uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-gold"
                activeProps={{ className: "text-gold" }}>
                {n.label}
              </Link>
            ))}
          </nav>
          <Button variant="ghost" size="icon" className="shrink-0 md:hidden" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
            {open ? <X /> : <Menu />}
          </Button>
        </div>
        {open && (
          <nav className="flex flex-col gap-5 border-t px-6 py-6 md:hidden">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)}
                className="font-display text-2xl text-foreground">{n.label}</Link>
            ))}
          </nav>
        )}
      </header>
      <main>{children}</main>
      <footer className="border-t bg-secondary">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-3">
          <div>
            <Link to="/" className="flex items-center gap-4"><img src={logoUrl} alt="AfriMce logo" className="h-20 w-20 object-contain" /><span className="font-display text-4xl font-semibold text-primary">AFRIMCE</span></Link>
            <p className="mt-3 text-sm text-muted-foreground">Luxury interiors, kitchens, wardrobes, vanities & TV stands — crafted in Mokopane.</p>
          </div>
          <div className="space-y-2 text-sm">
            <p className="eyebrow mb-4">Contact</p>
            <a href={contact.phoneHref} className="block hover:text-gold">{contact.phone}</a>
            <a href={contact.additionalPhoneHref} className="block hover:text-gold">{contact.additionalPhone}</a>
            <a href={`mailto:${contact.email}`} className="block hover:text-gold">{contact.email}</a>
            <p className="text-muted-foreground">{contact.location}</p>
          </div>
          <div className="space-y-2 text-sm">
            <p className="eyebrow mb-4">Explore</p>
            {nav.map((n) => <Link key={n.to} to={n.to} className="block hover:text-gold">{n.label}</Link>)}
          </div>
        </div>
        <p className="border-t py-6 text-center text-xs tracking-widest text-muted-foreground">© {new Date().getFullYear()} AFRIMCE (PTY) LTD</p>
      </footer>
    </div>
  );
}

export function PageHeader({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <section className="mx-auto max-w-4xl px-6 pb-12 pt-40 text-center">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-5 text-5xl leading-tight md:text-7xl">{title}</h1>
      <div className="mx-auto mt-6 h-px w-24 bg-gold" />
      {text && <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">{text}</p>}
    </section>
  );
}
