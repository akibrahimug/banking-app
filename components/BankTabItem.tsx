"use client";

import { useSearchParams, useRouter } from "next/navigation";

import { cn, formUrlQuery } from "@/lib/utils";

export const BankTabItem = ({ account, appwriteItemId }: BankTabItemProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isActive = appwriteItemId === account?.appwriteItemId;

  const handleBankChange = () => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "id",
      value: account?.appwriteItemId,
    });
    router.push(newUrl, { scroll: false });
  };

  return (
    <div
      onClick={handleBankChange}
      className={cn(`banktab-item`, {
        "border border-blue-200 bg-white shadow-xs": isActive,
      })}
    >
      <p
        className={cn(
          `text-16 line-clamp-1 flex-1 text-center font-medium text-gray-600`,
          {
            "text-blue-600": isActive,
          }
        )}
      >
        {account.name}
      </p>
    </div>
  );
};
