
import HeroBanner from "@/components/home/HeroBanner";
import FeatureSection from "@/components/home/FeatureSection";
import HowItWorks from "@/components/home/HowItWorks";
import AiFeatures from "@/components/home/AiFeatures";
import CallToAction from "@/components/home/CallToAction";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroBanner />
      <FeatureSection />
      <HowItWorks />
      <AiFeatures />
      <CallToAction />
    </div>
  );
};

export default Index;
