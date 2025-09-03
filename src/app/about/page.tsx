import React from "react";
import PageHeader from "@/components/page-header";
import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { SOCIALS } from "@/constants";
import { cn } from "@/lib/utils";
import { Metadata } from "next";

export const metadata:Metadata = {
  title: 'About ThinkTapFast - AI Content Creation SaaS',
  description: 'Learn about ThinkTapFast, an AI-powered SaaS that helps businesses, teams, and creators generate text, image, and voice content efficiently.',
  keywords: 'ThinkTapFast, AI content creation, about, company, productivity, SaaS, automation',
  openGraph: {
    title: 'About ThinkTapFast - AI Content Creation SaaS',
    description: 'Discover our mission, team, and story behind ThinkTapFast, the AI SaaS that saves time and costs for businesses and creators.',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'ThinkTapFast',
    images: [
      {
        url: '/og-about.png', // About page-OG image
        width: 1200,
        height: 630,
        alt: 'About ThinkTapFast',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About ThinkTapFast - AI Content Creation SaaS',
    description: 'Meet the team and learn the mission behind ThinkTapFast, the AI-powered content creation SaaS.',
    images: ['/og-about.png'],
  },
};


export default function AboutPage() {
  return (
    <div className="container relative max-w-6xl py-6 lg:py-10">
      <PageHeader title="About" description="Let's get to know each other" />
      <hr className="my-8" />

      <div className="flex flex-col items-center space-y-6 lg:flex-row  lg:space-x-6 lg:space-y-0">
        <div className="mx-auto mt-8 w-[400px]">
          <div className="relative flex flex-col items-center gap-2 rounded-md bg-secondary px-4 py-6">
            <Image
              src={siteConfig.authorImage}
              width={82}
              height={82}
              alt={siteConfig.name}
              className="absolute -top-8 mb-4 rounded-full border bg-primary"
            />
            <h3 className="mt-8 text-lg font-semibold">{siteConfig.author}</h3>
            <p className="text-center text-sm text-muted-foreground">
              Web Developer
            </p>
            <div className="flex items-center space-x-2">
              {SOCIALS.map((social) => (
                <Link
                  key={social.label}
                  href={social.path}
                  rel="noreferrer"
                  target="_blank"
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "text-primary px-0 hover:bg-primary transition-colors rounded-full p-2 size-8 bg-primary/80",
                  )}
                >
                  <social.icon className="size-6" />
                  <span className="sr-only">{social.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <p className="flex-1 text-center text-sm text-muted-foreground lg:text-start xl:text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, harum
          odio! Molestias natus possimus dolorem modi libero eaque in aliquam
          harum recusandae nam! Reprehenderit soluta fuga consequuntur, iure
          corrupti autem! Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Modi asperiores voluptate, veritatis non placeat numquam.
          Repellendus mollitia aut reprehenderit est. Reprehenderit soluta fuga
          consequuntur, iure corrupti autem! Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Modi asperiores voluptate, veritatis non
          placeat numquam. Repellendus mollitia aut reprehenderit est.
        </p>
      </div>
    </div>
  );
}
