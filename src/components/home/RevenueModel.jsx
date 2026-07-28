import { PawPrint, Milk, Carrot, Recycle } from "lucide-react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";

const streams = [
  {
    icon: PawPrint,
    title: "Livestock Sales",
    text: "Revenue is regularly generated through the sales of goat, cow, duck, egg farming, poultry, mushroom, and breeding livestock.",
    tone: "light",
  },
  {
    icon: Milk,
    title: "Dairy Products",
    text: "Income from fresh milk, processed dairy products, and milk distribution operations.",
    tone: "dark",
  },
  {
    icon: Carrot,
    title: "Organic Produce",
    text: "Commercial sales of organic vegetables, crops, fertilizers, and naturally cultivated agricultural products.",
    tone: "light",
  },
  {
    icon: Recycle,
    title: "By-products",
    text: "Revenue from cow dung products, compost, vermicompost, organic farming inputs, solid cow urine, liquid cow urine, and cow urine products.",
    tone: "dark",
  },
];

const tones = {
  light: "bg-forest-light",
  dark: "bg-forest-deep",
};

export default function RevenueModel() {
  return (
    <section className="relative overflow-hidden py-12">
      <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-forest/10 blur-3xl" />

      <Container className="relative">
        <SectionHeading
          eyebrow="How We Earn"
          title="Revenue Model"
          align="center"
          className="mx-auto"
        />
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-muted">
          Multiple, complementary income streams built into a single integrated farm —
          from livestock to value-added by-products.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {streams.map(({ icon: Icon, title, text, tone }) => (
            <div
              key={title}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className={`flex items-center gap-3 px-5 py-4 text-cream ${tones[tone]}`}>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/15 transition-transform duration-300 group-hover:scale-110">
                  <Icon size={18} />
                </span>
                <h4 className="text-sm font-bold leading-snug">{title}</h4>
              </div>
              <div className="flex flex-1 items-center px-5 py-5">
                <p className="text-xs leading-relaxed text-muted">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
