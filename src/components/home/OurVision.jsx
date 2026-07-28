"use client";

import { useEffect, useRef, useState } from "react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import { Eye, Target } from "lucide-react";

export default function OurVision() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`py-10 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <Container>
        <SectionHeading eyebrow="What Drives Us" title="Our Vision & Mission" align="center" />

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {/* Vision */}
          <div className="group rounded-2xl border border-forest/10 bg-forest/5 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest text-cream shadow-md transition-transform duration-300 group-hover:scale-110">
              <Eye size={22} />
            </span>
            <h3 className="mt-4 text-lg font-bold text-forest-deep">Our Vision</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              To become a leading integrated farming enterprise delivering sustainable
              agricultural solutions, premium livestock products, organic produce, and
              eco-friendly innovations while improving rural livelihoods and environmental
              conservation.
            </p>
          </div>

          {/* Mission */}
          <div className="group rounded-2xl border border-gold/20 bg-gold/5 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-dark text-cream shadow-md transition-transform duration-300 group-hover:scale-110">
              <Target size={22} />
            </span>
            <h3 className="mt-4 text-lg font-bold text-forest-deep">Our Mission</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              To develop a profitable integrated farming ecosystem through modern farming
              techniques, quality livestock management, organic cultivation, value-added
              processing, and environmentally responsible agricultural practices that benefit
              customers and communities.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
