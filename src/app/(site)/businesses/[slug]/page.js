import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import CoverImage from "@/components/ui/CoverImage";
import Button from "@/components/ui/Button";
import { businessesApi } from "@/lib/api/businesses";
import { getBusinessIcon } from "@/lib/businessIcon";
import { ApiError } from "@/lib/apiClient";

async function getBusiness(slug) {
  try {
    const res = await businessesApi.getBySlug(slug);
    return res.data;
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) return null;
    throw err;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const business = await getBusiness(slug);
  return { title: business ? `${business.title} — MainFarm` : "Business Not Found" };
}

export default async function BusinessDetailPage({ params }) {
  const { slug } = await params;
  const business = await getBusiness(slug);
  if (!business) notFound();

  const Icon = getBusinessIcon(business.title);

  return (
    <>
      <section className="relative overflow-hidden">
        <CoverImage
          src={business.coverImage}
          icon={Icon}
          className="absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-0 bg-forest-deep/70" />
        <Container className="relative flex min-h-[320px] flex-col justify-center py-16">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-gold">
            Our Business
          </p>
          <h1 className="text-3xl font-extrabold text-cream sm:text-4xl">{business.title}</h1>
        </Container>
      </section>

      <section className="py-16">
        <Container className="max-w-3xl">
          <p className="whitespace-pre-line text-base leading-relaxed text-muted">
            {business.description}
          </p>

          {business.gallery?.length > 0 && (
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {business.gallery.map((img, i) => (
                <CoverImage key={i} src={img} className="h-40 w-full rounded-xl" />
              ))}
            </div>
          )}

          <div className="mt-10">
            <Button href="/businesses" variant="outline">
              ← Back to all businesses
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
