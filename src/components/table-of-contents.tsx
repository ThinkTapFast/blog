'use client';

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

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
    // Extract headings from the content
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const tocItems: TocItem[] = [];

    headings.forEach((heading, index) => {
      const id = heading.id || `heading-${index}`;
      if (!heading.id) {
        heading.id = id;
      }
      
      tocItems.push({
        id,
        title: heading.textContent || '',
        level: parseInt(heading.tagName.charAt(1))
      });
    });

    setToc(tocItems);

    // Set up intersection observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0% -35% 0%',
        threshold: 0
      }
    );

    headings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, []);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  if (toc.length === 0) return null;

  return (
    <div className={cn("space-y-2", className)}>
      <h4 className="mb-4 text-sm font-semibold text-foreground">On This Page</h4>
      <nav>
        <ul className="space-y-2">
          {toc.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollToHeading(item.id)}
                className={cn(
                  "text-left w-full text-sm transition-colors hover:text-foreground",
                  "block py-1 pr-2 text-muted-foreground",
                  {
                    "text-foreground font-medium": activeId === item.id,
                    "pl-0": item.level === 1,
                    "pl-3": item.level === 2,
                    "pl-6": item.level === 3,
                    "pl-9": item.level >= 4,
                  }
                )}
              >
                {item.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
