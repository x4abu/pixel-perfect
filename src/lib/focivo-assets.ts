/**
 * Asset registry.
 *
 * Every image on the site is referenced by its asset key. To ship the real
 * artwork later, drop the file in `src/assets/` and set its URL here — e.g.
 *
 *   import heroScreen from "@/assets/hero-app-screen.png";
 *   "hero-app-screen.png": heroScreen,
 *
 * Anything left as `null` renders a polished, correctly-proportioned
 * placeholder frame instead.
 */

export type AssetKey =
  | "focivo-logo.png"
  | "focivo-mascot.png"
  | "hero-app-screen.png"
  | "home-screen.png"
  | "focus-timer-screen.png"
  | "focus-shield-screen.png"
  | "schedule-screen.png"
  | "ai-study-guard-screen.png"
  | "insights-screen.png"
  | "achievements-screen.png"
  | "leaderboard-screen.png"
  | "onboarding-screen.png"
  | "alarm-studio-screen.png"
  | "mascot-growth.png"
  | "app-icon.png";

export const ASSETS: Record<AssetKey, string | null> = {
  "focivo-logo.png": null,
  "focivo-mascot.png": null,
  "hero-app-screen.png": null,
  "home-screen.png": null,
  "focus-timer-screen.png": null,
  "focus-shield-screen.png": null,
  "schedule-screen.png": null,
  "ai-study-guard-screen.png": null,
  "insights-screen.png": null,
  "achievements-screen.png": null,
  "leaderboard-screen.png": null,
  "onboarding-screen.png": null,
  "alarm-studio-screen.png": null,
  "mascot-growth.png": null,
  "app-icon.png": null,
};

export function getAsset(key: AssetKey): string | null {
  return ASSETS[key];
}
