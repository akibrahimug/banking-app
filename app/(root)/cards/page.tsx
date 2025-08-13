import CardApplicationsList from "@/components/CardApplicationsList";
import { listCardApplicationsByUser } from "@/lib/actions/card.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";

const CardsPage = async () => {
  const user = await getLoggedInUser();
  const applications = user
    ? await listCardApplicationsByUser({ userId: user.$id })
    : [];

  return (
    <section className="home">
      <div className="home-content space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-24 font-semibold text-gray-900">
              Your card applications
            </h1>
            <p className="text-gray-600">
              Track the status of your submitted applications.
            </p>
          </div>
        </div>
        <CardApplicationsList applications={applications} />
      </div>
    </section>
  );
};

export default CardsPage;
