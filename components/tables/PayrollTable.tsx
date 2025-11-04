"use client";
import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";

import { Download } from "lucide-react";


type Staff = {
  id: string;
  name: string;
  status: "Employed" | "Resigned";
  grossPay: string;
  address: string;
};

const data: Staff[] = [
  {
    id: "01",
    name: "Mario Gonzalez",
    status: "Employed",
    grossPay: "$100.00",
    address: "bc1te34gye...",
  },
  {
    id: "02",
    name: "Simon Peter",
    status: "Employed",
    grossPay: "$100.00",
    address: "0exe34Mnd...",
  },
  {
    id: "03",
    name: "Hussein Shittu",
    status: "Resigned",
    grossPay: "$100.00",
    address: "01xedgh7268...",
  },
  {
    id: "04",
    name: "Johnn Doe",
    status: "Employed",
    grossPay: "$100.00",
    address: "728hhhaTGFK...",
  },
  {
    id: "05",
    name: "Christopher Columbus",
    status: "Employed",
    grossPay: "$100.00",
    address: "1cdRFG8276s...",
  },
  {
    id: "06",
    name: "Donald J Trump",
    status: "Resigned",
    grossPay: "$100.00",
    address: "bc1te34gye...",
  },
  {
    id: "07",
    name: "Walter Disney",
    status: "Employed",
    grossPay: "$100.00",
    address: "1Tghte34nHJ...",
  },
];

const columns: ColumnDef<Staff>[] = [
  {
    id: "select",
    header: () => <input type="checkbox" />,
    cell: () => <input type="checkbox" />,
  },
  { accessorKey: "name", header: "Staff Name" },
  { accessorKey: "status", header: "Status" },
  { accessorKey: "grossPay", header: "Gross Pay" },
  {
    accessorKey: "address",
    header: "Address",
    cell: (info) => (
      <div className="flex items-center gap-2">
        <span className="truncate max-w-[100px]">{info.getValue() as string}</span>
        <button className="px-2 py-1 text-xs bg-gray-100 rounded-lg hover:bg-gray-200">
          View
        </button>
      </div>
    ),
  },
];

export default function PayrollTable() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full">
      {/* Left: Table */}
      <div className="flex-1 bg-white rounded-xl border p-4 shadow-sm">
        <div className="overflow-x-auto w-full">
          <table className="w-full table-fixed border-collapse text-sm">
            <thead className="text-left border-b">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
            key={header.id}
            className={`p-2 font-semibold text-gray-700 ${
              header.id === "select" ? "w-10 text-center" : "whitespace-nowrap"
            }`}
            style={header.id === "select" ? { width: "40px" } : {}}
          >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-b hover:bg-gray-50">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-2 align-middle">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-wrap items-center justify-between mt-4 gap-3 text-sm">
          <div className="flex gap-2">
            <button
              className="px-2 py-1 border rounded disabled:opacity-50"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Prev
            </button>
            <button
              className="px-2 py-1 border rounded disabled:opacity-50"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </button>
          </div>

          <span className="text-gray-600">
            Page <strong>{table.getState().pagination.pageIndex + 1}</strong> of{" "}
            {table.getPageCount()}
          </span>

          <select
            className="border rounded px-2 py-1"
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
          >
            {[5, 10, 20].map((size) => (
              <option key={size} value={size}>
                Show {size}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="w-64 bg-white rounded-xl border p-4 shadow-sm flex flex-col gap-3">
        <h3 className="text-base font-semibold mb-2">Validate Payroll</h3>
        <button className="w-full px-4 py-2 bg-[#CCEEFF] border border-lightBlue text-black rounded-lg  hover:bg-blue hover:text-white">
          Validate Payroll
        </button>
        <button className="w-full px-4 py-2 bg-[#CCEEFF] border border-lightBlue text-black rounded-lg  hover:bg-blue hover:text-white">
          Approve Batch
        </button>
        <button className="w-full px-4 py-2 bg-[#CCEEFF] border border-lightBlue text-black rounded-lg hover:bg-blue hover:text-white">
          Execute Private Transfer
        </button>
        <button className="w-full px-4 py-2 bg-gradient-to-b from-blue to-gradientBlue text-white rounded-lg hover:opacity-90">
            <Download className="inline w-4 h-4 mr-2" />
          Download Batch Summary (CSV/PDF)
        </button>
      </div>
    </div>
  );
}
