import { useRouter } from "next/router";
import React, { useEffect } from "react";

export interface ScrollToTopProps {}

export function ScrollToTop(props: ScrollToTopProps) {
  const router = useRouter();

  useEffect(() => {
    /* To prevent browser auto restoring ther pre scroll position on page refresh */
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    router.beforePopState(() => {
      window.scrollTo(0, 0);
      return true;
    });
  }, [router]);

  return null;
}
