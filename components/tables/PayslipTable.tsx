"use client";

import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";

// ---------------- Mock Data ----------------
type PayrollSlip = {
  payPeriod: string;
  total: string;
  status: string;
};

type StaffPayroll = {
  staffName: string;
  address: string;
  netPay: string;
  status: string;
};

const payrollSlipData: PayrollSlip[] = [
  { payPeriod: "Sept 01 - Sept 31", total: "$55,000.00", status: "In Progress" },
  { payPeriod: "Sept 01 - Sept 31", total: "$55,000.00", status: "Processed" },
  { payPeriod: "Sept 01 - Sept 31", total: "$55,000.00", status: "Processed" },
];

const staffPayrollData: StaffPayroll[] = [
  { staffName: "Mario Gonzalez", address: "bc1te34gye...", netPay: "$1000.00", status: "Processed" },
  { staffName: "Simon Peter", address: "0exe34Mnd...", netPay: "$1000.00", status: "Processed" },
  { staffName: "Hussein Shittu", address: "01xedgh7268...", netPay: "$1000.00", status: "Processed" },
  { staffName: "Johnn Doe", address: "728hhhaTGFK...", netPay: "$1000.00", status: "Processed" },
  { staffName: "Christopher Columbus", address: "1cdRFG8276s...", netPay: "$1000.00", status: "Processed" },
  { staffName: "Donald J Trump", address: "bc1te34gye...", netPay: "$1000.00", status: "Processed" },
  { staffName: "Walter Disney", address: "1Tghte34nHJ...", netPay: "$1000.00", status: "Processed" },
];

// ---------------- Payroll Slip Columns ----------------
const slipColumns: ColumnDef<PayrollSlip>[] = [
  { accessorKey: "payPeriod", header: "Pay Period" },
  { accessorKey: "total", header: "Total" },
  { accessorKey: "status", header: "Status" },
  {
    id: "action",
    header: "",
    cell: () => (
      <button className="px-4 py-2 bg-ashIn font-bold text-black rounded-md hover:bg-blue hover:text-white whitespace-nowrap">
        View
      </button>
    ),
  },
];

// ---------------- Staff Payroll Columns ----------------
const staffColumns: ColumnDef<StaffPayroll>[] = [
  { accessorKey: "staffName", header: "Staff Name" },
  { accessorKey: "address", header: "Address" },
  {
    accessorKey: "netPay",
    header: "Net Pay",
    cell: ({ row }) => (
      <span className="text-green font-medium">{row.original.netPay}</span>
    ),
  },
  { accessorKey: "status", header: "Status" },
  {
    id: "action",
    header: "Action",
    cell: () => (
      <div className="flex gap-2 whitespace-nowrap">
        <button className="text-lightBlue hover:underline">Download</button>
        <button className="text-green hover:underline">Send to mail</button>
      </div>
    ),
  },
];

// ---------------- Component ----------------
const PayslipTable = () => {
  const slipTable = useReactTable({
    data: payrollSlipData,
    columns: slipColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const staffTable = useReactTable({
    data: staffPayrollData,
    columns: staffColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="space-y-6 p-4 min-w-0">
      {/* Payroll Slip Table */}
      <div className="rounded-xl border p-4 bg-white shadow w-full min-w-0">
        <div className="overflow-x-auto w-full">
          <table className="w-full table-auto border-collapse text-sm min-w-[600px]">
            <thead className="text-left border-b">
              {slipTable.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="p-2 whitespace-nowrap">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {slipTable.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-b last:border-none">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-2 whitespace-nowrap">
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
              onClick={() => slipTable.previousPage()}
              disabled={!slipTable.getCanPreviousPage()}>
              Prev
            </button>
            <button
              className="px-2 py-1 border rounded disabled:opacity-50"
              onClick={() => slipTable.nextPage()}
              disabled={!slipTable.getCanNextPage()}>
              Next
            </button>
          </div>
          <span>
            Page{" "}
            <strong>
              {slipTable.getState().pagination.pageIndex + 1} of{" "}
              {slipTable.getPageCount()}
            </strong>
          </span>
          <select
            className="border rounded px-2 py-1"
            value={slipTable.getState().pagination.pageSize}
            onChange={(e) => slipTable.setPageSize(Number(e.target.value))}>
            {[5, 10, 20].map((size) => (
              <option key={size} value={size}>
                Show {size}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Staff Payroll Table */}
      <div className="rounded-xl border p-4 bg-white shadow w-full min-w-0">
        <div className="overflow-x-auto w-full">
          <table className="w-full table-auto border-collapse text-sm min-w-[700px]">
            <thead className="text-left border-b">
              {staffTable.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="p-2 whitespace-nowrap">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {staffTable.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-b last:border-none">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-2 whitespace-nowrap">
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
              onClick={() => staffTable.previousPage()}
              disabled={!staffTable.getCanPreviousPage()}>
              Prev
            </button>
            <button
              className="px-2 py-1 border rounded disabled:opacity-50"
              onClick={() => staffTable.nextPage()}
              disabled={!staffTable.getCanNextPage()}>
              Next
            </button>
          </div>
          <span>
            Page{" "}
            <strong>
              {staffTable.getState().pagination.pageIndex + 1} of{" "}
              {staffTable.getPageCount()}
            </strong>
          </span>
          <select
            className="border rounded px-2 py-1"
            value={staffTable.getState().pagination.pageSize}
            onChange={(e) => staffTable.setPageSize(Number(e.target.value))}>
            {[5, 10, 20].map((size) => (
              <option key={size} value={size}>
                Show {size}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default PayslipTable;
