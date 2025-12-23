"use client";

import { useEffect, useRef, useState } from "react";
import { ZKPassport } from "@zkpassport/sdk";
import QRCode from "react-qr-code";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  UserIcon,
  BuildingOffice2Icon,
  EnvelopeIcon,
  ShieldCheckIcon,
  CloudArrowUpIcon,
  CheckBadgeIcon,
  ClipboardDocumentIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../../contexts/AuthContext";

export default function Register() {
  const { user: adminUser } = useAuth();
  const router = useRouter();

  // States
  const [loading, setLoading] = useState(false);
  const [queryUrl, setQueryUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
  });

  // NEW: Success State
  const [entityKey, setEntityKey] = useState<string | null>(null);

  const zkPassportRef = useRef<ZKPassport | null>(null);

  useEffect(() => {
    if (!zkPassportRef.current && typeof window !== "undefined") {
      zkPassportRef.current = new ZKPassport(window.location.hostname);
    }
  }, []);

  const submitToBackend = async (uid: string, proof: any) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-business`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            adminId: adminUser?.id,
            uniqueIdentifier: uid,
            proof: proof,
            firstName: formData.firstName,
            lastName: formData.lastName,
            companyName: formData.companyName,
          }),
        }
      );

      const json = await res.json();
      if (!json.ok) throw new Error(json.error);

      toast.success("Identity Verified!");
      // Instead of redirecting, we show the key right here!
      setEntityKey(json.entityKey);
    } catch (err: any) {
      toast.error(err.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const startZKVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const queryBuilder = await zkPassportRef.current!.request({
        name: "zkPayroll Business",
        logo: "https://zkpayroll.id/logo.png",
        purpose: "Business KYB",
        mode: "compressed-evm",
        devMode: true,
      });
      const { url, onResult, onError } = queryBuilder.done();
      setQueryUrl(url);
      // Updated working code
onResult(async ({ uniqueIdentifier, verified, result }) => {
  if (verified && result.proofs) {
    // Access the first proof from the results object
    submitToBackend(uniqueIdentifier, result.proofs[0]);
  }
});

      onError(() => {
        setLoading(false);
        toast.error("ZK verification failed.");
      });
    } catch (err) {
      setLoading(false);
    }
  };

  const handleManualSubmit = async () => {
    if (!file) return toast.error("Please upload business documents first.");
    setLoading(true);
    const manualUID = `ENT-${Math.random()
      .toString(36)
      .substring(2, 10)
      .toUpperCase()}`;
    await submitToBackend(manualUID, "MANUAL_DOCUMENT_UPLOAD");
  };

  // --- 1. SUCCESS UI (THE "ENTITY KEY" VIEW) ---
  if (entityKey) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blackBlue px-4">
        <div className="bg-gradient-to-b from-topBlue to-bottomBlue rounded-2xl p-8 md:p-12 w-full max-w-md shadow-2xl border border-white text-center">
          <CheckBadgeIcon className="w-20 h-20 text-green-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-2">
            Verification Complete
          </h2>
          <p className="text-white/60 mb-8">
            Your Business Entity has been verified. Here is your unique Entity
            Key:
          </p>

          <div
            className="bg-white/10 border border-white/20 p-4 rounded-xl mb-8 group relative cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText(entityKey);
              toast.success("Key copied!");
            }}>
            <p className="text-blue font-mono text-lg break-all font-bold tracking-widest uppercase">
              {entityKey}
            </p>
            <ClipboardDocumentIcon className="w-5 h-5 text-white/30 absolute right-4 top-1/2 -translate-y-1/2 group-hover:text-white transition" />
          </div>

          <button
            onClick={() => router.push("/dashboard/hero")}
            className="w-full py-4 bg-blue rounded-full text-white font-bold hover:bg-lightBlue transition flex items-center justify-center gap-2 group">
            Enter Dashboard{" "}
            <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition" />
          </button>
        </div>
      </div>
    );
  }

  // --- 2. REGISTRATION/VERIFICATION UI ---
  return (
    <div className="min-h-screen flex items-center justify-center bg-blackBlue px-4 py-10">
      <div className="bg-gradient-to-b from-topBlue to-bottomBlue rounded-2xl p-6 md:p-10 w-full max-w-4xl shadow-lg border border-white flex flex-col md:flex-row gap-10">
        {/* Left: Input Fields */}
        <div className="flex-1 space-y-5">
          <h2 className="text-white text-2xl font-bold">Business KYB</h2>
          <p className="text-white/60 text-sm">
            Fill in your business details to proceed.
          </p>

          <InputWithIcon
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e: any) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
          />
          <InputWithIcon
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e: any) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
          />
          <InputWithIcon
            type="text"
            name="companyName"
            placeholder="Company Name"
            value={formData.companyName}
            onChange={(e: any) =>
              setFormData({ ...formData, companyName: e.target.value })
            }
          />

          <div className="relative border-2 border-dashed border-white/20 rounded-xl p-4 flex flex-col items-center hover:bg-white/5 transition">
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            <CloudArrowUpIcon className="w-8 h-8 text-white/50 mb-1" />
            <p className="text-white text-[10px]">
              {file ? file.name : "Upload Registration Docs"}
            </p>
          </div>
        </div>

        {/* Right: QR / Manual Path */}
        <div className="flex-1 bg-white/5 rounded-2xl p-6 border border-white/10 flex flex-col items-center justify-center text-center">
          {!queryUrl ? (
            <div className="space-y-6 w-full">
              <ShieldCheckIcon className="w-16 h-16 text-blue mx-auto" />
              <button
                onClick={startZKVerification}
                className="w-full py-3 bg-blue rounded-full text-white font-bold hover:bg-lightBlue transition">
                Start ZK Verification
              </button>
              <div className="flex items-center gap-2 text-white/30 text-xs">
                <div className="h-[1px] bg-white/20 flex-1"></div> OR{" "}
                <div className="h-[1px] bg-white/20 flex-1"></div>
              </div>
              <button
                onClick={handleManualSubmit}
                disabled={!file || loading}
                className="text-white text-sm underline opacity-70 hover:opacity-100 disabled:opacity-30">
                {loading ? "Verifying..." : "Submit docs for manual review"}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-white p-3 rounded-xl inline-block">
                <QRCode value={queryUrl} size={160} />
              </div>
              <p className="text-white text-xs">Scan with ZKPassport App</p>
              <button
                onClick={() => setQueryUrl("")}
                className="text-white/40 text-[10px] underline">
                Back to manual
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function InputWithIcon({ type, placeholder, name, value, onChange }: any) {
  const iconMap: Record<string, any> = {
    "First Name": <UserIcon className="w-6 h-6 text-white opacity-70" />,
    "Last Name": <UserIcon className="w-6 h-6 text-white opacity-70" />,
    "Company Name": (
      <BuildingOffice2Icon className="w-6 h-6 text-white opacity-70" />
    ),
  };
  return (
    <div className="relative">
      <span className="absolute left-4 top-1/2 -translate-y-1/2">
        {iconMap[placeholder]}
      </span>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full pl-12 pr-4 py-3 rounded-lg bg-transparent border border-white text-white placeholder-white focus:outline-none"
      />
    </div>
  );
}
