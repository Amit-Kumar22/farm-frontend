"use client";

import { useEffect, useRef, useState } from "react";
import { Globe, Cpu, Factory, ArrowUpRight } from "lucide-react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";

const roadmap = [
  {
    id: "01",
    title: "Expansion",
    icon: ArrowUpRight,
    desc: "Increase farming capacity through agricultural land and livestock infrastructure.",
  },
  {
    id: "02",
    title: "Automation",
    icon: Cpu,
    desc: "Adopt smart farming technologies for operational efficiency.",
  },
  {
    id: "03",
    title: "Processing",
    icon: Factory,
    desc: "Develop value-added processing facilities to maximize revenue.",
  },
  {
    id: "04",
    title: "Exports",
    icon: Globe,
    desc: "Expand export-ready agricultural products to global markets.",
  },
];

export default function ScaleUpRoadmap() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-cream py-12">
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-forest/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />

      <Container className="relative">
        <SectionHeading
          eyebrow="Growth Strategy"
          title="Aim to Scale Up"
          align="center"
          className="mx-auto"
        />
        <p className="mx-auto mt-3 max-w-xl text-center text-sm text-muted">
          Strategic roadmap for sustainable expansion, automation, processing
          and export development.
        </p>

        {/* Desktop: horizontal roadmap connected by a line */}
        <div className="relative mt-14 hidden lg:block">
          <div className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-6.5 h-px bg-gradient-to-r from-gold-dark via-forest-light/50 to-forest/20" />
          <div className="grid grid-cols-4 gap-6">
            {roadmap.map((item, i) => (
              <RoadmapNode
                key={item.id}
                item={item}
                current={i === 0}
                delay={i * 120}
                visible={isVisible}
              />
            ))}
          </div>
        </div>

        {/* Tablet: two-column layout */}
        <div className="mt-10 hidden grid-cols-2 gap-5 md:grid lg:hidden">
          {roadmap.map((item, i) => (
            <RoadmapCard
              key={item.id}
              item={item}
              current={i === 0}
              delay={i * 100}
              visible={isVisible}
            />
          ))}
        </div>

        {/* Mobile: vertical timeline connected by a line */}
        <div className="relative mt-10 md:hidden">
          <div className="pointer-events-none absolute bottom-2 left-5.25 top-2 w-0.5 bg-gradient-to-b from-gold-dark via-forest-light/50 to-forest/20" />
          <div className="space-y-5">
            {roadmap.map((item, i) => (
              <RoadmapRow
                key={item.id}
                item={item}
                current={i === 0}
                delay={i * 100}
                visible={isVisible}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function IconBadge({ icon: Icon, current, size = 20, className = "" }) {
  return (
    <div
      className={`relative z-10 flex shrink-0 items-center justify-center rounded-full border-4 border-cream shadow-md transition-transform duration-300 group-hover:scale-110 ${
        current
          ? "bg-gradient-to-br from-gold to-gold-dark"
          : "bg-gradient-to-br from-forest-light to-forest-deep"
      } ${className}`}
    >
      <Icon size={size} className="text-white" />
    </div>
  );
}

function RoadmapNode({ item, current, delay, visible }) {
  const { icon: Icon, id, title, desc } = item;
  return (
    <div
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      className={`group flex flex-col items-center text-center transition-all duration-700 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      <IconBadge icon={Icon} current={current} className="h-13 w-13" />
      <div className="mt-5 w-full rounded-2xl border border-black/5 bg-white p-5 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
        <span
          className={`text-xs font-bold tracking-wide ${
            current ? "text-gold-dark" : "text-muted"
          }`}
        >
          {id}
        </span>
        <h3 className="mt-1 text-base font-bold text-forest-deep">{title}</h3>
        <p className="mt-2 text-xs leading-relaxed text-muted">{desc}</p>
      </div>
    </div>
  );
}

function RoadmapCard({ item, current, delay, visible }) {
  const { icon: Icon, id, title, desc } = item;
  return (
    <div
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      className={`group flex gap-4 rounded-2xl border border-black/5 bg-white p-5 shadow-sm transition-all duration-700 hover:-translate-y-1 hover:shadow-xl ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      <IconBadge icon={Icon} current={current} className="h-11 w-11" size={18} />
      <div className="min-w-0">
        <span
          className={`text-xs font-bold tracking-wide ${
            current ? "text-gold-dark" : "text-muted"
          }`}
        >
          {id}
        </span>
        <h3 className="mt-0.5 text-base font-bold text-forest-deep">{title}</h3>
        <p className="mt-1.5 text-xs leading-relaxed text-muted">{desc}</p>
      </div>
    </div>
  );
}

function RoadmapRow({ item, current, delay, visible }) {
  const { icon: Icon, id, title, desc } = item;
  return (
    <div
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      className={`group relative flex gap-4 transition-all duration-700 ${
        visible ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
      }`}
    >
      <IconBadge icon={Icon} current={current} className="h-11 w-11" size={18} />
      <div className="min-w-0 flex-1 rounded-2xl border border-black/5 bg-white p-4 shadow-sm transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-xl">
        <span
          className={`text-[11px] font-bold tracking-wide ${
            current ? "text-gold-dark" : "text-muted"
          }`}
        >
          {id}
        </span>
        <h3 className="mt-0.5 text-sm font-bold text-forest-deep">{title}</h3>
        <p className="mt-1 text-xs leading-relaxed text-muted">{desc}</p>
      </div>
    </div>
  );
}
