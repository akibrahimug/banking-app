import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="auth-page font-inter">
      <div className="auth-card w-full max-w-[460px]">
        <div className="flex w-full flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-4 w-64" />
          </div>

          <div className="flex flex-col gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
            <Skeleton className="h-12 w-full rounded-lg" />
          </div>
        </div>
      </div>
    </main>
  );
}
