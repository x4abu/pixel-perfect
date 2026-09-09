import type { AssetKey } from "@/lib/focivo-assets";

export const NAV_LINKS = [
  { label: "Features", id: "features" },
  { label: "AI Study Guard", id: "ai-study-guard" },
  { label: "How It Works", id: "how-it-works" },
  { label: "Reviews", id: "reviews" },
  { label: "FAQ", id: "faq" },
] as const;

export const DISTRACTIONS = [
  { app: "Instagram", line: "Just 5 minutes." },
  { app: "YouTube", line: "One more video." },
  { app: "Random apps", line: "I'll study after this." },
] as const;

export const CAPABILITIES = [
  {
    icon: "timer",
    title: "Deep Work",
    body: "15m Sprint • 25m Pomodoro • 50m Deep Study • 90m Marathon",
  },
  {
    icon: "shield",
    title: "Focus Shield",
    body: "Block distracting apps while you study.",
  },
  {
    icon: "calendar",
    title: "Auto Study Schedule",
    body: "Set your study windows once. Focivo protects them automatically.",
  },
  {
    icon: "sparkles",
    title: "AI Study Guard",
    body: "Use AI for real study questions without opening the door to distractions.",
  },
] as const;

export const DURATIONS = [
  { id: "15", minutes: 15, label: "15m", name: "Sprint", subject: "Quick revision" },
  { id: "25", minutes: 25, label: "25m", name: "Pomodoro", subject: "Physics — Kinematics" },
  { id: "50", minutes: 50, label: "50m", name: "Deep Study", subject: "Organic Chemistry" },
  { id: "90", minutes: 90, label: "90m", name: "Marathon", subject: "Full mock paper" },
] as const;

export const DEEP_WORK_POINTS = [
  "Preset lengths from a 15-minute sprint to a 90-minute marathon",
  "Custom duration when your syllabus needs something else",
  "Name the subject so every session is tracked properly",
  "Live circular timer with an animated mascot companion",
] as const;

export const BLOCKED_APPS = [
  "Instagram",
  "YouTube",
  "WhatsApp",
  "Snapchat",
  "X",
  "Reddit",
  "Games",
] as const;

export const SCHEDULE_BLOCKS = [
  { title: "Morning Study", time: "5:45 AM — 7:00 AM", kind: "study" },
  { title: "Evening Study", time: "6:15 PM — 9:30 PM", kind: "study" },
  { title: "Dinner Break", time: "7:15 PM — 8:10 PM", kind: "break" },
] as const;

export const GUARD_FLOW_ALLOWED = [
  "Study session running",
  "Open ChatGPT / Claude",
  "Study-related conversation",
  "Continue studying",
] as const;

export const GUARD_FLOW_BLOCKED = [
  "Not study-related",
  "One warning",
  "Ignored",
  "That app is locked for 3 hours",
] as const;

export const SHOWCASE_SCREENS: { asset: AssetKey; title: string; caption: string }[] = [
  { asset: "home-screen.png", title: "Home", caption: "Your day at a glance" },
  { asset: "focus-timer-screen.png", title: "Focus Timer", caption: "Live deep work session" },
  { asset: "focus-shield-screen.png", title: "Focus Shield", caption: "App blocking controls" },
  { asset: "schedule-screen.png", title: "Schedule", caption: "Protected study windows" },
  { asset: "ai-study-guard-screen.png", title: "AI Study Guard", caption: "Study-only AI access" },
  { asset: "insights-screen.png", title: "Insights", caption: "When you focus best" },
  { asset: "achievements-screen.png", title: "Achievements", caption: "Milestones you unlock" },
  { asset: "leaderboard-screen.png", title: "Leaderboard", caption: "Focus with others" },
  { asset: "alarm-studio-screen.png", title: "Alarm Studio", caption: "Wake up for study time" },
];

export const STATS = [
  { value: 12, suffix: "h 45m", label: "Total Flow Time", display: "12h 45m" },
  { value: 18, suffix: "", label: "Sessions", display: "18" },
  { value: 86, suffix: "%", label: "Completion", display: "86%" },
  { value: 7, suffix: "", label: "Day Streak", display: "7", emoji: "🔥" },
  { value: 120, suffix: "", label: "XP", display: "120" },
] as const;

export const ACHIEVEMENTS = [
  { name: "First Flow", detail: "Finish your first session" },
  { name: "60m Deep", detail: "One hour without leaving" },
  { name: "7d Streak", detail: "A full week of focus" },
  { name: "25h Master", detail: "25 hours of deep work" },
  { name: "Focus Shield", detail: "Shield on for a full session" },
  { name: "100 Blocks", detail: "100 distractions stopped" },
] as const;

export const INSIGHT_CHART = [
  { part: "Morning", value: 42 },
  { part: "Afternoon", value: 28 },
  { part: "Evening", value: 78 },
] as const;

