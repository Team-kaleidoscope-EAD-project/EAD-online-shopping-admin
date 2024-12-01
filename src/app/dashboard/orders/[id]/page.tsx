import { DataTable } from "./data-table";
import { columns } from "./columns";
import { OrderItem } from "../../../../types/orderItem";

async function getData(): Promise<OrderItem[]> {
  return [
    {
      id: "OI12345",
      orderId: "ORD12345",
      price: 50.0,
      productId: "PROD001",
      quantity: 2,
    },
    {
      id: "OI12346",
      orderId: "ORD12345",
      price: 100.0,
      productId: "PROD002",
      quantity: 1,
    },
    {
      id: "OI12347",
      orderId: "ORD12346",
      price: 25.0,
      productId: "PROD003",
      quantity: 4,
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
