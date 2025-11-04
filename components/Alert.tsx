import React from "react";

type Alert = {
  message: string;
  time?: string; // only right side alerts have timestamps
};

const leftAlerts: Alert[] = [
  { message: "Onboarding: 12 Employees joined this month" },
  { message: "Verification: 8 Pending Zk Passport verifications" },
  { message: "Errors: 3 failed payroll transfers in retry queue" },
  { message: "Batch #01 Awaiting Approval" },
];

const rightAlerts: Alert[] = [
  { message: "CFO Approves Batch", time: "09:00 AM" },
  { message: "Simon Completed ZKPassport", time: "09:00 AM" },
  { message: "HR Finalized Payroll", time: "09:00 AM" },
  { message: "2 New Employee Onboarded", time: "09:00 AM" },
  { message: "Wide Submitted Proof", time: "09:00 AM" },
];

export default function Alerts() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">Alerts</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
        {/* Left column */}
        <ul className="space-y-2 list-disc list-inside">
          {leftAlerts.map((alert, idx) => (
            <li key={idx}>{alert.message}</li>
          ))}
        </ul>

        {/* Right column */}
        <ul className="space-y-2">
          {rightAlerts.map((alert, idx) => (
            <li
              key={idx}
              className="flex justify-between items-center list-disc list-inside"
            >
              <span>{alert.message}</span>
              {alert.time && (
                <span className="text-gray-500 font-medium text-xs">
                  {alert.time}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
