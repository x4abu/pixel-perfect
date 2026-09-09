import { useState } from "react";
import { ArrowRight, ChevronDown, Download, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { FAQS, INSTALL_STEPS, NAV_LINKS } from "@/data/focivo-content";
import {
  APP_TAGLINE,
  APP_VERSION,
  PRIVACY_POLICY_URL,
  SUPPORT_URL,
  TRUST_LINE,
  downloadApk,
  scrollToId,
} from "@/lib/focivo-config";
import { CtaButton, Eyebrow, Logo, Mascot, Reveal, SectionHeading } from "./primitives";

/* ---------------- 17. Download ---------------- */

export function DownloadSection() {
  return (
    <section id="download" className="section-pad relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="animate-aurora absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,var(--color-lime-tint),transparent_65%)]" />
      </div>

      <div className="shell">
        <div className="glass mx-auto max-w-3xl rounded-[2.5rem] p-10 text-center md:p-16">
          <Reveal>
            <Eyebrow>Download</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-6 text-3xl font-extrabold leading-tight sm:text-5xl">
              Ready to get your focus back?
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
              Download Focivo directly for Android and start your next deep-work session.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <CtaButton size="lg" magnetic onClick={downloadApk}>
                <Download className="h-4 w-4" aria-hidden />
                Download Focivo APK
              </CtaButton>
              <CtaButton size="lg" variant="outline" onClick={() => scrollToId("install")}>
                How to install
              </CtaButton>
            </div>
          </Reveal>
          <Reveal delay={260}>
            <p className="mt-6 text-sm text-muted-foreground">{TRUST_LINE}</p>
          </Reveal>
          <Reveal delay={300}>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground/80">
              Latest version — Focivo v{APP_VERSION}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- 18. Install guide ---------------- */

export function InstallGuideSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="install" className="section-pad">
      <div className="shell max-w-3xl">
        <SectionHeading
          eyebrow="Installation"
          title="Installing Focivo on Android"
          sub="Because Focivo is currently distributed directly as an APK rather than through Google Play, Android may show a security warning during installation."
        />

        <div className="mt-12 space-y-3">
          {INSTALL_STEPS.map((s, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={s.title} delay={i * 80}>
                <div className="surface-card overflow-hidden">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center gap-4 p-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent text-sm font-bold text-accent-foreground">
                      {i + 1}
                    </span>
                    <span className="flex-1 font-semibold">{s.title}</span>
                    <Plus
                      className={cn(
                        "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-500",
                        isOpen && "rotate-45",
                      )}
                      aria-hidden
                    />
                  </button>
                  <div
                    className={cn(
                      "grid transition-all duration-500 ease-[var(--ease-calm)]",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 pl-19 text-sm leading-relaxed text-muted-foreground">
                        {s.body}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- 19. FAQ ---------------- */

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="section-pad">
      <div className="shell max-w-3xl">
        <SectionHeading eyebrow="FAQ" title="Questions, answered honestly." />

        <div className="mt-12 divide-y divide-border border-y border-border">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span className="text-base font-semibold md:text-lg">{f.q}</span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-500",
                      isOpen && "rotate-180 text-primary",
                    )}
                    aria-hidden
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-500 ease-[var(--ease-calm)]",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pb-6 text-sm leading-relaxed text-muted-foreground">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- 20. Final CTA ---------------- */

export function FinalCta() {
  return (
    <section className="section-pad relative overflow-hidden bg-ink text-white">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="animate-aurora absolute bottom-[-30%] left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.795_0.201_130.5_/_0.2),transparent_65%)]" />
      </div>

      <div className="shell relative flex flex-col items-center text-center">
        <Reveal>
          <Mascot size="md" />
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mt-8 text-4xl font-extrabold leading-[1.05] sm:text-6xl">
            Less scrolling.
            <br />
            <span className="text-gradient-lime">More deep work.</span>
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-5 max-w-md text-base text-white/60">
            Build a study environment your future self will thank you for.
          </p>
        </Reveal>
        <Reveal delay={220}>
          <CtaButton size="lg" magnetic className="mt-9" onClick={downloadApk}>
            Download Focivo APK
            <ArrowRight className="h-4 w-4" aria-hidden />
          </CtaButton>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- 21. Footer ---------------- */

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-14">
      <div className="shell flex flex-col items-center gap-8 text-center md:flex-row md:items-start md:justify-between md:text-left">
        <div>
          <Logo />
          <p className="mt-3 text-sm text-muted-foreground">{APP_TAGLINE}</p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {NAV_LINKS.filter((l) => l.id !== "how-it-works").map((l) => (
            <button
              key={l.id}
              onClick={() => scrollToId(l.id)}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {l.label}
            </button>
          ))}
          <a
            href={PRIVACY_POLICY_URL}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Privacy Policy
          </a>
          <a
            href={SUPPORT_URL}
            className="text-sm font-semibold text-primary transition-colors hover:brightness-95"
          >
            Support Focivo
          </a>
        </nav>
      </div>

      <div className="shell mt-10 text-center text-xs text-muted-foreground md:text-left">
        © 2026 Focivo
      </div>
    </footer>
  );
}
