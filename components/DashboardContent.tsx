"use client"

import React from "react"
import { Inter } from "next/font/google"
import Image from "next/image"
import { CalendarIcon } from "@heroicons/react/24/outline"
import { AreaChart } from "@/components/tremor/AreaChart"
import { DonutChart } from "@/components/tremor/DonutChart"
import StaffList from "./tables/StaffList"
import Alerts from "./Alert"

const inter = Inter({ subsets: ["latin"] })

// Chart Data
interface DataItem {
  date: string
  payroll: number
}


// Donut Chart Data
const statusData = [
  { status: "Verified", amount: 75 },
  { status: "Pending", amount: 25 },
]

// 12 months of data
const data: DataItem[] = [
  { date: "2025-01-01", payroll: 2300 },
  { date: "2025-01-15", payroll: 2450 },
  { date: "2025-02-01", payroll: 3110 },
  { date: "2025-02-15", payroll: 3250 },
  { date: "2025-03-01", payroll: 4643 },
  { date: "2025-03-15", payroll: 4400 },
  { date: "2025-04-01", payroll: 4650 },
  { date: "2025-04-15", payroll: 4700 },
  { date: "2025-05-01", payroll: 3980 },
  { date: "2025-05-15", payroll: 4100 },
  { date: "2025-06-01", payroll: 4702 },
  { date: "2025-06-15", payroll: 4800 },
  { date: "2025-07-01", payroll: 5990 },
  { date: "2025-07-15", payroll: 5800 },
  { date: "2025-08-01", payroll: 5700 },
  { date: "2025-08-15", payroll: 5600 },
  { date: "2025-09-01", payroll: 4250 },
  { date: "2025-09-15", payroll: 4300 },
  { date: "2025-09-28", payroll: 4400 },
]

const ranges = ["1D", "1M", "3M", "6M", "1Y"] as const
type Range = typeof ranges[number]

