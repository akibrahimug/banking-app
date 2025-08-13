"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { setInterestEnrollment } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";

const EarnInterestAgreement = ({
  userId,
  current,
}: {
  userId: string;
  current: boolean;
}) => {
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onAgree = async () => {
    setLoading(true);
    try {
      await setInterestEnrollment({ userId, enrolled: true });
      router.push("/?invested=1");
    } finally {
      setLoading(false);
    }
  };

  const onDisable = async () => {
    setLoading(true);
    try {
      await setInterestEnrollment({ userId, enrolled: false });
      router.push("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-gray-200 bg-white p-4 text-sm text-gray-700">
        <h3 className="mb-2 text-16 font-semibold text-gray-900">
          Terms and Conditions
        </h3>
        <ul className="list-disc space-y-2 pl-5">
          <li>Interest accrues daily on eligible, non-withdrawn balances.</li>
          <li>APY may change at any time at our discretion.</li>
          <li>Fees may reduce earnings. See full terms for details.</li>
          <li>You can opt-out at any time from this page.</li>
        </ul>
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          className="size-4"
          checked={confirm}
          onChange={(e) => setConfirm(e.target.checked)}
        />
        I have read and agree to the Terms and Conditions
      </label>
      <div className="flex flex-wrap gap-3">
        <Button onClick={onAgree} disabled={!confirm || loading}>
          {loading
            ? "Saving..."
            : current
            ? "Re-affirm and keep earning"
            : "Agree and start earning"}
        </Button>
        {current && (
          <Button variant="ghost" onClick={onDisable} disabled={loading}>
            Disable earning
          </Button>
        )}
      </div>
    </div>
  );
};

export default EarnInterestAgreement;
