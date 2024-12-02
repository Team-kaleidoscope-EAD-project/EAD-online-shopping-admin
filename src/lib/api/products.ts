// lib/api/users.ts
import axiosInstance from "./axiosInstance";
import { Product } from "@/types/product";

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

  const colors = product.variants
    .map((variant: any) => variant.color)
    .join(", ");
  const sizes = product.variants
    .flatMap((variant: any) => variant.sizes.map((size: any) => size.size))
    .join(", ");

  return {
    id: product.id,
    name: product.name,
    category: product.category,
    price: product.price,
    brand: product.brand,
    colors,
    sizes,
  };
};
