"use client";

import { cn } from "@/lib/utils";

type TextLogoProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
};

const sizeToClassName: Record<NonNullable<TextLogoProps["size"]>, string> = {
  sm: "text-[20px]",
  md: "text-[26px]",
  lg: "text-[30px]",
};

export default function TextLogo({ className, size = "md" }: TextLogoProps) {
  return (
    <span
      className={cn(
        "font-ibm-plex-serif font-extrabold italic tracking-wide select-none",
        "bg-gradient-to-r from-blue-600 via-indigo-500 to-pink-600",
        "bg-clip-text text-transparent",
        "drop-shadow-[0_1px_1px_rgba(124,58,237,0.30)]",
        sizeToClassName[size],
        className
      )}
    >
      Pesa
    </span>
  );
}