function DashboardContent({ onStaffClick }: { onStaffClick: (staff: any) => void }){
  const [datas, setDatas] = React.useState<any | null>(null)
  const [range, setRange] = React.useState<Range>("1M")

  const currencyFormatter = (number: number) =>
    `$${Intl.NumberFormat("us").format(number)}`

  const payload = datas?.payload?.[0]
  const value = payload?.value

  const formattedValue = payload
    ? currencyFormatter(value)
    : currencyFormatter(data[data.length - 1].payroll)

  const filteredData = React.useMemo(() => {
    const now = new Date()

    const subtractMonths = (date: Date, months: number) => {
      const d = new Date(date)
      d.setMonth(d.getMonth() - months)
      return d
    }

    const subtractDays = (date: Date, days: number) => {
      const d = new Date(date)
      d.setDate(d.getDate() - days)
      return d
    }

    let cutoff: Date

    switch (range) {
      case "1D":
        cutoff = subtractDays(now, 1)
        break
      case "1M":
        cutoff = subtractMonths(now, 1)
        break
      case "3M":
        cutoff = subtractMonths(now, 3)
        break
      case "6M":
        cutoff = subtractMonths(now, 6)
        break
      case "1Y":
        cutoff = subtractMonths(now, 12)
        break
      default:
        return data
    }

    return data.filter((item) => new Date(item.date) >= cutoff)
  }, [range])
 
  return (
    <main className={`${inter.className} h-screen pb-[7rem] overflow-y-scroll`}>
      {/* Title */}
      <p className="text-2xl font-semibold pb-4 border-b-2 border-ashIn w-[70%]">
        Dashboard
      </p>

      {/* Stats Row */}
      <div className="data font-thin flex flex-wrap justify-center gap-6 items-stretch pt-4">
        {/* Employees */}
        <div className="employees flex items-center space-x-3 justify-center p-4 rounded-md border border-ashIn">
          <div className="text text-xs space-y-3">
            <p className="text-lg font-bold">55</p>
            <p className="capitalize font-normal">Number of employees</p>
            <p className="text-ashIn font-normal">
              <span className="text-lightBlue">&uarr;</span> <span>12 </span>
              more than last quarter
            </p>
          </div>
          <div className="profile relative w-8 h-8 flex justify-center">
            <Image
              src="/dashboard/profile.svg"
              alt="profile"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Balance */}
        <div className="balance flex items-center space-x-10 justify-center p-2 px-4 rounded-md border border-ashIn">
          <div className="text text-xs space-y-3">
            <p className="text-lg font-extrabold">
              $55,000
              <span className="font-semibold text-sm text-ashIn">.59</span>
            </p>
            <p className="capitalize font-normal">vault balance</p>
            <div className="profile relative w-8 h-8 flex justify-center">
              <Image
                src="/dashboard/vault.svg"
                alt="vault"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <div className="profile relative w-8 h-8 flex justify-center">
            <Image
              src="/dashboard/balance.svg"
              alt="balance"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Calendar */}
        <div className="calender flex items-center space-x-10 justify-center p-6 py-8 text-white rounded-md bg-blue">
          <div className="text text-xs space-y-3">
            <p className="text-xl font-extrabold capitalize">
              april 1st,
              <span className="font-semibold text-base">2025</span>
            </p>
            <p className="capitalize font-normal">upcoming payment</p>
          </div>
          <CalendarIcon className="w-8 h-8 text-white opacity-80" />
        </div>

        {/* Vault Card */}
        <div className="vault text-white p-3 px-4 rounded-md bg-blue">
          <div className="vaultImg relative w-12 h-12 justify-center flex gap-4 p-1 rounded-md">
            <Image
              src="/dashboard/vaultB.svg"
              alt="vault"
              fill
              className="object-contain"
            />
          </div>
          <p className="capitalize text-xs font-bold pb-2">vault balance</p>
          <button className="capitalize font-normal text-xs rounded-md bg-white text-black p-2 px-4">
            fund wallet
          </button>
        </div>
      </div>

      {/* Payroll Chart + Staff List */}
      <div className="flex flex-wrap gap-6 items-start">
        <div className="mt-10 flex-1 min-w-[300px] bg-white rounded-xl border border-ashOutline py-6">
          <div className="flex flex-wrap items-center justify-between px-4 gap-4">
            {/* Title */}
            <div>
              <p className="text-black text-xl font-bold">Payroll Costs</p>
              <p className="mt-1 text-lg font-semibold text-gray-900">
                {formattedValue}
              </p>
            </div>
            {/* Range Tabs */}
            <div className="flex flex-wrap gap-2">
              {ranges.map((r) => (
                <button
                  key={r}
                  onClick={() => setRange(r)}
                  className={`px-3 py-1 rounded-md text-sm transition ${
                    range === r
                      ? "bg-emerald-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Chart */}
          <AreaChart
            data={filteredData}
            index="date"
            categories={["payroll"]}
            showLegend={false}
            showGridLines={false}
            showYAxis={false}
            startEndOnly={true}
            className="-mb-2 mt-8 h-56"
            colors={["emerald"]}
            tooltipCallback={(props: any) => {
              if (props.active) {
                setDatas((prev: any) => {
                  if (prev?.label === props.label) return prev
                  return props
                })
              } else {
                setDatas(null)
              }
              return null
            }}
          />
        </div>

        {/* Staff List */}
        <div className="staff flex-1 min-w-[300px]">
          <StaffList onStaffClick={onStaffClick}/>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center my-4 gap-6">
        <div className="alerts min-w-[300px]">
          <Alerts />
        </div>
        <div className="status flex-1 bg-white rounded-xl border border-ashOutline p-6">
          <p className="capitalize font-semibold mb-4">Proof Status</p>
          <div className="flex items-center gap-6">
            {/* DonutChart */}
            <DonutChart
              className="h-40 w-40"
              data={statusData}
              category="status"
              value="amount"
              colors={["emerald", "amber"]}
              showLabel={true}
            />
            {/* Legend */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <span className="h-3 w-3 rounded-full bg-emerald-500"></span>
                <span className="text-gray-700">Verified</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="h-3 w-3 rounded-full bg-amber-500"></span>
                <span className="text-gray-700">Pending</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default DashboardContent
 