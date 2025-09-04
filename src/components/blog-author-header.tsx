import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { getAuthor } from "@/config/authors";
import { Github, Twitter } from "lucide-react";

interface BlogAuthorHeaderProps {
  authorName: string;
  publishDate?: string;
  readTime?: string;
}

export function BlogAuthorHeader({ authorName, publishDate, readTime }: BlogAuthorHeaderProps) {
  const author = getAuthor(authorName);
  
  // Fallback if author not found in config
  const authorData = author || {
    name: authorName,
    username: authorName.toLowerCase().replace(/\s+/g, ''),
    avatar: "/images/author/abdelkabir.jpeg",
    bio: "Blog author",
    social: {
      github: undefined,
      twitter: undefined
    }
  };

  return (
    <div className="mb-8 border-b border-border/40 pb-8">
      {/* Publication Info */}
      {publishDate && (
        <div className="mb-6 flex items-center gap-4 text-sm text-muted-foreground">
          <time dateTime={publishDate}>
            Published on {formatDate(publishDate)}
          </time>
          {readTime && (
            <>
              <span>•</span>
              <span>{readTime} read</span>
            </>
          )}
        </div>
      )}

      {/* Author Section */}
      <div className="flex items-start gap-4">
        {/* Author Avatar */}
        <div className="shrink-0">
          <Image
            src={authorData.avatar}
            alt={authorData.name}
            width={56}
            height={56}
            className="rounded-full border-2 border-border/20 bg-background shadow-sm"
          />
        </div>

        {/* Author Details */}
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2">
            <h3 className="text-lg font-semibold text-foreground">
              {authorData.name}
            </h3>
            <span className="text-sm text-muted-foreground">
              @{authorData.username}
            </span>
          </div>
          
          {authorData.bio && (
            <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
              {authorData.bio}
            </p>
          )}

          {/* Social Links */}
          {(authorData.social?.github || authorData.social?.twitter) && (
            <div className="flex gap-3">
              {authorData.social?.github && (
                <Link
                  href={authorData.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Github className="size-3" />
                  GitHub
                </Link>
              )}
              {authorData.social?.twitter && (
                <Link
                  href={authorData.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Twitter className="size-3" />
                  Twitter
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
