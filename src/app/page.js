import Hero from "@/components/hero/Hero";
import FeaturedJobs from "@/components/home/FeaturedJobs";
import FeaturedCompanies from "@/components/home/FeaturedCompanies";
import PlatformFeatures from "@/components/home/PlatformFeatures";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import PricingPreview from "@/components/home/PricingPreview";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedJobs />
      <FeaturedCompanies />
      <PlatformFeatures />
      <HowItWorks />
      <Testimonials />
      <PricingPreview />
    </>
  );
}