import { Skeleton } from "@/components/ui/skeleton";

type NoDataSkeletonProps = {
  variant?: "list" | "cards" | "table";
  rows?: number;
};

export default function NoDataSkeleton({
  variant = "list",
  rows = 6,
}: NoDataSkeletonProps) {
  if (variant === "cards") {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: rows }).map((_, i) => (
          <Skeleton key={i} className="h-24 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (variant === "table") {
    return (
      <div className="w-full overflow-hidden rounded-lg border border-border">
        <div className="flex items-center justify-between p-4">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-9 w-24 rounded-md" />
        </div>
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 border-t p-4">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-16" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-6 w-full" />
      ))}
    </div>
  );
}
