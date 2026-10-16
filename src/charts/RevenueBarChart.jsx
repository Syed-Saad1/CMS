import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "#0d9488",
  },
};

export default function RevenueBarChart({ data = [] }) {
  return (
    <div className="w-full min-w-0 rounded-xl border bg-card p-5">
      <div className="mb-5">
        <h3 className="text-lg font-semibold">Monthly Revenue</h3>
        <p className="text-sm text-muted-foreground">Revenue performance</p>
      </div>

      {data.length === 0 ? (
        <div className="flex h-70 items-center justify-center text-sm text-muted-foreground">
          No data available
        </div>
      ) : (
        <ChartContainer config={chartConfig} className="h-70 w-full">
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value / 1000}k`}
            />

            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

            <Bar
              dataKey="revenue"
              fill="var(--color-revenue)"
              radius={[6, 6, 0, 0]}
              maxBarSize={45}
            />
          </BarChart>
        </ChartContainer>
      )}
    </div>
  );
}
