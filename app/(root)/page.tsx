import HeaderBox from "@/components/HeaderBox";
import RecentTransactions from "@/components/RecentTransactions";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import ErrorState from "@/components/ErrorState";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";

const Home = async ({ searchParams: { id, page, demo } }: SearchParamProps) => {
  const currentPage = Number(page as string) || 1;
  const loggedIn = await getLoggedInUser();
  let accounts: any = null;
  try {
    accounts = await getAccounts({ userId: loggedIn?.$id });
  } catch (e) {
    return (
      <section className="home">
        <div className="home-content">
          <ErrorState message="Failed to load accounts. Please try again." />
        </div>
      </section>
    );
  }

  if (!accounts || !accounts.data?.length) {
    return (
      <section className="home">
        <div className="home-content">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || "Guest"}
            subtext="Access and manage your account and transactions efficiently."
          />
          <ErrorState message="No accounts found. Please connect a bank and try again." />
        </div>
      </section>
    );
  }

  const accountsData = accounts?.data;
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

  let account: any = null;
  try {
    account = await getAccount({ appwriteItemId });
  } catch (e) {
    return (
      <section className="home">
        <div className="home-content">
          <ErrorState message="Failed to load recent transactions." />
        </div>
      </section>
    );
  }

  return (
    <section className="home">
      <div className="home-content">
        {demo && (
          <>
            <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-blue-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm">
                    <strong>Demo Mode:</strong> You're using a demo account.
                    Some bank data may be limited due to sandbox restrictions.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 text-blue-600 px-4 py-3 rounded-md mb-6">
              <div className="flex">
                <div className="flex-shrink-0"></div>
                <div className="ml-3">
                  <p className="text-sm">
                    <strong>First Platypus Bank(Plaid):</strong> Please use the
                    following credentials to sign in:
                    <br />
                    <span className="text-xs">
                      Username: good_user
                      <br />
                      Password: good_password
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || "Guest"}
            subtext="Access and manage your account and transactions efficiently."
          />

          <TotalBalanceBox
            accounts={accountsData}
            totalBanks={accounts?.totalBanks}
            totalCurrentBalance={accounts?.totalCurrentBalance}
          />
        </header>

        {account?.transactions?.length ? (
          <RecentTransactions
            accounts={accountsData}
            transactions={account?.transactions}
            appwriteItemId={appwriteItemId}
            page={currentPage}
          />
        ) : (
          <ErrorState message="No transactions available yet." />
        )}
      </div>

      <RightSidebar
        user={loggedIn}
        transactions={account?.transactions}
        banks={accountsData?.slice(0, 2)}
      />
    </section>
  );
};

export default Home;
