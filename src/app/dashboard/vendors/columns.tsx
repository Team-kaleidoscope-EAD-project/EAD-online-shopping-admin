"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye, Pencil, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: () => <div className="text-left">ID</div>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 hover:bg-unset"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "organization",
    header: () => <div className="text-left">Organization</div>,
  },
  {
    accessorKey: "email",
    header: () => <div className="text-left">Email</div>,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 hover:bg-unset"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 hover:bg-unset"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue("status") as string;

      return <Badge className="uppercase">{status}</Badge>;
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      const action = row.original;

      return (
        <div className="text-right flex gap-2 justify-end">
          <Link
            href={`/dashboard/vendors/${action.id}`}
            className="inline-block"
          >
            <Button variant="outline" size="sm">
              <Eye size={18} />
            </Button>
          </Link>
          <Link
            href={`/dashboard/vendors/${action.id}/edit`}
            className="inline-block"
          >
            <Button variant="outline" size="sm">
              <Pencil size={18} />
            </Button>
          </Link>
          <Button variant="outline" size="sm">
            <Trash size={18} />
          </Button>
        </div>
      );
    },
  },
];
