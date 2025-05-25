"use client"

import { useState } from "react"
import { FileDown, Printer } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import { BudgetLineChart } from "../components/budget-line-chart"
import { BudgetPieChart } from "../components/budget-pie-chart"
import { Navbar } from "@/components/navbar"
import { formatCurrency } from "@/hooks/use-format-currency"

// Sample data
const regions = ["North", "South", "East", "West", "Central"]
const years = ["2020", "2021", "2022", "2023", "2024"]
const sectors = ["Education", "Healthcare", "Infrastructure", "Public Safety", "Social Services"]

const budgetData = [
  { region: "North", year: "2020", sector: "Education", planned: 500000000, actual: 800000000 },
  { region: "North", year: "2021", sector: "Education", planned: 700000000, actual: 450000000 },
  { region: "North", year: "2022", sector: "Education", planned: 650000000, actual: 900000000 },
  { region: "North", year: "2023", sector: "Education", planned: 1000000000, actual: 700000000 },
  { region: "North", year: "2024", sector: "Education", planned: 850000000, actual: 1200000000 },

  { region: "South", year: "2020", sector: "Healthcare", planned: 1900000000, actual: 1800000000 },
  { region: "South", year: "2021", sector: "Healthcare", planned: 2100000000, actual: 2300000000 },
  { region: "South", year: "2022", sector: "Healthcare", planned: 2000000000, actual: 1500000000 },
  { region: "South", year: "2023", sector: "Healthcare", planned: 2200000000, actual: 1700000000 },
  { region: "South", year: "2024", sector: "Healthcare", planned: 2500000000, actual: 2600000000 },

  { region: "East", year: "2020", sector: "Infrastructure", planned: 3000000000, actual: 2500000000 },
  { region: "East", year: "2021", sector: "Infrastructure", planned: 3100000000, actual: 3200000000 },
  { region: "East", year: "2022", sector: "Infrastructure", planned: 2900000000, actual: 3300000000 },
  { region: "East", year: "2023", sector: "Infrastructure", planned: 3500000000, actual: 3000000000 },
  { region: "East", year: "2024", sector: "Infrastructure", planned: 3700000000, actual: 3900000000 },

  { region: "West", year: "2020", sector: "Public Safety", planned: 1700000000, actual: 1600000000 },
  { region: "West", year: "2021", sector: "Public Safety", planned: 1800000000, actual: 2000000000 },
  { region: "West", year: "2022", sector: "Public Safety", planned: 1900000000, actual: 1700000000 },
  { region: "West", year: "2023", sector: "Public Safety", planned: 2000000000, actual: 2100000000 },
  { region: "West", year: "2024", sector: "Public Safety", planned: 2200000000, actual: 1900000000 },

  { region: "Central", year: "2020", sector: "Social Services", planned: 1000000000, actual: 300000000 },
  { region: "Central", year: "2021", sector: "Social Services", planned: 1400000000, actual: 1300000000 },
  { region: "Central", year: "2022", sector: "Social Services", planned: 1600000000, actual: 800000000 },
  { region: "Central", year: "2023", sector: "Social Services", planned: 1200000000, actual: 1800000000 },
  { region: "Central", year: "2024", sector: "Social Services", planned: 1500000000, actual: 1100000000 },
];


export const DashboardViews = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>("All")
  const [selectedYear, setSelectedYear] = useState<string>("2024")
  const [selectedSector, setSelectedSector] = useState<string>("All")

  // Filter data based on selections
  const filteredData = budgetData.filter((item) => {
    return (
      (selectedRegion === "All" || item.region === selectedRegion) &&
      (selectedYear === "All" || item.year === selectedYear) &&
      (selectedSector === "All" || item.sector === selectedSector)
    )
  })

  // Get yearly data for the line chart (for selected region and sector)
  const yearlyData = years.map((year) => {
    const yearData = budgetData.filter((item) => {
      return (
        item.year === year &&
        (selectedRegion === "All" || item.region === selectedRegion) &&
        (selectedSector === "All" || item.sector === selectedSector)
      )
    })

    const totalActual = yearData.reduce((sum, item) => sum + item.actual, 0)
    return { year, actual: totalActual }
  })

  // Calculate totals for pie chart
  const totalPlanned = filteredData.reduce((sum, item) => sum + item.planned, 0)
  const totalActual = filteredData.reduce((sum, item) => sum + item.actual, 0)
  const pieChartData = [
    { name: "Planned", value: totalPlanned },
    { name: "Actual", value: totalActual },
  ]

  // Export as CSV
  const exportCSV = () => {
    const headers = ["Region", "Year", "Sector", "Planned Budget", "Actual Spending"]
    const csvData = filteredData.map((item) => [item.region, item.year, item.sector, item.planned, item.actual])

    const csvContent = [headers.join(","), ...csvData.map((row) => row.join(","))].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", "budget_data.csv")
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Print function for PDF (using browser print)
  const printData = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto py-6 px-4 md:px-6 space-y-8">
        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filters</CardTitle>
            <CardDescription>Select region, year, and sector to filter the data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label htmlFor="region-select" className="text-sm font-medium">
                  Region
                </label>
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger className="cursor-pointer w-full" id="region-select">
                    <SelectValue placeholder="Select Region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Regions</SelectItem>
                    {regions.map((region) => (
                      <SelectItem key={region} value={region}>
                        {region}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="year-select" className="text-sm font-medium">
                  Year
                </label>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="cursor-pointer w-full" id="year-select">
                    <SelectValue placeholder="Select Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Years</SelectItem>
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="sector-select" className="text-sm font-medium">
                  Sector
                </label>
                <Select value={selectedSector} onValueChange={setSelectedSector}>
                  <SelectTrigger className="cursor-pointer w-full" id="sector-select">
                    <SelectValue placeholder="Select Sector" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Sectors</SelectItem>
                    {sectors.map((sector) => (
                      <SelectItem key={sector} value={sector}>
                        {sector}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Planned vs Actual Budget</CardTitle>
              <CardDescription>Comparison of planned and actual budget for the selected filters</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <BudgetPieChart data={pieChartData} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actual Spending Over Years</CardTitle>
              <CardDescription>Spending trends across years for the selected region and sector</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <BudgetLineChart data={yearlyData} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Data Table */}
        <Card>
          <CardHeader>
            <CardTitle>Budget Data</CardTitle>
            <CardDescription>Detailed budget information based on selected filters</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Region</TableHead>
                    <TableHead>Year</TableHead>
                    <TableHead>Sector</TableHead>
                    <TableHead className="text-right">Planned Budget</TableHead>
                    <TableHead className="text-right">Actual Spending</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.length > 0 ? (
                    filteredData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.region}</TableCell>
                        <TableCell>{item.year}</TableCell>
                        <TableCell>{item.sector}</TableCell>
                        <TableCell className="text-right">{formatCurrency(item.planned)}</TableCell>
                        <TableCell className="text-right">{formatCurrency(item.actual)}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4">
                        No data available for the selected filters
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Export Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-end">
          <Button onClick={exportCSV} className="flex items-center gap-2">
            <FileDown className="h-4 w-4" />
            Export as CSV
          </Button>
          <Button onClick={printData} className="flex items-center gap-2">
            <Printer className="h-4 w-4" />
            Export as PDF
          </Button>
        </div>
      </main>
    </div>
  )
}
