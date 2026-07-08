import { heroSlidesApi } from "@/lib/api/heroSlides";
import HeroCarousel from "./HeroCarousel";

const fallbackSlide = {
  title: "Quality Trust: Direct to the Farm",
  subtitle:
    "We grow and deliver fresh fish, dairy, vegetables and mushrooms straight from our own farms.",
  ctaText: "Contact Us",
  ctaLink: "/businesses",
  backgroundImage: "",
};

export default async function Hero() {
  const res = await heroSlidesApi.list().catch(() => null);
  const slides = res?.data?.length ? res.data : [fallbackSlide];

  return <HeroCarousel slides={slides} />;
}
