"use client";

import React, { useState } from "react";
import { Inter } from "next/font/google";
import Image from "next/image";
import { ProgressBar } from "@/components/tremor/ProgressBar";
import { Search, Plus, Upload, ChevronDown } from "lucide-react";
import StaffTable from "./tables/StaffTable";
import FormPopup from "./forms/FormPopup";
import SuccessPopup from "./forms/SuccessPopup";
import UploadCSV from "./forms/UploadCSV";

const inter = Inter({ subsets: ["latin"] });

function EmployeesContent() {
  const [showForm, setShowForm] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleFileUpload = (file: File) => {
    console.log("Uploaded file:", file);
    setShowUpload(false);
  };

  return (
    <div className={`${inter.className} w-full space-y-6 pb-20`}>
      {/* Title */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-800">Employees</h1>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-xl border flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-2xl font-bold text-gray-900">55</p>
            <p className="text-xs text-gray-500 uppercase font-semibold">Employees Onboarded</p>
          </div>
          <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
            <Image src="/dashboard/profile.svg" alt="profile" width={20} height={20} />
          </div>
        </div>

        <div className="p-4 bg-white rounded-xl border flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-2xl font-bold text-gray-900">04</p>
            <p className="text-xs text-gray-500 uppercase font-semibold">Pending Approvals</p>
          </div>
          <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center">
            <Image src="/dashboard/timer.svg" alt="timer" width={20} height={20} />
          </div>
        </div>

        <div className="p-4 bg-white rounded-xl border space-y-3">
          <p className="text-xs text-gray-500 uppercase font-semibold">Proof Status</p>
          <ProgressBar value={62} className="w-full" />
          <div className="flex gap-3 text-[10px]">
             <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Verified</div>
             <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> Pending</div>
          </div>
        </div>

        <div className="p-4 bg-white rounded-xl border flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-2xl font-bold text-gray-900">$55,000<span className="text-sm text-gray-400">.59</span></p>
            <p className="text-xs text-gray-500 uppercase font-semibold">Total Payroll</p>
          </div>
          <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
            <Image src="/dashboard/balance.svg" alt="balance" width={20} height={20} />
          </div>
        </div>
      </div>

      {/* Search + Buttons + Filter */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[250px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search staff..."
            className="w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={() => setShowForm(true)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-medium bg-blue-600 hover:bg-blue-700 transition shadow-sm"
          >
            <Plus className="w-4 h-4" /> Add Employee
          </button>
          <button 
            onClick={() => setShowUpload(true)} 
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-medium bg-gray-900 hover:bg-black transition shadow-sm"
          >
            <Upload className="w-4 h-4" /> Upload
          </button>
        </div>
      </div>

      {/* Staff Table - THE CONTAINER THAT ENABLES SCROLL */}
      <div className="w-full overflow-hidden">
        <StaffTable />
      </div>

      {/* Popups */}
      <FormPopup isOpen={showForm} onClose={() => setShowForm(false)} title="Add Employee">
        <form
          onSubmit={(e) => { e.preventDefault(); setShowForm(false); setShowSuccess(true); }}
          className="space-y-4"
        >
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase">Full Name</label>
            <input type="text" required className="w-full border rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase">Email Address</label>
            <input type="email" required className="w-full border rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white rounded-xl py-3 font-bold shadow-lg hover:bg-blue-700 transition">
            Save Employee
          </button>
        </form>
      </FormPopup>

      <SuccessPopup isOpen={showSuccess} onClose={() => setShowSuccess(false)} text="staff" />
      <UploadCSV isOpen={showUpload} onClose={() => setShowUpload(false)} text="Payroll" onFileUpload={handleFileUpload} />
    </div>
  );
}

export default EmployeesContent;
