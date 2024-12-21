import { DataTable } from "./data-table";
import { columns } from "./columns";
import { fetchOrderItems } from "@/lib/api/order";

// Server Component
export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params; // Get `id` from the dynamic route parameters

  // Fetch data based on the `id`
  const data = await fetchOrderItems(id);

  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
