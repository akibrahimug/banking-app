"use client";

import React from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";

type PlaidSandboxHelperProps = {
  open: boolean;
  onClose?: () => void;
};

export function PlaidSandboxHelper({ open, onClose }: PlaidSandboxHelperProps) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!open || !mounted) return null;

  const copy = (value: string) => {
    navigator.clipboard.writeText(value);
  };

  const node = (
    <div className="fixed inset-0 pointer-events-none">
      <div className="absolute right-4 top-4 w-[360px] max-w-[90vw] rounded-lg border bg-card text-card-foreground shadow-lg pointer-events-auto">
        <div className="flex items-start justify-between gap-4 p-4 border-b">
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-semibold">Plaid Sandbox Helper</h3>
            <p className="text-xs text-muted-foreground">
              Use these credentials in the Plaid popup to connect a test bank.
            </p>
          </div>
          {onClose ? (
            <Button
              size="icon"
              variant="ghost"
              onClick={onClose}
              aria-label="Close helper"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="size-4"
              >
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 6 6 18M6 6l12 12"
                />
              </svg>
            </Button>
          ) : null}
        </div>

        <div className="p-4 space-y-4">
          <div className="space-y-1">
            <p className="text-xs font-medium">Institution</p>
            <div className="flex items-center justify-between rounded-md border px-3 py-2 text-sm">
              <span className="truncate">First Platypus Bank</span>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => copy("First Platypus Bank")}
              >
                Copy
              </Button>
            </div>
            <p className="text-[11px] text-muted-foreground">
              You can also pick any sandbox institution.
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-medium">Username</p>
            <div className="flex items-center justify-between rounded-md border px-3 py-2 text-sm">
              <span className="truncate">user_good</span>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => copy("user_good")}
              >
                Copy
              </Button>
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-medium">Password</p>
            <div className="flex items-center justify-between rounded-md border px-3 py-2 text-sm">
              <span className="truncate">pass_good</span>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => copy("pass_good")}
              >
                Copy
              </Button>
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-medium">MFA code (if asked)</p>
            <div className="flex items-center justify-between rounded-md border px-3 py-2 text-sm">
              <span className="truncate">1234</span>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => copy("1234")}
              >
                Copy
              </Button>
            </div>
            <p className="text-[11px] text-muted-foreground">
              Sometimes 6-digit MFA may be requested. Try 123456.
            </p>
          </div>

          <div className="rounded-md bg-muted p-3">
            <ul className="list-disc pl-5 text-xs space-y-1 text-muted-foreground">
              <li>Select any account(s) when prompted.</li>
              <li>Leave other non-required fields empty and continue.</li>
            </ul>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 p-3 border-t">
          <a
            href="https://dashboard.plaid.com/developers/sandbox"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-primary underline"
          >
            Sandbox reference
          </a>
        </div>
      </div>
    </div>
  );

  return createPortal(node, document.body);
}
