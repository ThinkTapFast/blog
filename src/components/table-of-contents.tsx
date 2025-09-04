"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { List } from "lucide-react";

interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  className?: string;
}

export function TableOfContents({ className }: TableOfContentsProps) {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Extract headings from the content (skip h1, focus on h2-h4)
    const headings = document.querySelectorAll("h2, h3, h4");
    const tocItems: TocItem[] = [];

    headings.forEach((heading, index) => {
      const id = heading.id || `heading-${index}`;
      if (!heading.id) {
        heading.id = id;
      }

      tocItems.push({
        id,
        title: heading.textContent || "",
        level: parseInt(heading.tagName.charAt(1)),
      });
    });

    setToc(tocItems);

    // Set up intersection observer for active heading
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0% -80% 0%",
        threshold: 0,
      },
    );

    headings.forEach(heading => observer.observe(heading));

    return () => observer.disconnect();
  }, []);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  if (toc.length === 0) return null;

  return (
    <div className={cn("sticky top-20", className)}>
      <div className="rounded-lg border bg-background p-4">
        <div className="mb-3 flex items-center gap-2">
          <List className="size-4" />
          <h4 className="text-sm font-semibold">Contents</h4>
        </div>

        <nav className="space-y-1">
          {toc.map(item => (
            <button
              key={item.id}
              onClick={() => scrollToHeading(item.id)}
              className={cn(
                "w-full text-left text-xs transition-colors hover:text-primary",
                "block py-1",
                {
                  "font-medium text-primary": activeId === item.id,
                  "text-muted-foreground": activeId !== item.id,
                  "pl-0": item.level === 2,
                  "pl-3": item.level === 3,
                  "pl-6": item.level === 4,
                },
              )}
            >
              {item.title}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
