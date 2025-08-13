import Image from "next/image";
import Link from "next/link";

const Promotions = ({ user }: { user: User }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="flex items-center gap-4 rounded-xl border border-blue-200 bg-blue-50 p-4">
        <Image src="/icons/coins.svg" width={36} height={36} alt="rewards" />
        <div className="flex-1">
          <p className="text-14 text-blue-800">
            Earn up to <span className="font-semibold">3.5% APY</span> on your
            savings. No minimums.
          </p>
        </div>
        <Link
          href="/earn-interest"
          className="text-13 font-semibold text-blue-700 underline"
        >
          Learn more
        </Link>
      </div>

      <div className="flex items-center gap-4 rounded-xl border border-green-200 bg-green-50 p-4">
        <Image src="/icons/credit-card.svg" width={36} height={36} alt="card" />
        <div className="flex-1">
          <p className="text-14 text-green-800">
            Hi {user.firstName}, get a virtual card with{" "}
            <span className="font-semibold">zero annual fee</span>.
          </p>
        </div>
        <Link
          href="/apply-card"
          className="text-13 font-semibold text-green-700 underline"
        >
          Apply
        </Link>
      </div>
    </div>
  );
};

export default Promotions;
