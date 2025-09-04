import { Tag } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface BlogTagsProps {
  tags: string[];
  className?: string;
  variant?: "default" | "outline" | "secondary";
  size?: "sm" | "md" | "lg";
}

export function BlogTags({ tags, className, variant = "default", size = "md" }: BlogTagsProps) {
  if (!tags || tags.length === 0) return null;

  const sizeClasses = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-2",
  };

  const variantClasses = {
    default: "bg-primary/10 text-primary hover:bg-primary/20",
    outline: "border border-primary/20 text-primary hover:border-primary/40",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  };

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <Tag className="size-4 text-muted-foreground" />
      {tags.map(tag => (
        <Link
          key={tag}
          href={`/blog/tags/${encodeURIComponent(tag.toLowerCase())}`}
          className={cn(
            "inline-flex items-center rounded-full font-medium transition-colors",
            sizeClasses[size],
            variantClasses[variant],
          )}
        >
          {tag}
        </Link>
      ))}
    </div>
  );
}
