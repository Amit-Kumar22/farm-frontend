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
    <section className="py-20">
      <Container>
        <SectionHeading
          eyebrow="Testimonial"
          title="What Our Customers Say"
          align="center"
          className="mx-auto"
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t._id} className="p-6">
              <Quote className="text-gold" size={24} />
              <p className="mt-4 text-sm leading-relaxed text-muted">{t.message}</p>
              <div className="mt-5 flex items-center gap-3">
                <CoverImage src={t.avatar} icon={Users} className="h-11 w-11 rounded-full" />
                <div>
                  <p className="text-sm font-semibold text-forest-deep">{t.name}</p>
                  {t.designation && <p className="text-xs text-muted">{t.designation}</p>}
                </div>
                <div className="ml-auto flex gap-0.5 text-gold">
                  {Array.from({ length: t.rating || 5 }).map((_, i) => (
                    <Star key={i} size={13} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
