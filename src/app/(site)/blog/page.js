import Link from "next/link";
import { Newspaper } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import Container from "@/components/ui/Container";
import CoverImage from "@/components/ui/CoverImage";
import { blogApi } from "@/lib/api/blog";

export const metadata = { title: "Blog — MainFarm" };

export default async function BlogPage() {
  const res = await blogApi.list().catch(() => null);
  const posts = res?.data || [];

  return (
    <>
      <PageHeader
        eyebrow="Our Blog"
        title="Latest Posts & Articles"
        subtitle="News, guides and updates from across our farms."
      />
      <section className="py-16">
        <Container>
          {posts.length === 0 ? (
            <p className="text-center text-sm text-muted">No posts published yet.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug}`}
                  className="group overflow-hidden rounded-2xl bg-white shadow-sm"
                >
                  <CoverImage src={post.coverImage} icon={Newspaper} className="h-44 w-full" />
                  <div className="p-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gold-dark">
                      {post.category}
                    </p>
                    <p className="mt-2 font-semibold text-forest-deep group-hover:underline">
                      {post.title}
                    </p>
                    <p className="mt-2 line-clamp-2 text-sm text-muted">{post.excerpt}</p>
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
