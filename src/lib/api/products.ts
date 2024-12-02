// lib/api/users.ts
import axiosInstance from "./axiosInstance";
import { Product } from "@/types/product";
import { fetchInventoryBySku } from "./inventory";

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await axiosInstance.get("/product/");

  const products: Product[] = response.data.map((product: any) => {
    // Join colors as a comma-separated string
    const colors = product.variants
      .map((variant: any) => variant.color)
      .join(", ");

    // Join sizes as a comma-separated string
    const sizes = product.variants
      .flatMap((variant: any) => variant.sizes.map((size: any) => size.size))
      .join(", ");

    return {
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      brand: product.brand,
      colors, // String of colors
      sizes, // String of sizes
    };
  });

  return products;
};

export const fetchProductById = async (productId: string): Promise<Product> => {
  const response = await axiosInstance.get(`/product/${productId}`);
  const product: any = response.data;

  const stocks: string[] = [];

  for (const variant of product.variants) {
    const color = variant.color;
    for (const size of variant.sizes) {
      const inventory = await fetchInventoryBySku(size.sku);

      const quantity = inventory?.quantity || 0;

      stocks.push(
        `Color- ${color} , Size- ${size.size} , On Stocks- ${quantity}`
      );
    }
  }

  return {
    id: product.id,
    name: product.name,
    category: product.category,
    price: product.price,
    brand: product.brand,
    stocks,
  };
};
