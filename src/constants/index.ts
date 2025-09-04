import { Icons } from "@/components/icons";
import { appConfig } from "@/config/app.config";
import { Bot, Rss } from "lucide-react";

export const NAV_LIST = [
  { label: "Blog", path: "/blog", icon: Rss },
  { label: "About", path: "/about", icon: Bot },
];

export const SOCIALS = [{ label: "Github", path: appConfig.social.github, icon: Icons.github }];
