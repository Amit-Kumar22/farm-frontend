import Link from "next/link";
import { Newspaper } from "lucide-react";
import Container from "@/components/ui/Container";
import CoverImage from "@/components/ui/CoverImage";
import { blogApi } from "@/lib/api/blog";

export const metadata = { title: "Blog — MainFarm" };

export default async function BlogPage() {
  const res = await blogApi.list().catch(() => null);
  const posts = res?.data || [];

  return (
    <>
      <section className="py-16">
        <Container className="max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-gold-dark">
            Our Blog
          </p>
          <h1 className="text-3xl font-extrabold text-forest-deep sm:text-4xl">
            Latest Posts &amp; Articles
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            News, guides and updates from across our farms.
          </p>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          {posts.length === 0 ? (
            <p className="text-center text-sm text-muted">No posts published yet.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug}`}
                  className="group overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <CoverImage src={post.coverImage} icon={Newspaper} className="h-48 w-full" />
                  <div className="p-6">
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
