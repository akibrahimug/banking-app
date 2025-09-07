"use client";

import Link from "next/link";
import { useNavigationLoading } from "@/hooks/useNavigationLoading";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, cloneElement, isValidElement } from "react";
import { usePathname } from "next/navigation";

interface LoadingLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  showLoader?: boolean;
  onClick?: () => void;
  iconSize?: number;
}

export default function LoadingLink({ 
  href, 
  children, 
  className, 
  showLoader = true,
  onClick,
  iconSize = 20
}: LoadingLinkProps) {
  const { navigate, isLoading } = useNavigationLoading();
  const [isClicked, setIsClicked] = useState(false);
  const pathname = usePathname();
  const isCurrent = pathname === href || pathname.startsWith(`${href}/`);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (isCurrent) return;
    
    setIsClicked(true);
    onClick?.();
    navigate(href);
    
    // Reset clicked state after navigation
    setTimeout(() => setIsClicked(false), 1000);
  };

  const showLoadingState = showLoader && (isClicked || isLoading);

  // Function to replace Image components with loading spinner while preserving other content
  const processChildren = (children: React.ReactNode): React.ReactNode => {
    if (!isValidElement(children)) return children;
    
    // Check if this is an Image component (Next.js Image or regular img)
    const isImage = children.type === 'img' || 
                   (children.props && (children.props.src || children.props.alt));
    
    if (isImage && showLoadingState) {
      return (
        <Loader2 
          size={iconSize} 
          className={cn("animate-spin", children.props?.className)} 
        />
      );
    }
    
    // If it has children, process them recursively
    if (children.props?.children) {
      return cloneElement(children, {
        ...children.props,
        children: Array.isArray(children.props.children) 
          ? children.props.children.map((child: React.ReactNode) => processChildren(child))
          : processChildren(children.props.children)
      });
    }
    
    return children;
  };

  return (
    <Link
      href={href}
      className={cn(className)}
      onClick={handleClick}
    >
      {Array.isArray(children) 
        ? children.map((child, index) => (
            <span key={index}>
              {processChildren(child)}
            </span>
          ))
        : processChildren(children)
      }
    </Link>
  );
}