import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="flex min-h-screen w-full justify-between font-inter">
      <div className="flex w-full max-w-[420px] flex-col justify-center gap-5 px-6">
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

      <div className="auth-asset">
        <div>
          <Image
            src="/icons/banking_app_welcome_image.jpg"
            width={550}
            height={550}
            alt="auth image"
          />
        </div>
      </div>
    </main>
  );
}
