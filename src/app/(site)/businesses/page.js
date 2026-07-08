import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
      <section className="py-16">
        <Container className="max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-gold-dark">
            What We Do
          </p>
          <h1 className="text-3xl font-extrabold text-forest-deep sm:text-4xl">Our Businesses</h1>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            From fish ponds to mushroom houses — explore every side of MainFarm.
          </p>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          {businesses.length === 0 ? (
            <p className="text-center text-sm text-muted">No businesses published yet.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {businesses.map((biz) => (
                <Link
                  key={biz._id}
                  href={`/businesses/${biz.slug}`}
                  className="group overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <CoverImage
                    src={biz.coverImage}
                    icon={getBusinessIcon(biz.title)}
                    className="h-52 w-full"
                  />
                  <div className="p-6">
                    <p className="font-semibold text-forest-deep">{biz.title}</p>
                    <p className="mt-2 line-clamp-2 text-sm text-muted">{biz.shortDescription}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-gold-dark">
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
