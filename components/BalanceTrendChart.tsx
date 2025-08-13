"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useMemo } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const BalanceTrendChart = ({
  transactions,
}: {
  transactions: Transaction[];
}) => {
  const { labels, balances } = useMemo(() => {
    const sorted = [...(transactions || [])].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    let running = 0;
    const points: { date: string; balance: number }[] = [];
    sorted.forEach((t) => {
      const amt = Number(t.amount || 0);
      const signed =
        t.type === "debit" || amt < 0 ? -Math.abs(amt) : Math.abs(amt);
      running += signed;
      points.push({
        date: new Date(t.date).toLocaleDateString(),
        balance: Number(running.toFixed(2)),
      });
    });
    const aggregated = new Map<string, number>();
    points.forEach((p) => aggregated.set(p.date, p.balance));
    const keys = Array.from(aggregated.keys());
    return { labels: keys, balances: keys.map((k) => aggregated.get(k) || 0) };
  }, [transactions]);

  const data = {
    labels,
    datasets: [
      {
        label: "",
        data: balances,
        borderColor: "#2f91fa",
        backgroundColor: "#2f91fa",
        tension: 0.4,
        fill: false,
        borderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 5,
        pointBackgroundColor: "#2f91fa",
        pointBorderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (ctx: any) => `${ctx.raw}`,
        },
      },
    },
    scales: {
      x: {
        display: true,
        grid: { display: false },
        ticks: { display: false },
        title: {
          display: true,
          text: "Date",
          color: "#667085",
          font: { weight: "600" },
        },
      },
      y: {
        display: true,
        grid: { display: false },
        ticks: { display: false },
        title: {
          display: true,
          text: "Balance",
          color: "#667085",
          font: { weight: "600" },
        },
      },
    },
    interaction: { mode: "nearest" as const, intersect: true },
    layout: { padding: { top: 8, right: 8, bottom: 8, left: 8 } },
    maintainAspectRatio: false,
  } as const;

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-16 font-semibold text-foreground">Balance trend</h3>
      </div>
      <div className="h-60 w-full">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default BalanceTrendChart;