export const ONBOARDING_QUESTIONS = [
  {
    question: "What are you studying for?",
    options: ["Board exams", "JEE", "NEET", "College / other"],
  },
  {
    question: "What breaks your focus most?",
    options: ["Short-form videos", "Chatting", "Games", "Random scrolling"],
  },
  {
    question: "When do you study best?",
    options: ["Early morning", "Afternoon", "Evening", "Late night"],
  },
] as const;

export const HOW_IT_WORKS = [
  { step: "01", title: "Choose what you want to study" },
  { step: "02", title: "Start a focus session" },
  { step: "03", title: "Focivo protects your attention" },
  { step: "04", title: "Track your progress and build consistency" },
] as const;

export const PERMISSIONS = [
  {
    title: "Accessibility Service",
    body: "Used by AI Study Guard to help determine whether supported AI conversations are study-related and enforce the focus rules.",
  },
  {
    title: "Device Admin",
    body: "Used by Strict Mode to make active study sessions harder to bypass.",
  },
  {
    title: "On-device AI",
    body: "AI Study Guard processing happens on your device.",
  },
] as const;

export const INSTALL_STEPS = [
  {
    title: "Download the APK",
    body: "Tap the download button and let the file finish downloading in your browser.",
  },
  {
    title: "Allow installation from this source",
    body: "Android may ask for permission the first time you install a file from your browser or file manager.",
  },
  {
    title: "Install Focivo",
    body: "Open the downloaded file and confirm the install.",
  },
  {
    title: "Open the app and follow the setup",
    body: "Focivo walks you through onboarding and the permissions it needs.",
  },
] as const;

export const FAQS = [
  {
    q: "What is Focivo?",
    a: "Focivo is an Android deep work and app-blocking app for students. It combines focus sessions, app blocking, automatic study schedules and an AI Study Guard so your study time stays study time.",
  },
  {
    q: "Is Focivo free?",
    a: "Yes. Focivo is free to use and distributed directly as an APK for Android.",
  },
  {
    q: "Why isn't Focivo on Google Play yet?",
    a: "Focivo is an independently developed product and is currently distributed directly as an APK while it matures. That is why Android may show a security warning during installation.",
  },
  {
    q: "What permissions does Focivo use?",
    a: "Accessibility Service for AI Study Guard, and Device Admin for Strict Mode. Each permission is explained in the app before you enable it, and both are optional features.",
  },
  {
    q: "What is AI Study Guard?",
    a: "It lets you use supported AI apps during a focus session for study-related questions. If a conversation is not study-related you get one warning, and if it continues that app is locked for 3 hours.",
  },
  {
    q: "Does Focivo send my AI conversations to a server?",
    a: "No. AI Study Guard processing happens on-device. Conversations are not sent to Focivo servers.",
  },
  {
    q: "Can I use ChatGPT or Claude while studying?",
    a: "Yes, for study-related conversations. AI Study Guard is designed to keep the door open for genuine study help while closing it on distractions.",
  },
  {
    q: "What is Strict Mode?",
    a: "Strict Mode uses Device Admin permission to make active study sessions harder to bypass or uninstall. It is a deterrent, not an absolute lock.",
  },
  {
    q: "How do I install the APK?",
    a: "Download the file, allow installation from your browser or file manager when Android asks, install Focivo, then open it and follow the setup.",
  },
] as const;

/**
 * Mock reviews. Replace this array with a fetched list when a backend exists —
 * the shape is intentionally close to what an API would return.
 */
export type Review = {
  id: string;
  name: string;
  label?: string;
  rating: number;
  body: string;
};

export const MOCK_REVIEWS: Review[] = [
  {
    id: "r1",
    name: "Aarav S.",
    label: "Class 12 • JEE",
    rating: 5,
    body: "The 90-minute marathon sessions changed my mocks. My phone stopped being the reason I lost an evening.",
  },
  {
    id: "r2",
    name: "Meera K.",
    label: "NEET aspirant",
    rating: 5,
    body: "Auto schedule is the best part. My study hours start without me negotiating with myself every day.",
  },
  {
    id: "r3",
    name: "Rohan D.",
    label: "Class 11",
    rating: 4,
    body: "AI Study Guard is clever. I can still ask doubts to ChatGPT, but I can't drift into random chats.",
  },
  {
    id: "r4",
    name: "Ishita P.",
    label: "Board exams",
    rating: 5,
    body: "Streaks and the little mascot sound silly until you're on day 14 and refuse to break it.",
  },
  {
    id: "r5",
    name: "Kabir M.",
    label: "Repeater",
    rating: 5,
    body: "Focus Shield with strict mode is the only blocker I haven't uninstalled in a weak moment.",
  },
  {
    id: "r6",
    name: "Sana R.",
    label: "Class 10",
    rating: 4,
    body: "Insights showed me I focus best between 6 and 8 PM. I moved my hardest subject there.",
  },
];
