import Link from "next/link";
import { Newspaper } from "lucide-react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import CoverImage from "../ui/CoverImage";
import { blogApi } from "@/lib/api/blog";

export default async function LatestBlog() {
  const res = await blogApi.list("?limit=3").catch(() => null);
  const posts = res?.data || [];

  return (
    <section className="py-20">
      <Container>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Our Blog" title="Latest Posts & Articles" />
          <Link href="/blog" className="text-sm font-semibold text-gold-dark hover:text-forest-deep">
            View all posts →
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-forest-light/20 bg-cream/50 p-8 text-center">
            <p className="text-sm text-muted">
              No blog posts available yet. Add posts from the Admin Panel to display them here.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug}`}
                className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
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
  );
}
