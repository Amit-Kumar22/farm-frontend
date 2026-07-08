import { notFound } from "next/navigation";
import { Newspaper } from "lucide-react";
import Container from "@/components/ui/Container";
import CoverImage from "@/components/ui/CoverImage";
import Button from "@/components/ui/Button";
import { blogApi } from "@/lib/api/blog";
import { ApiError } from "@/lib/apiClient";

async function getPost(slug) {
  try {
    const res = await blogApi.getBySlug(slug);
    return res.data;
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) return null;
    throw err;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  return { title: post ? `${post.title} — MainFarm` : "Post Not Found" };
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const date = new Date(post.publishedAt || post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="py-16">
      <Container className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-wide text-gold-dark">
          {post.category}
        </p>
        <h1 className="mt-2 text-3xl font-extrabold text-forest-deep sm:text-4xl">{post.title}</h1>
        <p className="mt-3 text-sm text-muted">
          By {post.author} · {date}
        </p>

        <CoverImage
          src={post.coverImage}
          icon={Newspaper}
          priority
          className="mt-8 h-72 w-full rounded-2xl"
        />

        <div className="mt-8 whitespace-pre-line text-base leading-relaxed text-ink">
          {post.content}
        </div>

        <div className="mt-10">
          <Button href="/blog" variant="outline">
            ← Back to blog
          </Button>
        </div>
      </Container>
    </article>
  );
}
