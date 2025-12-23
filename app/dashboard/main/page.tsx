"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Inter } from "next/font/google";
import { UserIcon } from "@heroicons/react/24/outline";
import {
  HomeIcon,
  UsersIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

import DashboardContent from "@/components/DashboardContent";
import EmployeesContent from "@/components/EmployeesContent";
import PayrollContent from "@/components/PayrollContent";
import PayslipContent from "@/components/PayslipContent";
import SettingsContent from "@/components/SettingsContent";
import EmployeeDetailContent from "@/components/moreDetails/EmployeeDetails";

const inter500 = Inter({ weight: "500", subsets: ["latin"] });
const inter400 = Inter({ weight: "400", subsets: ["latin"] });

export default function Page() {
  const [navOpen, setNavOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("employees");
  const [selectedStaff, setSelectedStaff] = useState<any | null>(null);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardContent onStaffClick={(s: any) => { setSelectedStaff(s); setActiveTab("employeeDetail"); }} />;
      case "employees":
        return <EmployeesContent />;
      case "employeeDetail":
        return <EmployeeDetailContent staff={selectedStaff} onBack={() => setActiveTab("dashboard")} />;
      case "payroll":
        return <PayrollContent />;
      case "payslip":
        return <PayslipContent />;
      case "settings":
        return <SettingsContent />;
      default:
        return <DashboardContent onStaffClick={(s: any) => { setSelectedStaff(s); setActiveTab("employeeDetail"); }} />;
    }
  };

  return (
    <div className="h-screen overflow-hidden flex flex-col">
      {/* ---- NAVBAR (Kept your original design) ---- */}
      <nav className={`${inter400.className} px-4 md:px-6 w-full bg-white shadow-md relative flex flex-col md:flex-row md:items-center md:justify-evenly h-auto md:h-[80px] z-30`}>
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="logo relative w-24 h-10 md:w-32 md:h-14 flex justify-center md:justify-start">
            <Image src="/logo.png" alt="Logo" fill className="object-contain" />
          </div>
          <button className="md:hidden flex items-center justify-center w-10 h-10" onClick={() => setNavOpen(!navOpen)}>
            <div className="flex flex-col justify-center items-center h-full">
              <span className={`block w-6 h-0.5 bg-darkBlue transition-all ${navOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-6 h-0.5 bg-darkBlue my-1 ${navOpen ? "opacity-0" : ""}`} />
              <span className={`block w-6 h-0.5 bg-darkBlue transition-all ${navOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>

        <div className={`w-full transition-all duration-300 ${navOpen ? "max-h-[600px] opacity-100 py-4" : "max-h-0 opacity-0 py-0"} md:flex md:items-center md:justify-evenly md:max-h-full md:opacity-100 md:py-0`}>
          <div className="links flex flex-col md:flex-row md:items-center gap-4 md:gap-10 items-center">
            <div className="txt rounded-full text-xs bg-blue text-center px-4 py-2 text-white">Admin</div>
            <div className="txt rounded-full text-xs bg-[#F4F4F5] text-ashIn border-2 border-[#6D6D6D4D] px-3 py-2 flex gap-1">
              API: <span className="max-w-[15ch] truncate">A9#tL7!xQ2@vZp$3mN^gW8&rYb*J5e+Tc1Xq</span>
            </div>
          </div>
          <div className="btns flex items-center justify-center mt-4 md:mt-0 gap-2">
            <p className={`capitalize text-base ${inter500.className}`}>De Morgan&apos;s Finance</p>
            <button className="rounded-full bg-blue p-2 text-white">
              <UserIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      <section className="flex flex-1 overflow-hidden">
        {/* ---- SIDEBAR (Restored your exact gradient/styles) ---- */}
        <aside className={`bg-white shadow-md w-64 p-4 transform transition-transform duration-300 z-20 fixed md:static h-full ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
          <div className="flex flex-col gap-4">
            {[
              { id: "dashboard", label: "Dashboard", icon: HomeIcon },
              { id: "employees", label: "Employees", icon: UsersIcon },
              { id: "payroll", label: "Payroll", icon: CurrencyDollarIcon },
              { id: "payslip", label: "Payslip", icon: DocumentTextIcon },
              { id: "settings", label: "Settings", icon: Cog6ToothIcon },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
                className={`flex items-center gap-3 p-2 rounded-md transition-all ${activeTab === item.id ? "bg-[#14acd667]" : "text-gray-700 hover:bg-gray-100"}`}
              >
                <item.icon className={`w-5 h-5 ${activeTab === item.id ? "text-lightBlue" : "text-gray-600"}`} />
                <span className={activeTab === item.id ? "bg-gradient-to-r from-lightBlue to-gradientBlue bg-clip-text text-transparent font-medium" : "font-medium"}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </aside>

        {/* ---- MAIN CONTENT (The scroll fix) ---- */}
        <main className="flex-1 p-6 overflow-y-auto min-w-0">
          {renderContent()}
        </main>

        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden fixed bottom-6 right-6 bg-blue text-white p-3 rounded-full shadow-lg z-30">☰</button>
      </section>
    </div>
  );
}
