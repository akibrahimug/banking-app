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
        "font-inter font-extrabold tracking-tight select-none",
        "text-primary",
        sizeToClassName[size],
        className
      )}
    >
      Pesa
    </span>
  );
}
