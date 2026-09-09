import { useEffect, useState } from "react";
import { ArrowRight, Play } from "lucide-react";
import { TRUST_LINE, downloadApk, scrollToId } from "@/lib/focivo-config";
import { CtaButton, Eyebrow, Mascot, PhoneFrame, Reveal, prefersReducedMotion } from "./primitives";

function useParallax() {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setOffset(Math.min(window.scrollY, 700)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return offset;
}

function FloatingCard({
  className,
  title,
  value,
  delay = 0,
}: {
  className?: string;
  title: string;
  value: string;
  delay?: number;
}) {
  return (
    <div
      className={`glass animate-drift absolute rounded-2xl px-4 py-3 ${className ?? ""}`}
      style={{ animationDelay: `${delay}ms` }}
      aria-hidden
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {title}
      </p>
      <p className="text-lg font-extrabold leading-tight text-foreground">{value}</p>
    </div>
  );
}

export function Hero() {
  const offset = useParallax();

  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-32 md:pb-28 md:pt-40">
      {/* soft moving lime aurora */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="animate-aurora absolute -left-24 top-[-10%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,var(--color-lime-tint),transparent_65%)]" />
        <div
          className="animate-aurora absolute right-[-12%] top-[12%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,oklch(0.9_0.11_128_/_0.5),transparent_65%)]"
          style={{ animationDelay: "-6s" }}
        />
        <div className="absolute inset-x-0 top-0 h-[70vh] bg-[linear-gradient(180deg,white,transparent)]" />
      </div>

      <div className="shell grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <Reveal>
            <Eyebrow>Focus better. Study deeper.</Eyebrow>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 max-w-xl text-[2.55rem] font-extrabold leading-[1.03] tracking-tight sm:text-6xl">
              Your phone shouldn&apos;t decide when you study.
            </h1>
          </Reveal>

          <Reveal delay={150}>
            <p className="mt-5 max-w-md text-lg font-semibold text-gradient-lime">
              Less scrolling. More deep work.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground md:text-[1.05rem]">
              Focivo turns your Android phone into a distraction-controlled study environment with
              deep work sessions, app blocking, automatic study schedules, and an AI Study Guard.
            </p>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
              <CtaButton size="lg" magnetic onClick={downloadApk}>
                Download Focivo APK
                <ArrowRight className="h-4 w-4" aria-hidden />
              </CtaButton>
              <CtaButton size="lg" variant="outline" onClick={() => scrollToId("how-it-works")}>
                <Play className="h-4 w-4" aria-hidden />
                See how it works
              </CtaButton>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <p className="mt-6 text-sm text-muted-foreground">{TRUST_LINE}</p>
          </Reveal>
        </div>

        {/* Phone + floating UI */}
        <Reveal delay={200} className="relative mx-auto w-full max-w-[22rem] lg:max-w-[24rem]">
          <div
            className="relative"
            style={{ transform: `translate3d(0, ${offset * -0.05}px, 0)` }}
          >
            <div className="animate-float">
              <PhoneFrame asset="hero-app-screen.png" alt="Focivo focus session on Android" />
            </div>

            <FloatingCard
              className="-left-6 top-16 sm:-left-10"
              title="Deep Study"
              value="50:00"
            />
            <FloatingCard
              className="-right-4 top-1/3 sm:-right-8"
              title="Focus Shield"
              value="ON"
              delay={-2500}
            />
            <FloatingCard
              className="-left-2 bottom-16 sm:-left-6"
              title="Streak"
              value="🔥 7 days"
              delay={-4500}
            />

            <Mascot className="absolute -bottom-6 -right-2 sm:-right-8" size="md" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
