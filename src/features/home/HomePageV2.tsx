import FlexPulseVideoDialog from "./components/FlexPulseVideoDialog";
import V2HeroSection from "./V2HeroSection";
import V2FeaturedProductSection from "./V2FeaturedProductSection";
import V2ScienceBanner from "./V2ScienceBanner";
import V2BenefitsAndHowItWorksSection from "./V2BenefitsAndHowItWorksSection";
import V2ExploreDiscoverSection from "./V2ExploreDiscoverSection";
import PartnerCarousel from "./PartnerCarousel";
import { useUiStore } from "@/stores/uiStore";
import { Link } from "react-router-dom";

export default function HomePageV2() {
  const demoOpen = useUiStore((s) => s.demoOpen);
  const setDemoOpen = useUiStore((s) => s.setDemoOpen);

  return (
    <>
      <div className="bg-[#FAF8F6] px-5 pt-5 text-right sm:px-8 lg:px-12 xl:px-16">
        <Link to="/" className="inline-flex h-10 items-center rounded-full border border-[#D71920] px-4 text-sm font-semibold text-[#D71920] transition-colors hover:bg-[#D71920] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D71920] focus-visible:ring-offset-2">
          View Home V1
        </Link>
      </div>
      <V2HeroSection onWatchDemo={() => setDemoOpen(true)} />
      <PartnerCarousel />
      <V2FeaturedProductSection />
      <V2ScienceBanner />
      <V2BenefitsAndHowItWorksSection />
      <FlexPulseVideoDialog open={demoOpen} onOpenChange={setDemoOpen} />
      <V2ExploreDiscoverSection />
    </>
  );
}
