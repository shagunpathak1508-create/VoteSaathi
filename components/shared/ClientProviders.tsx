"use client";

import { ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";
import { LanguageProvider } from "@/lib/LanguageContext";
import { logEvent } from "@/lib/firebase";

function PageViewTracker() {
  const pathname = usePathname();
  useEffect(() => {
    logEvent("page_view", { page_path: pathname });
  }, [pathname]);
  return null;
}

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <PageViewTracker />
      {children}
    </LanguageProvider>
  );
}
