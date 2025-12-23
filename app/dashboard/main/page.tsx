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
  const [activeTab, setActiveTab] = useState("employees"); // Set to employees for testing

  const [selectedStaff, setSelectedStaff] = useState<any | null>(null);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <DashboardContent
            onStaffClick={(staff: any) => {
              setSelectedStaff(staff);
              setActiveTab("employeeDetail");
            }}
          />
        );
      case "employees":
        return <EmployeesContent />;
      case "employeeDetail":
        return (
          <EmployeeDetailContent
            staff={selectedStaff}
            onBack={() => setActiveTab("dashboard")}
          />
        );
      case "payroll":
        return <PayrollContent />;
      case "payslip":
        return <PayslipContent />;
      case "settings":
        return <SettingsContent />;
      default:
        return (
          <DashboardContent
            onStaffClick={(staff: any) => {
              setSelectedStaff(staff);
              setActiveTab("employeeDetail");
            }}
          />
        );
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gray-50">
      {/* ---- NAVBAR ---- */}
      <nav className={`${inter400.className} px-4 md:px-6 w-full bg-white shadow-sm relative flex flex-col md:flex-row md:items-center md:justify-between h-auto md:h-[80px] z-30`}>
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="logo relative w-24 h-10 md:w-32 md:h-14">
            <Image src="/logo.png" alt="Logo" fill className="object-contain" />
          </div>
          <button className="md:hidden p-2" onClick={() => setNavOpen(!navOpen)}>
            <div className="space-y-1.5">
              <span className={`block w-6 h-0.5 bg-gray-600 transition-all ${navOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-6 h-0.5 bg-gray-600 ${navOpen ? "opacity-0" : ""}`} />
              <span className={`block w-6 h-0.5 bg-gray-600 transition-all ${navOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>

        <div className={`${navOpen ? "flex" : "hidden"} md:flex flex-col md:flex-row items-center gap-4 pb-4 md:pb-0`}>
          <div className="flex flex-wrap justify-center gap-2">
            <div className="rounded-full text-[10px] bg-blue-600 px-3 py-1 text-white">Admin</div>
            <div className="rounded-full text-[10px] bg-gray-100 border px-3 py-1 text-gray-500 truncate max-w-[150px]">
              Addr: 1aB9x...XqA
            </div>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium">De Morgan&apos;s</p>
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
              <UserIcon className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </nav>

      {/* ---- DASHBOARD LAYOUT ---- */}
      <section className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`bg-white border-r w-64 p-4 transform transition-transform duration-300 ease-in-out z-20 
          fixed md:static h-[calc(100vh-80px)] ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
        >
          <div className="flex flex-col gap-2">
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
                className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                  activeTab === item.id ? "bg-blue-50 text-blue-600" : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Main Content Area - THE CRITICAL FIX */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 min-w-0">
          <div className="max-w-full">
            {renderContent()}
          </div>
        </main>

        {/* Mobile Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-2xl z-40"
        >
          {sidebarOpen ? "✕" : "☰"}
        </button>
      </section>
    </div>
  );
}
