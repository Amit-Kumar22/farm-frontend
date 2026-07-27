"use client";

import { useEffect, useState } from "react";

export default function NewsTickerMarquee({ items = [] }) {
  const [isPaused, setIsPaused] = useState(false);

  // If no items, show default content
  const tickerItems = items.length > 0 
    ? items 
    : [
        { _id: '1', text: 'Farming' },
        { _id: '2', text: 'Organics' },
        { _id: '3', text: 'Vegetables' },
        { _id: '4', text: 'Agriculture' },
        { _id: '5', text: 'Farming' },
        { _id: '6', text: 'Organics' },
      ];

  // Duplicate items for seamless loop
  const duplicatedItems = [...tickerItems, ...tickerItems, ...tickerItems];

  return (
    <div 
      className="relative overflow-hidden bg-forest py-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="ticker-wrapper">
        <div 
          className={`ticker-content ${isPaused ? 'paused' : ''}`}
          style={{
            display: 'flex',
            gap: '3rem',
            whiteSpace: 'nowrap',
          }}
        >
          {duplicatedItems.map((item, index) => (
            <div
              key={`${item._id}-${index}`}
              className="ticker-item flex items-center gap-3"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              <span className="text-lg font-medium text-cream/60 md:text-xl lg:text-2xl">
                {item.text}
              </span>
              <span className="text-xl text-green-500 md:text-2xl lg:text-3xl">*</span>
            </div>
          ))}
        </div>
      </div>

      {/* CSS animations */}
      <style jsx>{`
        .ticker-wrapper {
          width: 100%;
        }

        .ticker-content {
          animation: scroll 15s linear infinite;
        }

        .ticker-content.paused {
          animation-play-state: paused;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        @media (max-width: 768px) {
          .ticker-content {
            animation-duration: 12s;
          }
        }

        @media (max-width: 640px) {
          .ticker-content {
            animation-duration: 10s;
          }
        }
      `}</style>
    </div>
  );
}
