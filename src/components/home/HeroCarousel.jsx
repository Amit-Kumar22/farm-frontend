"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";
import { resolveImageUrl } from "@/lib/imageUrl";
import Button from "../ui/Button";
import Container from "../ui/Container";

const AUTOPLAY_MS = 6000;

export default function HeroCarousel({ slides }) {
  const count = slides.length;
  const [index, setIndex] = useState(0);

  const goTo = useCallback((i) => setIndex(((i % count) + count) % count), [count]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (count <= 1) return undefined;
    const timer = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [count]);

  const slide = slides[index];

  return (
    <section className="relative overflow-hidden bg-cream-dark">
      {slides.map((s, i) => {
        const bgImage = resolveImageUrl(s.backgroundImage);
        return (
          <div
            key={s._id || i}
            className={clsx(
              "absolute inset-0 h-full w-full bg-center bg-no-repeat transition-opacity duration-700 ease-in-out",
              i === index ? "opacity-100" : "opacity-0"
            )}
            style={{
              backgroundImage: bgImage ? `url(${bgImage})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
            }}
          />
        );
      })}

      <Container className="relative flex min-h-[560px] flex-col justify-center pb-20 pt-32">
        <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-gold drop-shadow-lg">
          Welcome to MainFarm
        </p>
        <h1 className="max-w-2xl text-4xl font-extrabold leading-tight text-cream drop-shadow-lg sm:text-5xl">
          {slide.title}
        </h1>
        {slide.subtitle && (
          <p className="mt-5 max-w-xl text-base text-cream/90 drop-shadow-lg">{slide.subtitle}</p>
        )}
        <div className="mt-8">
          <Button href={slide.ctaLink || "/businesses"}>{slide.ctaText || "Contact Us"}</Button>
        </div>
      </Container>

      {count > 1 && (
        <div className="absolute inset-x-0 bottom-20 z-10 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-cream/15 text-cream backdrop-blur transition-colors hover:bg-cream/25"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={clsx(
                  "h-2 rounded-full transition-all",
                  i === index ? "w-6 bg-gold" : "w-2 bg-cream/50 hover:bg-cream/70"
                )}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-cream/15 text-cream backdrop-blur transition-colors hover:bg-cream/25"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </section>
  );
}
