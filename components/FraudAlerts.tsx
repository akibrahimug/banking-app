"use client";

import { useMemo } from "react";
import { formatDateTime } from "@/lib/utils";

const FraudAlerts = ({ transactions }: { transactions: Transaction[] }) => {
  const alerts = useMemo(() => {
    const suspicious: { id: string; message: string; date: string }[] = [];

    (transactions || []).forEach((t) => {
      const amount = Number(t.amount || 0);
      const isHighValue = amount >= 1000; // heuristic
      const isOddHour = (() => {
        const hour = new Date(t.date).getHours();
        return hour < 6 || hour > 22;
      })();
      const isTransfer = (t.category || "").toLowerCase().includes("transfer");

      if (isHighValue || (isOddHour && isTransfer)) {
        const description = isHighValue
          ? `High-value transaction: ${amount}`
          : `Unusual time transfer at ${
              formatDateTime(new Date(t.date)).timeOnly
            }`;
        suspicious.push({
          id: t.id || t.$id,
          message: `${description} • ${t.name}`,
          date: formatDateTime(new Date(t.date)).dateTime,
        });
      }
    });

    return suspicious.slice(0, 5);
  }, [transactions]);

  if (!alerts.length) return null;

  return (
    <div className="rounded-lg border border-amber-300 bg-amber-50 p-4">
      <div className="mb-2 flex items-center gap-2 text-amber-800">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5"
        >
          <path
            fillRule="evenodd"
            d="M2.293 13.293a1 1 0 011.414 0L12 21.586l8.293-8.293a1 1 0 111.414 1.414l-9 9a1 1 0 01-1.414 0l-9-9a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
        <h3 className="text-14 font-semibold">Security alerts</h3>
      </div>
      <ul className="space-y-2">
        {alerts.map((a) => (
          <li key={a.id} className="text-13 text-amber-900">
            <span className="font-medium">{a.date}:</span> {a.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FraudAlerts;
