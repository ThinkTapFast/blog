"use client";

import React, { useState, useMemo } from "react";
import { Search, Filter, X, Calendar, User } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import type { Blog } from "@/types/globals";

interface BlogSearchProps {
  blogs: Blog[];
  onFilter: (filteredBlogs: Blog[]) => void;
  className?: string;
}

export function BlogSearch({ blogs, onFilter, className }: BlogSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique authors and dates
  const authors = useMemo(() => {
    const authorSet = new Set(blogs.map((blog: Blog) => blog.author).filter(Boolean));
    return Array.from(authorSet);
  }, [blogs]);

  const dateRanges = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return [`${currentYear}`, `${currentYear - 1}`, "Older"];
  }, []);

  // Filter blogs based on search and filters
  const filteredBlogs = useMemo(() => {
    let filtered = blogs;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (blog: Blog) =>
          blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.tags?.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      );
    }

    // Author filter
    if (selectedAuthor) {
      filtered = filtered.filter((blog: Blog) => blog.author === selectedAuthor);
    }

    // Date range filter
    if (selectedDateRange) {
      const currentYear = new Date().getFullYear();
      filtered = filtered.filter((blog: Blog) => {
        const blogYear = new Date(blog.date).getFullYear();
        if (selectedDateRange === `${currentYear}`) {
          return blogYear === currentYear;
        } else if (selectedDateRange === `${currentYear - 1}`) {
          return blogYear === currentYear - 1;
        } else if (selectedDateRange === "Older") {
          return blogYear < currentYear - 1;
        }
        return true;
      });
    }

    return filtered;
  }, [blogs, searchTerm, selectedAuthor, selectedDateRange]);

  // Update parent component with filtered results
  React.useEffect(() => {
    onFilter(filteredBlogs);
  }, [filteredBlogs, onFilter]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedAuthor("");
    setSelectedDateRange("");
  };

  const hasActiveFilters = searchTerm || selectedAuthor || selectedDateRange;

  return (
    <div className={cn("space-y-4", className)}>
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-3 size-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full rounded-lg border bg-background py-2 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="gap-2"
        >
          <Filter className="size-4" />
          Filters
          {hasActiveFilters && (
            <span className="ml-1 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
              {[searchTerm, selectedAuthor, selectedDateRange].filter(Boolean).length}
            </span>
          )}
        </Button>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="gap-2 text-muted-foreground"
          >
            <X className="size-4" />
            Clear all
          </Button>
        )}
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="grid gap-4 rounded-lg border bg-card p-4 sm:grid-cols-2">
          {/* Author Filter */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium">
              <User className="size-4" />
              Author
            </label>
            <select
              value={selectedAuthor}
              onChange={e => setSelectedAuthor(e.target.value)}
              className="w-full rounded border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
            >
              <option value="">All authors</option>
              {authors.map(author => (
                <option key={author} value={author}>
                  {author}
                </option>
              ))}
            </select>
          </div>

          {/* Date Range Filter */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium">
              <Calendar className="size-4" />
              Date Range
            </label>
            <select
              value={selectedDateRange}
              onChange={e => setSelectedDateRange(e.target.value)}
              className="w-full rounded border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
            >
              <option value="">All time</option>
              {dateRanges.map(range => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Results Summary */}
      <div className="text-sm text-muted-foreground">
        {filteredBlogs.length === blogs.length
          ? `Showing all ${blogs.length} articles`
          : `Showing ${filteredBlogs.length} of ${blogs.length} articles`}
      </div>
    </div>
  );
}
