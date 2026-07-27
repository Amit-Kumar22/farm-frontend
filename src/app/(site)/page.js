import Hero from "@/components/home/Hero";
import FeatureBar from "@/components/home/FeatureBar";
import OurVision from "@/components/home/OurVision";
import About from "@/components/home/About";
import ServicesSection from "@/components/home/ServicesSection";
import NewsTickerSection from "@/components/home/NewsTickerSection";
import ChooseField from "@/components/home/ChooseField";
import Gallery from "@/components/home/Gallery";
import Testimonials from "@/components/home/Testimonials";
import ClientLogos from "@/components/home/ClientLogos";
import HealthyLife from "@/components/home/HealthyLife";
import Timeline from "@/components/home/Timeline";
import CtaBanner from "@/components/home/CtaBanner";
import LatestBlog from "@/components/home/LatestBlog";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeatureBar />
      <OurVision />
      <About />
      <ServicesSection />
      <NewsTickerSection />
      <ChooseField />
      <Gallery />
      <Testimonials />
      <ClientLogos />
      <HealthyLife />
      <Timeline />
      <CtaBanner />
      <LatestBlog />
    </>
  );
}
