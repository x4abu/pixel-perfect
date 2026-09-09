import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Lock, ShieldAlert, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { GUARD_FLOW_ALLOWED, GUARD_FLOW_BLOCKED, SHOWCASE_SCREENS } from "@/data/focivo-content";
import { AssetImage, PhoneFrame, Reveal, SectionHeading } from "./primitives";

/* ---------------- 8. AI Study Guard ---------------- */

function FlowList({ steps, tone }: { steps: readonly string[]; tone: "ok" | "warn" }) {
  return (
    <ol className="space-y-3">
      {steps.map((s, i) => (
        <Reveal as="li" key={s} delay={i * 90}>
          <div
            className={cn(
              "glass-dark flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm",
              tone === "ok" ? "text-white/85" : "text-white/70",
            )}
          >
            <span
              className={cn(
                "grid h-6 w-6 shrink-0 place-items-center rounded-full text-[11px] font-bold",
                tone === "ok" ? "bg-primary text-primary-foreground" : "bg-white/10 text-white/70",
              )}
            >
              {i + 1}
            </span>
            {s}
          </div>
        </Reveal>
      ))}
    </ol>
  );
}

export function AiStudyGuardSection() {
  const [open, setOpen] = useState(false);

  return (
    <section id="ai-study-guard" className="section-pad relative overflow-hidden bg-ink text-white">
      <div className="pointer-events-none absolute inset-0 -z-0" aria-hidden>
        <div className="animate-aurora absolute left-1/4 top-0 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,oklch(0.795_0.201_130.5_/_0.16),transparent_65%)]" />
      </div>

      <div className="shell relative">
        <SectionHeading
          dark
          eyebrow="AI Study Guard"
          title={
            <>
              Need AI for studying?
              <br />
              <span className="text-white/55">You don&apos;t have to leave your focus session.</span>
            </>
          }
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_0.8fr_1fr] lg:items-start">
          <div>
            <p className="mb-4 flex items-center gap-2 text-sm font-semibold text-primary">
              <Sparkles className="h-4 w-4" aria-hidden /> Study-related
            </p>
            <FlowList steps={GUARD_FLOW_ALLOWED} tone="ok" />
          </div>

          <Reveal delay={120}>
            <div className="mx-auto w-full max-w-[16rem]">
              <PhoneFrame asset="ai-study-guard-screen.png" alt="Focivo AI Study Guard screen" dark />
            </div>
          </Reveal>

          <div>
            <p className="mb-4 flex items-center gap-2 text-sm font-semibold text-white/60">
              <ShieldAlert className="h-4 w-4" aria-hidden /> Not study-related
            </p>
            <FlowList steps={GUARD_FLOW_BLOCKED} tone="warn" />
          </div>
        </div>

        <Reveal delay={160}>
          <div className="glass-dark mx-auto mt-14 max-w-3xl rounded-[1.75rem] p-6 text-center">
            <p className="flex items-center justify-center gap-2 text-sm font-semibold text-white">
              <Lock className="h-4 w-4 text-primary" aria-hidden />
              AI Study Guard processing happens on-device. Conversations are not sent to Focivo
              servers.
            </p>

            <button
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              className="mx-auto mt-4 flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              How it works
              <ChevronDown
                className={cn("h-3.5 w-3.5 transition-transform duration-500", open && "rotate-180")}
                aria-hidden
              />
            </button>

            <div
              className={cn(
                "grid text-left transition-all duration-600 ease-[var(--ease-calm)]",
                open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="pt-4 text-sm leading-relaxed text-white/60">
                  With your permission, Focivo uses Android&apos;s Accessibility Service to read the
                  on-screen text of supported AI apps during an active study session, so it can
                  judge whether the conversation is study-related. That check runs on your device.
                  If a conversation isn&apos;t study-related you get one warning; if it continues,
                  that app is locked for 3 hours. The permission can be turned off at any time in
                  Android settings, which disables AI Study Guard.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- 9. Screenshot showcase ---------------- */

export function ShowcaseSection() {
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; active: boolean }>({ x: 0, active: false });
  const total = SHOWCASE_SCREENS.length;

  const go = (n: number) => setIndex(Math.max(0, Math.min(total - 1, n)));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!trackRef.current?.contains(document.activeElement)) return;
      if (e.key === "ArrowRight") go(index + 1);
      if (e.key === "ArrowLeft") go(index - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <section className="section-pad overflow-hidden">
      <div className="shell">
        <SectionHeading eyebrow="Screens" title="See Focivo in action." />
      </div>

      <div
        ref={trackRef}
        tabIndex={0}
        role="region"
        aria-label="Focivo app screenshots"
        className="mt-14 select-none outline-none"
        onPointerDown={(e) => {
          drag.current = { x: e.clientX, active: true };
        }}
        onPointerUp={(e) => {
          if (!drag.current.active) return;
          const dx = e.clientX - drag.current.x;
          if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
          drag.current.active = false;
        }}
        onPointerLeave={() => {
          drag.current.active = false;
        }}
      >
        <div
          className="flex items-center gap-6 px-[calc(50%-6.5rem)] transition-transform duration-700 ease-[var(--ease-calm)] md:gap-10 md:px-[calc(50%-8rem)]"
          style={{ transform: `translate3d(calc(${-index} * (13rem + 1.5rem)), 0, 0)` }}
        >
          {SHOWCASE_SCREENS.map((s, i) => (
            <div
              key={s.asset}
              className={cn(
                "w-52 shrink-0 transition-all duration-700 ease-[var(--ease-calm)] md:w-52",
                i === index ? "scale-110 opacity-100" : "scale-95 opacity-45",
              )}
              aria-hidden={i !== index}
            >
              <PhoneFrame asset={s.asset} alt={`Focivo ${s.title} screen`} />
              <div className="mt-5 text-center">
                <p className="text-sm font-bold">{s.title}</p>
                <p className="text-xs text-muted-foreground">{s.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="shell mt-10 flex items-center justify-center gap-4">
        <button
          onClick={() => go(index - 1)}
          disabled={index === 0}
          aria-label="Previous screenshot"
          className="grid h-11 w-11 place-items-center rounded-full border border-border bg-white/70 transition-all hover:-translate-y-0.5 hover:bg-white disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden />
        </button>

        <div className="flex items-center gap-2">
          {SHOWCASE_SCREENS.map((s, i) => (
            <button
              key={s.asset}
              onClick={() => go(i)}
              aria-label={`Go to ${s.title} screenshot`}
              aria-current={i === index}
              className={cn(
                "h-2 rounded-full transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                i === index ? "w-7 bg-primary" : "w-2 bg-border hover:bg-muted-foreground/40",
              )}
            />
          ))}
        </div>

        <button
          onClick={() => go(index + 1)}
          disabled={index === total - 1}
          aria-label="Next screenshot"
          className="grid h-11 w-11 place-items-center rounded-full border border-border bg-white/70 transition-all hover:-translate-y-0.5 hover:bg-white disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ChevronRight className="h-5 w-5" aria-hidden />
        </button>
      </div>

      <p className="mt-5 text-center text-xs text-muted-foreground">Drag or swipe to explore</p>

      <div className="sr-only">
        <AssetImage asset="app-icon.png" alt="Focivo app icon" ratio="1 / 1" />
      </div>
    </section>
  );
}
