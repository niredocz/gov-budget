"use client"

import { PieChartIcon as ChartPieIcon } from "lucide-react"

import { ModeToggle } from "./mode-toggle"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <ChartPieIcon className="h-6 w-6" />
          <h1 className="text-xl font-semibold tracking-tight">Local Government Budget Visualizer</h1>
        </div>
        <ModeToggle />
      </div>
    </header>
  )
}
