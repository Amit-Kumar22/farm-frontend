"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import { Leaf } from "lucide-react";

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
      className={`py-12 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-2">
          {/* Vision Content */}
          <div className="order-2 lg:order-1">
            <SectionHeading eyebrow="Our Vision" title="Leading the Future of Sustainable Agriculture" />
            
            <div className="mt-4 space-y-3">
              <p className="text-sm leading-relaxed text-muted">
               To enhance farmers' productivity and improve their economic condition through sustainable integrated farming, creating a path toward higher income, better livelihoods, and long-term agricultural growth.
              </p>
              
              {/* <p className="text-base leading-relaxed text-muted">
                Through our 10 interconnected projects, we're demonstrating that farming can be 
                both profitable and environmentally responsible, setting a new standard for 
                agricultural excellence in Bihar and beyond.
              </p> */}
            </div>

            {/* Vision Highlights */}
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="flex items-start gap-2.5 rounded-xl bg-forest/5 p-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forest/10 text-forest">
                  <Leaf size={16} />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-forest-deep">Sustainability First</h3>
                  <p className="mt-0.5 text-xs text-muted">
                    Zero-waste farming with natural methods
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 rounded-xl bg-forest/5 p-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forest/10 text-forest">
                  <Leaf size={16} />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-forest-deep">Community Impact</h3>
                  <p className="mt-0.5 text-xs text-muted">
                    Empowering local farmers & communities
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Vision Image */}
          <div className="order-1 lg:order-2">
            <div className="relative h-[280px] w-full overflow-hidden rounded-2xl shadow-xl lg:h-[350px]">
              <div className="absolute inset-0 bg-gradient-to-br from-forest/20 to-transparent z-10" />
              <Image
                src="/ok.jpeg"
                alt="Our Vision - Sustainable Integrated Farming"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
