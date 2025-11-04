"use client";

import React from "react";

type FormPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string; // e.g. "Add Employee" or "Add Payroll"
  children: React.ReactNode; // custom form fields
};

export default function FormPopup({ isOpen, onClose, title, children }: FormPopupProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">{title}</h2>

        <div>{children}</div>
      </div>
    </div>
  );
}
