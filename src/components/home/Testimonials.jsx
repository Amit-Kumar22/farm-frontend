import { Star, Quote, Users } from "lucide-react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import Card from "../ui/Card";
import CoverImage from "../ui/CoverImage";
import { testimonialsApi } from "@/lib/api/testimonials";

export default async function Testimonials() {
  const res = await testimonialsApi.list().catch(() => null);
  const testimonials = res?.data || [];

  if (!testimonials.length) return null;

  return (
    <section className="py-20 bg-cream/30">
      <Container>
        <SectionHeading
          eyebrow="Testimonial"
          title="What our customers say"
          align="center"
          className="mx-auto"
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t._id} className="relative bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              {/* Star Rating - Top Left */}
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    fill={i < (t.rating || 5) ? "#D4AF37" : "none"} 
                    className={i < (t.rating || 5) ? "text-[#D4AF37]" : "text-gray-300"}
                    strokeWidth={1.5}
                  />
                ))}
              </div>
              
              {/* Large Quote Icon - Top Right */}
              <div className="absolute right-6 top-6">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="text-gray-700 opacity-60">
                  <path d="M10 8C10 5.79086 8.20914 4 6 4C3.79086 4 2 5.79086 2 8C2 10.2091 3.79086 12 6 12C6.55228 12 7 12.4477 7 13V15C7 16.6569 5.65685 18 4 18C3.44772 18 3 18.4477 3 19C3 19.5523 3.44772 20 4 20C6.76142 20 9 17.7614 9 15V13C9 11.3431 7.65685 10 6 10C4.89543 10 4 9.10457 4 8C4 6.89543 4.89543 6 6 6C7.10457 6 8 6.89543 8 8C8 8.55228 8.44772 9 9 9C9.55228 9 10 8.55228 10 8Z" fill="currentColor"/>
                  <path d="M22 8C22 5.79086 20.2091 4 18 4C15.7909 4 14 5.79086 14 8C14 10.2091 15.7909 12 18 12C18.5523 12 19 12.4477 19 13V15C19 16.6569 17.6569 18 16 18C15.4477 18 15 18.4477 15 19C15 19.5523 15.4477 20 16 20C18.7614 20 21 17.7614 21 15V13C21 11.3431 19.6569 10 18 10C16.8954 10 16 9.10457 16 8C16 6.89543 16.8954 6 18 6C19.1046 6 20 6.89543 20 8C20 8.55228 20.4477 9 21 9C21.5523 9 22 8.55228 22 8Z" fill="currentColor"/>
                </svg>
              </div>
              
              {/* Testimonial Text */}
              <p className="mt-6 text-sm leading-relaxed text-gray-600 pr-4">
                "{t.message}"
              </p>
              
              {/* Profile Section */}
              <div className="mt-6 flex items-center gap-3">
                <CoverImage src={t.avatar} icon={Users} className="h-12 w-12 rounded-full border-2 border-green-600" />
                <div>
                  <p className="text-sm font-bold text-gray-900">{t.name}</p>
                  {t.designation && (
                    <p className="text-xs text-gray-500 uppercase tracking-wide">{t.designation}</p>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
