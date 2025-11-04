"use client";

import React, { useState } from "react";
import { Inter } from "next/font/google";
import Image from "next/image";
import { ProgressBar } from "@/components/tremor/ProgressBar";
import { Search, Plus, Upload, ChevronDown } from "lucide-react";
import StaffTable from "./tables/StaffTable";

// import FormPopup from "@/components/forms/FormPopup";

import FormPopup from "./forms/FormPopup";
import SuccessPopup from "./forms/SuccessPopup";
import UploadCSV from "./forms/UploadCSV";
// import SuccessPopup from "./forms/SuccessPopup;

const inter = Inter({ subsets: ["latin"] });

function EmployeesContent() {
    const [showForm, setShowForm] = useState(false);
    const [showUpload, setShowUpload] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

    const handleFileUpload = (file: File) => {
    console.log("Uploaded file:", file);
    setShowUpload(false); // close modal after upload
  };

  return (
    <main
      className={`${inter.className} h-screen pb-[7rem] overflow-y-scroll `}>
      {/* Title */}
      <p className="text-2xl font-semibold pb-4 border-b-2 border-ashIn w-[70%]">
        Employees
      </p>

      {/* Stats Row */}
      <div className="data font-thin flex flex-wrap gap-4 justify-center items-stretch pt-4">
        {/* Employees */}
        <div className="flex flex-1 min-w-[200px] items-center justify-between p-4 rounded-md border border-ashIn">
          <div className="text text-xs space-y-2">
            <p className="text-lg font-bold">55</p>
            <p className="capitalize font-normal">employees onboarded</p>
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

        {/* Approvals */}
        <div className="flex flex-1 min-w-[200px] items-center justify-between p-4 rounded-md border border-ashIn">
          <div className="text text-xs space-y-2">
            <p className="text-lg font-extrabold">04</p>
            <p className="capitalize font-normal">pending approvals</p>
          </div>
          <div className="profile relative w-8 h-8 flex justify-center">
            <Image
              src="/dashboard/timer.svg"
              alt="timer"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Status */}
        <div className="flex flex-col flex-1 min-w-[200px] justify-start p-4 rounded-md border border-ashIn">
          <div className="text text-xs space-y-1">
            <p className="text-xl font-extrabold capitalize">proof status</p>
            <p className="capitalize font-normal">upcoming payment</p>
          </div>
          <div className="mt-2">
            <ProgressBar value={62} className="w-28" />
          </div>
          <div className="title-legend flex flex-wrap gap-4 text-xs mt-3">
            <div className="flex items-center space-x-2">
              <span className="h-3 w-3 rounded-full bg-emerald-500"></span>
              <span className="text-black">Verified</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="h-3 w-3 rounded-full bg-amber-500"></span>
              <span className="text-black">Pending</span>
            </div>
          </div>
        </div>

        {/* Balance */}
        <div className="flex flex-1 min-w-[200px] items-center justify-between p-4 rounded-md border border-ashIn">
          <div className="text text-xs space-y-2">
            <p className="text-lg font-extrabold">
              $55,000
              <span className="font-semibold text-sm text-ashIn">.59</span>
            </p>
            <p className="capitalize font-normal">total payroll</p>
            <p className="capitalize font-normal">this month</p>
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
      </div>

      {/* Search + Buttons + Filter */}
      <div className="flex flex-wrap items-center gap-3  mt-6">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px] sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Add Employee */}
   <button
          onClick={() => setShowForm(true)}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium bg-gradient-to-b from-blue to-gradientBlue shadow hover:opacity-90 transition"
        >
          <Plus className="w-4 h-4" />
          Add Employee
        </button>

        {/* Upload CSV */}
        <button onClick={() => setShowUpload(true)} className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium bg-gray-900 shadow hover:opacity-90 transition">
          <Upload className="w-4 h-4" />
          Upload CSV
        </button>

        {/* Filter */}
        <div className="relative min-w-[150px] flex-1 sm:flex-none">
          <select className="appearance-none w-full px-3 py-2 pr-8 border rounded-lg text-sm text-gray-700 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none">
            <option>All staff</option>
            <option>Verified</option>
            <option>Pending</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Staff Table */}
      <div className="p-3 my-4">
        <StaffTable />
      </div>






      
       {/* Add Employee Form Popup */}
      <FormPopup
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        title="Add Employee"
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
              Full Name
            </label>
            <input
              type="text"
              required
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              required
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Position
            </label>
              <input
              type="text"
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
        text="staff"
      />

      <UploadCSV
        isOpen={showUpload}
        onClose={() => setShowUpload(false)}
        text="Payroll"
        onFileUpload={handleFileUpload}
      />
    </main>
  );
}

export default EmployeesContent;
