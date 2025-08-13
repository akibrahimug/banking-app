import CardApplicationForm from "@/components/CardApplicationForm";
import { getLoggedInUser } from "@/lib/actions/user.actions";

const ApplyCardPage = async () => {
  const user = await getLoggedInUser();
  return (
    <section className="home">
      <div className="home-content space-y-6">
        <div>
          <h1 className="text-24 font-semibold text-gray-900">
            Apply for a virtual card
          </h1>
          <p className="text-gray-600">
            Fill in your details to submit an application.
          </p>
        </div>
        <CardApplicationForm
          userId={user?.$id}
          defaults={{
            firstName: user?.firstName,
            lastName: user?.lastName,
            email: user?.email,
          }}
        />
      </div>
    </section>
  );
};

export default ApplyCardPage;
