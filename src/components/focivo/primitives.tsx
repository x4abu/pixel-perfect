import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { getAsset, type AssetKey } from "@/lib/focivo-assets";

/* ------------------------------------------------------------------ */
/* Scroll reveal                                                       */
/* ------------------------------------------------------------------ */

export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "header" | "article";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    // @ts-expect-error -- polymorphic tag with a shared ref type
    <Tag
      ref={ref}
      className={cn("reveal", visible && "is-visible", className)}
      style={{ ["--reveal-delay" as string]: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

export function useInView<T extends HTMLElement>(threshold = 0.4) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        }
      },
      { threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* ------------------------------------------------------------------ */
/* Buttons                                                             */
/* ------------------------------------------------------------------ */

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 " +
  "focus-visible:ring-offset-background active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60";

const buttonVariants = {
  primary:
    "bg-primary text-primary-foreground shadow-[var(--shadow-glow)] hover:-translate-y-0.5 hover:brightness-105",
  ghost: "text-foreground/80 hover:text-foreground hover:bg-accent",
  outline: "border border-border bg-white/70 text-foreground hover:-translate-y-0.5 hover:bg-white",
  dark: "bg-ink text-white hover:-translate-y-0.5 hover:bg-ink-soft",
  light:
    "bg-white/10 text-white border border-white/20 backdrop-blur-md hover:bg-white/20 hover:-translate-y-0.5",
} as const;

const buttonSizes = {
  sm: "h-10 px-5 text-sm",
  md: "h-12 px-6 text-sm md:text-base",
  lg: "h-14 px-8 text-base",
} as const;

export function CtaButton({
  variant = "primary",
  size = "md",
  className,
  magnetic = false,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  magnetic?: boolean;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  function onMove(e: React.MouseEvent<HTMLButtonElement>) {
    if (!magnetic || !ref.current || prefersReducedMotion()) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 6;
    const y = (e.clientY - rect.top - rect.height / 2) / 6;
    ref.current.style.transform = `translate(${x}px, ${y}px)`;
  }

  function onLeave() {
    if (ref.current) ref.current.style.transform = "";
  }

  return (
    <button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn(buttonBase, buttonVariants[variant], buttonSizes[size], className)}
      {...props}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Section heading                                                     */
/* ------------------------------------------------------------------ */

export function Eyebrow({ children, dark }: { children: ReactNode; dark?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em]",
        dark ? "border border-white/15 bg-white/5 text-white/70" : "bg-accent text-accent-foreground",
      )}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
  dark,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  sub?: ReactNode;
  dark?: boolean;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow ? (
        <Reveal>
          <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
        </Reveal>
      ) : null}
      <Reveal delay={60}>
        <h2
          className={cn(
            "max-w-3xl text-3xl font-extrabold leading-[1.08] sm:text-4xl md:text-5xl",
            dark ? "text-white" : "text-foreground",
          )}
        >
          {title}
        </h2>
      </Reveal>
      {sub ? (
        <Reveal delay={120}>
          <p
            className={cn(
              "max-w-2xl text-base leading-relaxed md:text-lg",
              dark ? "text-white/60" : "text-muted-foreground",
            )}
          >
            {sub}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Assets & phone frames                                               */
/* ------------------------------------------------------------------ */

/**
 * Renders the real asset when registered in `focivo-assets.ts`, otherwise a
 * polished placeholder that keeps the correct aspect ratio.
 */
export function AssetImage({
  asset,
  alt,
  ratio = "9 / 19.5",
  className,
  dark,
  rounded = "rounded-[2rem]",
}: {
  asset: AssetKey;
  alt: string;
  ratio?: string;
  className?: string;
  dark?: boolean;
  rounded?: string;
}) {
  const src = getAsset(asset);

  return (
    <div
      className={cn("relative w-full overflow-hidden", rounded, className)}
      style={{ aspectRatio: ratio }}
    >
      {src ? (
        <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover" />
      ) : (
        <div
          className={cn(
            "flex h-full w-full flex-col items-center justify-center gap-3 p-4 text-center",
            dark
              ? "bg-[linear-gradient(150deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))]"
              : "bg-[linear-gradient(150deg,var(--color-lime-tint),white)]",
          )}
          role="img"
          aria-label={alt}
        >
          <span
            className={cn(
              "grid h-10 w-10 place-items-center rounded-full text-sm font-bold",
              dark ? "bg-white/10 text-white/70" : "bg-white text-primary shadow-[var(--shadow-soft)]",
            )}
          >
            ▣
          </span>
          <span
            className={cn(
              "text-[10px] font-semibold uppercase tracking-[0.14em]",
              dark ? "text-white/50" : "text-muted-foreground",
            )}
          >
            {asset}
          </span>
          <span className={cn("text-[11px] leading-snug", dark ? "text-white/35" : "text-muted-foreground/70")}>
            {alt}
          </span>
        </div>
      )}
    </div>
  );
}

/** Realistic Android device frame around a screenshot asset. */
export function PhoneFrame({
  asset,
  alt,
  className,
  dark,
}: {
  asset: AssetKey;
  alt: string;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative rounded-[2.6rem] p-[10px] shadow-[var(--shadow-lift)]",
        dark
          ? "bg-[linear-gradient(160deg,#3a3f39,#101310)]"
          : "bg-[linear-gradient(160deg,#2b2f2a,#15181500)] bg-ink",
        className,
      )}
    >
      <div className="relative overflow-hidden rounded-[2.1rem] bg-background">
        <div className="pointer-events-none absolute left-1/2 top-2 z-10 h-1.5 w-16 -translate-x-1/2 rounded-full bg-black/25" />
        <AssetImage asset={asset} alt={alt} rounded="rounded-[2.1rem]" dark={dark} />
      </div>
    </div>
  );
}

export function Logo({ className, dark }: { className?: string; dark?: boolean }) {
  const src = getAsset("focivo-logo.png");
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      {src ? (
        <img src={src} alt="Focivo logo" className="h-8 w-auto" />
      ) : (
        <span
          className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-base font-extrabold text-primary-foreground shadow-[var(--shadow-glow)]"
          aria-hidden
        >
          F
        </span>
      )}
      <span className={cn("text-lg font-extrabold tracking-tight", dark ? "text-white" : "text-foreground")}>
        Focivo
      </span>
    </span>
  );
}

export function Mascot({
  className,
  size = "md",
  float = true,
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
  float?: boolean;
}) {
  const src = getAsset("focivo-mascot.png");
  const dim = { sm: "h-20 w-20", md: "h-32 w-32", lg: "h-48 w-48" }[size];

  return (
    <div className={cn("relative", float && "animate-float", className)}>
      {src ? (
        <img src={src} alt="Focivo mascot" loading="lazy" className={cn(dim, "object-contain")} />
      ) : (
        <div
          className={cn(
            dim,
            "grid place-items-center rounded-[38%] bg-[radial-gradient(120%_120%_at_30%_20%,white,var(--color-lime-tint))] text-center shadow-[var(--shadow-soft)] ring-1 ring-white/70",
          )}
          role="img"
          aria-label="Focivo mascot placeholder"
        >
          <span className="px-2 text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            focivo-mascot.png
          </span>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Animated counter                                                    */
/* ------------------------------------------------------------------ */

export function Counter({ to, duration = 1400 }: { to: number; duration?: number }) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.5);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion()) {
      setValue(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return <span ref={ref}>{value}</span>;
}
