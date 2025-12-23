"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Inter, Montserrat } from "next/font/google";
import { UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { withAuth } from "../../hoc/WithAuth";


const inter500 = Inter({
  weight: "500",
  subsets: ["latin"],
});
const inter700 = Inter({
  weight: "700",
  subsets: ["latin"],
});

const inter400 = Inter({
  weight: "400",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  weight: "400",
  subsets: ["latin"],
});

function DHero() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <section>
      <nav
        className={`${inter400.className} px-4 md:px-6 w-full bg-white shadow-md relative flex flex-col md:flex-row md:items-center md:justify-evenly h-auto md:h-[80px]`}
      >
        {/* Logo + Hamburger */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="logo relative w-24 h-10 md:w-32 md:h-14 flex justify-center md:justify-start">
            <Image src="/logo.png" alt="Logo" fill className="object-contain" />
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full focus:outline-none"
            onClick={() => setNavOpen(!navOpen)}
            aria-label="Toggle navigation"
          >
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
        ${
          navOpen
            ? "max-h-[600px] opacity-100 py-4"
            : "max-h-0 opacity-0 py-0"
        }
        md:flex md:items-center md:justify-evenly md:max-h-full md:opacity-100 md:py-0`}
          style={{ zIndex: 10 }}
        >
          {/* Left side links/info */}
          <div className="links flex flex-col md:flex-row md:items-center gap-4 md:gap-10 w-full md:w-auto items-center">
            <p
              className={`capitalize text-base ${inter500.className} self-center`}
            >
              De Morgan&apos;s Finance
            </p>

            <div className="txt rounded-full text-xs bg-blue text-center px-4 py-2 text-white self-center">
              <p>Admin</p>
            </div>

            <div className="txt rounded-full text-xs bg-[#F4F4F5] text-ashIn border-2 border-[#6D6D6D4D] px-3 py-2 self-center">
              <p className="flex gap-1">
                API:
                <span className="max-w-[15ch] overflow-hidden text-ellipsis whitespace-nowrap">
                  A9#tL7!xQ2@vZp$3mN^gW8&rYb*J5e+Tc1Xq
                </span>
              </p>
            </div>

            <div className="txt rounded-full text-xs bg-[#F4F4F5] text-ashIn border-2 border-[#6D6D6D4D] px-3 py-2 self-center">
              <p className="flex gap-1">
                Address:
                <span className="max-w-[15ch] overflow-hidden text-ellipsis whitespace-nowrap">
                  1aB9xT7qLpV3eZ8mKfW2rYbXcJ5e+Tc1XqA
                </span>
              </p>
            </div>
          </div>

          {/* Right side buttons */}
          <div className="btns flex flex-col md:flex-row items-center justify-end mt-4 md:mt-0 gap-2 md:gap-0 md:space-x-2">
            <button className="rounded-full text-xs bg-blue text-center p-2 text-white self-center">
              <UserIcon className="w-4 h-4 text-white opacity-80" />
            </button>
          </div>
        </div>
      </nav>

      <main  className={`landingPage ${inter500.className} mt-8 space-y-10 w-full h-full p-6 flex flex-col justify-center items-center`}>
           <p
                  className={`${inter700.className} mt-3  text-4xl w-full sm:w-[60%] sm:text-6xl text-center leading-tight pb-2`}>
                  Privacy-Preserving 
Payroll <span className="text-blue">System.</span>
                </p>
                    <p className="subtxt text-center w-full sm:w-[45%] text-sm sm:text-base text-ashOutline">
       The global payroll that guarantees salary privacy using stablecoins, 
secured by zero-knowledge proofs.
        </p>
        <button className="login text-white rounded-full bg-blue px-5 py-3">
                    <Link href="/dashboard/main" >
                    Get Started
                    </Link>
                  </button>


                    <div className="features">
                            <div className="featuresCards flex flex-col sm:flex-row gap-14 w-full my-6 justify-center items-center">
                              <div className="card flex flex-col items-center py-6 space-y-3 rounded-xl justify-between bg-blue p-4">
                                <Image
                                  src="/features/profileImg.png"
                                  alt="profileImg"
                                  width={50}
                                  height={30}
                                  className=""
                                />
                                <p className="text-center w-[50%] leading-[1.2] text-sm text-white capitalize">
                                  Identity verification
                                </p>
                              </div>
                              <div className="card flex w-[10rem] flex-col items-center py-6 space-y-3 rounded-xl justify-between bg-blue p-4">
                                <Image
                                  src="/features/safe.png"
                                  alt="safe"
                                  width={50}
                                  height={30}
                                  className=""
                                />
                                <p className="text-center w-[50%] leading-[1.2] text-sm text-white capitalize">
                                  verify status
                                </p>
                              </div>
                              <div className="card flex flex-col items-center py-6 space-y-3 rounded-xl justify-between bg-blue p-4">
                                <Image
                                  src="/features/wallet.png"
                                  alt="wallet"
                                  width={50}
                                  height={30}
                                  className=""
                                />
                                <p className="text-center w-[50%] leading-[1.2] text-sm text-white capitalize">
                                  disburse salaries
                                </p>
                              </div>
                            </div>
                          </div>
      </main>
      <footer className={`${montserrat.className} w-full flex items-center gap-4 text-center justify-center flex-col md:flex-row p-2`}>
           <Link href="/">
           <p>Documentation</p>
           </Link>
           <p>.</p>
           <Link href="/">
            <p>Contact Support</p>
           </Link>
      </footer>
    </section>
  );
}


export default withAuth(DHero);