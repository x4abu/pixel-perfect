/**
 * Single place for values that change at launch / when a backend arrives.
 */

export const APK_DOWNLOAD_URL = "REPLACE_WITH_APK_URL";
export const APP_VERSION = "1.0.0";
export const PRIVACY_POLICY_URL = "REPLACE_WITH_PRIVACY_POLICY_URL";
export const SUPPORT_URL = "REPLACE_WITH_SUPPORT_URL";

export const APP_NAME = "Focivo";
export const APP_TAGLINE = "Focus intentionally. Study deeply.";
export const TRUST_LINE = "Free to use • Android • Direct APK";

export function downloadApk() {
  if (typeof window === "undefined") return;
  window.location.href = APK_DOWNLOAD_URL;
}

export function scrollToId(id: string) {
  if (typeof document === "undefined") return;
  const el = document.getElementById(id);
  if (!el) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
}
