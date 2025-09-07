"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import LoadingButton from "@/components/LoadingButton";
import { formUrlQuery } from "@/lib/utils";

export const Pagination = ({ page, totalPages }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams()!;
  const [isNavigating, setIsNavigating] = useState<'prev' | 'next' | null>(null);

  const handleNavigation = (type: "prev" | "next") => {
    const pageNumber = type === "prev" ? page - 1 : page + 1;
    setIsNavigating(type);

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: pageNumber.toString(),
    });

    router.push(newUrl, { scroll: false });
    
    // Reset loading state
    setTimeout(() => setIsNavigating(null), 500);
  };

  return (
    <div className="flex justify-between gap-3">
      <LoadingButton
        size="lg"
        variant="ghost"
        className="p-0 hover:bg-muted/50 hover:text-foreground transition-colors"
        onClick={() => handleNavigation("prev")}
        disabled={Number(page) <= 1}
        isLoading={isNavigating === 'prev'}
        iconSize={20}
      >
        <Image
          src="/icons/arrow-left.svg"
          alt="arrow"
          width={20}
          height={20}
          className="mr-2"
        />
        Prev
      </LoadingButton>
      <p className="text-14 flex items-center px-2">
        {page} / {totalPages}
      </p>
      <LoadingButton
        size="lg"
        variant="ghost"
        className="p-0 hover:bg-muted/50 hover:text-foreground transition-colors"
        onClick={() => handleNavigation("next")}
        disabled={Number(page) >= totalPages}
        isLoading={isNavigating === 'next'}
        iconSize={20}
      >
        Next
        <Image
          src="/icons/arrow-left.svg"
          alt="arrow"
          width={20}
          height={20}
          className="ml-2 -scale-x-100"
        />
      </LoadingButton>
    </div>
  );
};