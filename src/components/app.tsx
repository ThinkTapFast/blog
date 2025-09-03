import React, { PropsWithChildren } from "react";
import SiteHeader from "@/components/site-header";

export default function App({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-dvh flex-col space-y-6">
      <SiteHeader />
      <main className="container flex-1">{children}</main>
      <footer className=" container border-t border-t-secondary/60 py-3 text-center">
        <p className="text-xs text-muted-foreground">
          &copy; 2025 ThinkTapFast. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
