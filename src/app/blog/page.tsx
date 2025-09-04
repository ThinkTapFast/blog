"use client";

import React from "react";
import type { Blog } from "@/types/globals";
import PageHeader from "@/components/page-header";
import { blogs as allBlogs } from "#site/content";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { getAuthor } from "@/config/authors";
import { Clock } from "lucide-react";
import { BlogTags } from "@/components/blog-tags";

export default function BlogPage() {
  const publishedBlogs = allBlogs
    .filter((blog: Blog) => blog.published)
    .sort((a: Blog, b: Blog) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="container max-w-7xl py-6 lg:py-10">
      <PageHeader
        title="Blog"
        description="Discover insights, tutorials, and thoughts about modern web development"
      />

      <hr className="my-8" />

      {/* Articles Grid */}
      <section>
        <div className="mb-8">
          <h2 className="text-2xl font-bold">All Articles</h2>
          <p className="mt-2 text-muted-foreground">{publishedBlogs.length} articles published</p>
        </div>

        {publishedBlogs.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {publishedBlogs.map((blog: Blog) => {
              const author = getAuthor(blog.author || "");

              return (
                <article
                  key={blog.slug}
                  className="group relative overflow-hidden rounded-lg border bg-card transition-all hover:shadow-md"
                >
                  {blog.image && (
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        width={400}
                        height={225}
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                      {blog.featured && (
                        <div className="absolute right-3 top-3 rounded-full bg-yellow-500 px-2 py-1 text-xs font-medium text-black">
                          Featured
                        </div>
                      )}
                    </div>
                  )}

                  <div className="p-6">
                    <div className="space-y-3">
                      <h3 className="line-clamp-2 text-lg font-semibold text-foreground group-hover:text-primary">
                        {blog.title}
                      </h3>

                      {blog.description && (
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                          {blog.description}
                        </p>
                      )}

                      {blog.tags && <BlogTags tags={blog.tags.slice(0, 2)} size="sm" />}

                      <div className="flex items-center justify-between border-t pt-3">
                        <div className="flex items-center gap-2">
                          <Image
                            src={author?.avatar || "/images/author/abdelkabir.jpeg"}
                            alt={blog.author}
                            width={28}
                            height={28}
                            className="rounded-full"
                          />
                          <div>
                            <p className="text-sm font-medium text-foreground">{blog.author}</p>
                            <p className="text-xs text-muted-foreground">{formatDate(blog.date)}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="size-3" />
                          <span>{blog.readTime || 5}m</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Link href={`/blog/${blog.slugAsParams}`} className="absolute inset-0">
                    <span className="sr-only">Read {blog.title}</span>
                  </Link>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">No articles found.</p>
          </div>
        )}
      </section>
    </div>
  );
}
