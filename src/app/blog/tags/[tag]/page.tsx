import React from "react";
import type { Blog } from "@/types/globals";
import { blogs as allBlogs } from "#site/content";
import PageHeader from "@/components/page-header";
import Link from "next/link";
import { Tag } from "lucide-react";
import { cn } from "@/lib/utils";

interface TagPageProps {
  params: {
    tag: string;
  };
}

export default function TagPage({ params }: TagPageProps) {
  const decodedTag = decodeURIComponent(params.tag);

  const taggedBlogs = allBlogs
    .filter(
      (blog: Blog) =>
        blog.published && blog.tags?.some(tag => tag.toLowerCase() === decodedTag.toLowerCase()),
    )
    .sort((a: Blog, b: Blog) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Get all tags for tag cloud
  const allTags = Array.from(
    new Set(
      allBlogs
        .filter((blog: Blog) => blog.published && blog.tags)
        .flatMap((blog: Blog) => blog.tags || []),
    ),
  ).sort();

  return (
    <div className="container max-w-6xl py-6 lg:py-10">
      <PageHeader
        title={`Tagged: ${decodedTag}`}
        description={`${taggedBlogs.length} article${taggedBlogs.length !== 1 ? "s" : ""} tagged with "${decodedTag}"`}
      />

      <hr className="my-8" />

      {/* Tag Cloud */}
      <section className="mb-8">
        <h2 className="mb-4 text-lg font-semibold">All Tags</h2>
        <div className="flex flex-wrap gap-2">
          {allTags.map(tag => {
            const isActive = tag.toLowerCase() === decodedTag.toLowerCase();
            return (
              <Link
                key={tag}
                href={`/blog/tags/${encodeURIComponent(tag.toLowerCase())}`}
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                )}
              >
                <Tag className="size-3" />
                {tag}
              </Link>
            );
          })}
        </div>
      </section>

      {/* Tagged Articles */}
      {taggedBlogs.length ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {taggedBlogs.map((blog: Blog) => (
            <article
              key={blog.slug}
              className="group relative overflow-hidden rounded-lg border bg-card shadow-sm transition-all hover:shadow-md"
            >
              <div className="p-6">
                <h3 className="mb-2 text-lg font-bold text-foreground group-hover:text-primary">
                  {blog.title}
                </h3>

                {blog.description && (
                  <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
                    {blog.description}
                  </p>
                )}

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{blog.author}</span>
                  <span>{new Date(blog.date).toLocaleDateString()}</span>
                </div>
              </div>

              <Link href={blog.slug} className="absolute inset-0">
                <span className="sr-only">View Article</span>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">
            No articles found with the tag &quot;{decodedTag}&quot;.
          </p>
          <Link href="/blog" className="mt-4 inline-block text-primary hover:underline">
            ← Back to all articles
          </Link>
        </div>
      )}
    </div>
  );
}
