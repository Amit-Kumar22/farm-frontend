import { Leaf } from "lucide-react";
import Container from "../ui/Container";
import CoverImage from "../ui/CoverImage";
import Button from "../ui/Button";
import SectionHeading from "../ui/SectionHeading";

export default function HealthyLife() {
  return (
    <section className="py-20">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <CoverImage icon={Leaf} className="h-80 w-full rounded-2xl lg:order-2" />
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
