import { heroSlidesApi } from "@/lib/api/heroSlides";
import HeroCarousel from "./HeroCarousel";

const fallbackSlide = {
  title: "Quality Trust: Direct to the Farm",
  subtitle:
    "We grow and deliver fresh fish, dairy, vegetables and mushrooms straight from our own farms.",
  ctaText: "Contact Us",
  ctaLink: "/contact",
  backgroundImage: "",
};

export default async function Hero() {
  const res = await heroSlidesApi.list().catch(() => null);
  let slides = res?.data?.length ? res.data : [fallbackSlide];
  
  // Sort slides: video slides first, then image slides
  slides = slides.sort((a, b) => {
    const aHasVideo = !!a.backgroundVideo;
    const bHasVideo = !!b.backgroundVideo;
    
    // If both have video or both don't have video, maintain original order
    if (aHasVideo === bHasVideo) {
      return (a.order || 0) - (b.order || 0);
    }
    
    // Video slides come first
    return bHasVideo ? 1 : -1;
  });

  return <HeroCarousel slides={slides} />;
}
