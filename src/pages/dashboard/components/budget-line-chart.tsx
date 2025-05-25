"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { ChartContainer } from "@/components/ui/chart"
import { formatCurrency, formatCurrencyLabel } from "@/hooks/use-format-currency";

interface BudgetLineChartProps {
  data: { year: string; actual: number }[]
}

export function BudgetLineChart({ data }: BudgetLineChartProps) {
  return (
    <ChartContainer
      config={{
        actual: {
          label: "Actual Spending",
          color: "var(--chart-1)",
        },
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 0,
          }}
        >
          <XAxis dataKey="year" tickLine={false} axisLine={false} tickMargin={10} />
          <YAxis tickFormatter={formatCurrencyLabel} tickLine={false} axisLine={false} tickMargin={10} />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="grid gap-1">
                      <p className="text-sm font-medium">{label}</p>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full" style={{ backgroundColor: "var(--chart-1)" }} />
                        <span className="text-sm">{formatCurrency(payload[0].value as number)}</span>
                      </div>
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
          <Line
            type="monotone"
            dataKey="actual"
            strokeWidth={2}
            activeDot={{
              r: 6,
              style: { fill: "var(--color-actual)", opacity: 0.8 },
            }}
            style={{
              stroke: "var(--color-actual)",
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
