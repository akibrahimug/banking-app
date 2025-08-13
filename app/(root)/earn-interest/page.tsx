import EarnInterestAgreement from "@/components/EarnInterestAgreement";
import { getLoggedInUser } from "@/lib/actions/user.actions";

const EarnInterestPage = async () => {
  const user = await getLoggedInUser();
  return (
    <section className="home">
      <div className="home-content space-y-6">
        <div>
          <h1 className="text-24 font-semibold text-gray-900">
            Earn interest on your balance
          </h1>
          <p className="text-gray-600">
            Opt-in to earn interest on eligible account balances. Review the
            terms below.
          </p>
        </div>
        <EarnInterestAgreement
          userId={user?.$id}
          current={!!user?.earnInterestEnabled}
        />
      </div>
    </section>
  );
};

export default EarnInterestPage;
