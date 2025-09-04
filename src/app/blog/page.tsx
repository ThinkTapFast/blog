import React from "react";
import type { Blog } from "@/types/globals";
import { Metadata } from "next";
import PageHeader from "@/components/page-header";
import { blogs as allBlogs } from "#site/content";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { getAuthor } from "@/config/authors";
import { Clock, User } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
};

export default function BlogPage() {
  const blogs = allBlogs
    .filter((blog: Blog) => blog.published)
    .sort((a: Blog, b: Blog) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  return (
    <div className="container max-w-6xl py-6 lg:py-10">
      <PageHeader title="Blog" description="A blog using velite. Posts are written in MDX" />
      <hr className="my-8" />

      {blogs.length ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog: Blog) => {
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
                  </div>
                )}

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex-1">
                    <h2 className="mb-2 text-xl font-bold text-foreground group-hover:text-primary">
                      {blog.title}
                    </h2>
                    
                    {blog.description && (
                      <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
                        {blog.description}
                      </p>
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
                        <span>5 min read</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Link href={blog.slug} className="absolute inset-0">
                  <span className="sr-only">View Article</span>
                </Link>
              </article>
            );
          })}
        </div>
      ) : (
        <p>No Blogs found</p>
      )}
    </div>
  );
}
