import { createFileRoute } from "@tanstack/react-router";

import { Navbar } from "@/components/focivo/Navbar";
import { Hero } from "@/components/focivo/Hero";
import {
  DeepWorkSection,
  FocusShieldSection,
  ProblemSection,
  ProductIntro,
  ScheduleSection,
} from "@/components/focivo/sections-focus";
import { AiStudyGuardSection, ShowcaseSection } from "@/components/focivo/sections-ai";
import {
  GamificationSection,
  InsightsSection,
  MascotSection,
  OnboardingSection,
} from "@/components/focivo/sections-progress";
import {
  HowItWorksSection,
  PrivacySection,
  ReviewsSection,
} from "@/components/focivo/sections-social";
import {
  DownloadSection,
  FaqSection,
  FinalCta,
  Footer,
  InstallGuideSection,
} from "@/components/focivo/sections-download";

const TITLE = "Focivo — Focus Better. Study Deeper.";
const DESCRIPTION =
  "Focivo is an Android focus and app blocker built for students who want fewer distractions and more deep work.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <ProblemSection />
        <ProductIntro />
        <DeepWorkSection />
        <FocusShieldSection />
        <ScheduleSection />
        <AiStudyGuardSection />
        <ShowcaseSection />
        <GamificationSection />
        <MascotSection />
        <InsightsSection />
        <OnboardingSection />
        <ReviewsSection />
        <HowItWorksSection />
        <PrivacySection />
        <DownloadSection />
        <InstallGuideSection />
        <FaqSection />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
