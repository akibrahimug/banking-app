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
import { formatAmount } from "@/lib/utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const SpendingByCategoryChart = ({
  transactions,
}: SpendingByCategoryChartProps) => {
  const { labels, values } = useMemo(() => {
    const totalsByCategory = new Map<string, number>();

    (transactions || []).forEach((t) => {
      const category = t.category || "Uncategorized";
      // Treat all amounts as spend by default; transfers will be included as well.
      const amount = Math.abs(Number(t.amount || 0));
      totalsByCategory.set(
        category,
        (totalsByCategory.get(category) || 0) + amount
      );
    });

    const sorted = Array.from(totalsByCategory.entries()).sort(
      (a, b) => b[1] - a[1]
    );
    const top = sorted.slice(0, 6);
    return {
      labels: top.map(([name]) => name),
      values: top.map(([, val]) => Number(val.toFixed(2))),
    };
  }, [transactions]);

  const data = {
    labels,
    datasets: [
      {
        label: "",
        data: values,
        borderColor: "#2265d8",
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 5,
        pointBackgroundColor: "#2265d8",
        pointBorderWidth: 0,
        fill: false,
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
          label: (ctx: any) => `${formatAmount(Number(ctx.raw || 0))}`,
        },
      },
    },
    scales: {
      x: {
        display: true,
        grid: { display: false },
        ticks: {
          display: true,
          autoSkip: true,
          maxTicksLimit: 6,
          maxRotation: 0,
          minRotation: 0,
          color: "#667085",
        },
        title: {
          display: true,
          text: "Categories",
          color: "#667085",
          font: { weight: 600 },
        },
      },
      y: {
        display: true,
        grid: { display: false },
        ticks: { display: false },
        title: {
          display: true,
          text: "Spend (USD)",
          color: "#667085",
          font: { weight: 600 },
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
        <h3 className="text-16 font-semibold text-foreground">
          Top spending categories
        </h3>
      </div>
      <div className="h-60 w-full">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default SpendingByCategoryChart;
