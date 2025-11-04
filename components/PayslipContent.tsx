import React from 'react'
import { Inter } from "next/font/google";
import PayslipTable from './tables/PayslipTable';
import { Date } from './ui/Date';

const inter = Inter({ subsets: ["latin"] });



function PayslipContent() {
  return (
      <main
      className={`${inter.className} h-screen pb-[7rem] overflow-y-scroll `}>
      {/* Title */}
      <p className="text-2xl font-semibold pb-4 border-b-2 border-ashIn w-[70%]">
        Payslip
      </p>
        <p className="capitalize text-ashOutline font-medium text-base py-3">
        current payslip run: september 2025
      </p>
{/* date oicker */}
<Date />

<PayslipTable />
      </main>
  )
}

export default PayslipContent