"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, useTransition } from "react";

export const useNavigationLoading = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isNavigating, setIsNavigating] = useState(false);

  const navigate = (href: string) => {
    if (pathname === href) return;
    
    setIsNavigating(true);
    startTransition(() => {
      router.push(href);
      // Reset loading state after navigation
      setTimeout(() => setIsNavigating(false), 300);
    });
  };

  const refresh = () => {
    setIsNavigating(true);
    startTransition(() => {
      router.refresh();
      setTimeout(() => setIsNavigating(false), 300);
    });
  };

  const isLoading = isPending || isNavigating;

  return { navigate, refresh, isLoading, isPending, isNavigating };
};