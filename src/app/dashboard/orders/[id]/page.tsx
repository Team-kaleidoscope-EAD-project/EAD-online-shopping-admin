import { DataTable } from "./data-table";
import { columns } from "./columns";
import { OrderItem } from "../../../../types/orderItem";
import { fetchOrderItems } from "@/lib/api/order";

export default async function Page() {
  const data = await fetchOrderItems(1);

  return (
    <>
      <DataTable columns={columns} data={data} />
    </>
  );
}
