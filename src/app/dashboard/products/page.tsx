import { fetchProducts } from "@/lib/api/products";
import { columnsProduct } from "./columns";
import { DataTableProduct } from "./data-table-product";

export default async function Page() {
  const data = await fetchProducts();

  return (
    <>
      <DataTableProduct columns={columnsProduct} data={data} />
    </>
  );
}
