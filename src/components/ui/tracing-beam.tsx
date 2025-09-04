"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useTransform, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export const TracingBeam = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(800);

  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight);
    }

    const handleResize = () => {
      if (contentRef.current) {
        setSvgHeight(contentRef.current.offsetHeight);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [children]);

  const y1 = useSpring(useTransform(scrollYProgress, [0, 0.7], [50, svgHeight - 100]), {
    stiffness: 500,
    damping: 90,
  });
  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [50, svgHeight - 50]), {
    stiffness: 500,
    damping: 90,
  });

  return (
    <motion.div ref={ref} className={cn("relative mx-auto w-full max-w-4xl", className)}>
      <div className="absolute -left-4 top-3 md:-left-20">
        <motion.div
          className="ml-[27px] flex size-4 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-black"
          style={{
            boxShadow: useTransform(
              scrollYProgress,
              [0, 0.05],
              ["rgba(0, 0, 0, 0.24) 0px 3px 8px", "none"],
            ),
          }}
        >
          <motion.div
            className="size-2 rounded-full border border-neutral-300 dark:border-neutral-700"
            style={{
              backgroundColor: useTransform(
                scrollYProgress,
                [0, 0.05],
                ["rgb(99, 102, 241)", "#ffffff"],
              ),
              borderColor: useTransform(
                scrollYProgress,
                [0, 0.05],
                ["rgb(79, 70, 229)", "rgb(212, 212, 216)"],
              ),
            }}
          />
        </motion.div>
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width="20"
          height={svgHeight}
          className="ml-8 block"
          aria-hidden="true"
        >
          <motion.path
            d={`m 1 2 v -2 c 0 0 0 0 0 0 v ${svgHeight} c 0 0 0 0 0 0`}
            fill="none"
            stroke="#9091A0"
            strokeOpacity="0.16"
            transition={{
              duration: 10,
            }}
          />
          <motion.path
            d={`m 1 2 v -2 c 0 0 0 0 0 0 v ${svgHeight} c 0 0 0 0 0 0`}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="1.25"
            className="motion-reduce:hidden"
            transition={{
              duration: 10,
            }}
            strokeDasharray="1 2"
            strokeLinecap="round"
            strokeDashoffset={useTransform(scrollYProgress, [0, 1], [svgHeight, 0])}
          />
          <defs>
            <motion.linearGradient
              id="gradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1={y1}
              y2={y2}
            >
              <stop stopColor="#18CCFC" stopOpacity="0" />
              <stop stopColor="#18CCFC" />
              <stop offset="0.325" stopColor="#6344F5" />
              <stop offset="1" stopColor="#AE48FF" stopOpacity="0" />
            </motion.linearGradient>
          </defs>
        </svg>
      </div>
      <div ref={contentRef} className="relative">
        {children}
      </div>
    </motion.div>
  );
};
