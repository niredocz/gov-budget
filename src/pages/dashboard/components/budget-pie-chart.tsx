"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

import { ChartContainer } from "@/components/ui/chart"
import { formatCurrency } from "@/hooks/use-format-currency";

interface BudgetPieChartProps {
  data: { name: string; value: number }[]
}

export function BudgetPieChart({ data }: BudgetPieChartProps) {
  const COLORS = ["var(--chart-1)", "var(--chart-2)"]

  return (
    <ChartContainer
      config={{
        Planned: {
          label: "Planned Budget",
          color: "var(--chart-1)",
        },
        Actual: {
          label: "Actual Spending",
          color: "var(--chart-2)",
        },
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-1">
                        <div className="h-2 w-2 rounded-full" style={{ backgroundColor: payload[0].color }} />
                        <span className="text-sm font-medium">{payload[0].name}</span>
                      </div>
                      <div className="text-sm font-medium">{formatCurrency(payload[0].value as number)}</div>
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
