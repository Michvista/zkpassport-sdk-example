"use client"

import React from "react"

import { DatePicker } from "@/components/tremor/DatePicker"

export const Date = () => {
  const [date, setDate] = React.useState<Date | undefined>(undefined)
  return (
    <div className="flex flex-col items-start gap-y-4">
      <DatePicker
        enableYearNavigation
        value={date}
        onChange={setDate}
        className="w-60"
      />
      {/* <p className="flex items-center rounded-md bg-gray-100 p-2 text-sm text-gray-500 dark:bg-gray-800 dark:text-gray-300">
        Selected Date: {date ? date.toLocaleDateString() : "None"}
      </p> */}
    </div>
  )
}