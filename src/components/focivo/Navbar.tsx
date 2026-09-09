import { useEffect, useState } from "react";
import { Menu, X, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/data/focivo-content";
import { scrollToId } from "@/lib/focivo-config";
import { CtaButton, Logo } from "./primitives";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "py-2.5" : "py-4",
      )}
    >
      <nav
        className={cn(
          "shell flex items-center justify-between rounded-full transition-all duration-500",
          scrolled
            ? "glass !max-w-5xl py-2.5 shadow-[var(--shadow-soft)]"
            : "border border-transparent py-2.5",
        )}
        aria-label="Primary"
      >
        <button
          onClick={() => go("top")}
          className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Focivo home"
        >
          <Logo />
        </button>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => go(link.id)}
                className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <CtaButton
            size="sm"
            className="hidden sm:inline-flex"
            magnetic
            onClick={() => go("download")}
          >
            <Download className="h-4 w-4" aria-hidden />
            Download APK
          </CtaButton>
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center rounded-full border border-border bg-white/70 text-foreground transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "shell overflow-hidden transition-all duration-500 lg:hidden",
          open ? "max-h-[28rem] opacity-100" : "pointer-events-none max-h-0 opacity-0",
        )}
      >
        <div className="glass mt-3 rounded-[1.75rem] p-3">
          <ul className="flex flex-col">
            {NAV_LINKS.map((link, i) => (
              <li key={link.id}>
                <button
                  onClick={() => go(link.id)}
                  style={{ transitionDelay: `${open ? i * 45 : 0}ms` }}
                  className={cn(
                    "w-full rounded-2xl px-4 py-3.5 text-left text-base font-medium transition-all duration-500 hover:bg-accent",
                    open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
                  )}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
          <CtaButton className="mt-2 w-full" size="md" onClick={() => go("download")}>
            <Download className="h-4 w-4" aria-hidden />
            Download APK
          </CtaButton>
        </div>
      </div>
    </header>
  );
}
