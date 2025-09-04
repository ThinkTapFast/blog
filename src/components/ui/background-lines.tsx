"use client";
import React from "react";
import { cn } from "@/lib/utils";

export const BackgroundLines = ({
  children,
  className,
  svgOptions,
}: {
  children: React.ReactNode;
  className?: string;
  svgOptions?: {
    duration?: number;
  };
}) => {
  return (
    <div
      className={cn(
        "relative flex h-screen w-full flex-col items-center justify-center bg-white",
        className,
      )}
    >
      <SVGGrid svgOptions={svgOptions} />
      <div className="relative z-20">{children}</div>
    </div>
  );
};

const SVGGrid = ({
  svgOptions,
}: {
  svgOptions?: {
    duration?: number;
  };
}) => {
  return (
    <svg className="absolute inset-0 z-0 size-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
          <rect width="50" height="50" fill="url(#paint0_radial)" />
        </pattern>
        <radialGradient
          id="paint0_radial"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="objectBoundingBox"
          gradientTransform="translate(25 25) rotate(90) scale(25)"
        >
          <stop stopColor="#E5E7EB" />
          <stop offset="1" stopColor="#E5E7EB" stopOpacity="0" />
        </radialGradient>
        <pattern id="grid-dark" width="50" height="50" patternUnits="userSpaceOnUse">
          <rect width="50" height="50" fill="url(#paint0_radial_dark)" />
        </pattern>
        <radialGradient
          id="paint0_radial_dark"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="objectBoundingBox"
          gradientTransform="translate(25 25) rotate(90) scale(25)"
        >
          <stop stopColor="#374151" />
          <stop offset="1" stopColor="#374151" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" className="dark:fill-[url(#grid-dark)]" />
    </svg>
  );
};
