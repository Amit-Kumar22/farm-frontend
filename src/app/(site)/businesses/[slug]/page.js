import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Container from "@/components/ui/Container";
import CoverImage from "@/components/ui/CoverImage";
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
    <article className="py-16">
      <Container className="max-w-3xl">
        <Link
          href="/businesses"
          className="inline-flex items-center gap-1 text-xs font-semibold text-gold-dark hover:text-forest-deep"
        >
          <ArrowLeft size={14} /> All Businesses
        </Link>

        <h1 className="mt-4 text-3xl font-extrabold text-forest-deep sm:text-4xl">
          {business.title}
        </h1>
        <p className="mt-3 text-base text-muted">{business.shortDescription}</p>

        <CoverImage
          src={business.coverImage}
          icon={Icon}
          priority
          className="mt-8 h-80 w-full rounded-2xl"
        />

        <div className="mt-8 whitespace-pre-line text-base leading-relaxed text-ink">
          {business.description}
        </div>

        {business.gallery?.length > 0 && (
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {business.gallery.map((img, i) => (
              <CoverImage key={i} src={img} className="h-40 w-full rounded-xl" />
            ))}
          </div>
        )}
      </Container>
    </article>
  );
}
