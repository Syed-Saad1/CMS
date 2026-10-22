import { useMemo, useState } from "react";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";

import { userAnalytics } from "@/data/userAnalytics";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
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

export default function UserChart({ UserLoading, userData = EMPTY_USERS }) {
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
    <div>
      <div className="w-full h-fit! min-w-0 rounded-xl border bg-card p-5 mb-10">
        <div className="flex flex-wrap items-start justify-between gap-3">
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

        <div className="mb-6 mt-4">
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

        <ChartContainer config={chartConfig} className="h-50 w-full">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient
                id="userRegistrationGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.4} />
                <stop offset="50%" stopColor="#3B82F6" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.01} />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              stroke="currentColor"
              strokeOpacity={0.08}
              strokeDasharray="0"
            />

            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              minTickGap={15}
              interval={period === "monthly" ? "preserveStartEnd" : 0}
              tick={{
                fontSize: 11,
                fill: "var(--muted-foreground)",
              }}
            />

            <YAxis
              allowDecimals={false}
              tickLine={false}
              axisLine={false}
              width={35}
              domain={[0, "auto"]}
              tick={{
                fontSize: 11,
                fill: "var(--muted-foreground)",
              }}
            />

            <ChartTooltip
              cursor={{
                stroke: "#3B82F6",
                strokeWidth: 1,
                strokeDasharray: "4 4",
              }}
              content={
                <ChartTooltipContent
                  indicator="dot"
                  labelFormatter={(_, payload) =>
                    payload?.[0]?.payload?.date || ""
                  }
                />
              }
            />

            <Area
              dataKey="users"
              type="monotone"
              stroke="#3B82F6"
              strokeWidth={2}
              fill="url(#userRegistrationGradient)"
              fillOpacity={1}
              dot={false}
              activeDot={{
                r: 4,
                stroke: "#3B82F6",
                strokeWidth: 2,
                fill: "var(--background)",
              }}
              connectNulls={false}
              isAnimationActive
              animationDuration={800}
            />
          </AreaChart>
        </ChartContainer>

        <p className="mt-2 text-center text-xs text-muted-foreground">
          {footerText[period]}
        </p>
      </div>
    </div>
  );
}
