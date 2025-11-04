import React, { useState } from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

function SettingsContent() {
  const [emailNotif, setEmailNotif] = useState(true);
  const [bannerNotif, setBannerNotif] = useState(true);
  const [dailySummary, setDailySummary] = useState(true);
  const [apiAccess, setApiAccess] = useState(true);
  const [companyToggle, setCompanyToggle] = useState(false);
  return (
    <main
      className={`${inter.className} h-screen pb-[7rem] overflow-y-scroll `}>
      {/* Title */}
      <p className="text-2xl font-semibold pb-4">Settings</p>
      <p className="text-sm capitalize pb-4">
        system-Wide preference and account options.
      </p>

      {/* content  */}

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-4">Profile</h2>
            <p className="text-sm text-gray-600 mb-4">
              Basic account details used across the app
            </p>
            <div className="space-y-4">
              <div className="flex gap-6 items-center">
                <label className="block text-xs text-gray-700">
                  Company Name
                </label>
                <input
                  type="text"
                  defaultValue="DeMorgans Finance"
                  className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
                />
              </div>
              <div className="flex gap-6 items-center">
                <label className="block text-xs text-gray-700">
                  Contact Email
                </label>
                <input
                  type="email"
                  defaultValue="Demorgans@gmail.com"
                  className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
                />
              </div>
              <div className="flex gap-6 items-center">
                <label className="block text-xs text-gray-700">Timezone</label>
                <select className="mt-1 w-full border rounded-md px-3 py-2 text-sm">
                  <option>(UTC+01:00) Lagos</option>
                </select>
              </div>
              <p className="text-xs text-gray-500">
                Changes here update the account header and internal
                notifications
              </p>
            </div>
          </div>

          {/* Security */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-4">Security</h2>
            <p className="text-sm text-gray-600 mb-4">
              Password, 2FA and Session Control
            </p>
            <div className="flex items-center justify-between mb-4">
              <span>Company Name</span>
              <button
                className={`w-10 h-5 flex items-center rounded-full p-1 ${
                  companyToggle ? "bg-blue" : "bg-gray-300"
                }`}
                onClick={() => setCompanyToggle(!companyToggle)}>
                <div
                  className={`w-4 h-4 bg-white rounded-full shadow transform transition ${
                    companyToggle ? "translate-x-4" : ""
                  }`}
                />
              </button>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span>Session Timeout</span>
            </div>
            <a href="#" className="text-lightBlue text-sm font-medium">
              Change Password
            </a>
            <p className="text-xs text-gray-500 mt-2">
              We recommend enabling 2FA and Strong Password
            </p>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-4">Notifications</h2>
            <p className="text-sm text-gray-600 mb-4">
              Control how and when the system notifies you
            </p>

            {[
              {
                label: "Email notifications",
                state: emailNotif,
                setState: setEmailNotif,
              },
              {
                label: "In App Banner",
                state: bannerNotif,
                setState: setBannerNotif,
              },
              {
                label: "Daily Summary",
                state: dailySummary,
                setState: setDailySummary,
              },
            ].map(({ label, state, setState }) => (
              <div
                className="flex items-center justify-between mb-3"
                key={label}>
                <span>{label}</span>
                <button
                  className={`w-10 h-5 flex items-center rounded-full p-1 ${
                    state ? "bg-blue" : "bg-gray-300"
                  }`}
                  onClick={() => setState(!state)}>
                  <div
                    className={`w-4 h-4 bg-white rounded-full shadow transform transition ${
                      state ? "translate-x-4" : ""
                    }`}
                  />
                </button>
              </div>
            ))}

            <p className="text-xs text-gray-500">
              You can mute notifications here or override per user under Team
              &gt; roles
            </p>
          </div>

          {/* Integrations */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-4">Integrations</h2>
            <p className="text-sm text-gray-600 mb-4">
              Connected apps and API access
            </p>
            <div className="flex items-center justify-between mb-4">
              <span>Payroll provider</span>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 border rounded text-sm">ADP</span>
                <button className="text-sm px-2 py-1 border rounded font-medium">
                  Manage
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span>API Access</span>
              <button
                className={`w-10 h-5 flex items-center rounded-full p-1 ${
                  apiAccess ? "bg-blue" : "bg-gray-300"
                }`}
                onClick={() => setApiAccess(!apiAccess)}>
                <div
                  className={`w-4 h-4 bg-white rounded-full shadow transform transition ${
                    apiAccess ? "translate-x-4" : ""
                  }`}
                />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              If you enable API access, remember to rotate API keys regularly
            </p>
          </div>
        </div>

        {/* Team & Roles full width */}
        <div className="mt-6 bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-4">Team & Roles</h2>
          <p className="text-sm text-gray-600 mb-4">
            Manage users, roles and permission
          </p>

          <div className="space-y-4">
            {[
              {
                name: "Michael Simon (Admin)",
                role: "Full access",
                badge: "Owner",
              },
              {
                name: "Jane Cooper (Human Resource)",
                role: "HR Only",
                badge: "H.R",
              },
              {
                name: "John Doe (Payroll)",
                role: "Payroll Only",
                badge: "CFO",
              },
            ].map(({ name, role, badge }) => (
              <div
                key={name}
                className="flex justify-between items-center p-3 border rounded-md">
                <div>
                  <p className="font-medium">{name}</p>
                  <p className="text-sm text-gray-600">{role}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1 border rounded text-sm">
                    Edit
                  </button>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                    {badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default SettingsContent;
