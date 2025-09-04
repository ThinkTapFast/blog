import { buttonVariants } from "@/components/ui/button";
import { SOCIALS } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const metadata = {
  title: "ThinkTapFast Blog - Insights on AI, Content, and Growth",
  description:
    "Explore articles on AI, content creation, and productivity. Learn how ThinkTapFast helps startups, creators, and businesses grow faster with AI.",
  keywords:
    "AI content creation blog, AI productivity tips, startups, creators, ThinkTapFast insights",
  openGraph: {
    title: "ThinkTapFast Blog - Insights on AI, Content, and Growth",
    description: "Explore AI and content creation insights to grow your business faster.",
    url: process.env.NEXT_PUBLIC_SITE_URL + "/blog",
    siteName: "ThinkTapFast",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ThinkTapFast Blog - AI content insights",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ThinkTapFast Blog - AI, Content & Growth",
    description: "Learn how AI helps businesses and creators save time and scale content.",
    images: ["/og-image.png"],
  },
};

export default function BlogPage() {
  return (
    <section className="space-y-6 pb-8 md:pb-12 md:pt-10 lg:py-32">
      <div className="container mt-6 flex max-w-5xl flex-col items-center gap-4 text-center xl:mt-0">
        <div className="flex items-center space-x-2">
          {SOCIALS.map(social => (
            <Link
              key={social.label}
              href={social.path}
              rel="noreferrer"
              target="_blank"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "size-8 rounded-full bg-primary/80 p-2 px-0 text-primary transition-colors hover:bg-primary",
              )}
            >
              <social.icon className="size-6" />
              <span className="sr-only">{social.label}</span>
            </Link>
          ))}
        </div>
        <h1 className="text-3xl capitalize sm:text-5xl md:text-6xl lg:text-7xl">
          Insights & Stories on <span className="font-code text-yellow-300">AI</span>,{" "}
          <span className="font-code text-primary">Content Creation</span> & Growth
        </h1>
        <p className="max-w-2xl leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Explore how ThinkTapFast helps startups, creators, and businesses scale smarter with
          AI-powered text, image, and voice content.
        </p>
        <div className="space-x-4">
          <Link
            href="/blog"
            className={cn(buttonVariants({ size: "lg", variant: "secondary" }), "border")}
          >
            📚 Read the Blog
          </Link>
        </div>
      </div>
    </section>
  );
}
