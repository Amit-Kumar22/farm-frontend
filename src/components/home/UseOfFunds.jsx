"use client";

import { useEffect, useRef, useState } from "react";
import { PawPrint, Milk, Leaf, Cog, Megaphone } from "lucide-react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";

const funds = [
  {
    icon: PawPrint,
    percent: "30%",
    label: "Allocated For Livestock Expansion",
    highlight: true,
  },
  {
    icon: Milk,
    percent: "25%",
    label: "Milk Processing Plant",
  },
  {
    icon: Leaf,
    percent: "20%",
    label: "Organic Farming & Pearl Cultivation",
  },
  {
    icon: Cog,
    percent: "15%",
    label: "Machinery & Infrastructure",
  },
  {
    icon: Megaphone,
    percent: "10%",
    label: "Branding, Marketing, distribution & Working Capital",
  },
];

export default function UseOfFunds() {
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
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-forest/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />

      <Container className="relative">
        <div
          className={`overflow-hidden rounded-3xl border border-black/5 bg-white shadow-xl transition-all duration-700 lg:grid lg:grid-cols-5 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          {/* Left: text content */}
          <div className="flex flex-col justify-center gap-4 p-8 lg:col-span-2 lg:p-10">
            <SectionHeading eyebrow="Funding Allocation" title="Use of Funds" />
            <p className="text-sm leading-relaxed text-muted">
              The proposed <strong className="text-forest-deep">₹6 Crore</strong>{" "}
              funding will be strategically invested across key business areas
              to strengthen{" "}
              <strong className="text-forest-deep">MAI INTEGRATED FARM</strong>.{" "}
              <strong className="text-forest-deep">20% (₹1.20 Crore)</strong>{" "}
              will be allocated for livestock expansion,{" "}
              <strong className="text-forest-deep">25% (₹1.50 Crore)</strong>{" "}
              for the milk processing plant,{" "}
              <strong className="text-forest-deep">20% (₹1.20 Crore)</strong>{" "}
              for organic farming and pearl cultivation,{" "}
              <strong className="text-forest-deep">15% (₹90 Lakhs)</strong> for
              machinery and infrastructure development, and{" "}
              <strong className="text-forest-deep">20% (₹1.20 Lakhs)</strong>{" "}
              for branding, marketing, distribution, and working capital to
              support sustainable growth and long-term profitability.
            </p>
          </div>

          {/* Right: allocation breakdown */}
          <div className="bg-forest-deep p-8 lg:col-span-3 lg:p-10">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {funds.map(({ icon: Icon, percent, label, highlight }, i) => (
                <div
                  key={label}
                  style={{ transitionDelay: isVisible ? `${i * 90}ms` : "0ms" }}
                  className={`group flex h-full flex-col items-center gap-2 rounded-2xl bg-cream/95 p-4 text-center shadow-md transition-all duration-500 hover:-translate-y-1 hover:shadow-xl ${
                    isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  }`}
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white shadow-sm transition-transform duration-300 group-hover:scale-110 ${
                      highlight
                        ? "bg-gradient-to-br from-gold to-gold-dark"
                        : "bg-gradient-to-br from-forest-light to-forest-deep"
                    }`}
                  >
                    <Icon size={18} />
                  </span>
                  <span
                    className={`text-xl font-extrabold ${
                      highlight ? "text-gold-dark" : "text-forest-deep"
                    }`}
                  >
                    {percent}
                  </span>
                  <span className="text-xs font-semibold leading-snug text-muted">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
