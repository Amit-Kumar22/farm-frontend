import Image from "next/image";
import Container from "../ui/Container";
import Button from "../ui/Button";
import SectionHeading from "../ui/SectionHeading";

export default function HealthyLife() {
  return (
    <section className="py-20">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <div className="relative h-80 w-full overflow-hidden rounded-2xl shadow-lg lg:order-2">
          <Image
            src="/what.jpg"
            alt="Healthy Life with Fresh Products"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
          />
        </div>
        <div>
          <SectionHeading eyebrow="What We Do" title="Healthy Life With Fresh Products" />
          <p className="mt-5 text-sm leading-relaxed text-muted">
            Every business under MainFarm — from our fish ponds to our mushroom houses — follows
            the same standard: natural methods, careful monitoring, and produce that&apos;s
            genuinely good for you.
          </p>
          <div className="mt-8">
            <Button href="/businesses">Explore Our Businesses</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
