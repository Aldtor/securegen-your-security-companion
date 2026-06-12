import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { POSTS } from "@/lib/blog-data";
import { Calendar, Clock, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = POSTS.find(p => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    return {
      meta: [
        { title: post ? `${post.title} | SecureGen` : "Article | SecureGen" },
        { name: "description", content: post?.excerpt ?? "" },
        { property: "og:title", content: post?.title ?? "" },
        { property: "og:description", content: post?.excerpt ?? "" },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/blog/${post?.slug ?? ""}` },
      ],
      links: [{ rel: "canonical", href: `/blog/${post?.slug ?? ""}` }],
      scripts: post ? [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          datePublished: post.date,
          description: post.excerpt,
          author: { "@type": "Organization", name: "SecureGen" },
        }),
      }] : [],
    };
  },
  component: Post,
});

function Post() {
  const { post } = Route.useLoaderData();
  return (
    <div className="mesh-bg min-h-[calc(100vh-4rem)]">
      <article className="container mx-auto px-4 py-16 max-w-3xl">
        <Link to="/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"><ArrowLeft className="h-4 w-4 mr-1" />All articles</Link>
        <div className="text-xs text-accent font-medium mb-3">{post.category}</div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8 pb-8 border-b border-border">
          <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{post.date}</span>
          <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{post.readTime}</span>
        </div>
        <div className="prose prose-lg max-w-none text-foreground/90 leading-relaxed whitespace-pre-line text-base md:text-lg">{post.content}</div>
      </article>
    </div>
  );
}