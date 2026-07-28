import Hero from "@/components/home/Hero";
import FeatureBar from "@/components/home/FeatureBar";
import WelcomeSection from "@/components/home/WelcomeSection";
import OurVision from "@/components/home/OurVision";
import ProblemSolution from "@/components/home/ProblemSolution";
import About from "@/components/home/About";
import RevenueModel from "@/components/home/RevenueModel";
import ServicesSection from "@/components/home/ServicesSection";
import SwotAnalysis from "@/components/home/SwotAnalysis";
import NewsTickerSection from "@/components/home/NewsTickerSection";
import ChooseField from "@/components/home/ChooseField";
import Gallery from "@/components/home/Gallery";
import ScaleUpRoadmap from "@/components/home/ScaleUpRoadmap";
import Testimonials from "@/components/home/Testimonials";
import ClientLogos from "@/components/home/ClientLogos";
import HealthyLife from "@/components/home/HealthyLife";
import Timeline from "@/components/home/Timeline";
import TargetMarket from "@/components/home/targetmarket";
import CtaBanner from "@/components/home/CtaBanner";
import UseOfFunds from "@/components/home/UseOfFunds";
import LatestBlog from "@/components/home/LatestBlog";
import FounderSection from "@/components/home/FounderSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeatureBar />
      <WelcomeSection />
      <OurVision />
      <ProblemSolution />
      <About />
      <RevenueModel />
      <ServicesSection />
      <SwotAnalysis />
      <NewsTickerSection />
      <ChooseField />
      <Gallery />
      <ScaleUpRoadmap/>
      <Testimonials />
      <ClientLogos />
      <HealthyLife />
      <TargetMarket />
      <Timeline />
      <CtaBanner />
      <UseOfFunds />
      <LatestBlog />
      <FounderSection />
    </>
  );
}
