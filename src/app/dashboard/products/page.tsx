import { fetchProducts } from "@/lib/api/products";
import { columnsProduct } from "./columns";
import { DataTableProduct } from "./data-table-product";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  colors: string;
  brand: string;
  sizes: string;
};

async function getData(): Promise<Product[]> {
  // Mock data for testing
  return [
    {
      id: "1",
      name: "T-shirt",
      category: "Clothing",
      price: 25,
      colors: "Red, Blue",
      brand: "Brand A",
      sizes: "S, M, L",
    },
    {
      id: "2",
      name: "Jeans",
      category: "Clothing",
      price: 50,
      colors: "Blue, Black",
      brand: "Brand B",
      sizes: "M, L, XL",
    },
  ];

  // try {
  //   const response = await fetch("/api/products");
  //   if (!response.ok) {
  //     throw new Error("Failed to fetch products");
  //   }
  //   const data: Product[] = await response.json();
  //   return data;
  // } catch (error) {
  //   console.error("Error fetching products:", error);
  //   return [];
  // }
}

export default async function Page() {
  const data = await fetchProducts();

  return (
    <>
      <DataTableProduct columns={columnsProduct} data={data} />
    </>
  );
}
