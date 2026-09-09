import { useState } from "react";
import { Timer, Shield, CalendarClock, Sparkles, Check, Lock, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  BLOCKED_APPS,
  CAPABILITIES,
  DEEP_WORK_POINTS,
  DISTRACTIONS,
  DURATIONS,
  SCHEDULE_BLOCKS,
} from "@/data/focivo-content";
import { AssetImage, PhoneFrame, Reveal, SectionHeading } from "./primitives";

/* ---------------- 3. Problem ---------------- */

export function ProblemSection() {
  return (
    <section className="section-pad">
      <div className="shell">
        <SectionHeading
          title={
            <>
              You planned to study for 2 hours.
              <br />
              <span className="text-muted-foreground">Your phone had other plans.</span>
            </>
          }
        />

        <ul className="mx-auto mt-14 grid max-w-4xl gap-4 sm:grid-cols-3">
          {DISTRACTIONS.map((d, i) => (
            <Reveal as="li" key={d.app} delay={i * 90}>
              <div className="glass h-full rounded-[1.75rem] p-6 transition-transform duration-500 hover:-translate-y-1">
                <p className="text-sm font-semibold text-foreground">{d.app}</p>
                <p className="mt-2 text-lg font-medium text-muted-foreground">“{d.line}”</p>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={280}>
          <p className="mt-14 text-center text-xl font-bold md:text-2xl">
            Focivo is built to <span className="text-gradient-lime">break that loop.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- 4. Product intro ---------------- */

const ICONS = { timer: Timer, shield: Shield, calendar: CalendarClock, sparkles: Sparkles };

export function ProductIntro() {
  return (
    <section id="features" className="section-pad bg-[linear-gradient(180deg,transparent,white,transparent)]">
      <div className="shell">
        <SectionHeading
          eyebrow="The system"
          title="One focus system. Built around the way you actually study."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CAPABILITIES.map((c, i) => {
            const Icon = ICONS[c.icon];
            return (
              <Reveal key={c.title} delay={i * 80}>
                <article className="glass group h-full rounded-[1.75rem] p-7 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)]">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent text-primary transition-transform duration-500 group-hover:scale-110">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-lg font-bold">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- 5. Deep work ---------------- */

export function DeepWorkSection() {
  const [active, setActive] = useState(2);
  const current = DURATIONS[active] ?? DURATIONS[0]!;
  const circumference = 2 * Math.PI * 86;
  const progress = 0.28;

  return (
    <section className="section-pad">
      <div className="shell grid items-center gap-14 lg:grid-cols-2">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Deep work"
            title="Start a session. Get into the flow."
            sub="Pick a length, name the subject, and let the timer hold the line for you."
          />

          <Reveal delay={140}>
            <div
              className="mt-8 inline-flex rounded-full bg-secondary p-1"
              role="tablist"
              aria-label="Session duration"
            >
              {DURATIONS.map((d, i) => (
                <button
                  key={d.id}
                  role="tab"
                  aria-selected={i === active}
                  onClick={() => setActive(i)}
                  className={cn(
                    "rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    i === active
                      ? "bg-white text-foreground shadow-[var(--shadow-soft)]"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </Reveal>

          <ul className="mt-8 space-y-3">
            {DEEP_WORK_POINTS.map((p, i) => (
              <Reveal as="li" key={p} delay={180 + i * 70}>
                <span className="flex items-start gap-3 text-sm text-muted-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                  {p}
                </span>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal delay={120}>
          <div className="relative mx-auto flex w-full max-w-md flex-col items-center">
            <div className="surface-card w-full p-8">
              <p className="text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {current.name}
              </p>

              <div className="relative mx-auto mt-6 h-56 w-56">
                <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90">
                  <circle cx="100" cy="100" r="86" fill="none" stroke="var(--color-border)" strokeWidth="10" />
                  <circle
                    cx="100"
                    cy="100"
                    r="86"
                    fill="none"
                    stroke="var(--color-lime)"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference * (1 - progress)}
                    style={{ transition: "stroke-dashoffset 900ms var(--ease-calm)" }}
                  />
                </svg>
                <div className="absolute inset-0 grid place-content-center text-center">
                  <p
                    key={current.id}
                    className="text-4xl font-extrabold tabular-nums duration-500 animate-in fade-in slide-in-from-bottom-1"
                  >
                    {String(current.minutes).padStart(2, "0")}:00
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{current.subject}</p>
                </div>
              </div>

              <p className="mt-6 text-center text-xs text-muted-foreground">
                Preview only — the real timer lives in the app.
              </p>
            </div>

            <div className="mt-6 w-40">
              <PhoneFrame asset="focus-timer-screen.png" alt="Focivo focus timer screen" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- 6. Focus shield ---------------- */

export function FocusShieldSection() {
  const [on, setOn] = useState(true);

  return (
    <section className="section-pad">
      <div className="shell grid items-center gap-14 lg:grid-cols-2">
        <Reveal className="order-2 lg:order-1">
          <div className="mx-auto w-full max-w-[19rem]">
            <PhoneFrame asset="focus-shield-screen.png" alt="Focivo Focus Shield screen" />
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <SectionHeading
            align="left"
            eyebrow="Focus shield"
            title="Make distractions harder to reach."
            sub="One master switch blocks the apps that pull you away, with support for 100+ apps and timed app-locks."
          />

          <Reveal delay={140}>
            <div className="surface-card mt-8 p-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "grid h-11 w-11 place-items-center rounded-2xl transition-colors duration-500",
                      on ? "bg-accent text-primary" : "bg-secondary text-muted-foreground",
                    )}
                  >
                    <ShieldCheck className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <p className="font-semibold">Focus Shield</p>
                    <p className="text-xs text-muted-foreground">
                      {on ? "Blocking 7 apps" : "Not blocking anything"}
                    </p>
                  </div>
                </div>

                <button
                  role="switch"
                  aria-checked={on}
                  aria-label="Toggle Focus Shield demo"
                  onClick={() => setOn((v) => !v)}
                  className={cn(
                    "relative h-8 w-14 rounded-full transition-colors duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    on ? "bg-primary" : "bg-border",
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-1 h-6 w-6 rounded-full bg-white shadow transition-all duration-500",
                      on ? "left-7" : "left-1",
                    )}
                  />
                </button>
              </div>

              <ul className="mt-6 flex flex-wrap gap-2">
                {BLOCKED_APPS.map((app) => (
                  <li
                    key={app}
                    className={cn(
                      "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-500",
                      on
                        ? "bg-accent text-accent-foreground"
                        : "bg-secondary text-muted-foreground opacity-60",
                    )}
                  >
                    <Lock className={cn("h-3 w-3", on ? "opacity-100" : "opacity-40")} aria-hidden />
                    {app}
                  </li>
                ))}
              </ul>

              <p className="mt-5 text-xs text-muted-foreground">
                Interactive demo. Nothing on your device is affected.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- 7. Auto study schedule ---------------- */

export function ScheduleSection() {
  return (
    <section className="section-pad">
      <div className="shell grid items-center gap-14 lg:grid-cols-2">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Auto schedule"
            title="Stop relying on willpower."
            sub="Set your study hours once. Focivo protects them every day."
          />

          <Reveal delay={160}>
            <div className="surface-card mt-8 p-6">
              <p className="text-sm font-semibold">Strict Mode</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Uses Device Admin permission to make active study sessions harder to bypass or
                uninstall.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="space-y-4">
          {SCHEDULE_BLOCKS.map((b, i) => (
            <Reveal key={b.title} delay={i * 100}>
              <div
                className={cn(
                  "glass flex items-center justify-between rounded-[1.75rem] p-6 transition-transform duration-500 hover:-translate-y-1",
                  b.kind === "study" ? "border-l-4 !border-l-primary" : "",
                )}
              >
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    {b.title}
                  </p>
                  <p className="mt-1.5 text-lg font-bold">{b.time}</p>
                </div>
                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-[11px] font-semibold",
                    b.kind === "study"
                      ? "bg-accent text-accent-foreground"
                      : "bg-secondary text-muted-foreground",
                  )}
                >
                  {b.kind === "study" ? "Protected" : "Break"}
                </span>
              </div>
            </Reveal>
          ))}

          <Reveal delay={320}>
            <div className="surface-card overflow-hidden p-2">
              <AssetImage
                asset="schedule-screen.png"
                alt="Focivo study schedule screen"
                ratio="16 / 10"
                rounded="rounded-[1.5rem]"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
