import HeaderBox from "@/components/HeaderBox";
import PaymentTransferForm from "@/components/PaymentTransferForm";
import { getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import React from "react";
import ErrorState from "@/components/ErrorState";

const Transfer = async () => {
  const loggedIn = await getLoggedInUser();
  let accounts: any = null;
  try {
    accounts = await getAccounts({ userId: loggedIn.$id });
  } catch (e) {
    return (
      <section className="payment-transfer">
        <HeaderBox
          title="Payment Transfer"
          subtext="Please provide any specific details or notes related to the payment transfer"
        />
        <ErrorState message="Failed to load your accounts for transfer." />
      </section>
    );
  }

  const accountsData = accounts?.data;

  if (!accounts || !accountsData?.length) {
    return (
      <section className="payment-transfer">
        <HeaderBox
          title="Payment Transfer"
          subtext="Please provide any specific details or notes related to the payment transfer"
        />
        <ErrorState message="No accounts available for transfer. Connect a bank first." />
      </section>
    );
  }

  return (
    <section className="payment-transfer">
      <HeaderBox
        title="Payment Transfer"
        subtext="Please provide any specific details or notes related to the payment transfer"
      />

      <section className="size-full pt-5">
        <PaymentTransferForm accounts={accountsData} />
      </section>
    </section>
  );
};

export default Transfer;
