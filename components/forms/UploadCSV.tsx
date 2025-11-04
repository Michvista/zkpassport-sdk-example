"use client";

import React, { useState, DragEvent } from "react";
import { Upload } from "lucide-react";

type UploadCSVProps = {
  isOpen: boolean;
  onClose: () => void;
  text?: string; 
  onFileUpload: (file: File) => void;
};

export default function UploadCSV({
  isOpen,
  onClose,
  text = "CSV",
  onFileUpload,
}: UploadCSVProps) {
  const [dragOver, setDragOver] = useState(false);

  if (!isOpen) return null;

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && (file.name.endsWith(".csv") || file.name.endsWith(".xlsx"))) {
      onFileUpload(file);
    } else {
      alert("Only CSV/Excel files are supported");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.name.endsWith(".csv") || file.name.endsWith(".xlsx"))) {
      onFileUpload(file);
    } else {
      alert("Only CSV/Excel files are supported");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 text-center relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h2 className="text-lg font-semibold mb-4">Upload {text} File</h2>

        {/* Dropzone */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition ${
            dragOver ? "border-blue-500 bg-blue-50" : "border-gray-300"
          }`}
        >
          <Upload className="w-12 h-12 text-blue-500 mb-3" />
          <p className="text-gray-700 font-medium">Drop files here</p>
          <p className="text-gray-500 text-sm my-2">OR</p>

          <label className="px-4 py-2 bg-blue-600 bg-blue p-4 text-white rounded-lg cursor-pointer hover:bg-blue-700">
            Upload File
            <input
              type="file"
              accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        <p className="text-gray-500 text-sm mt-3">
          Only Excel Files are supported
        </p>
      </div>
    </div>
  );
}
