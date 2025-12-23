"use client";
import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
  CellContext,
} from "@tanstack/react-table";

type Staff = {
  id: string;
  name: string;
  email: string;
  zkProof: "Verified" | "Pending";
  status: "Employed" | "Resigned";
};

const data: Staff[] = [
  { id: "01", name: "Mario Gonzalez", email: "ab.med@demorgans.com", zkProof: "Verified", status: "Employed" },
  { id: "02", name: "Simon Peter", email: "toni.c@demorgans.com", zkProof: "Verified", status: "Employed" },
  { id: "03", name: "Hussein Shittu", email: "cr7@demorgans.com", zkProof: "Verified", status: "Resigned" },
  { id: "04", name: "Johnn Doe", email: "dalves@demorgans.com", zkProof: "Pending", status: "Employed" },
  { id: "05", name: "Christopher Columbus", email: "mart.7@demorgans.com", zkProof: "Pending", status: "Employed" },
  { id: "06", name: "Donald J Trump", email: "valv@demorgan.com", zkProof: "Verified", status: "Resigned" },
  { id: "07", name: "Walter Disney", email: "g.bale@demorgan.com", zkProof: "Pending", status: "Employed" },
];

const columns: ColumnDef<Staff>[] = [
  {
    header: "S/N",
    cell: (info: CellContext<Staff, unknown>) => (
      <span className="text-gray-400">{info.row.index + 1}</span>
    ),
  },
  {
    accessorKey: "name",
    header: "Staff Name",
    cell: (info) => <span className="font-medium text-gray-900">{info.getValue<string>()}</span>,
  },
  { accessorKey: "email", header: "Email" },
  {
    accessorKey: "zkProof",
    header: "ZkProof Status",
    cell: (info) => {
      const value = info.getValue<Staff["zkProof"]>();
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === "Verified" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
        }`}>
          {value}
        </span>
      );
    },
  },
  { accessorKey: "status", header: "Status" },
  {
    id: "actions",
    header: "Action",
    cell: () => (
      <div className="flex gap-3">
        <button className="text-blue-600 hover:text-blue-800 hover:underline text-sm font-medium">
          Edit
        </button>
        <button className="text-red-500 hover:text-red-700 hover:underline text-sm font-medium">
          Delete
        </button>
      </div>
    ),
  },
];

export default function StaffTable() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm w-full flex flex-col overflow-hidden">
      {/* 1. SCROLL WRAPPER 
          The 'overflow-x-auto' allows the sideways swipe.
      */}
      <div className="overflow-x-auto w-full">
        {/* 2. MINIMUM WIDTH 
            'min-w-[850px]' ensures the table doesn't squish on small screens.
        */}
        <table className="w-full min-w-[850px] border-collapse text-sm text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => (
                  <th
                    key={header.id}
                    className={`p-4 font-semibold text-gray-700 whitespace-nowrap ${
                      index === 1 ? "sticky left-0 z-10 bg-gray-50 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]" : ""
                    }`}
                  >
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-100">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                {row.getVisibleCells().map((cell, index) => (
                  <td
                    key={cell.id}
                    className={`p-4 whitespace-nowrap text-gray-600 ${
                      index === 1 ? "sticky left-0 z-10 bg-white shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]" : ""
                    }`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* RESPONSIVE PAGINATION */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-4 gap-4 border-t border-gray-100 bg-gray-50/50">
        <div className="flex items-center gap-2">
          <button
            className="px-4 py-2 text-sm font-medium border rounded-lg bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </button>
          <button
            className="px-4 py-2 text-sm font-medium border rounded-lg bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </button>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span>
            Page <strong>{table.getState().pagination.pageIndex + 1}</strong> of{" "}
            <strong>{table.getPageCount()}</strong>
          </span>
          <select
            className="border rounded-md px-2 py-1 bg-white outline-none focus:ring-2 focus:ring-blue-500"
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
    </div>
  );
}
