import { Fish, Milk, Carrot, Sprout } from "lucide-react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";

const items = [
  { icon: Fish, title: "Fish Farming", text: "Sustainably raised, pond to plate." },
  { icon: Milk, title: "Dairy Farming", text: "Fresh milk from pasture-raised cattle." },
  { icon: Carrot, title: "Vegetable Farming", text: "Organic produce, harvested year-round." },
  { icon: Sprout, title: "Mushroom Farming", text: "Specialty mushrooms grown with care." },
];

export default function ChooseField() {
  return (
    <section className="py-20">
      <Container className="text-center">
        <SectionHeading
          eyebrow="What We Do"
          title="Choose What's Perfect For Your Field"
          align="center"
          className="mx-auto"
        />

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex flex-col items-center gap-3">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 text-gold-dark">
                <Icon size={24} />
              </span>
              <p className="font-semibold text-forest-deep">{title}</p>
              <p className="text-sm text-muted">{text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
