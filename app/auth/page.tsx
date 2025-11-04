"use client";

import { useState } from "react";
import { z } from "zod";
import {  toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import {
  UserIcon,
  BuildingOffice2Icon,
  EnvelopeIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
 import { useRouter } from "next/navigation";


// 🧩 Icon Map
const iconMap: Record<string, JSX.Element> = {
  "Full Name": <UserIcon className="w-6 h-6 text-white opacity-70" />,
  "Company Name": (
    <BuildingOffice2Icon className="w-6 h-6 text-white opacity-70" />
  ),
  "Email Address": <EnvelopeIcon className="w-6 h-6 text-white opacity-70" />,
  Password: <LockClosedIcon className="w-6 h-6 text-white opacity-70" />,
};



const registerSchema = z.object({
  fullName: z.string().min(5, "Full name must be at least 5 characters"),
  companyName: z.string().min(5, "Company name must be at least 5 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(false);
   const router = useRouter();
  

  const [registerData, setRegisterData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    password: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    formType: "login" | "register"
  ) => {
    if (formType === "register") {
      setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    } else {
      setLoginData({ ...loginData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e: React.FormEvent, formType: "login" | "register") => {
    e.preventDefault();

    const data = formType === "register" ? registerData : loginData;
    const schema = formType === "register" ? registerSchema : loginSchema;

    const result = schema.safeParse(data);

    if (!result.success) {
      const firstError = result.error.issues[0]?.message;
      toast.error(firstError || "Please fill in all fields correctly");
      return;
    }

    toast.success(
      formType === "register" ? "Registration successful!" : "Login successful!"
    );
    setTimeout(() => {
      router.push("/dashboard");
    }, 2000);
    console.log(" Form Data:", data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blackBlue px-2">
      <div className="m-2 md:m-12 bg-gradient-to-b from-topBlue to-bottomBlue rounded-2xl p-4 md:p-12 w-full max-w-md shadow-lg border border-white">
        {/* Logo + Divider */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-24 h-16 md:w-36 md:h-24 mb-2">
            <Image
              src="/auth/Logowhite.png"
              alt="zkPayroll Logo"
              fill
              className="object-contain"
            />
          </div>
          <div className="w-full border-b border-white opacity-30 mb-4" />
        </div>

        {/* Animated Form Container */}
        <div className="relative min-h-[420px]">
          {/* Register Form */}
          <div
            className={`absolute inset-0 w-full transition-all duration-500 ${
              isLogin
                ? "opacity-0 pointer-events-none scale-95"
                : "opacity-100 scale-100"
            }`}>
            <h2 className="text-white text-lg md:text-xl font-semibold text-center mb-6">
              Sign up for a new account
            </h2>

            <form
              onSubmit={(e) => handleSubmit(e, "register")}
              className="space-y-4 md:space-y-5">
              <InputWithIcon
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={registerData.fullName}
                onChange={(e) => handleChange(e, "register")}
              />
              <InputWithIcon
                type="text"
                name="companyName"
                placeholder="Company Name"
                value={registerData.companyName}
                onChange={(e) => handleChange(e, "register")}
              />
              <InputWithIcon
                type="email"
                name="email"
                placeholder="Email Address"
                value={registerData.email}
                onChange={(e) => handleChange(e, "register")}
              />
              <InputWithIcon
                type="password"
                name="password"
                placeholder="Password"
                value={registerData.password}
                onChange={(e) => handleChange(e, "register")}
              />

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-blue text-white font-semibold text-base md:text-lg mt-2 hover:bg-lightBlue transition">
                <Link href="/dashboard">Register</Link>
              </button>
            </form>

            <p className="text-white text-center mt-6 text-sm pb-8">
              Already a User? &nbsp;
              <span
                className="cursor-pointer text-white hover:text-lightBlue"
                onClick={() => setIsLogin(true)}>
                Login
              </span>
            </p>
          </div>

          {/* Login Form */}
          <div
            className={`absolute inset-0 w-full transition-all duration-500 ${
              isLogin
                ? "opacity-100 scale-100"
                : "opacity-0 pointer-events-none scale-95"
            }`}>
            <h2 className="text-white text-lg md:text-xl font-semibold text-center mb-6">
              Welcome back
            </h2>

            <form
              onSubmit={(e) => handleSubmit(e, "login")}
              className="space-y-4 md:space-y-5">
              <InputWithIcon
                type="email"
                name="email"
                placeholder="Email Address"
                value={loginData.email}
                onChange={(e) => handleChange(e, "login")}
              />
              <InputWithIcon
                type="password"
                name="password"
                placeholder="Password"
                value={loginData.password}
                onChange={(e) => handleChange(e, "login")}
              />

              <div className="flex md:flex-row items-center justify-between gap-2 md:gap-0">
                <label className="flex items-center space-x-2 text-white text-sm">
                  <input
                    type="checkbox"
                    className="form-checkbox accent-blue"
                    style={{ width: 16, height: 16 }}
                  />
                  <span>Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-white text-sm hover:text-lightBlue">
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-blue text-white font-semibold text-base md:text-lg mt-2 hover:bg-lightBlue transition">
                Login
              </button>
            </form>

            <p className="text-white text-center mt-6 text-sm pb-8">
              Don’t have an account yet? &nbsp;
              <span
                className="cursor-pointer text-white hover:text-lightBlue"
                onClick={() => setIsLogin(false)}>
                Sign Up now
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function InputWithIcon({
  type,
  placeholder,
  name,
  value,
  onChange,
}: {
  type: string;
  placeholder: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
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
