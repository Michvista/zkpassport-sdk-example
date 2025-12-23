"use client";

import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import {
  UserIcon,
  BuildingOffice2Icon,
  EnvelopeIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";

// Icon Map
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

type RegisterData = {
  fullName: string;
  companyName: string;
  email: string;
  password: string;
};

type LoginData = {
  email: string;
  password: string;
};

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

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

  async function signup(data: RegisterData) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup-email`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          fullName: data.fullName,
          companyName: data.companyName,
        }),
      }
    );

    const json = await res.json();
    if (!json.ok) throw new Error(json.error);
    return json;
  }

  async function loginUser(data: LoginData) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login-email`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      }
    );

    const json = await res.json();
    if (!json.ok) throw new Error(json.error);
    return json;
  }

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

  const handleSubmit = async (
    e: React.FormEvent,
    formType: "login" | "register"
  ) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (formType === "register") {
        // validate
        const result = registerSchema.safeParse(registerData);
        if (!result.success) {
          toast.error(result.error.issues[0]?.message);
          setLoading(false);
          return;
        }

        // SIGN UP
        const res = await signup(registerData);

        // SAVE AUTH INTO CONTEXT
        login(res.user, res.token);

        toast.success("Registration successful!");
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      } else {
        // validate
        const result = loginSchema.safeParse(loginData);
        if (!result.success) {
          toast.error(result.error.issues[0]?.message);
          setLoading(false);
          return;
        }

        const res = await loginUser(loginData);
        login(res.user, res.token);

        toast.success("Login successful!");
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
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
                disabled={loading}
                className="w-full py-3 rounded-full bg-blue text-white font-semibold text-base md:text-lg mt-2 hover:bg-lightBlue transition flex items-center justify-center">
                {loading ? (
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "Register"
                )}
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
                disabled={loading}
                className="w-full py-3 rounded-full bg-blue text-white font-semibold text-base md:text-lg mt-2 hover:bg-lightBlue transition flex items-center justify-center">
                {loading ? (
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "Login"
                )}
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
