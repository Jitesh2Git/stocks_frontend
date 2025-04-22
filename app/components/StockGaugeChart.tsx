"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { PieChart, Pie, Cell } from "recharts";

interface StockGaugeChartProps {
  probability_close: number;
  probability_trade: number;
}

const StockGaugeChart = ({
  probability_close,
  probability_trade,
}: StockGaugeChartProps) => {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const scoreClose = probability_close * 100;
  const scoreTrade = probability_trade * 100;

  const data = [
    { name: "Bearish", value: 33, color: "#EF4444" },
    { name: "Neutral", value: 34, color: "#FACC15" },
    { name: "Bullish", value: 33, color: "#10B981" },
  ];

  const getNeedleAngle = (score: number) => {
    if (score < 40) return 280;
    if (score > 60) return 90;
    return 360;
  };

  const renderGauge = (score: number, title: string) => (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-sm whitespace-nowrap sm:text-lg font-semibold dark:text-white text-center">
        {title}
      </h2>
      <PieChart width={300} height={180}>
        <Pie
          data={data}
          dataKey="value"
          cx="50%"
          cy="100%"
          startAngle={180}
          endAngle={0}
          innerRadius={70}
          outerRadius={90}
          paddingAngle={2}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>

        <g transform="translate(150, 150)">
          <line
            x1="0"
            y1="0"
            x2={Math.cos((getNeedleAngle(score) - 90) * (Math.PI / 180)) * 60}
            y2={Math.sin((getNeedleAngle(score) - 90) * (Math.PI / 180)) * 60}
            stroke="#9ae600"
            strokeWidth="3"
          />
          <circle cx="0" cy="0" r="5" fill="#9ae600" />
        </g>
      </PieChart>

      <div className="flex justify-center items-center w-full gap-6 mt-3 dark:text-white text-sm">
        <div className="flex flex-col items-center">
          <div className="w-3 h-3 bg-red-500 rounded-full mb-1"></div>
          <p>Bearish</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-3 h-3 bg-yellow-400 rounded-full mb-1"></div>
          <p>Neutral</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mb-1"></div>
          <p>Bullish</p>
        </div>
      </div>

      <p
        className={`text-md font-semibold mt-2 px-4 py-1 rounded-md text-center ${
          score < 40
            ? "text-red-500 dark:bg-red-900/20"
            : score > 60
            ? "text-green-500 dark:bg-green-900/20"
            : "text-yellow-400 dark:bg-yellow-900/20"
        }`}
      >
        {score < 40
          ? "Market Sentiment: Bearish"
          : score > 60
          ? "Market Sentiment: Bullish"
          : "Market Sentiment: Neutral"}{" "}
        ({score.toFixed(1)}%)
      </p>
    </div>
  );

  useEffect(() => {
    if (!isSignedIn) {
      router.push("/");
      return;
    }
  }, [isSignedIn, router]);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8">
      {renderGauge(scoreClose, "Chances of Closing Price Increasing")}
      {renderGauge(scoreTrade, "Chances of Trade Volume Increasing")}
    </div>
  );
};

export default StockGaugeChart;
