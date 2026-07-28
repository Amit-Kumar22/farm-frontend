"use client";

import React from "react";
import { Building2, Users, CheckCircle2 } from "lucide-react";

const markets = [
  {
    title: "B2B (Business to Business)",
    icon: Building2,
    items: [
      {
        title: "Restaurants",
        desc: "Hotels and restaurants requiring fresh dairy, meat, and organic farm supplies.",
      },
      {
        title: "Distributors",
        desc: "Wholesale distributors sourcing livestock products, dairy products, and organic produce regularly.",
      },
      {
        title: "Retailers",
        desc: "Supermarkets and agricultural outlets selling premium farming and dairy products.",
      },
      {
        title: "Industries",
        desc: "Organic fertilizer manufacturers and agricultural businesses purchasing cow dung by-products.",
      },
    ],
  },
  {
    title: "B2C (Business to Consumer)",
    icon: Users,
    items: [
      {
        title: "Families",
        desc: "Health-conscious families seeking fresh dairy, organic produce, and premium farm products.",
      },
      {
        title: "Consumers",
        desc: "Customers preferring naturally grown agricultural products and chemical-free food alternatives.",
      },
      {
        title: "Retail",
        desc: "Local grocery stores purchasing fresh organic vegetables, dairy, and livestock products.",
      },
      {
        title: "Households",
        desc: "Daily household demand for milk, organic food, and eco-friendly farming products.",
      },
    ],
  },
];

export default function TargetMarket() {
  return (
    <section className="py-12 bg-[#F9F8F3]">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}

        <div className="text-center mb-10">

          <span className="inline-block text-[#C6922D] font-semibold tracking-wider uppercase text-sm">
            Our Market
          </span>

          <h2 className="text-3xl md:text-4xl font-bold text-[#263B15] mt-2">
            Target Market
          </h2>

          <div className="w-24 h-1 bg-[#C6922D] rounded-full mx-auto mt-3"></div>

          <p className="text-gray-600 text-sm md:text-base mt-5 max-w-2xl mx-auto">
            Serving businesses and consumers with premium dairy,
            livestock and organic farming products.
          </p>

        </div>

        {/* Cards */}

        <div className="grid lg:grid-cols-2 gap-8">

          {markets.map((market, index) => {
            const Icon = market.icon;

            return (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
              >
                {/* Header */}

                <div className="bg-[#4E6630] px-6 py-5 flex items-center gap-4">

                  <div className="w-14 h-14 rounded-2xl bg-[#617B42] flex items-center justify-center">

                    <Icon className="w-7 h-7 text-white" />

                  </div>

                  <h3 className="text-white text-xl font-semibold">
                    {market.title}
                  </h3>

                </div>

                {/* Body */}

                <div className="p-6 space-y-4">

                  {market.items.map((item, i) => (

                    <div
                      key={i}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2
                        size={18}
                        className="text-[#4E6630] mt-1 flex-shrink-0"
                      />

                      <p className="text-[14px] leading-6 text-gray-600">

                        <span className="font-semibold text-[#263B15]">
                          {item.title}:
                        </span>{" "}
                        {item.desc}

                      </p>

                    </div>

                  ))}

                </div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}