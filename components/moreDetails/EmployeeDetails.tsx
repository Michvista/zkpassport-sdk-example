import React from 'react'
import { Inter } from "next/font/google";
import { UserIcon } from "@heroicons/react/24/outline";


const inter = Inter({ subsets: ["latin"] });

export default function EmployeeDetailContent({ staff, onBack }: { staff: any; onBack: () => void }) {
  if (!staff) return null;

  return (
    <div className={` ${inter.className} p-6 bg-white rounded-lg shadow-md w-full overflow-y-scroll`}>
      <button onClick={onBack} className="mb-4 text-blue-600 text-sm hover:underline">
        ← Back to Dashboard
      </button>

      <div className="flex items-center gap-4">
     <div>
          <UserIcon
            className="w-16 h-16 relative"
          />
        </div>
        <div>
          <h2 className="font-semibold text-lg">Personal Information</h2>
          <p className="text-gray-700">{staff.name}</p>
          <p className="text-sm text-gray-500">{staff.role}</p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold">Verification Status</h3>
        <p className={staff.status === "Verified" ? "text-green font-bold" : "text-orange-500 font-bold"}>
          {staff.status}
        </p>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold">Wallet Address</h3>
        <input
          type="text"
          disabled
          value={staff.wallet}
          className="w-full bg-gray-100 rounded px-3 py-2 mt-1"
        />
      </div>

      <div className="mt-6">
        <h3 className="font-semibold">Payment Details</h3>
        <table className="w-full border mt-2 text-sm">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Amount</th>
              <th className="p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-2">MM/DD/YY</td>
              <td className="p-2">$1,000.00</td>
              <td className="p-2">Completed</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

