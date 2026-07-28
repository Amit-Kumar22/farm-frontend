import { Fragment } from "react";
import {
  TrendingDown,
  Trash2,
  Gauge,
  ShoppingCart,
  Network,
  Lightbulb,
  Factory,
  Leaf,
} from "lucide-react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";

const problems = [
  {
    icon: TrendingDown,
    title: "Fragmentation",
    text: "Traditional farming depends on single-income sources, increasing financial risks and limiting long-term profitability for farmers.",
  },
  {
    icon: Trash2,
    title: "Waste",
    text: "Agricultural and livestock waste often remains underutilized, causing environmental pollution and reducing potential additional revenue opportunities.",
  },
  {
    icon: Gauge,
    title: "Productivity",
    text: "Conventional farming methods reduce efficiency, livestock health, crop yield, and overall resource utilization across farming operations.",
  },
  {
    icon: ShoppingCart,
    title: "Market",
    text: "Farmers frequently struggle with inconsistent pricing, limited market access, and low-value realization for agricultural products.",
  },
];

const solutions = [
  {
    icon: Network,
    title: "Integration",
    text: "Combining livestock, dairy, organic farming, egg farming, poultry, mushroom cultivation, pearl cultivation, and processing creates multiple sustainable income sources efficiently.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    text: "Scientific farming methods improve productivity, animal health, resource utilization, and operational efficiency while reducing production costs.",
  },
  {
    icon: Factory,
    title: "Processing",
    text: "Value-added milk processing and cow dung by-products significantly increase product value and overall farm profitability.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    text: "Eco-friendly farming practices conserve natural resources, minimize waste generation, and promote environmentally responsible agricultural development.",
  },
];

const tones = {
  problem: {
    badge: "bg-amber-500/10 text-amber-600",
    ring: "hover:border-amber-500/30",
  },
  solution: {
    badge: "bg-forest/10 text-forest",
    ring: "hover:border-forest/30",
  },
};

function Card({ icon: Icon, title, text, tone }) {
  const t = tones[tone];
  return (
    <div
      className={`group flex h-full gap-4 rounded-2xl border border-black/5 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${t.ring}`}
    >
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${t.badge}`}
      >
        <Icon size={20} />
      </span>
      <div>
        <h4 className="text-sm font-semibold text-forest-deep">{title}</h4>
        <p className="mt-1 text-xs leading-relaxed text-muted">{text}</p>
      </div>
    </div>
  );
}

export default function ProblemSolution() {
  return (
    <section className="relative overflow-hidden py-12">
      <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-amber-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-64 w-64 rounded-full bg-forest/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cream-dark/30 via-transparent to-transparent" />

      <Container className="relative">
        <SectionHeading
          eyebrow="Why Integration Matters"
          title="The Problem & The Solution"
          align="center"
          className="mx-auto"
        />
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-muted">
          See how MAI Farm&apos;s integrated model turns everyday farming challenges into
          sustainable, profitable opportunities.
        </p>

        <div className="mt-10 grid gap-5 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600">
              <TrendingDown size={18} />
            </span>
            <h3 className="text-lg font-bold text-forest-deep">The Problem</h3>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest/10 text-forest">
              <Leaf size={18} />
            </span>
            <h3 className="text-lg font-bold text-forest-deep">The Solution</h3>
          </div>

          {problems.map((problem, i) => (
            <Fragment key={problem.title}>
              <Card {...problem} tone="problem" />
              <Card {...solutions[i]} tone="solution" />
            </Fragment>
          ))}
        </div>
      </Container>
    </section>
  );
}
