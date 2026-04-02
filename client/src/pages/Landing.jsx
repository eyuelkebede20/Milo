import HeroSection from "../components/Landing/HeroSection";
import FeaturesSection from "../components/Landing/FeaturesSection";
import DemoSection from "../components/Landing/DemoSection";
import CallToAction from "../components/Landing/CallToAction";
import Footer from "../components/Landing/Footer";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-base-100 text-base-content transition-colors duration-300">
      <HeroSection />
      <FeaturesSection />
      <DemoSection />
      <CallToAction />
      <Footer />
    </div>
  );
}
