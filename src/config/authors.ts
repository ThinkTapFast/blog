// Author profiles for blog posts
export const authors = {
  Abdelkabir: {
    name: "Abdelkabir",
    username: "abdelkabir",
    avatar: "/images/author/abdelkabir.jpeg",
    bio: "Full-stack developer passionate about modern web technologies",
    social: {
      github: "https://github.com/abdelkabir",
      twitter: "https://twitter.com/abdelkabir",
    },
  },
  devbertskie: {
    name: "Dev Bertskie",
    username: "devbertskie",
    avatar: "/images/author/devbertskie.png",
    bio: "Software engineer and tech enthusiast",
    social: {
      github: "https://github.com/devbertskie",
      twitter: "https://twitter.com/devbertskie",
    },
  },
  "ThinkTapFast Team": {
    name: "ThinkTapFast Team",
    username: "thinktapfast",
    avatar: "/images/author/abdelkabir.jpeg", // Default team avatar
    bio: "Tech team building innovative solutions",
    social: {
      github: "https://github.com/ThinkTapFast",
      twitter: undefined,
    },
  },
} as const;

export type AuthorKey = keyof typeof authors;
export type Author = (typeof authors)[AuthorKey];

// Helper function to get author by name
export function getAuthor(authorName: string): Author | null {
  return authors[authorName as AuthorKey] || null;
}
