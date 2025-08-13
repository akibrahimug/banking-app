import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="flex h-screen w-full font-inter">
      <aside className="sticky left-0 top-0 hidden h-screen w-fit flex-col justify-between border-r border-gray-200 bg-white pt-8 text-white sm:p-4 xl:p-6 2xl:w-[355px] max-md:hidden">
        <div className="flex flex-col gap-4">
          <div className="mb-12 flex cursor-pointer items-center gap-2">
            <Skeleton className="size-[24px] rounded-md" />
            <Skeleton className="h-6 w-24" />
          </div>
          <div className="flex flex-col gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="size-6" />
                <Skeleton className="h-5 w-28" />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-auto">
          <Skeleton className="h-12 w-full" />
        </div>
      </aside>

      <div className="flex size-full flex-col">
        <div className="root-layout">
          <Skeleton className="size-[30px] rounded-md" />
          <div>
            <div className="flex items-center gap-3">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </div>

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

          <div className="recent-transactions">
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-9 w-24 rounded-lg" />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-24 w-full rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </div>

      <aside className="right-sidebar max-xl:hidden xl:flex">
        <section className="flex flex-col pb-8">
          <div className="profile-banner" />
          <div className="profile">
            <div className="profile-img">
              <Skeleton className="size-10 rounded-full" />
            </div>
            <div className="profile-details">
              <Skeleton className="h-6 w-36" />
              <Skeleton className="mt-2 h-4 w-44" />
            </div>
          </div>
        </section>

        <section className="banks">
          <div className="flex w-full justify-between">
            <Skeleton className="h-6 w-28" />
            <div className="flex gap-2">
              <Skeleton className="size-5" />
              <Skeleton className="h-5 w-20" />
            </div>
          </div>
          <div className="relative flex flex-1 flex-col items-center justify-center gap-5">
            <Skeleton className="h-[190px] w-full max-w-[320px] rounded-[20px]" />
          </div>
          <div className="mt-10 flex flex-1 flex-col gap-6">
            <Skeleton className="h-6 w-36" />
            <div className="space-y-5">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Skeleton className="size-8 rounded-full" />
                    <Skeleton className="h-5 w-28" />
                  </div>
                  <Skeleton className="h-4 w-10" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </aside>
    </main>
  );
}
