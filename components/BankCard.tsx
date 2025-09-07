import { formatAmount } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Copy from "@/components/Copy";

const BankCard = ({
  account,
  userName,
  showBalance = true,
}: CreditCardProps) => {
  return (
    <div className="flex flex-col">
      <Link
        href={`/transaction-history/?id=${account.appwriteItemId}`}
        className="bank-card"
      >
        <div className="bank-card_content">
          <div>
            <h1 className="text-16 font-semibold text-primary-foreground">{account.name}</h1>
            <p className="font-ibm-plex-serif font-black text-primary-foreground">
              {formatAmount(account.currentBalance)}
            </p>
          </div>

          <article className="flex flex-col gap-2">
            <div className="flex justify-between">
              <h1 className="text-12 font-semibold text-primary-foreground">{userName}</h1>
              <h2 className="text-12 font-semibold text-primary-foreground">●● / ●●</h2>
            </div>
            <p className="text-14 font-semibold tracking-[1.1px] text-primary-foreground">
              ●●●● ●●●● ●●●● <span className="text-16">{account?.mask}</span>
            </p>
          </article>
        </div>

        <div className="bank-card_icon">
          <Image src="/icons/Paypass.svg" width={20} height={24} alt="pay" />
          <Image
            src="/icons/mastercard.svg"
            width={45}
            height={32}
            alt="mastercard"
            className="ml-5"
          />
        </div>

      </Link>

      {showBalance && <Copy title={account?.shareableId} />}
    </div>
  );
};

export default BankCard;
