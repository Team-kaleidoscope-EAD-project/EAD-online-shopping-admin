"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";
import Link from "next/link";

import { OrderItem } from "../../../../types/orderItem";

export const columns: ColumnDef<OrderItem>[] = [
  {
    accessorKey: "id",
    header: () => <div className="text-left">ID</div>,
  },
  {
    accessorKey: "productId",
    header: () => <div className="text-left">Product ID</div>,
  },
  {
    accessorKey: "quantity",
    header: () => <div className="text-left">Quantity</div>,
    cell: ({ row }) => {
      const quantity = parseFloat(row.getValue("quantity"));

      return <div className="font-medium">{quantity}</div>;
    },
  },
  {
    accessorKey: "price",
    header: () => <div className="text-left">Price</div>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);

      return <div className="font-medium">{formatted}</div>;
    },
  },
];
