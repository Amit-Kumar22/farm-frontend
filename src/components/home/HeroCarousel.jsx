"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";
import { resolveImageUrl } from "@/lib/imageUrl";
import Button from "../ui/Button";
import Container from "../ui/Container";

const AUTOPLAY_MS = 6000; // For image slides
const VIDEO_AUTOPLAY_MS = 40000; // For video slides (40 seconds)

export default function HeroCarousel({ slides }) {
  const count = slides.length;
  const [index, setIndex] = useState(0);
  const videoRefs = useRef({});
  const timerRef = useRef(null);

  // Force reset to first slide on component mount
  useEffect(() => {
    setIndex(0);
  }, [slides]);

  const goTo = useCallback((i) => setIndex(((i % count) + count) % count), [count]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  // Auto-rotate with dynamic timing based on slide type
  useEffect(() => {
    if (count <= 1) return undefined;
    
    // Clear existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    // Determine duration based on current slide
    const currentSlide = slides[index];
    const hasVideo = currentSlide?.backgroundVideo;
    const duration = hasVideo ? VIDEO_AUTOPLAY_MS : AUTOPLAY_MS;
    
    // Set timer with appropriate duration
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, duration);
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [count, index, slides]);

  // Control video playback based on active slide
  useEffect(() => {
    Object.keys(videoRefs.current).forEach((key) => {
      const videoElement = videoRefs.current[key];
      if (videoElement) {
        const slideIndex = parseInt(key);
        if (slideIndex === index) {
          // Play video when slide is active
          videoElement.play().catch(() => {
            // Autoplay might be blocked, that's okay
          });
        } else {
          // Pause video when slide is not active
          videoElement.pause();
          videoElement.currentTime = 0; // Reset to beginning
        }
      }
    });
  }, [index]);

  const slide = slides[index];

  // Debug: Log slide data to help troubleshoot
  useEffect(() => {
    if (slide && process.env.NODE_ENV === 'development') {
      const hasVideo = !!slide.backgroundVideo;
      const duration = hasVideo ? VIDEO_AUTOPLAY_MS : AUTOPLAY_MS;
      console.log('Active Hero Slide:', {
        index,
        hasVideo,
        videoUrl: slide.backgroundVideo,
        hasImage: !!slide.backgroundImage,
        imageUrl: slide.backgroundImage,
        autoRotateDuration: `${duration / 1000} seconds`
      });
    }
  }, [index, slide]);

  return (
    <section className="relative overflow-hidden bg-cream-dark">
      {slides.map((s, i) => {
        const bgImage = resolveImageUrl(s.backgroundImage);
        const bgVideo = s.backgroundVideo ? resolveImageUrl(s.backgroundVideo) : null;
        
        // Determine if the media is a video based on extension
        const isVideo = bgVideo && (
          bgVideo.includes('.mp4') || 
          bgVideo.includes('.webm') || 
          bgVideo.includes('.mov') || 
          bgVideo.includes('.avi')
        );
        
        return (
          <div
            key={s._id || i}
            className={clsx(
              "absolute inset-0 h-full w-full transition-opacity duration-700 ease-in-out",
              i === index ? "opacity-100" : "opacity-0"
            )}
          >
            {isVideo && bgVideo ? (
              <>
                <video
                  ref={(el) => {
                    if (el) videoRefs.current[i] = el;
                  }}
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 h-full w-full object-cover"
                  poster={bgImage || undefined}
                  onError={(e) => {
                    console.error('Video failed to load:', bgVideo, e);
                  }}
                  onLoadedData={() => {
                    if (process.env.NODE_ENV === 'development') {
                      console.log('Video loaded successfully:', bgVideo);
                    }
                  }}
                >
                  <source src={bgVideo} type="video/mp4" />
                  <source src={bgVideo} type="video/webm" />
                  <source src={bgVideo} type="video/quicktime" />
                </video>
                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-black/30" />
              </>
            ) : (
              <div
                className="absolute inset-0 h-full w-full bg-center bg-no-repeat"
                style={{
                  backgroundImage: bgImage ? `url(${bgImage})` : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center center',
                }}
              />
            )}
          </div>
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
          <Button href={slide.ctaLink || "/contact"}>{slide.ctaText || "Contact Us"}</Button>
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
