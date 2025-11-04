"use client";
import { useEffect, useRef, useState } from "react";
import { ZKPassport, ProofResult, EU_COUNTRIES } from "@zkpassport/sdk";
import QRCode from "react-qr-code";
import { Inter, Bai_Jamjuree, Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const inter500 = Inter({
  weight: "500",
  subsets: ["latin"],
});

const inter400 = Inter({
  weight: "400",
  subsets: ["latin"],
});
const baiJam = Bai_Jamjuree({
  weight: "500",
  subsets: ["latin"],
});
const montserrat = Montserrat({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  const [navOpen, setNavOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [firstName, setFirstName] = useState<string | undefined>(undefined);
  const [isEUCitizen, setIsEUCitizen] = useState<boolean | undefined>(
    undefined
  );
  const [isOver18, setIsOver18] = useState<boolean | undefined>(undefined);
  const [queryUrl, setQueryUrl] = useState("");
  const [uniqueIdentifier, setUniqueIdentifier] = useState("");
  const [verified, setVerified] = useState<boolean | undefined>(undefined);
  const [requestInProgress, setRequestInProgress] = useState(false);
  const zkPassportRef = useRef<ZKPassport | null>(null);

  const companyLogos = [
    "logo1.png",
    "logo2.png",
    "logo3.png",
    "logo4.png",
    "logo5.png",
    "logo6.png",
    "logo7.png",
  ];

  useEffect(() => {
    if (!zkPassportRef.current) {
      zkPassportRef.current = new ZKPassport(window.location.hostname);
    }
  }, []);

  const createRequest = async () => {
    if (!zkPassportRef.current) {
      return;
    }
    setFirstName("");
    setIsEUCitizen(undefined);
    setMessage("");
    setQueryUrl("");
    setIsOver18(undefined);
    setUniqueIdentifier("");
    setVerified(undefined);

    const queryBuilder = await zkPassportRef.current.request({
      name: "ZKPassport",
      logo: "https://zkpassport.id/favicon.png",
      purpose: "Proof of EU citizenship and firstname",
      scope: "eu-adult",
      mode: "fast",
      devMode: true,
    });

    const {
      url,
      onRequestReceived,
      onGeneratingProof,
      onProofGenerated,
      onResult,
      onReject,
      onError,
    } = queryBuilder
      .in("nationality", [...EU_COUNTRIES, "Zero Knowledge Republic"])
      .disclose("firstname")
      .gte("age", 18)
      .disclose("document_type")
      .done();

    setQueryUrl(url);
    console.log(url);

    setRequestInProgress(true);

    onRequestReceived(() => {
      console.log("QR code scanned");
      setMessage("Request received");
    });

    onGeneratingProof(() => {
      console.log("Generating proof");
      setMessage("Generating proof...");
    });

    const proofs: ProofResult[] = [];

    onProofGenerated((result: ProofResult) => {
      console.log("Proof result", result);
      proofs.push(result);
      setMessage(`Proofs received`);
      setRequestInProgress(false);
    });

    onResult(
      async ({ result, uniqueIdentifier, verified, queryResultErrors }) => {
        console.log("Result of the query", result);
        console.log("Query result errors", queryResultErrors);
        setFirstName(result?.firstname?.disclose?.result);
        setIsEUCitizen(result?.nationality?.in?.result);
        setIsOver18(result?.age?.gte?.result);
        setMessage("Result received");
        console.log(
          "Birthdate",
          result?.birthdate?.disclose?.result.toDateString()
        );
        setUniqueIdentifier(uniqueIdentifier || "");
        setVerified(verified);
        setRequestInProgress(false);

        const res = await fetch("/api/register", {
          method: "POST",
          body: JSON.stringify({
            queryResult: result,
            proofs,
            domain: window.location.hostname,
          }),
        });

        console.log("Response from the server", await res.json());
      }
    );

    onReject(() => {
      console.log("User rejected");
      setMessage("User rejected the request");
      setRequestInProgress(false);
    });

    onError((error: unknown) => {
      console.error("Error", error);
      setMessage("An error occurred");
      setRequestInProgress(false);
    });
  };

  return (
    /* <main className="w-full h-full flex flex-col items-center p-10"> */
    <main className="cont bg-gradient-to-b w-full h-full from-topBlue to-bottomBlue">
      {queryUrl && <QRCode className="mb-4" value={queryUrl} />}
      {message && <p>{message}</p>}
      {firstName && (
        <p className="mt-2">
          <b>Firstname:</b> {firstName}
        </p>
      )}
      {typeof isEUCitizen === "boolean" && (
        <p className="mt-2">
          <b>Is EU citizen:</b> {isEUCitizen ? "Yes" : "No"}
        </p>
      )}
      {typeof isOver18 === "boolean" && (
        <p className="mt-2">
          <b>Is over 18:</b> {isOver18 ? "Yes" : "No"}
        </p>
      )}
      {uniqueIdentifier && (
        <p className="mt-2">
          <b>Unique identifier:</b>
        </p>
      )}
      {uniqueIdentifier && <p>{uniqueIdentifier}</p>}
      {verified !== undefined && (
        <p className="mt-2">
          <b>Verified:</b> {verified ? "Yes" : "No"}
        </p>
      )}
      {/* {!requestInProgress && (
        //generate new request
        // <button
        //   className="p-4 mt-4 bg-gray-500 rounded-lg text-white font-medium"
        //   onClick={createRequest}
        // >
        //   Generate new request
        // </button>
      )} */}

      <nav
        className={`${inter500.className} px-4 md:px-6 w-full bg-white shadow-md relative flex flex-col md:flex-row md:items-center md:justify-between h-auto md:h-[80px]`}>
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="logo space-x-6 relative w-24 h-10 md:w-32 md:h-14 flex justify-center md:justify-start mr-4">
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
          className={`md:flex md:items-center md:justify-between w-full transition-all duration-300 ease-in-out overflow-hidden ${
            navOpen
              ? "max-h-[500px] opacity-100 py-4"
              : "max-h-0 opacity-0 md:max-h-full md:opacity-100 md:py-0"
          }`}
          style={{ zIndex: 10 }}>
          <div className="links capitalize text-xs sm:text-sm flex flex-col md:flex-row gap-2 md:gap-4 w-full md:w-[20%]">
            <Link href="#products">products</Link>
            <Link href="#solutions">solution</Link>
            <Link href="#pricing">pricing</Link>
          </div>
          <div className="btns text-xs flex flex-col md:flex-row w-full md:w-[60%] justify-end space-x-0 md:space-x-2 mt-2 md:mt-0 gap-2 md:gap-0">
            <button className="signUp px-5 py-2 border-2 border-blue rounded-full">
              <Link href="/auth">
              Sign up</Link>
            </button>
            <button className="logIn px-5 py-2 bg-darkBlue text-white rounded-full">
                <Link href="/auth">
              Login
              </Link>
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`landingPage ${inter500.className} mt-8 space-y-10 w-full h-full p-4 flex flex-col justify-center items-center`}>
        <div
          className={`${inter400.className} bubble border rounded-full px-4 py-2 border-white text-white text-xs`}>
          <p>We just raised $20M in Series B. Learn more</p>
        </div>
        <p
          className={`${baiJam.className} bg-gradient-to-b from-[#ececec] to-[#ECECEC29]  bg-clip-text text-transparent text-4xl w-full sm:w-[60%] sm:text-6xl text-center leading-tight pb-2 overflow-visible`}>
          .Privacy + Preserving Payroll System. 
        </p>
        <p className="subtxt text-center w-full sm:w-[45%] text-sm sm:text-base text-white">
          The global payroll that guarantees salary privacy using stablecoins,
          secured by zero-knowledge proofs. Built with enterprise-grade
          compliance
        </p>
        <div className="btns flex space-x-3 text-xs">
          <button className="login text-darkBlue rounded-full bg-white px-5 py-3">
            <Link href="/auth" >
            Log in
            </Link>
          </button>
          <button className="book text-white  border-2 border-white rounded-full px-5 py-3">
            Book a demo &nbsp;&rarr;{" "}
          </button>
        </div>

        <div className="screenshots p-6 bg-transBg rounded-lg shadow-md ">
          <Image
            src="/screenshots.png"
            alt="Dashboard Screenshot"
            width={700}
            height={500}
            className=""
          />
        </div>

        <div className="features">
          <p
            className={`featurestxt ${baiJam.className} text-center text-white text-3xl `}>
            Features that work for your organization
          </p>
          <div className="featuresCards flex flex-col sm:flex-row gap-4 w-full my-6 justify-center items-center">
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
        <div className="footer w-full space-y-8 pb-8">
          <p className={`${montserrat.className} text-[#FFFFFFCC] text-center`}>
            Trusted by organizations over the world
          </p>
          <div className="companies flex flex-wrap gap-6 justify-center sm:justify-around">
            {companyLogos.map((logo, idx) => (
              <Image
                key={logo + idx}
                src={`/footer/${logo}`}
                alt={`company logo ${idx + 1}`}
                width={50}
                height={30}
                className="flex-none w-[50px] h-[30px] object-contain"
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
