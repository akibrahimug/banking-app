"use client";

import { Skeleton } from "@/components/ui/skeleton";

interface PageLoaderProps {
  type?: "home" | "transactions" | "banks" | "default";
}

export default function PageLoader({ type = "default" }: PageLoaderProps) {
  if (type === "home") {
    return (
      <div className="home-content">
        <div className="home-header">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-80" />
          </div>
          <div className="total-balance">
            <div className="total-balance-chart">
              <Skeleton className="h-[100px] w-[100px] rounded-full" />
            </div>
            <div className="flex-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="mt-2 h-8 w-40" />
            </div>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6">
          <div className="space-y-6">
            <Skeleton className="h-32 w-full rounded-xl" />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Skeleton className="h-64 w-full rounded-xl" />
              <Skeleton className="h-64 w-full rounded-xl" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-8 w-48" />
              <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "transactions") {
    return (
      <div className="transactions">
        <div className="transactions-header">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-80" />
          </div>
        </div>
        <div className="transactions-account">
          <Skeleton className="h-20 w-full rounded-lg" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (type === "banks") {
    return (
      <div className="my-banks">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-80" />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-48 w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  // Default loader
  return (
    <div className="flex min-h-screen w-full flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-6 w-32" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-24 w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
}