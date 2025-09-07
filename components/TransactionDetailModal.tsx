"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatAmount, formatDateTime, removeSpecialCharacters } from "@/lib/utils";
import { transactionCategoryStyles } from "@/constants";
import { cn } from "@/lib/utils";

interface TransactionDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction | null;
}

const CategoryBadge = ({ category }: { category: string }) => {
  const { borderColor, backgroundColor, textColor, chipBackgroundColor } =
    transactionCategoryStyles[
      category as keyof typeof transactionCategoryStyles
    ] || transactionCategoryStyles.default;

  return (
    <div className={cn("category-badge", borderColor, chipBackgroundColor)}>
      <div className={cn("size-2 rounded-full", backgroundColor)} />
      <p className={cn("text-[12px] font-medium", textColor)}>{category}</p>
    </div>
  );
};

// Dummy data generator for additional details
const generateTransactionDetails = (transaction: Transaction) => {
  const merchantData = {
    name: removeSpecialCharacters(transaction.name),
    address: "123 Main Street, City, State 12345",
    phone: "(555) 123-4567",
    category: transaction.category,
  };

  const paymentData = {
    method: transaction.paymentChannel,
    cardLast4: "****" + Math.floor(Math.random() * 10000).toString().padStart(4, '0'),
    authCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
    transactionId: transaction.id,
  };

  return { merchantData, paymentData };
};

export default function TransactionDetailModal({ 
  isOpen, 
  onClose, 
  transaction 
}: TransactionDetailModalProps) {
  if (!transaction) return null;

  const { merchantData, paymentData } = generateTransactionDetails(transaction);
  const amount = formatAmount(transaction.amount);
  const isDebit = transaction.type === "debit";
  const dateTime = formatDateTime(new Date(transaction.date));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            Transaction Details
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Transaction Summary */}
          <div className="rounded-lg border border-border bg-muted/50 p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-16 font-semibold text-foreground">
                  {merchantData.name}
                </h3>
                <span className={cn(
                  "text-16 font-bold",
                  isDebit ? "text-red-600" : "text-green-600"
                )}>
                  {isDebit ? `-${amount}` : amount}
                </span>
              </div>
              <div className="flex items-center justify-between text-14 text-muted-foreground">
                <span>{dateTime.dateTime}</span>
                <span className="capitalize">{transaction.paymentChannel}</span>
              </div>
            </div>
          </div>

          {/* Merchant Information */}
          <div className="space-y-3">
            <h4 className="text-14 font-semibold text-foreground">Merchant Information</h4>
            <div className="space-y-2 text-14">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Name:</span>
                <span className="text-foreground">{merchantData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Address:</span>
                <span className="text-foreground text-right max-w-[250px]">
                  {merchantData.address}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Phone:</span>
                <span className="text-foreground">{merchantData.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Category:</span>
                <CategoryBadge category={merchantData.category} />
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="space-y-3">
            <h4 className="text-14 font-semibold text-foreground">Payment Information</h4>
            <div className="space-y-2 text-14">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Method:</span>
                <span className="text-foreground capitalize">{paymentData.method}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Card:</span>
                <span className="text-foreground">{paymentData.cardLast4}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Auth Code:</span>
                <span className="text-foreground font-mono">{paymentData.authCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Transaction ID:</span>
                <span className="text-foreground font-mono text-12 break-all">
                  {paymentData.transactionId}
                </span>
              </div>
            </div>
          </div>

          {/* Transaction Status */}
          <div className="space-y-3">
            <h4 className="text-14 font-semibold text-foreground">Status</h4>
            <div className="flex items-center gap-2">
              <CategoryBadge category="Success" />
              <span className="text-14 text-muted-foreground">
                Transaction completed successfully
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}