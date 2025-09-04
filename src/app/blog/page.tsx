"use client";

import React, { useState } from "react";
import type { Blog } from "@/types/globals";
import PageHeader from "@/components/page-header";
import { blogs as allBlogs } from "#site/content";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { getAuthor } from "@/config/authors";
import { Clock, Sparkles } from "lucide-react";
import { BlogSearch } from "@/components/blog-search";
import { BlogTags } from "@/components/blog-tags";

export default function BlogPage() {
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);

  const publishedBlogs = allBlogs
    .filter((blog: Blog) => blog.published)
    .sort((a: Blog, b: Blog) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const featuredBlogs = publishedBlogs.filter((blog: Blog) => blog.featured);
  const regularBlogs = filteredBlogs.length > 0 ? filteredBlogs : publishedBlogs;

  return (
    <div className="container max-w-7xl py-6 lg:py-10">
      <PageHeader
        title="Blog"
        description="Discover insights, tutorials, and thoughts about modern web development"
      />

      <hr className="my-8" />

      {/* Search and Filter */}
      <BlogSearch blogs={publishedBlogs} onFilter={setFilteredBlogs} className="mb-8" />

      {/* Featured Posts Section */}
      {featuredBlogs.length > 0 && filteredBlogs.length === 0 && (
        <section className="mb-12">
          <div className="mb-6 flex items-center gap-2">
            <Sparkles className="size-5 text-yellow-500" />
            <h2 className="text-2xl font-bold">Featured Articles</h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {featuredBlogs.slice(0, 2).map((blog: Blog) => {
              const author = getAuthor(blog.author || "");

              return (
                <article
                  key={blog.slug}
                  className="group relative overflow-hidden rounded-xl border bg-gradient-to-br from-primary/5 to-secondary/5 p-1"
                >
                  <div className="h-full rounded-lg bg-card p-6">
                    {blog.image && (
                      <div className="relative mb-4 aspect-video overflow-hidden rounded-lg">
                        <Image
                          src={blog.image}
                          alt={blog.title}
                          width={600}
                          height={300}
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute left-3 top-3 rounded-full bg-yellow-500 px-2 py-1 text-xs font-medium text-black">
                          Featured
                        </div>
                      </div>
                    )}

                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary">
                        {blog.title}
                      </h3>

                      {blog.description && (
                        <p className="text-muted-foreground">{blog.description}</p>
                      )}

                      {blog.tags && <BlogTags tags={blog.tags} size="sm" />}

                      <div className="flex items-center justify-between pt-4">
                        <div className="flex items-center gap-3">
                          <Image
                            src={author?.avatar || "/images/author/abdelkabir.jpeg"}
                            alt={blog.author}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                          <div>
                            <p className="font-medium text-foreground">{blog.author}</p>
                            <p className="text-xs text-muted-foreground">{formatDate(blog.date)}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="size-3" />
                          <span>{blog.readTime || 5} min read</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Link href={`/blog/${blog.slugAsParams}`} className="absolute inset-0">
                    <span className="sr-only">View Article</span>
                  </Link>
                </article>
              );
            })}
          </div>

          <hr className="my-12" />
        </section>
      )}

      {/* All Posts Section */}
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-bold">
            {filteredBlogs.length > 0 ? "Search Results" : "All Articles"}
          </h2>
        </div>

        {regularBlogs.length ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {regularBlogs.map((blog: Blog) => {
              const author = getAuthor(blog.author || "");

              return (
                <article
                  key={blog.slug}
                  className="group relative flex flex-col overflow-hidden rounded-lg border bg-card shadow-sm transition-all hover:shadow-md"
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

                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex-1">
                      <h3 className="mb-2 text-xl font-bold text-foreground group-hover:text-primary">
                        {blog.title}
                      </h3>

                      {blog.description && (
                        <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
                          {blog.description}
                        </p>
                      )}

                      {blog.tags && (
                        <BlogTags tags={blog.tags.slice(0, 3)} size="sm" className="mb-4" />
                      )}
                    </div>

                    {/* Author and Meta Info */}
                    <div className="mt-auto space-y-3">
                      {/* Author Info */}
                      {blog.author && (
                        <div className="flex items-center gap-3">
                          <Image
                            src={author?.avatar || "/images/author/abdelkabir.jpeg"}
                            alt={blog.author}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                          <div className="flex-1 text-sm">
                            <p className="font-medium text-foreground">{blog.author}</p>
                            <p className="text-xs text-muted-foreground">
                              @{author?.username || blog.author.toLowerCase()}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Date and Reading Time */}
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        {blog.date && (
                          <div className="flex items-center gap-1">
                            <span>{formatDate(blog.date)}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Clock className="size-3" />
                          <span>{blog.readTime || 5} min read</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Link href={`/blog/${blog.slugAsParams}`} className="absolute inset-0">
                    <span className="sr-only">View Article</span>
                  </Link>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">No articles found matching your criteria.</p>
          </div>
        )}
      </section>
    </div>
  );
}
