import { Inventory } from "@/types/inventory";
import axiosInstance from "./axiosInstance";

export const fetchInventoryBySku = async (sku: string): Promise<Inventory> => {
  const response = await axiosInstance.get(
    "/inventory/getinventoryitem/" + sku
  );

  return response.data;
};

export const addInventory = async (data: any, quantity: any): Promise<null> => {
  console.log(data.variants, quantity);

  for (const [variantIndex, variant] of data.variants.entries()) {
    for (const [sizeIndex, size] of variant.sizes.entries()) {
      //   console.log(size.sku, quantity[variantIndex].sizeStocks[sizeIndex]);
      const inventory = await axiosInstance.post(
        "/inventory/addinventoryitem",

        {
          sku: size.sku,
          quantity: Number(quantity[variantIndex].sizeStocks[sizeIndex]) || 0,
        }
      );
    }
  }

  return null;
};
