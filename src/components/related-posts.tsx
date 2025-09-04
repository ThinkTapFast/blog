"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { Clock, ArrowRight } from "lucide-react";
import { getAuthor } from "@/config/authors";
import type { Blog } from "@/types/globals";

interface RelatedPostsProps {
  currentPost: Blog;
  allPosts: Blog[];
  maxPosts?: number;
}

export function RelatedPosts({ currentPost, allPosts, maxPosts = 3 }: RelatedPostsProps) {
  // Find related posts based on author and exclude current post
  const relatedPosts = React.useMemo(() => {
    const otherPosts = allPosts.filter(post => post.slug !== currentPost.slug && post.published);

    // Prioritize posts by same author
    const sameAuthorPosts = otherPosts.filter(post => post.author === currentPost.author);

    // Get other recent posts if we don't have enough from same author
    const recentPosts = otherPosts
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, maxPosts * 2);

    // Combine and deduplicate
    const combined = [...sameAuthorPosts, ...recentPosts];
    const unique = combined.filter(
      (post, index, arr) => arr.findIndex(p => p.slug === post.slug) === index,
    );

    return unique.slice(0, maxPosts);
  }, [currentPost, allPosts, maxPosts]);

  if (relatedPosts.length === 0) return null;

  return (
    <section className="mt-12 border-t pt-12">
      <div className="mb-8">
        <h2 className="mb-2 text-2xl font-bold text-foreground">Related Articles</h2>
        <p className="text-muted-foreground">Continue reading with these related posts</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {relatedPosts.map(post => {
          const author = getAuthor(post.author || "");

          return (
            <article
              key={post.slug}
              className="group relative overflow-hidden rounded-lg border bg-card transition-all hover:shadow-md"
            >
              {post.image && (
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={300}
                    height={200}
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
              )}

              <div className="p-4">
                <h3 className="mb-2 line-clamp-2 font-semibold text-foreground group-hover:text-primary">
                  {post.title}
                </h3>

                {post.description && (
                  <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
                    {post.description}
                  </p>
                )}

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    {author?.avatar && (
                      <Image
                        src={author.avatar}
                        alt={post.author || ""}
                        width={16}
                        height={16}
                        className="rounded-full"
                      />
                    )}
                    <span>{post.author}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Clock className="size-3" />
                    <span>5m read</span>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <time className="text-xs text-muted-foreground">{formatDate(post.date)}</time>

                  <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </div>
              </div>

              <Link href={`/blog/${post.slugAsParams}`} className="absolute inset-0">
                <span className="sr-only">Read {post.title}</span>
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}
