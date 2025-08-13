"use client";

import { useRouter } from "next/navigation";
import TextLogo from "@/components/TextLogo";

type BackLogoProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
};

export default function BackLogo({
  className = "",
  size = "md",
}: BackLogoProps) {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.back()}
      aria-label="Go back"
      className={`inline-flex items-center justify-center ${className}`}
    >
      <TextLogo size={size} />
    </button>
  );
}
