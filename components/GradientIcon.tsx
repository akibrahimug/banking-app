"use client";

import { cn } from "@/lib/utils";
import React from "react";

type GradientIconProps = {
  src: string;
  size?: number;
  className?: string;
  alt?: string;
  gradientCss?: string;
  activeGradientCss?: string;
  active?: boolean;
};

/**
 * Renders a gradient-colored icon by masking the SVG and filling with a gradient.
 * Works best with monochrome SVGs placed in `public/`.
 */
export default function GradientIcon({
  src,
  size = 20,
  className,
  alt,
  gradientCss,
  activeGradientCss,
  active = false,
}: GradientIconProps) {
  const style: React.CSSProperties = {
    width: size,
    height: size,
    WebkitMaskImage: `url(${src})`,
    maskImage: `url(${src})`,
    WebkitMaskSize: "contain",
    maskSize: "contain",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
  };

  return (
    <span
      role={alt ? "img" : undefined}
      aria-label={alt}
      className={cn(
        // Default gradient if none provided
        active
          ? activeGradientCss ??
              gradientCss ??
              "bg-[linear-gradient(90deg,#A78BFA_0%,#F9A8D4_100%)]"
          : gradientCss ??
              "bg-[linear-gradient(90deg,#7C3AED_0%,#EC4899_100%)]",
        active && "brightness-125",
        "inline-block align-middle",
        className
      )}
      style={style}
    />
  );
}
