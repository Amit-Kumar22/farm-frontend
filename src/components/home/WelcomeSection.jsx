"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Leaf, Sprout, PawPrint, Recycle } from "lucide-react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";

const badges = [
  { icon: Leaf, label: "Sustainable Farming" },
  { icon: Sprout, label: "Organic Products" },
  { icon: PawPrint, label: "Livestock Management" },
  { icon: Recycle, label: "Eco-Friendly" },
];

export default function WelcomeSection() {
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

  const paraClass = "text-[12.5px] leading-[1.6] text-muted sm:text-[13px]";

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-6 sm:py-8 lg:py-8">
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-forest/5 blur-3xl" />

      <Container className="relative grid items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
        {/* Left: image with decorative framing */}
        <div
          className={`relative transition-all duration-700 ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-6 opacity-0"
          }`}
        >
          {/* Decorative gradient panel behind image for extra visual weight */}
          <div className="pointer-events-none absolute -inset-4 -z-10 rotate-2 rounded-[2.5rem] bg-gradient-to-br from-gold/15 via-forest/5 to-transparent" />
          <div className="pointer-events-none absolute -inset-3 rounded-[2rem] border-2 border-gold/25" />
          <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-gold/15 blur-2xl" />

          <div className="group relative h-56 w-full overflow-hidden rounded-2xl shadow-xl sm:h-72 lg:h-full lg:min-h-[300px]">
            <Image
              src="/new.png"
              alt="MAI Integrated Farm ecosystem — goats, ducks, poultry, mushrooms and organic produce"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-deep/40 via-transparent to-transparent" />
          </div>

          {/* Floating glass badge */}
          <div className="absolute -bottom-5 left-5 rounded-xl border border-white/40 bg-white/70 px-4 py-3 shadow-lg backdrop-blur-md sm:left-6">
            <p className="text-lg font-extrabold leading-none text-forest-deep">100%</p>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-muted">
              Organic &amp; Sustainable
            </p>
          </div>
        </div>

        {/* Right: heading + content card */}
        <div
          className={`relative flex flex-col justify-center overflow-hidden rounded-3xl border border-forest/10 bg-white/70 p-5 shadow-xl backdrop-blur-sm transition-all duration-700 sm:p-6 lg:p-7 ${
            isVisible ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"
          }`}
          style={{ transitionDelay: isVisible ? "150ms" : "0ms" }}
        >
          {/* Decorative corner accent */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br from-gold/20 to-transparent blur-2xl" />

          <SectionHeading
            eyebrow="Introduction"
            title="Welcome to MAI Integrated Farm"
            className="max-w-none [&_h2]:text-2xl [&_h2]:sm:text-3xl [&_p]:mb-1"
          />
          <span className="mt-2 block h-1 w-14 rounded-full bg-gradient-to-r from-gold to-gold/20" />

          <div className="relative mt-3 space-y-2">
            <p className={paraClass}>
              MAI INTEGRATED FARM is a diversified integrated farming enterprise
              focused on <strong className="font-semibold text-gold-dark">sustainable agriculture</strong> and{" "}
              <strong className="font-semibold text-forest-deep">livestock management</strong>. The
              business combines goat farming, duck farming, pearl farming,{" "}
              <strong className="font-semibold text-gold-dark">organic farming</strong>, fish farming, dairy
              farming, egg farming, poultry, mushroom cultivation, milk processing, and cow dung
              by-product manufacturing under one ecosystem.
            </p>

            <p className={paraClass}>
              By utilizing natural resources efficiently, the farm minimizes waste while
              maximizing productivity and profitability. The company is committed to producing
              high-quality <strong className="font-semibold text-gold-dark">organic products</strong>, fresh milk,{" "}
              <strong className="font-semibold text-forest-deep">livestock</strong>, pearls, and eco-friendly
              agricultural by-products that meet modern consumer demands.
            </p>

            <p className={paraClass}>
              Through scientific farming practices, animal welfare, and environmentally
              responsible operations, MAI INTEGRATED FARM creates multiple revenue streams while
              promoting rural employment and{" "}
              <strong className="font-semibold text-gold-dark">sustainable development</strong>. The
              integrated farming model strengthens{" "}
              <strong className="font-semibold text-forest-deep">food security</strong>, enhances farm
              productivity, and supports long-term agricultural growth through{" "}
              <strong className="font-semibold text-gold-dark">innovation</strong>, quality, and responsible{" "}
              <strong className="font-semibold text-forest-deep">resource management</strong>.
            </p>
          </div>

          <div className="relative mt-3 flex flex-wrap gap-2">
            {badges.map(({ icon: Icon, label }, i) => (
              <span
                key={label}
                style={{ transitionDelay: isVisible ? `${300 + i * 100}ms` : "0ms" }}
                className={`inline-flex items-center gap-1.5 rounded-full border border-forest/15 bg-forest/5 px-2.5 py-1 text-[11px] font-semibold text-forest-deep transition-all duration-500 hover:-translate-y-0.5 hover:bg-forest/10 hover:shadow-sm ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                }`}
              >
                <Icon size={12} className="text-gold-dark" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
