import HeaderBox from "@/components/HeaderBox";
import { Pagination } from "@/components/Pagination";
import TransactionsTable from "@/components/TransactionsTable";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { formatAmount } from "@/lib/utils";
import React from "react";
import ErrorState from "@/components/ErrorState";

const TransactionHistory = async ({
  searchParams: { id, page },
}: SearchParamProps) => {
  const currentPage = Number(page as string) || 1;
  const loggedIn = await getLoggedInUser();
  let accounts: any = null;
  try {
    accounts = await getAccounts({ userId: loggedIn.$id });
  } catch (e) {
    return (
      <div className="transactions">
        <div className="transactions-header">
          <HeaderBox
            title="Transaction History"
            subtext="See your bank details and transactions."
          />
        </div>
        <ErrorState message="Failed to load accounts." />
      </div>
    );
  }

  if (!accounts || !accounts.data?.length) {
    return (
      <div className="transactions">
        <div className="transactions-header">
          <HeaderBox
            title="Transaction History"
            subtext="See your bank details and transactions."
          />
        </div>
        <ErrorState message="No accounts found. Connect a bank to view transactions." />
      </div>
    );
  }

  const accountsData = accounts?.data;
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

  let account: any = null;
  try {
    account = await getAccount({ appwriteItemId });
  } catch (e) {
    return (
      <div className="transactions">
        <div className="transactions-header">
          <HeaderBox
            title="Transaction History"
            subtext="See your bank details and transactions."
          />
        </div>
        <ErrorState message="Failed to load account details." />
      </div>
    );
  }

  const rowsPerPage = 10;
  const totalPages = Math.ceil(
    (account?.transactions?.length || 0) / rowsPerPage
  );

  const indexOfLastTransaction = currentPage * rowsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;

  const currentTransactions = (account?.transactions || []).slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  if (!currentTransactions.length) {
    return (
      <div className="transactions">
        <div className="transactions-header">
          <HeaderBox
            title="Transaction History"
            subtext="See your bank details and transactions."
          />
        </div>
        <ErrorState message="No transactions available yet." />
      </div>
    );
  }
  return (
    <div className="transactions">
      <div className="transactions-header">
        <HeaderBox
          title="Transaction History"
          subtext="See your bank details and transactions."
        />
      </div>

      <div className="space-y-6">
        <div className="transactions-account">
          <div className="flex flex-col gap-2">
            <h2 className="text-18 font-bold text-white">
              {account?.data.name}
            </h2>
            <p className="text-14 text-blue-25">{account?.data.officialName}</p>
            <p className="text-14 font-semibold tracking-[1.1px] text-white">
              ●●●● ●●●● ●●●● {account?.data.mask}
            </p>
          </div>

          <div className="transactions-account-balance">
            <p className="text-14">Current balance</p>
            <p className="text-24 text-center font-bold">
              {formatAmount(account?.data.currentBalance)}
            </p>
          </div>
        </div>

        <section className="flex w-full flex-col gap-6">
          <TransactionsTable transactions={currentTransactions} />
          {totalPages > 1 && (
            <div className="my-4 w-full">
              <Pagination totalPages={totalPages} page={currentPage} />
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default TransactionHistory;
