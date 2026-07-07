import { Sprout } from "lucide-react";
import { heroSlidesApi } from "@/lib/api/heroSlides";
import CoverImage from "../ui/CoverImage";
import Button from "../ui/Button";
import Container from "../ui/Container";

export default async function Hero() {
  const res = await heroSlidesApi.list().catch(() => null);
  const slide = res?.data?.[0];

  const title = slide?.title || "Quality Trust: Direct to the Farm";
  const subtitle =
    slide?.subtitle ||
    "We grow and deliver fresh fish, dairy, vegetables and mushrooms straight from our own farms.";
  const ctaText = slide?.ctaText || "Contact Us";
  const ctaLink = slide?.ctaLink || "/businesses";

  return (
    <section className="relative overflow-hidden">
      <CoverImage src={slide?.backgroundImage} icon={Sprout} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-forest-deep/70" />

      <Container className="relative flex min-h-[480px] flex-col justify-center py-20">
        <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-gold">
          Welcome to MainFarm
        </p>
        <h1 className="max-w-2xl text-4xl font-extrabold leading-tight text-cream sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-xl text-base text-cream/80">{subtitle}</p>
        <div className="mt-8">
          <Button href={ctaLink}>{ctaText}</Button>
        </div>
      </Container>
    </section>
  );
}
