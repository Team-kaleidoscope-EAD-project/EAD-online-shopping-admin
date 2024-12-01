import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Order } from "../../../types/order";

async function getData(): Promise<Order[]> {
  return [
    {
      id: "ORD12345",
      status: "Pending",
      totalAmount: 150.00,
      userId: "USR001",
      orderDate: new Date("2024-11-20"),
      discountAmount: 10.00,
    },
    {
      id: "ORD12346",
      status: "Completed",
      totalAmount: 200.00,
      userId: "USR002",
      orderDate: new Date("2024-11-21"),
      discountAmount: 20.00,
    },
    {
      id: "ORD12347",
      status: "Cancelled",
      totalAmount: 100.00,
      userId: "USR003",
      orderDate: new Date("2024-11-22"),
      discountAmount: 0.00,
    },
  ];
}

export default async function Page() {
  const data = await getData();

  return (
    <>
      <DataTable columns={columns} data={data} />
    </>
  );
}
