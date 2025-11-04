"use client";

import React from "react";
import Image from "next/image";

type SuccessPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  text: string; // e.g. "employee" or "payroll"
};

export default function SuccessPopup({
  isOpen,
  onClose,
  text,
}: SuccessPopupProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-sm p-6 text-center relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        {/* Success Image */}
        <div className="relative w-24 h-24 mx-auto mb-4">
          <Image
            src="/dashboard/success.svg"
            alt="Successful"
            fill
            className="object-contain"
          />
        </div>

        {/* Text */}
        <h2 className="text-xl font-semibold mb-2">Congratulations!</h2>
        <p className="text-gray-600 mb-4">
          You have successfully added a new <strong>{text}</strong>.
        </p>

        {/* Button */}
        <button
          onClick={onClose}
          className="w-full px-4 py-2 rounded-lg text-white font-medium bg-gradient-to-b from-blue to-gradientBlue shadow hover:opacity-90 transition"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
