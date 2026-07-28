"use client";

import { useEffect, useRef, useState } from "react";
import { UserRound, Sparkles } from "lucide-react";
import Container from "../ui/Container";

export default function FounderSection() {
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
      <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-forest/5 blur-3xl" />

      <Container className="relative">
        <div
          className={`overflow-hidden rounded-3xl border border-black/5 bg-white shadow-xl transition-all duration-700 hover:shadow-2xl lg:grid lg:grid-cols-5 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          {/* Left: photo panel */}
          <div className="group relative flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-forest-light to-forest-deep p-8 lg:col-span-2">
            <Sparkles className="absolute right-6 top-6 h-7 w-7 text-gold/70" />

            <div className="flex h-32 w-32 items-center justify-center rounded-2xl border-4 border-cream/40 bg-white/10 shadow-lg transition-transform duration-500 group-hover:scale-105 sm:h-36 sm:w-36">
              <UserRound className="h-16 w-16 text-cream/80" strokeWidth={1.25} />
            </div>

            <div className="w-full max-w-[220px] rounded-xl bg-white/10 px-4 py-3 text-center backdrop-blur-sm">
              <p className="text-base font-bold text-cream">Anil Kumar</p>
              <p className="text-xs text-cream/70">Founder and Director</p>
            </div>
          </div>

          {/* Right: text content */}
          <div className="flex flex-col justify-center gap-3 p-8 lg:col-span-3 lg:p-10">
            <h2 className="text-3xl font-extrabold leading-tight text-forest-deep sm:text-4xl">
              Founder / Director
            </h2>
            <p className="text-sm leading-relaxed text-muted">
              <strong className="text-forest-deep">Anil Kumar</strong> leads{" "}
              <strong className="text-forest-deep">MAI INTEGRATED FARM</strong>{" "}
              with a vision of building a sustainable, diversified farming
              enterprise. Focused on innovation, organic agriculture, livestock
              management, and value-added processing, he is committed to
              creating long-term agricultural growth, rural employment, and
              environmentally responsible farming solutions.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
