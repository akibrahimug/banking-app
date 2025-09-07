"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ButtonProps } from "@/components/ui/button";
import { forwardRef } from "react";

interface LoadingButtonProps extends ButtonProps {
  isLoading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
  loadingIcon?: React.ReactNode;
  iconSize?: number; // Size for the loading icon
}

const LoadingButton = forwardRef<HTMLButtonElement, LoadingButtonProps>(
  ({ 
    isLoading = false, 
    loadingText, 
    children, 
    disabled, 
    className,
    loadingIcon,
    iconSize = 20,
    ...props 
  }, ref) => {
    
    return (
      <Button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(className)}
        {...props}
      >
        <div className="relative flex items-center justify-center">
          {/* Original content */}
          <div className={cn("flex items-center", isLoading && "opacity-0")}>
            {children}
          </div>
          
          {/* Loading overlay */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              {loadingIcon || (
                <Loader2 
                  size={iconSize} 
                  className="animate-spin" 
                />
              )}
            </div>
          )}
        </div>
      </Button>
    );
  }
);

LoadingButton.displayName = "LoadingButton";

export default LoadingButton;