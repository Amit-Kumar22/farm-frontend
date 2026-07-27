"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";
import CoverImage from "../ui/CoverImage";
import { getBusinessIcon } from "@/lib/businessIcon";

const CARDS_PER_SLIDE = 4;
const AUTO_SLIDE_INTERVAL = 5000; // 5 seconds

export default function ServicesCarousel({ businesses }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const timerRef = useRef(null);

  // Calculate total number of slides
  const totalSlides = Math.ceil(businesses.length / CARDS_PER_SLIDE);

  // Force reset to first slide on component mount
  useEffect(() => {
    setCurrentIndex(0);
  }, [businesses]);

  // Get current slide cards
  const getCurrentCards = useCallback(() => {
    const start = currentIndex * CARDS_PER_SLIDE;
    const end = start + CARDS_PER_SLIDE;
    return businesses.slice(start, end);
  }, [currentIndex, businesses]);

  // Navigation functions
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (totalSlides <= 1 || isPaused) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      return;
    }

    timerRef.current = setInterval(goToNext, AUTO_SLIDE_INTERVAL);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [totalSlides, isPaused, goToNext]);

  // Touch handlers for swipe support
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrev();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  // Pause on hover
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  const currentCards = getCurrentCards();

  // If only 4 or fewer businesses, show them all without carousel
  if (businesses.length <= CARDS_PER_SLIDE) {
    return (
      <div className="mt-10 grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {businesses.map((biz) => (
          <ServiceCard key={biz._id} business={biz} />
        ))}
      </div>
    );
  }

  return (
    <div 
      className="mt-10 relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Cards Grid */}
      <div className="grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {currentCards.map((biz, index) => (
          <div
            key={biz._id}
            className="animate-fade-in"
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            <ServiceCard business={biz} />
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      {totalSlides > 1 && (
        <>
          {/* Previous Button */}
          <button
            onClick={goToPrev}
            aria-label="Previous slide"
            className="absolute -left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border-2 border-cream bg-cream/10 text-cream backdrop-blur transition-all hover:bg-cream/20 focus:outline-none focus:ring-2 focus:ring-cream/50 lg:-left-6"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Next Button */}
          <button
            onClick={goToNext}
            aria-label="Next slide"
            className="absolute -right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border-2 border-cream bg-cream/10 text-cream backdrop-blur transition-all hover:bg-cream/20 focus:outline-none focus:ring-2 focus:ring-cream/50 lg:-right-6"
          >
            <ChevronRight size={20} />
          </button>

          {/* Dots Indicator */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={clsx(
                  "h-2 rounded-full transition-all",
                  index === currentIndex
                    ? "w-6 bg-gold"
                    : "w-2 bg-cream/40 hover:bg-cream/60"
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// Separate ServiceCard component for reusability
function ServiceCard({ business }) {
  return (
    <Link
      href={`/businesses/${business.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-cream shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-forest/10">
        <CoverImage
          src={business.coverImage}
          icon={getBusinessIcon(business.title)}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-1 font-semibold text-forest-deep">
          {business.title}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted">
          {business.shortDescription}
        </p>
        <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-gold-dark transition-colors group-hover:text-gold">
          Learn more <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}
