import { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

import { userAnalytics } from "@/data/userAnalytics";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  users: {
    label: "New Users",
    color: "#0d9488",
  },
};

const EMPTY_USERS = [];

const filters = [
  { label: "Daily", value: "daily" },
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
];

export default function UserChart({ userData = EMPTY_USERS }) {
  const [period, setPeriod] = useState("weekly");

  const { chartData, currentTotal, previousTotal, growth } = useMemo(
    () => userAnalytics(userData, period),
    [userData, period],
  );

  const isGrowthPositive = growth !== null && growth > 0;
  const isGrowthNegative = growth !== null && growth < 0;

  const footerText = {
    daily: "Registrations today",
    weekly: "Registrations over the last 7 days",
    monthly: "Registrations over the last 30 days",
  };

  return (
    <div className="w-full min-w-0 rounded-xl border bg-card p-5">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">User Registrations</h3>

          <p className="text-sm text-muted-foreground">
            Daily new user registrations
          </p>
        </div>

        <div className="flex rounded-lg border p-1">
          {filters.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setPeriod(item.value)}
              aria-pressed={period === item.value}
              className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                period === item.value
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-3xl font-bold">
            {currentTotal.toLocaleString()}
          </h2>

          <div
            className={`flex items-center gap-1 text-sm font-medium ${
              isGrowthPositive
                ? "text-green-600"
                : isGrowthNegative
                  ? "text-red-500"
                  : "text-muted-foreground"
            }`}
          >
            {isGrowthPositive ? (
              <TrendingUp size={16} />
            ) : isGrowthNegative ? (
              <TrendingDown size={16} />
            ) : (
              <Minus size={16} />
            )}

            <span>
              {growth === null
                ? "N/A"
                : `${growth > 0 ? "+" : ""}${growth.toFixed(1)}%`}
            </span>
          </div>
        </div>

        <p className="mt-1 text-xs text-muted-foreground">
          {previousTotal === 0
            ? "No registrations in the previous period"
            : `Compared with ${previousTotal} in the previous period`}
        </p>
      </div>

      <ChartContainer config={chartConfig} className="h-70  w-full">
        <BarChart
          accessibilityLayer
          data={chartData}
          margin={{ top: 10, right: 10, left: 0 }}
        >
          <CartesianGrid vertical={false} />

          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            minTickGap={15}
            interval={period === "monthly" ? "preserveStartEnd" : 0}
          />

          <YAxis
            allowDecimals={false}
            tickLine={false}
            axisLine={false}
            width={35}
            domain={[0, "auto"]}
          />

          <ChartTooltip
            content={
              <ChartTooltipContent
                labelFormatter={(_, payload) =>
                  payload?.[0]?.payload?.date || ""
                }
              />
            }
          />

          <Bar
            dataKey="users"
            fill="#3B82F6"
            radius={[5, 5, 0, 0]}
            maxBarSize={48}
          />
        </BarChart>
      </ChartContainer>

      <p className="mt-3 text-center text-xs text-muted-foreground">
        {footerText[period]}
      </p>
    </div>
  );
}
