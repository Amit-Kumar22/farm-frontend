import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import Container from "@/components/ui/Container";
import CoverImage from "@/components/ui/CoverImage";
import { businessesApi } from "@/lib/api/businesses";
import { getBusinessIcon } from "@/lib/businessIcon";

export const metadata = {
  title: "Our Businesses — MainFarm",
};

export default async function BusinessesPage() {
  const res = await businessesApi.list().catch(() => null);
  const businesses = res?.data || [];

  return (
    <>
      <PageHeader
        eyebrow="What We Do"
        title="Our Businesses"
        subtitle="From fish ponds to mushroom houses — explore every side of MainFarm."
      />
      <section className="py-16">
        <Container>
          {businesses.length === 0 ? (
            <p className="text-center text-sm text-muted">No businesses published yet.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {businesses.map((biz) => (
                <Link
                  key={biz._id}
                  href={`/businesses/${biz.slug}`}
                  className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-transform hover:-translate-y-1"
                >
                  <CoverImage
                    src={biz.coverImage}
                    icon={getBusinessIcon(biz.title)}
                    className="h-48 w-full"
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
          )}
        </Container>
      </section>
    </>
  );
}
