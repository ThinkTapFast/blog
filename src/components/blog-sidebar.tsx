"use client";

import { TableOfContents } from "./table-of-contents";

interface BlogSidebarProps {
  className?: string;
  slug?: string;
  publishDate?: string;
  readTime?: number;
}

export function BlogSidebar({ className, slug, publishDate, readTime }: BlogSidebarProps) {
  return (
    <aside className={className}>
      <div className="sticky top-6 space-y-6">
        {/* Table of Contents */}
        <TableOfContents />

        {/* Article Info */}
        <div className="rounded-lg border bg-card p-4">
          <h4 className="mb-4 text-sm font-semibold">Article Info</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Est. reading time</span>
              <span>{readTime || 5} min</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Published</span>
              <span>{publishDate ? new Date(publishDate).toLocaleDateString() : "Today"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Category</span>
              <span>Tech</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
