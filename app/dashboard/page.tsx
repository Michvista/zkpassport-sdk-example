"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Inter } from "next/font/google";
import Link from "next/link";
import { ClipboardDocumentIcon, BellIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
// import { toast } from "sonner";
import { toast } from "sonner";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";
import { withAuth } from "../hoc/WithAuth";


const inter500 = Inter({
  weight: "500",
  subsets: ["latin"],
});

const inter400 = Inter({
  weight: "400",
  subsets: ["latin"],
});

function Dashboard() {
  const [navOpen, setNavOpen] = useState(false);
  const [accountsTables, setAccountsTables] = useState<number[]>([]);
  const [apiKeyTables, setApiKeyTables] = useState<number[]>([]);

  // For unique keys
  const [accountsCount, setAccountsCount] = useState(0);
  const [apiKeyCount, setApiKeyCount] = useState(0);

  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const { user, token, logout } = useAuth();
 const router = useRouter();
  // Restrict Accounts
  const handleCreateAccount = () => {
    if (accountsTables.length >= 1) return;
    setAccountsTables([...accountsTables, accountsCount]);
    setAccountsCount(accountsCount + 1);
  };

  // Restrict API Keys
  const handleCreateApiKey = () => {
    if (apiKeyTables.length >= 1) return;
    setApiKeyTables([...apiKeyTables, apiKeyCount]);
    setApiKeyCount(apiKeyCount + 1);
  };

const handleCopy = async (id: string, text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    setCopiedItem(id);
    toast.success("Copied successfully");

    // Reset after a short delay
    setTimeout(() => setCopiedItem(null), 2000);
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};

 const handleLogout = async () => {
   // Call backend logout API if needed
   await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
     method: "POST",
     credentials: "include",
   });

   // Clear frontend context
   logout();

   // Redirect to login page
   router.push("/auth");
 };

  return (
    <section>
      <nav
        className={`${inter500.className} px-4 md:px-6 w-full bg-white shadow-md relative flex flex-col md:flex-row md:items-center md:justify-between h-auto md:h-[80px]`}>
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="logo space-x-6 relative w-24 h-10 md:w-32 md:h-14 flex justify-center md:justify-start mr-12">
            <Image src="/logo.png" alt="Logo" fill className="object-contain" />
          </div>
          {/* Hamburger */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full focus:outline-none"
            onClick={() => setNavOpen(!navOpen)}
            aria-label="Toggle navigation">
            <div className="flex flex-col justify-center items-center h-full">
              <span
                className={`block w-6 h-0.5 bg-darkBlue transition-all duration-300 ${
                  navOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-darkBlue transition-all duration-300 my-1 ${
                  navOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-darkBlue transition-all duration-300 ${
                  navOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </div>
          </button>
        </div>

        {/* Nav Content */}
        <div
          className={`w-full transition-all duration-300 ease-in-out overflow-hidden
    ${navOpen ? "max-h-[500px] opacity-100 py-4" : "max-h-0 opacity-0 py-0"}
    md:flex md:items-center md:justify-between md:max-h-full md:opacity-100 md:py-0`}
          style={{ zIndex: 10 }}>
          <div className="links capitalize text-xs sm:text-sm flex flex-col md:flex-row gap-4 md:gap-14 w-full md:w-[20%]">
            <Link href="/">home</Link>
            <Link href="/docs">docs</Link>
            <button onClick={handleLogout} className="capitalize">logout</button>
          </div>
          <div className="btns text-xs flex flex-col md:flex-row w-full md:w-[60%] justify-end space-x-0 md:space-x-2 mt-2 md:mt-0 gap-2 md:gap-0">
            <button
              onClick={handleLogout}
              className="logOut px-5 py-2 bg-darkBlue text-white rounded-full">
              LogOut
            </button>
          </div>
        </div>
      </nav>

      <main className="bg-gradient-to-b w-full min-h-screen from-topBlue to-bottomBlue">
        <div className="cont grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 items-start p-6 md:p-16 overflow-x-hidden">
          {/* Left Info Panel */}
          <div className="flex flex-col h-full gap-16 justify-between">
            {/* Company Info */}
            <div className="flex justify-between items-center gap-6">
              <div>
                <p className="font-semibold text-white text-sm md:text-lg">
                  Company Name
                </p>
                <p className="text-white text-xs md:text-md">
                  {user?.companyName || "N/A"}
                </p>
              </div>
              <div>
                <p className="font-semibold text-white text-sm md:text-lg">
                  Entity ID
                </p>
                <div className="flex items-center gap-2">
                  <span
                    id="entityID"
                    className="bg-[#5392FA42] text-white px-2 py-1 rounded text-[8px]">
                    01994f64-a5e7-7435-a9d5-d189bd0df54e
                  </span>
                  <button
                    onClick={() => {
                      const text =
                        document.getElementById("entityID")?.innerText;
                      if (text) handleCopy("entityID", text);
                    }}
                    className="bg-blue p-1 rounded hover:bg-gray-200 transition">
                    {copiedItem === "entityID" ? (
                      <CheckCircleIcon className="text-green w-4 h-4" />
                    ) : (
                      <ClipboardDocumentIcon className="w-4 h-4 text-white" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Accounts & API Key */}
            <div
              className={`flex flex-col h-full ${
                accountsTables.length > 0 || apiKeyTables.length > 0
                  ? "gap-12"
                  : "gap-32"
              }`}>
              {/* Accounts */}
              <div>
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-white text-sm md:text-lg">
                    Accounts
                  </p>
                  <button
                    className={`px-5 py-2 rounded-full font-medium text-xs transition-all duration-300 ${
                      accountsTables.length > 0
                        ? "bg-gray-400 cursor-not-allowed text-white"
                        : "bg-blue text-white hover:bg-blue/90"
                    }`}
                    onClick={handleCreateAccount}
                    disabled={accountsTables.length > 0}>
                    + Create Account
                  </button>
                </div>

                {accountsTables.map((key) => (
                  <div
                    key={key}
                    className="overflow-hidden transition-all duration-500 max-h-[500px] opacity-100 mt-4">
                    <div className="bg-white rounded-md shadow-md p-4 mb-4">
                      <table className="w-full text-left">
                        <tbody className="w-full">
                          <tr className="border-b">
                            <td className="py-2 font-semibold text-sm">
                              Account ID
                            </td>
                            <td
                              id="accountID"
                              className="py-2 text-gray-700 text-xs md:text-xs">
                              01994fbb-bf7a-7d79-abe9-5f3576163bf7
                            </td>
                            <td>
                              <button
                                onClick={() => {
                                  const text =
                                    document.getElementById(
                                      "accountID"
                                    )?.innerText;
                                  if (text) handleCopy("accountID", text);
                                }}
                                className="p-1 transition">
                                {copiedItem === "accountID" ? (
                                  <CheckCircleIcon className="text-green w-4 h-4" />
                                ) : (
                                  <ClipboardDocumentIcon className="w-4 h-4 text-blue" />
                                )}
                              </button>
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2 font-semibold text-sm">
                              Wallet Address
                            </td>
                            <td className="py-2 text-blue text-xs text-right md:text-xs">
                              + Connect Wallet
                            </td>
                            {/* <td></td> */}
                          </tr>
                          <tr>
                            <td className="py-2 font-semibold text-sm">
                              Created Date
                            </td>
                            <td className="py-2 text-gray-700 text-right text-xs md:text-xs">
                              16 Sept 2025
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>

              {/* API Key */}
              <div>
                <div className="flex items-center justify-between mt-8">
                  <div>
                    <p className="font-semibold text-white text-sm md:text-lg">
                      API Key
                    </p>
                    {apiKeyTables.length === 0 && (
                      <>
                        <p className="text-ashIn text-xs w-[85%] md:w-full">
                          No API Key has been generated
                        </p>
                        <p className="text-ashIn text-[10px] opacity-70">
                          No more than 5 API Keys can be active simultaneously
                        </p>
                      </>
                    )}
                  </div>
                  <button
                    className={`px-5 py-2 rounded-full font-medium text-xs transition-all duration-300 ${
                      apiKeyTables.length > 0
                        ? "bg-gray-400 cursor-not-allowed text-white"
                        : "bg-blue text-white hover:bg-blue/90"
                    }`}
                    onClick={handleCreateApiKey}
                    disabled={apiKeyTables.length > 0}>
                    + Create New API Key
                  </button>
                </div>

                {apiKeyTables.map((key) => (
                  <div
                    key={key}
                    className="overflow-hidden transition-all duration-500 max-h-[500px] opacity-100 mt-4">
                    <div className="bg-white rounded-md shadow-md p-4 mb-4">
                      <table className="w-full text-left">
                        <tbody>
                          <tr className="border-b">
                            <td className="py-2 font-semibold text-sm">
                              API Key ID
                            </td>
                            <td
                              id="apiKeyID"
                              className="py-2 text-gray-700 text-xs md:text-xs">
                              01994fc3-d949-717c-b7bf-6de04c42f860
                            </td>
                            <td>
                              <button
                                onClick={() => {
                                  const text =
                                    document.getElementById(
                                      "apiKeyID"
                                    )?.innerText;
                                  if (text) handleCopy("apiKeyID", text);
                                }}
                                className="p-1 transition">
                                {copiedItem === "apiKeyID" ? (
                                  <CheckCircleIcon className="text-green w-4 h-4" />
                                ) : (
                                  <ClipboardDocumentIcon className="w-4 h-4 text-blue" />
                                )}
                              </button>
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2 font-semibold text-sm">
                              Created Date
                            </td>
                            <td className="py-2 text-gray-700 text-right text-xs md:text-xs">
                              16 Sept 2025
                            </td>
                            <td></td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="mt-4 text-blue text-[8px] md:text-[8px] w-full flex items-center justify-between">
                        <p className="text-xs">API Secret Key ID: </p>
                        <div className="flex items-center gap-2">
                          <span id="apiSecretKeyID" className="font-semibold">
                            6t3AB-V7IKFC8tAojBY1-HFBPmMtdvWOIq3dGoPSiUI
                          </span>
                          <button
                            onClick={() => {
                              const text =
                                document.getElementById(
                                  "apiSecretKeyID"
                                )?.innerText;
                              if (text) handleCopy("apiSecretKeyID", text);
                            }}
                            className="p-1 transition">
                            {copiedItem === "apiSecretKeyID" ? (
                              <CheckCircleIcon className="text-green w-4 h-4" />
                            ) : (
                              <ClipboardDocumentIcon className="w-4 h-4 text-blue" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Screenshot Panel */}
          <div className="flex justify-center items-center w-full h-full lg:translate-x-20">
            <div className="screenshots bg-transBg rounded-xl shadow-lg relative w-full h-[220px] lg:w-[600px] lg:h-[450px] max-w-[600px]">
              <Image
                src="/dashboard/screenshots.png"
                alt="Dashboard Screenshot"
                fill
                className="object-contain p-6"
              />
            </div>
          </div>
        </div>
      </main>

      <div
        className={`infoRed ${inter500.className} bg-red-600 text-sm p-6 justify-center text-center flex items-center text-white`}
        role="alert">
        <BellIcon className="w-4 h-4 text-[#FFBC1F]" />
        <p className="capitalize">
          <span className="text-[#FFBC1F]">
            <Link href="dashboard/auth">complete business verification</Link>
          </span>{" "}
          to Enable Live Access
        </p>
      </div>

      <footer
        className={`${inter400.className} px-4 py-4 md:py-2 capitalize md:px-6 w-full bg-white shadow-md relative flex flex-col  md:flex-row md:items-center md:justify-around h-auto md:h-[80px] text-xs text-center`}>
        <p className="zk">@2025 ZKPayroll Inc</p> &bull;
        <p className="zk">Terms & Conditions</p> &bull;
        <p className="zk">license agreement</p>
      </footer>
    </section>
  );
}


export default withAuth(Dashboard);