import React, { useState } from "react";
import { Inter } from "next/font/google";
import Image from "next/image";
import { Search, Plus } from "lucide-react";
import PayrollTable from "./tables/PayrollTable";

import FormPopup from "./forms/FormPopup";
import SuccessPopup from "./forms/SuccessPopup";
import DashboardContent from './DashboardContent';

const inter = Inter({ subsets: ["latin"] });

function PayrollContent() {
  const [showAmounts, setShowAmounts] = useState(false);
   const [showForm, setShowForm] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

  return (
    <main className={`${inter.className} h-screen pb-[7rem] w-full overflow-y-scroll`}>
      {/* Title */}
      <p className="text-2xl font-semibold pb-4 border-b-2 border-ashIn w-[70%]">
        Payroll
      </p>
      <p className="capitalize text-ashOutline font-medium text-base py-3">
        current payroll run: september 2025
      </p>

      <div className="space-y-2 p-1 md:p-3 w-full text-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="content w- w-full">
          {/* Top Summary Card */}
          <div className="bg-white rounded-xl border shadow-sm p-4 flex md:items-center md:justify-between gap-6">
            {/* Total Employees */}
            <div className="employees ">
              <p className="text-sm md:text-2xl font-extrabold">55</p>
              <p className="text-xs text-gray-500 w-1/2">Total Employees</p>
            </div>

            {/* Vault Balance */}
            <div className="balance p-2">
              <p className="text-sm md:text-lg font-extrabold">
                $55,000
                <span className="font-semibold text-sm text-ashIn">.59</span>
              </p>
              <p className="capitalize text-xs md:text-base font-normal">vault balance</p>
              <div className="profile relative w-8 h-8 flex justify-center">
                <Image
                  src="/dashboard/vault.svg"
                  alt="vault"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            {/* Gross Amount */}
            <div>
              <p
                className="text-sm md:text-xl font-bold tracking-widest"
                onClick={() => setShowAmounts((prev) => !prev)}>
                {showAmounts ? "$25,000.00" : "●●●●●"}
              </p>
              <p className="text-xs text-gray-500">Gross Amount</p>
            </div>

            {/* Net Payroll */}
            <div>
              <p
                className="text-sm md:text-xl font-bold tracking-widest"
                onClick={() => setShowAmounts((prev) => !prev)}>
                {showAmounts ? "$20,500.00" : "●●●●●"}
              </p>
              <p className="text-xs text-gray-500">Net Payroll</p>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="flex mt-4 items-center justify-between">
            {/* Preview Button */}
            <div className="relative flex-1 min-w-[200px] sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Create Payroll Button */}
            <button  onClick={() => setShowForm(true)} className="flex items-center ml-6 gap-2 text-sm text-white px-4 py-2 rounded-lg bg-gradient-to-b from-blue to-gradientBlue shadow hover:opacity-90 transition">
              <Plus className="w-4 h-4" />
              Create Payroll
            </button>
          </div>

          </div>


          {/* Vault Card */}
          <div className="vault text-white flex flex-col items-center w-[200px] py-8  justify-between bg-white p-3 px-8 rounded-md">
            <div className="vaultImg relative w-16 h-16 justify-center flex gap-4 p-1 rounded-md">
              <Image
                src="/dashboard/vaultVariant.svg"
                alt="vault"
                fill
                className="object-contain"
              />
            </div>
            <p className="capitalize text-xs font-bold pb-2 text-black">vault balance</p>
            <button className="capitalize font-normal text-xs rounded-md bg-[#CCEEFF] text-black p-2 px-4">
              fund wallet
            </button>
          </div>
          
      
      </div>

      {/* payroll tabel  */}
      <PayrollTable />





       {/* Create Payroll Form Popup */}
            <FormPopup
              isOpen={showForm}
              onClose={() => setShowForm(false)}
              title="Create Payroll"
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setShowForm(false);
                  setShowSuccess(true);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                     Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring focus:ring-blue-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Wallet Address
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring focus:ring-blue-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Monthly Pay
                  </label>
                    <input
                    type="text"
                    required
                    className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring focus:ring-blue-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    DashboardContent
                  </label>
                    <input
                    type="date"
                    required
                    className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring focus:ring-blue-200"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white rounded-lg py-2 bg-gradient-to-b from-blue to-gradientBlue  hover:bg-lightBlue"
                >
                  Save
                </button>
              </form>
            </FormPopup>
      
            {/* Success Popup */}
            <SuccessPopup
              isOpen={showSuccess}
              onClose={() => setShowSuccess(false)}
              text="Created a Payroll"
            />
    </main>
  );
}

export default PayrollContent;
