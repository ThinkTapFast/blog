"use client";
import React from "react";
import { NAV_LIST } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

export default function HeaderNav() {
  const segment = useSelectedLayoutSegment();
  return (
    <nav className="hidden items-center gap-6 md:flex">
      {NAV_LIST.map(item => (
        <Link
          key={item.label + item.path}
          href={item.path}
          className={cn(
            "flex items-center font-normal transition-colors hover:text-primary",
            `/${segment}` === item.path ? "text-primary" : "text-muted-foreground",
          )}
        >
          <item.icon className="mr-2 size-4" />
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
