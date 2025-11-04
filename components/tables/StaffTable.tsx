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
  {
    id: "01",
    name: "Mario Gonzalez",
    email: "ab.med@demorgans.com",
    zkProof: "Verified",
    status: "Employed",
  },
  {
    id: "02",
    name: "Simon Peter",
    email: "toni.c@demorgans.com",
    zkProof: "Verified",
    status: "Employed",
  },
  {
    id: "03",
    name: "Hussein Shittu",
    email: "cr7@demorgans.com",
    zkProof: "Verified",
    status: "Resigned",
  },
  {
    id: "04",
    name: "Johnn Doe",
    email: "dalves@demorgans.com",
    zkProof: "Pending",
    status: "Employed",
  },
  {
    id: "05",
    name: "Christopher Columbus",
    email: "mart.7@demorgans.com",
    zkProof: "Pending",
    status: "Employed",
  },
  {
    id: "06",
    name: "Donald J Trump",
    email: "valv@demorgan.com",
    zkProof: "Verified",
    status: "Resigned",
  },
  {
    id: "07",
    name: "Walter Disney",
    email: "g.bale@demorgan.com",
    zkProof: "Pending",
    status: "Employed",
  },
];
const columns: ColumnDef<Staff>[] = [
  {
    header: "S/N",
    cell: (info: CellContext<Staff, unknown>) => info.row.index + 1,
  },
  { accessorKey: "name", header: "Staff Name" },
  { accessorKey: "email", header: "Email" },
  {
    accessorKey: "zkProof",
    header: "ZkProof Status",
    cell: (info) => {
      const value = info.getValue<Staff["zkProof"]>();
      return (
        <span
          className={
            value === "Verified"
              ? "text-green font-medium"
              : "text-orange-500 font-medium"
          }>
          {" "}
          {value}{" "}
        </span>
      );
    },
  },
  { accessorKey: "status", header: "Status" },
  {
    id: "actions",
    header: "Action",
    cell: () => (
      <div className="space-x-2">
        {" "}
        <button className="text-lightBlue hover:underline text-sm">
          Edit
        </button>{" "}
        <button className="text-red-500 hover:underline text-sm">Delete</button>{" "}
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
  });
  return (
    <div className="bg-white rounded-xl border p-4 shadow-sm w-full">
      {" "}
      {/* ✅ Responsive scroll wrapper */}{" "}
      <div className="overflow-x-auto w-full">
        {" "}
        <table className="w-full table-fixed border-collapse text-sm">
          {" "}
          <thead className="text-left border-b">
            {" "}
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {" "}
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="p-2 font-semibold text-gray-700 break-words">
                    {" "}
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}{" "}
                  </th>
                ))}{" "}
              </tr>
            ))}{" "}
          </thead>{" "}
          <tbody>
            {" "}
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b hover:bg-gray-50">
                {" "}
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="p-2 break-words max-w-[150px] text-sm">
                    {" "}
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}{" "}
                  </td>
                ))}{" "}
              </tr>
            ))}{" "}
          </tbody>{" "}
        </table>{" "}
      </div>{" "}
      {/* ✅ Responsive Pagination */}{" "}
      <div className="flex flex-wrap items-center justify-between mt-4 gap-3 text-sm">
        {" "}
        {/* Prev / Next */}{" "}
        <div className="flex gap-2 flex-wrap">
          {" "}
          <button
            className="px-2 py-1 border rounded disabled:opacity-50"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            {" "}
            Prev{" "}
          </button>{" "}
          <button
            className="px-2 py-1 border rounded disabled:opacity-50"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}>
            {" "}
            Next{" "}
          </button>{" "}
        </div>{" "}
        {/* Page Info */}{" "}
        <span className="text-gray-600 whitespace-normal">
          {" "}
          Page{" "}
          <strong>
            {" "}
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}{" "}
          </strong>{" "}
        </span>{" "}
        {/* Page Size Select */}{" "}
        <select
          className="border rounded px-2 py-1"
          value={table.getState().pagination.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}>
          {" "}
          {[5, 10, 20].map((size) => (
            <option key={size} value={size}>
              {" "}
              Show {size}{" "}
            </option>
          ))}{" "}
        </select>{" "}
      </div>{" "}
    </div>
  );
}
