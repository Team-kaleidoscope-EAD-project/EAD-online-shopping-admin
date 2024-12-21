import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Order } from "../../../types/order";
import { fetchOrders } from "@/lib/api/order";

async function getData(): Promise<Order[]> {
  return [
    {
      id: "ORD12345",
      status: "Pending",
      totalAmount: 150.0,
      userId: "USR001",
      orderDate: new Date("2024-11-20"),
      discountAmount: 10.0,
    },
    {
      id: "ORD12346",
      status: "Completed",
      totalAmount: 200.0,
      userId: "USR002",
      orderDate: new Date("2024-11-21"),
      discountAmount: 20.0,
    },
    {
      id: "ORD12347",
      status: "Cancelled",
      totalAmount: 100.0,
      userId: "USR003",
      orderDate: new Date("2024-11-22"),
      discountAmount: 0.0,
    },
  ];
}

export default async function Page() {
  const data = await fetchOrders();

  return (
    <>
      <DataTable columns={columns} data={data} />
    </>
  );
}
