"use client";

import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import Link from "next/link";
import {
  UserIcon,
  BuildingOffice2Icon,
  EnvelopeIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

import { useRouter } from "next/navigation";

const registerSchema = z.object({
  firstName: z.string().min(5, "First name must be at least 5 characters"),
  lastName: z.string().min(5, "Last name must be at least 5 characters"),
  companyName: z.string().min(5, "Company name must be at least 5 characters"),
  email: z.string().email("Invalid email address"),
});

const iconMap: Record<string, JSX.Element> = {
  "First Name": <UserIcon className="w-6 h-6 text-white opacity-70" />,
  "Last Name": <UserIcon className="w-6 h-6 text-white opacity-70" />,
  "Company Name": (
    <BuildingOffice2Icon className="w-6 h-6 text-white opacity-70" />
  ),
  "Email Address": <EnvelopeIcon className="w-6 h-6 text-white opacity-70" />,
  Password: <LockClosedIcon className="w-6 h-6 text-white opacity-70" />,
};

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = registerSchema.safeParse(formData);

    if (!result.success) {
      const firstError = result.error.issues[0]?.message;
      toast.error(firstError || "Please fill all fields correctly");
      return;
    }

    toast.success("Registration successful!");
    setTimeout(() => {
      router.push("/dashboard/hero");
    }, 2000);

    console.log(" Form Data:", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blackBlue px-2">
      <div className="m-2 md:m-12 bg-gradient-to-b from-topBlue to-bottomBlue rounded-2xl p-4 md:p-12 w-full max-w-md shadow-lg border border-white">
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
          <InputWithIcon
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
          />
          <InputWithIcon
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
          <InputWithIcon
            type="text"
            name="companyName"
            placeholder="Company Name"
            value={formData.companyName}
            onChange={handleChange}
          />
          <InputWithIcon
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-blue text-white font-semibold text-base md:text-lg mt-2 hover:bg-lightBlue transition">
            Next
          </button>
        </form>
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
