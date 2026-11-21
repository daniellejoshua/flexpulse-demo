import Hero from "./Hero";
import PartnerCarousel from "./PartnerCarousel";
import WellnessLifestyleSection from "./WellnessLifestyleSection";
import HowItWorks from "./HowItWorks";
import EngineeredWellnessSection from "./components/EngineeredWellnessSection";
import FlexPulseDemoSection from "./components/FlexPulseDemoSection";
import FlexPulseVideoDialog from "./components/FlexPulseVideoDialog";
import QualityEngineeringSection from "./components/QualityEngineeringSection";
import { useUiStore } from "@/stores/uiStore";
import { Link } from "react-router-dom";

export default function HomePage() {
  const demoOpen = useUiStore((s) => s.demoOpen);
  const setDemoOpen = useUiStore((s) => s.setDemoOpen);

  return (
    <>
      <div className="bg-[#fff8f8] px-5 pt-5 text-right sm:px-8 lg:px-12 xl:px-16">
        <Link to="/v2" className="inline-flex h-10 items-center rounded-full border border-primary px-4 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
          View Home V2
        </Link>
      </div>
      <Hero />
      <FlexPulseVideoDialog open={demoOpen} onOpenChange={setDemoOpen} />
      <PartnerCarousel />
      <WellnessLifestyleSection />
      <HowItWorks />
      <EngineeredWellnessSection />
      <FlexPulseDemoSection />
      <QualityEngineeringSection />
    </>
  );
}
