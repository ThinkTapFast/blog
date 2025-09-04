'use client';

import { TableOfContents } from "./table-of-contents";
import { ReadingProgress } from "./reading-progress";
import { Share2, Bookmark, Heart } from "lucide-react";
import { Button } from "./ui/button";

interface BlogSidebarProps {
  className?: string;
}

export function BlogSidebar({ className }: BlogSidebarProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: window.location.href
        });
      } catch (error) {
        console.log('Share failed:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast notification here
    }
  };

  const handleBookmark = () => {
    // You can implement bookmark functionality here
    console.log('Bookmark functionality to be implemented');
  };

  const handleLike = () => {
    // You can implement like functionality here
    console.log('Like functionality to be implemented');
  };
  return (
    <aside className={className}>
      <div className="sticky top-6 space-y-6">
        {/* Reading Progress */}
        <ReadingProgress />
        
        {/* Table of Contents */}
        <div className="rounded-lg border bg-card p-4">
          <TableOfContents />
        </div>

        {/* Quick Actions */}
        <div className="rounded-lg border bg-card p-4">
          <h4 className="mb-4 text-sm font-semibold">Quick Actions</h4>
          <div className="space-y-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full justify-start gap-2"
              onClick={handleShare}
            >
              <Share2 className="size-4" />
              Share Article
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full justify-start gap-2"
              onClick={handleBookmark}
            >
              <Bookmark className="size-4" />
              Bookmark
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full justify-start gap-2"
              onClick={handleLike}
            >
              <Heart className="size-4" />
              Like
            </Button>
          </div>
        </div>

        {/* Blog Stats */}
        <div className="rounded-lg border bg-card p-4">
          <h4 className="mb-4 text-sm font-semibold">Article Info</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Est. reading time</span>
              <span>5 min</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Published</span>
              <span>Today</span>
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
