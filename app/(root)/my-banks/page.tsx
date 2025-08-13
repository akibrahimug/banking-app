import BankCard from "@/components/BankCard";
import HeaderBox from "@/components/HeaderBox";
import { getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import React from "react";
import ErrorState from "@/components/ErrorState";

const MyBanks = async () => {
  const loggedIn = await getLoggedInUser();
  let accounts: any = null;
  try {
    accounts = await getAccounts({ userId: loggedIn.$id });
  } catch (e) {
    return (
      <section className="flex">
        <div className="my-banks w-full">
          <HeaderBox
            title="My Bank Accounts"
            subtext="Effortlessly manage your banking activites."
          />
          <ErrorState message="Failed to load your accounts." />
        </div>
      </section>
    );
  }

  if (!accounts || !accounts.data?.length) {
    return (
      <section className="flex">
        <div className="my-banks w-full">
          <HeaderBox
            title="My Bank Accounts"
            subtext="Effortlessly manage your banking activites."
          />
          <ErrorState message="No bank accounts found. Connect a bank to continue." />
        </div>
      </section>
    );
  }

  return (
    <section className="flex">
      <div className="my-banks">
        <HeaderBox
          title="My Bank Accounts"
          subtext="Effortlessly manage your banking activites."
        />

        <div className="space-y-4">
          <h2 className="header-2">Your cards</h2>
          <div className="flex flex-wrap gap-6">
            {accounts &&
              accounts.data.map((a: Account) => (
                <BankCard
                  key={accounts.id}
                  account={a}
                  userName={loggedIn?.firstName}
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyBanks;
