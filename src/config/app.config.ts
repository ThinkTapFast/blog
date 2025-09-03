import authorAvatar from "../../public/images/author/devbertskie.png";
export const appConfig = {
  name: "ThinkTapFast | Blog",
  description:
    "MDX Blog Template is a simple implementation of a markdown static blog. Built with Next.js 14 and velite js.",
  author: "ThinkTapFast Team",
  authorImage: authorAvatar,
  social: {
    github: "https://github.com/ThinkTapFast",
  },
};

export type AppConfig = typeof appConfig;
