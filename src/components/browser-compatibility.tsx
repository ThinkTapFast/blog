"use client";

import { useEffect, useState, ReactNode } from "react";
import { getBrowserCapabilities } from "@/lib/polyfills";

interface BrowserInfo {
  isModern: boolean;
  polyfillsNeeded: string[];
  capabilities: Record<string, boolean>;
}

export function BrowserCompatibilityProvider({ children }: { children: ReactNode }) {
  const [browserInfo, setBrowserInfo] = useState<BrowserInfo | null>(null);

  useEffect(() => {
    const info = getBrowserCapabilities();
    setBrowserInfo({
      isModern: info.isModern,
      polyfillsNeeded: info.polyfillsNeeded,
      capabilities: info.capabilities || {},
    });

    // Only show compatibility info in development
    if (process.env.NODE_ENV === "development") {
      if (info.isModern) {
        console.log("✅ Modern browser detected - all features supported natively");
      } else {
        console.log("🔧 Legacy browser detected - polyfills active for:", info.polyfillsNeeded);
      }
    }
  }, []);

  return (
    <>
      {children}
      {/* Optional: Show browser compatibility badge in development */}
      {process.env.NODE_ENV === "development" && browserInfo && (
        <div
          className="fixed bottom-4 right-4 z-50 rounded-lg bg-black/80 px-3 py-2 text-xs text-white"
          style={{ fontSize: "10px" }}
        >
          {browserInfo.isModern
            ? "✅ Modern Browser"
            : `🔧 ${browserInfo.polyfillsNeeded.length} Polyfills Active`}
        </div>
      )}
    </>
  );
}
