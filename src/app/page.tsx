import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollSceneLoader } from "@/components/ui/ScrollSceneLoader";
import { DataFlowLine } from "@/components/ui/DataFlowLine";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { IntelligenceSection } from "@/components/sections/IntelligenceSection";
import { PersonalizationSection } from "@/components/sections/PersonalizationSection";
import { WorkoutGenSection } from "@/components/sections/WorkoutGenSection";
import { ProgressiveOverloadSection } from "@/components/sections/ProgressiveOverloadSection";
import { AdaptationSection } from "@/components/sections/AdaptationSection";
import { NutritionSection } from "@/components/sections/NutritionSection";
import { ProgressDashboardSection } from "@/components/sections/ProgressDashboardSection";
import { CompleteSystemSection } from "@/components/sections/CompleteSystemSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { DeepContextChatSection } from "@/components/sections/DeepContextChatSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";

export default function Home() {
  return (
    <div className="landing-page relative min-h-screen bg-black text-white overflow-x-clip">
      <ScrollSceneLoader />

      {/* Sticky Navbar */}
      <div className="relative z-20"><Navbar /></div>

      <main id="main-content" className="relative z-10">
        {/* Hero Section */}
        <HeroSection />

        {/* 00 -> 01: Hero to The Problem */}
        <DataFlowLine label="DISRUPTION → STATUS QUO" variant="lime" height={80} />

        {/* 01 // PROBLEM: The Guesswork Cycle */}
        <ProblemSection />

        {/* 01 -> 02: Problem to User Baseline Ingestion */}
        <DataFlowLine label="PROBLEM RECOGNIZED → INGESTING HUMAN BASELINE" variant="cyan" height={80} />

        {/* 02 // USER & DATA: Calibration & Biometric Ingestion */}
        <PersonalizationSection />

        {/* 02 -> 03: User Data to AI Neural Copilot */}
        <DataFlowLine label="BIOMETRIC TELEMETRY → NEURAL COPILOT REASONING" variant="purple" height={80} />

        {/* 03 // AI: Neural Copilot & Dynamic Reasoning */}
        <IntelligenceSection />

        {/* 03 -> 04: AI Reasoning to Dynamic Session Plan */}
        <DataFlowLine label="AI FORMULATION → DYNAMIC SESSION PLAN" variant="lime" height={80} />

        {/* 04 // PLAN: Workout Generation Built Around You */}
        <WorkoutGenSection />

        {/* 04 -> 05: Plan to Floor Execution & Overload */}
        <DataFlowLine label="SESSION ASSEMBLED → GYM EXECUTION & OVERLOAD" variant="cyan" height={80} />

        {/* 05 // TRAIN: Active Gym Execution & Progressive Overload */}
        <ProgressiveOverloadSection />

        {/* 05 -> 06: Training Logs to Performance Tracking */}
        <DataFlowLine label="WEIGHTS MOVED → HIGH-RESOLUTION TELEMETRY" variant="purple" height={80} />

        {/* 06 // TRACK: Continuous Performance Metrics */}
        <ProgressDashboardSection />

        {/* 06 -> 07: Tracked Expenditure to Fueling */}
        <DataFlowLine label="EXPENDITURE TRACKED → METABOLIC FUELING" variant="cyan" height={80} />

        {/* 07 // TRACK/FUEL: Nutrition Intelligence */}
        <NutritionSection />

        {/* 07 -> 08: Fatigue Disruption to Autonomous Re-calibration */}
        <DataFlowLine label="RECOVERY STATUS → AUTONOMOUS RE-CALIBRATION" variant="lime" height={80} />

        {/* 08 // ADAPT: When Life & Fatigue Strike, The Plan Pivots */}
        <AdaptationSection />

        {/* 08 -> 09: Dynamic Adaptation to Compounding Results */}
        <DataFlowLine label="CLOSED-LOOP FEEDBACK → COMPOUNDING RESULTS" variant="lime" height={80} />

        {/* 09 // RESULTS: The Complete Unified System */}
        <CompleteSystemSection />

        {/* 09 -> 10: Unified Architecture to Onboarding Protocol */}
        <DataFlowLine label="UNIFIED ARCHITECTURE → ONBOARDING TIMELINE" variant="cyan" height={80} />

        {/* 10 // ONBOARDING: Engineered Simplicity in 4 Steps */}
        <HowItWorksSection />

        {/* 10 -> 11: Daily Execution to Longitudinal Memory */}
        <DataFlowLine label="DAILY EXECUTION → LONGITUDINAL MEMORY" variant="purple" height={80} />

        {/* 11 // MEMORY: Deep Context Chat Terminal */}
        <DeepContextChatSection />

        {/* 11 -> 12: Context to Investment */}
        <DataFlowLine label="VALIDATED COPILOT → DEPLOY INTELLIGENCE" variant="lime" height={80} />

        {/* 12 // INVESTMENT: Membership Tiers */}
        <PricingSection />

        {/* Section 13: Final High-Impact CTA */}
        <FinalCtaSection />
      </main>

      {/* Editorial Footer */}
      <div className="relative z-10"><Footer /></div>
    </div>
  );
}
