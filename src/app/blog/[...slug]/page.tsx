import React from "react";
import type { Blog } from "@/types/globals";
import { Metadata } from "next";
import { blogs as allBlogs } from "#site/content";
import { cn } from "@/lib/utils";
import "@/styles/mdx.css";

import Image from "next/image";
import { Mdx } from "@/components/mdx-component";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { BlogAuthorHeader } from "@/components/blog-author-header";
import { BlogSidebar } from "@/components/blog-sidebar";
import { ClientOnly } from "@/components/client-only";
import { RelatedPosts } from "@/components/related-posts";
import { BlogTags } from "@/components/blog-tags";
import { TracingBeam } from "@/components/ui/tracing-beam";

interface BlogPageItemProps {
  readonly params: {
    readonly slug: string[];
  };
}

async function getBlogFromParams(params: BlogPageItemProps["params"]) {
  const slug = params?.slug.join("/");
  const blog = allBlogs.find((blog: Blog) => blog.slugAsParams === slug);
  if (!blog) {
    return null;
  }
  return blog;
}

export async function generateMetadata({ params }: BlogPageItemProps): Promise<Metadata> {
  const blog = await getBlogFromParams(params);

  if (!blog) {
    return {};
  }

  return {
    title: blog.title,
    description: blog.description,
    authors: {
      name: blog.author,
    },
  };
}

export async function generateStaticParams(): Promise<BlogPageItemProps["params"][]> {
  return allBlogs.map((blog: Blog) => ({
    slug: blog.slugAsParams.split("/"),
  }));
}

export default async function BlogPageItem({ params }: Readonly<BlogPageItemProps>) {
  const blog = await getBlogFromParams(params);

  if (!blog) {
    // Return a simple 404 page
    return (
      <div className="container max-w-3xl py-20 text-center">
        <h1 className="mb-4 text-4xl font-bold">404 - Blog Not Found</h1>
        <p className="mb-8">Sorry, the blog post you are looking for does not exist.</p>
        <Link href="/blog" className={cn(buttonVariants({ variant: "ghost" }))}>
          <ChevronLeft className="mr-2 size-4" />
          See all Blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="container relative py-6 lg:py-10">
      <div className="mx-auto max-w-7xl">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Main Article Content */}
          <article className="lg:col-span-3">
            {/* Enhanced Author Header Section */}
            <BlogAuthorHeader
              authorName={blog.author || "Anonymous"}
              publishDate={blog.date}
              readTime="5 min" // You can calculate this dynamically later
            />

            <h1 className="mt-2 inline-block text-4xl font-bold capitalize leading-tight text-primary lg:text-5xl">
              {blog.title}
            </h1>

            {/* Tags */}
            {blog.tags && (
              <div className="mt-4">
                <BlogTags tags={blog.tags} />
              </div>
            )}

            {blog.image && (
              <Image
                src={blog.image}
                alt={blog.title}
                width={720}
                height={405}
                priority
                className="my-8 w-full border bg-muted transition-colors"
              />
            )}

            <TracingBeam className="px-0">
              <div className="prose-lg prose dark:prose-invert max-w-none">
                <Mdx code={blog.body} />
              </div>
            </TracingBeam>

            {/* Related Posts */}
            <RelatedPosts currentPost={blog} allPosts={allBlogs} maxPosts={3} />

            <hr className="mt-8" />
            <div className="flex justify-center py-4">
              <Link href="/blog" className={cn(buttonVariants({ variant: "ghost" }))}>
                <ChevronLeft className="mr-2 size-4" />
                See all Blogs
              </Link>
            </div>
          </article>

          {/* Sidebar - Hidden on mobile, visible on desktop */}
          <ClientOnly
            fallback={<div className="hidden animate-pulse rounded-lg bg-muted lg:block lg:w-64" />}
          >
            <BlogSidebar
              className="hidden lg:block"
              slug={blog.slug}
              publishDate={blog.date}
              readTime={blog.readTime || 5}
            />
          </ClientOnly>
        </div>
      </div>
    </div>
  );
}
