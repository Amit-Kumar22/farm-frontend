"use client";

import { useEffect, useRef, useState } from "react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";

const items = [
  {
    letter: "S",
    title: "Strengths",
    text: "Integrated farming model generates diversified income while maximizing productivity, sustainability, and operational resource utilization efficiently.",
    bar: "bg-forest-deep",
    badge: "bg-forest-deep",
  },
  {
    letter: "W",
    title: "Weaknesses",
    text: "High initial investment and skilled workforce requirements increase operational complexity during early business expansion stages.",
    bar: "bg-amber-500",
    badge: "bg-amber-500",
  },
  {
    letter: "O",
    title: "Opportunities",
    text: "Growing demand for organic products, dairy, sustainable farming, and eco-friendly agricultural solutions creates significant opportunities.",
    bar: "bg-gold-dark",
    badge: "bg-gold-dark",
  },
  {
    letter: "T",
    title: "Threats",
    text: "Disease outbreaks, climate uncertainties, fluctuating market prices, and changing agricultural regulations may impact profitability.",
    bar: "bg-rose-600",
    badge: "bg-rose-600",
  },
];

export default function SwotAnalysis() {
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
    <section ref={sectionRef} className="relative overflow-hidden py-12">
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-forest/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />

      <Container className="relative">
        <SectionHeading
          eyebrow="Strategic Integration Overview"
          title="SWOT Analysis"
          align="center"
          className="mx-auto"
        />
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-muted">
          Combine SWOT insights into broader business planning for sustained success.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ letter, title, text, bar, badge }, i) => (
            <div
              key={title}
              style={{ transitionDelay: isVisible ? `${i * 100}ms` : "0ms" }}
              className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-all duration-700 hover:-translate-y-1 hover:shadow-xl ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <span className={`block h-1.5 w-full ${bar}`} />
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-base font-extrabold text-cream shadow-md transition-transform duration-300 group-hover:scale-110 ${badge}`}
                  >
                    {letter}
                  </span>
                  <h4 className="text-base font-bold text-forest-deep">{title}</h4>
                </div>
                <p className="mt-4 text-xs leading-relaxed text-muted">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
