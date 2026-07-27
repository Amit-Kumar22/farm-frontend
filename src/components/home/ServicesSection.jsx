import Link from "next/link";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import ServicesCarousel from "./ServicesCarousel";
import { businessesApi } from "@/lib/api/businesses";

export default async function ServicesSection() {
  const res = await businessesApi.list().catch(() => null);
  const businesses = res?.data || [];

  return (
    <section className="bg-forest-deep py-20">
      <Container>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Our Services" title="Best Agriculture Services" light />
          <Link href="/businesses" className="text-sm font-semibold text-gold hover:text-cream">
            View all businesses →
          </Link>
        </div>

        {businesses.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-cream/20 bg-cream/10 p-8 text-center">
            <p className="text-sm text-cream/80">
              No services available yet. Add services from the Admin Panel to display them here.
            </p>
          </div>
        ) : (
          <ServicesCarousel businesses={businesses} />
        )}
      </Container>
    </section>
  );
}
