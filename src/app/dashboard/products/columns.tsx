"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Product } from "@/types/product";
import axiosInstance from "@/lib/api/axiosInstance";

export const columnsProduct: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: () => <div className="text-left">ID</div>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="px-0 hover:bg-unset"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "category",
    header: () => <div className="text-left">Category</div>,
  },
  {
    accessorKey: "colors",
    header: () => <div className="text-left">Colors</div>,
  },
  {
    accessorKey: "brand",
    header: () => <div className="text-left">Brand</div>,
  },
  {
    accessorKey: "price",
    header: () => <div className="text-left">Prices(Rs.)</div>,
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }: { row: { original: Product } }) => {
      const product = row.original;

      const handleDelete = async () => {
        try {
          const res = await axiosInstance.delete("/product/" + product.id);

          window.location.reload();
        } catch (error) {
          console.log("Error deleting", error);
        }
      };

      return (
        <div className="flex gap-2 justify-end">
          <Link href={`/dashboard/products/${product.id}`}>
            <Button variant="outline" size="sm">
              <Eye size={18} />
            </Button>
          </Link>
          <Link href={`/dashboard/products/${product.id}/edit`}>
            <Button variant="outline" size="sm">
              <Pencil size={18} />
            </Button>
          </Link>
          <Button variant="outline" size="sm" onClick={handleDelete}>
            <Trash size={18} />
          </Button>
        </div>
      );
    },
  },
];
