import { useState } from "react";
import { Star, PenLine, X, ShieldCheck, Cpu, Accessibility } from "lucide-react";
import { cn } from "@/lib/utils";
import { HOW_IT_WORKS, MOCK_REVIEWS, PERMISSIONS, type Review } from "@/data/focivo-content";
import { PRIVACY_POLICY_URL } from "@/lib/focivo-config";
import { CtaButton, Reveal, SectionHeading } from "./primitives";

/* ---------------- 14. Reviews ---------------- */

function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          style={{ width: size, height: size }}
          className={cn(n <= rating ? "fill-primary text-primary" : "text-border")}
          aria-hidden
        />
      ))}
    </span>
  );
}

function ReviewModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  if (!open) return null;

  const close = () => {
    onClose();
    setTimeout(() => {
      setName("");
      setRating(0);
      setBody("");
      setErrors({});
      setSent(false);
    }, 250);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (name.trim().length < 2) next["name"] = "Please add your name.";
    if (rating === 0) next["rating"] = "Pick a rating.";
    if (body.trim().length < 10) next["body"] = "A few more words, please.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    // Frontend only — nothing is sent anywhere.
    setSent(true);
  };

  return (
    <div
      className="fixed inset-0 z-[60] grid place-items-center bg-ink/40 p-4 backdrop-blur-sm duration-300 animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Write a review"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="w-full max-w-md rounded-[1.75rem] bg-card p-7 shadow-[var(--shadow-lift)] duration-400 animate-in fade-in zoom-in-95">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-extrabold">
            {sent ? "Thanks for supporting Focivo." : "Write a review"}
          </h3>
          <button
            onClick={close}
            aria-label="Close"
            className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>

        {sent ? (
          <div className="mt-4">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Your review stays on this device for now — reviews aren&apos;t collected yet.
            </p>
            <CtaButton className="mt-6 w-full" onClick={close}>
              Done
            </CtaButton>
          </div>
        ) : (
          <form className="mt-5 space-y-5" onSubmit={submit} noValidate>
            <div>
              <label htmlFor="rv-name" className="text-sm font-semibold">
                Name
              </label>
              <input
                id="rv-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="Your name"
              />
              {errors["name"] ? (
                <p className="mt-1.5 text-xs text-destructive">{errors["name"]}</p>
              ) : null}
            </div>

            <div>
              <span className="text-sm font-semibold">Rating</span>
              <div className="mt-2 flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    aria-label={`${n} star${n > 1 ? "s" : ""}`}
                    onClick={() => setRating(n)}
                    className="rounded-full p-1 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <Star
                      className={cn(
                        "h-6 w-6",
                        n <= rating ? "fill-primary text-primary" : "text-border",
                      )}
                      aria-hidden
                    />
                  </button>
                ))}
              </div>
              {errors["rating"] ? (
                <p className="mt-1.5 text-xs text-destructive">{errors["rating"]}</p>
              ) : null}
            </div>

            <div>
              <label htmlFor="rv-body" className="text-sm font-semibold">
                Review
              </label>
              <textarea
                id="rv-body"
                rows={4}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="mt-2 w-full resize-none rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="How has Focivo changed your study time?"
              />
              {errors["body"] ? (
                <p className="mt-1.5 text-xs text-destructive">{errors["body"]}</p>
              ) : null}
            </div>

            <CtaButton type="submit" className="w-full" size="lg">
              Submit review
            </CtaButton>
          </form>
        )}
      </div>
    </div>
  );
}

export function ReviewsSection() {
  // Swap MOCK_REVIEWS for fetched data when a backend exists.
  const reviews: Review[] = MOCK_REVIEWS;
  const [modal, setModal] = useState(false);

  return (
    <section id="reviews" className="section-pad">
      <div className="shell">
        <SectionHeading eyebrow="Reviews" title="Built for people who actually want to focus." />

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal as="article" key={r.id} delay={i * 70}>
              <div className="glass h-full rounded-[1.75rem] p-6 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)]">
                <Stars rating={r.rating} />
                <p className="mt-4 text-sm leading-relaxed text-foreground/80">“{r.body}”</p>
                <div className="mt-5">
                  <p className="text-sm font-semibold">{r.name}</p>
                  {r.label ? <p className="text-xs text-muted-foreground">{r.label}</p> : null}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-10 flex justify-center">
            <CtaButton variant="outline" size="lg" onClick={() => setModal(true)}>
              <PenLine className="h-4 w-4" aria-hidden />
              Write a review
            </CtaButton>
          </div>
        </Reveal>
      </div>

      <ReviewModal open={modal} onClose={() => setModal(false)} />
    </section>
  );
}

/* ---------------- 15. How it works ---------------- */

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="section-pad bg-[linear-gradient(180deg,transparent,white,transparent)]">
      <div className="shell">
        <SectionHeading eyebrow="How it works" title="Four steps. That's the whole system." />

        <ol className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {HOW_IT_WORKS.map((s, i) => (
            <Reveal as="li" key={s.step} delay={i * 110}>
              <div className="surface-card h-full p-7">
                <span className="text-4xl font-extrabold text-gradient-lime">{s.step}</span>
                <p className="mt-4 text-base font-semibold leading-snug">{s.title}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------------- 16. Privacy & permissions ---------------- */

const PERMISSION_ICONS = [Accessibility, ShieldCheck, Cpu];

export function PrivacySection() {
  return (
    <section className="section-pad">
      <div className="shell">
        <SectionHeading
          eyebrow="Transparency"
          title="Powerful controls. Clear permissions."
          sub="Focivo asks for two sensitive Android permissions. Here is exactly what each one does."
        />

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {PERMISSIONS.map((p, i) => {
            const Icon = PERMISSION_ICONS[i] ?? ShieldCheck;
            return (
              <Reveal key={p.title} delay={i * 90}>
                <div className="surface-card h-full p-7">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent text-primary">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-lg font-bold">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={240}>
          <div className="mt-10 flex justify-center">
            <a
              href={PRIVACY_POLICY_URL}
              className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-white/70 px-6 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Read Privacy Policy
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
