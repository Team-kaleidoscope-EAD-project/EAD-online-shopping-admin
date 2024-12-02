"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axiosInstance from "@/lib/api/axiosInstance";
import { useRouter } from "next/navigation";
import { addInventory } from "@/lib/api/inventory";

interface Variant {
  color: string;
  image: File | null;
  sizes: string[];
}

interface Stock {
  sizeStocks: number[];
}

export default function ProductForm() {
  const { handleSubmit, control, register } = useForm();
  const [variants, setVariants] = useState<Variant[]>([]);
  const [stocks, setStocks] = useState<Stock[]>([]);

  const router = useRouter();

  const addVariant = () => {
    setVariants([...variants, { color: "", image: null, sizes: [] }]);
    setStocks([...stocks, { sizeStocks: [0] }]);
  };

  const removeVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const handleSizeChange = (
    variantIndex: number,
    sizeIndex: number,
    newSize: string
  ) => {
    const updatedVariants = [...variants];

    updatedVariants[variantIndex].sizes[sizeIndex] = newSize;
    setVariants(updatedVariants);
  };

  const handleStockChange = (
    variantIndex: number,
    stockIndex: number,
    newStock: number
  ) => {
    const updatedVariants = [...stocks];

    updatedVariants[variantIndex].sizeStocks[stockIndex] = newStock;
    setStocks(updatedVariants);
  };

  const addSizeField = (variantIndex: number) => {
    const updatedVariants = [...variants];
    updatedVariants[variantIndex].sizes.push("");
    setVariants(updatedVariants);
  };

  const removeSizeField = (variantIndex: number, sizeIndex: number) => {
    const updatedVariants = [...variants];
    updatedVariants[variantIndex].sizes.splice(sizeIndex, 1);
    setVariants(updatedVariants);
  };

  const handleImageChange = (index: number, file: File) => {
    const updatedVariants = [...variants];
    updatedVariants[index].image = file;
    setVariants(updatedVariants);
  };

  const onSubmit = async (data: any) => {
    const formattedData = {
      ...data,
      variants: variants.map((variant) => ({
        color: variant.color,
        imageUrl: variant.image ? URL.createObjectURL(variant.image) : null,
        sizes: variant.sizes.map((size) => ({ size })),
      })),
    };

    try {
      const response = await axiosInstance.post(
        `/product/addproduct`,
        formattedData
      );

      await addInventory(response.data, stocks);

      router.push("/dashboard/products");

      // console.log("Product added successfully", response);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Product Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input {...register("name")} placeholder="Product Name" />
          <Input {...register("description")} placeholder="Description" />
          <Input {...register("brand")} placeholder="Brand" />
          <Input
            {...register("price")}
            placeholder="Price"
            type="number"
            step="any"
          />
          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cap">Cap</SelectItem>
                  <SelectItem value="T-Shirt">T-Shirt</SelectItem>
                  <SelectItem value="Shoes">Shoes</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Variants</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {variants.map((variant, index) => (
            <div key={index} className="space-y-4 border p-4">
              <Input
                placeholder="Color"
                value={variant.color}
                onChange={(e) =>
                  setVariants(
                    variants.map((v, i) =>
                      i === index ? { ...v, color: e.target.value } : v
                    )
                  )
                }
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleImageChange(index, e.target.files[0]);
                  }
                }}
              />
              <div>
                <label>Sizes:</label>
                <div className="space-y-2">
                  {variant.sizes.map((size, sizeIndex) => (
                    <div
                      key={sizeIndex}
                      className="flex items-center space-x-2"
                    >
                      <Input
                        placeholder="Size"
                        value={size}
                        onChange={(e) =>
                          handleSizeChange(index, sizeIndex, e.target.value)
                        }
                      />

                      <Input
                        placeholder="Stock"
                        type="number"
                        // value={size.stock}
                        onChange={(e) =>
                          handleStockChange(
                            index,
                            sizeIndex,
                            Number(e.target.value)
                          )
                        }
                      />

                      <Button
                        variant="destructive"
                        type="button"
                        onClick={() => removeSizeField(index, sizeIndex)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
                <Button
                  type="button"
                  className="mt-2"
                  onClick={() => addSizeField(index)}
                >
                  Add Size
                </Button>
              </div>
              <Button
                variant="destructive"
                type="button"
                className="mt-4"
                onClick={() => removeVariant(index)}
              >
                Remove Variant
              </Button>
            </div>
          ))}
          <Button type="button" className="mt-4" onClick={addVariant}>
            Add Variant
          </Button>
        </CardContent>
      </Card>

      <Button type="submit">Submit</Button>
    </form>
  );
}
