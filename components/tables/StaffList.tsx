"use client"

import React from "react"
import { Inter } from "next/font/google"
import Link from "next/link"

const inter = Inter({ subsets: ["latin"] })



export default function StaffList({ onStaffClick }: { onStaffClick: (staff: any) => void }) {
  const staff = [
    { id: "01", name: "Mario Gonzalez", status: "Verified", role: "Verifier", wallet: "0x1234...78hg90" },
    { id: "02", name: "Simon Peter", status: "Verified", role: "Verifier", wallet: "0x5678...90hj12" },
    { id: "03", name: "John Doe", status: "Pending", role: "Employee", wallet: "0x9876...12ab34" },
  ];

  return (
    <div className="p-4">
      <div className="border border-blue-300 rounded-lg shadow-sm">
        <div className="border-b p-3 font-semibold text-gray-800">Staff List</div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-ashOutline">
              <th className="p-2 border-b">S/N</th>
              <th className="p-2 border-b">Staff Name</th>
              <th className="p-2 border-b">ZkProof Status</th>
            </tr>
          </thead>
          <tbody className="text-ashIn font-normal cursor-pointer">
            {staff.map((person) => (
              <tr
                key={person.id}
                className="hover:bg-gray-50"
                onClick={() => onStaffClick(person)} 
              >
                <td className="p-2 border-b">{person.id}</td>
                <td className="p-2 border-b">{person.name}</td>
                <td
                  className={`p-2 border-b ${
                    person.status === "Verified" ? "text-green" : "text-orange-500"
                  }`}
                >
                  {person.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
