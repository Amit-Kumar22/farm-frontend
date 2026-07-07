import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import CoverImage from "../ui/CoverImage";
import { businessesApi } from "@/lib/api/businesses";
import { getBusinessIcon } from "@/lib/businessIcon";

export default async function ServicesSection() {
  const res = await businessesApi.list("?featured=true").catch(() => null);
  const businesses = res?.data || [];

  if (!businesses.length) return null;

  return (
    <section className="bg-forest-deep py-20">
      <Container>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Our Services" title="Best Agriculture Services" light />
          <Link href="/businesses" className="text-sm font-semibold text-gold hover:text-cream">
            View all businesses →
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {businesses.map((biz) => (
            <Link
              key={biz._id}
              href={`/businesses/${biz.slug}`}
              className="group overflow-hidden rounded-2xl bg-cream shadow-sm transition-transform hover:-translate-y-1"
            >
              <CoverImage
                src={biz.coverImage}
                icon={getBusinessIcon(biz.title)}
                className="h-40 w-full"
              />
              <div className="p-5">
                <p className="font-semibold text-forest-deep">{biz.title}</p>
                <p className="mt-1 line-clamp-2 text-sm text-muted">{biz.shortDescription}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-gold-dark">
                  Learn more <ArrowUpRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
