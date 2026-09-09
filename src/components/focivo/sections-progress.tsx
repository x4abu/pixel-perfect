import { useState } from "react";
import { Trophy, Clock3 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ACHIEVEMENTS,
  INSIGHT_CHART,
  ONBOARDING_QUESTIONS,
  STATS,
} from "@/data/focivo-content";
import { AssetImage, Counter, Mascot, PhoneFrame, Reveal, SectionHeading, useInView } from "./primitives";

/* ---------------- 10. Gamification ---------------- */

export function GamificationSection() {
  return (
    <section className="section-pad">
      <div className="shell">
        <SectionHeading
          eyebrow="Progress"
          title="Make your focus visible."
          sub="Streaks, XP and achievements that reward the hours you actually put in."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 70}>
              <div className="glass h-full rounded-[1.5rem] p-6 text-center transition-transform duration-500 hover:-translate-y-1">
                <p className="text-3xl font-extrabold tabular-nums">
                  {s.emoji ? `${s.emoji} ` : ""}
                  <Counter to={s.value} />
                  {s.suffix}
                </p>
                <p className="mt-2 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ACHIEVEMENTS.map((a, i) => (
            <Reveal key={a.name} delay={i * 60}>
              <div className="surface-card group flex items-center gap-4 p-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-accent text-primary transition-transform duration-500 group-hover:rotate-6">
                  <Trophy className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="font-semibold">{a.name}</p>
                  <p className="text-xs text-muted-foreground">{a.detail}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="surface-card mx-auto mt-6 max-w-md overflow-hidden p-2">
            <AssetImage
              asset="achievements-screen.png"
              alt="Focivo achievements screen"
              ratio="16 / 10"
              rounded="rounded-[1.5rem]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- 11. Mascot ---------------- */

export function MascotSection() {
  return (
    <section className="section-pad overflow-hidden bg-[linear-gradient(180deg,transparent,var(--color-lime-tint),transparent)]">
      <div className="shell grid items-center gap-14 lg:grid-cols-2">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Your companion"
            title="Your study buddy grows with you."
            sub="The more you focus, the more your Focivo companion grows with you."
          />
        </div>

        <Reveal delay={120}>
          <div className="relative flex flex-col items-center gap-8">
            <Mascot size="lg" />
            <div className="surface-card w-full overflow-hidden p-2">
              <AssetImage
                asset="mascot-growth.png"
                alt="Focivo mascot growth stages"
                ratio="16 / 9"
                rounded="rounded-[1.5rem]"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- 12. Insights ---------------- */

export function InsightsSection() {
  const { ref, inView } = useInView<HTMLDivElement>(0.35);

  const cards = [
    { label: "Total Flow Time", value: "12h 45m" },
    { label: "Sessions", value: "18" },
    { label: "Completion", value: "86%" },
    { label: "Streak", value: "7 days" },
  ];

  return (
    <section className="section-pad">
      <div className="shell">
        <SectionHeading
          eyebrow="Insights"
          title="Understand when you focus best."
          sub="Focivo turns your sessions into a simple picture of your study day."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-4 sm:grid-cols-2">
            {cards.map((c, i) => (
              <Reveal key={c.label} delay={i * 70}>
                <div className="glass h-full rounded-[1.5rem] p-6">
                  <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                    {c.label}
                  </p>
                  <p className="mt-2 text-2xl font-extrabold">{c.value}</p>
                </div>
              </Reveal>
            ))}

            <Reveal delay={280} className="sm:col-span-2">
              <div className="surface-card flex items-center gap-4 p-6">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent text-primary">
                  <Clock3 className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                    Peak Flow Window
                  </p>
                  <p className="mt-1 text-xl font-extrabold">6:15 PM — 8:10 PM</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={340} className="sm:col-span-2">
              <div ref={ref} className="surface-card p-6">
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                  Focus by time of day
                </p>
                <ul className="mt-5 space-y-4">
                  {INSIGHT_CHART.map((row, i) => (
                    <li key={row.part}>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{row.part}</span>
                        <span className="tabular-nums text-muted-foreground">{row.value}%</span>
                      </div>
                      <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-secondary">
                        <div
                          className="h-full rounded-full bg-[linear-gradient(90deg,var(--color-lime-deep),var(--color-lime))]"
                          style={{
                            width: inView ? `${row.value}%` : "0%",
                            transition: `width 1.2s var(--ease-calm) ${i * 140}ms`,
                          }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal delay={160}>
            <div className="mx-auto w-full max-w-[18rem]">
              <PhoneFrame asset="insights-screen.png" alt="Focivo insights screen" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- 13. Personalized onboarding ---------------- */

export function OnboardingSection() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const done = step >= ONBOARDING_QUESTIONS.length;
  const q = ONBOARDING_QUESTIONS[step];

  const pick = (option: string) => {
    setAnswers((prev) => [...prev.slice(0, step), option]);
    setStep(step + 1);
  };

  const reset = () => {
    setStep(0);
    setAnswers([]);
  };

  return (
    <section className="section-pad">
      <div className="shell grid items-center gap-14 lg:grid-cols-2">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Onboarding"
            title="Focivo adapts to the student, not the other way around."
            sub="Setup can take into account your class or education level, board exam year, study goals, biggest distractions, preferred study times and motivation style."
          />

          <Reveal delay={160}>
            <div className="mt-8 w-full max-w-[16rem]">
              <PhoneFrame asset="onboarding-screen.png" alt="Focivo onboarding screen" />
            </div>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className="surface-card p-7">
            <div className="flex items-center gap-2">
              {ONBOARDING_QUESTIONS.map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "h-1.5 flex-1 rounded-full transition-colors duration-500",
                    i < step ? "bg-primary" : "bg-secondary",
                  )}
                />
              ))}
            </div>

            {!done && q ? (
              <div key={step} className="mt-7 duration-500 animate-in fade-in slide-in-from-bottom-2">
                <p className="text-lg font-bold">{q.question}</p>
                <div className="mt-5 grid gap-2.5">
                  {q.options.map((o) => (
                    <button
                      key={o}
                      onClick={() => pick(o)}
                      className="rounded-2xl border border-border bg-white/70 px-5 py-3.5 text-left text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:bg-accent active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {o}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mt-7 duration-500 animate-in fade-in slide-in-from-bottom-2">
                <p className="text-lg font-bold">Your study setup is ready.</p>
                <ul className="mt-4 space-y-2">
                  {answers.map((a) => (
                    <li
                      key={a}
                      className="rounded-2xl bg-accent px-4 py-3 text-sm font-medium text-accent-foreground"
                    >
                      {a}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={reset}
                  className="mt-5 text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Try the preview again
                </button>
              </div>
            )}

            <p className="mt-6 text-xs text-muted-foreground">
              Preview only — nothing is saved here.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
