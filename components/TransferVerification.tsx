"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { formatAmount } from "@/lib/utils";

type TransferVerificationProps = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  senderBank?: Account;
  receiverBank?: Bank;
  amount: string;
  note?: string;
  onConfirm: () => Promise<void> | void;
};

const TransferVerification = ({
  open,
  onOpenChange,
  senderBank,
  receiverBank,
  amount,
  note,
  onConfirm,
}: TransferVerificationProps) => {
  const [acknowledged, setAcknowledged] = useState(false);
  const parsedAmount = useMemo(() => Number(amount || 0), [amount]);

  useEffect(() => {
    if (!open) setAcknowledged(false);
  }, [open]);

  const disabled =
    !acknowledged || parsedAmount <= 0 || !senderBank || !receiverBank;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-xl">
        <SheetHeader>
          <SheetTitle>Confirm transfer</SheetTitle>
          <SheetDescription>
            Review the details before sending.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-4 space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">From</span>
            <span className="font-medium">{senderBank?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">To</span>
            <span className="font-medium">
              {receiverBank?.bankId?.slice(0, 6)}...
              {receiverBank?.bankId?.slice(-4)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Amount</span>
            <span className="font-semibold text-foreground">
              {formatAmount(parsedAmount)}
            </span>
          </div>
          {note && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Note</span>
              <span className="max-w-[60%] truncate text-gray-800">{note}</span>
            </div>
          )}

          <div className="mt-3 rounded-md bg-amber-50 p-3 text-amber-800">
            Transfers are final. Verify the receiver details and amount. We may
            delay or decline transfers suspected of fraud.
          </div>

          <label className="mt-2 flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              className="size-4"
              checked={acknowledged}
              onChange={(e) => setAcknowledged(e.target.checked)}
            />
            I understand and wish to proceed.
          </label>
        </div>

        <div className="mt-5 flex justify-end gap-3">
          <SheetClose asChild>
            <Button variant="ghost">Cancel</Button>
          </SheetClose>
          <Button disabled={disabled} onClick={() => onConfirm()}>
            Confirm and send
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default TransferVerification;
