"use client";

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Variant {
  color: string;
  image: File | null;
  sizes: string[];
}

interface Product {
  name: string;
  description: string;
  brand: string;
  price: number;
  category: string;
  variants: Variant[];
}

interface Category {
  id: string;
  name: string;
}

interface ProductFormProps {
  productId: string;
}

export default function ProductForm({ productId }: ProductFormProps) {
  const { handleSubmit, control, register, setValue } = useForm<Product>();
  const [variants, setVariants] = useState<Variant[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    // Fetch product data by ID
    const fetchProductData = async () => {
      try {
        const response = await fetch(`/api/products/${productId}`);
        const productData: Product = await response.json();
        
        // Populate form with fetched data
        setValue("name", productData.name);
        setValue("description", productData.description);
        setValue("brand", productData.brand);
        setValue("price", productData.price);
        setValue("category", productData.category);
        setVariants(productData.variants);
      } catch (error) {
        console.error("Failed to fetch product data:", error);
      }
    };

    // Fetch categories from the backend
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        const categoriesData: Category[] = await response.json();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchProductData();
    fetchCategories();
  }, [productId, setValue]);

  const addVariant = () => {
    setVariants([...variants, { color: "", image: null, sizes: [] }]);
  };

  const removeVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const handleSizeChange = (variantIndex: number, sizeIndex: number, newSize: string) => {
    const updatedVariants = [...variants];
    updatedVariants[variantIndex].sizes[sizeIndex] = newSize;
    setVariants(updatedVariants);
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

  const handleFormSubmit = async (data: any) => {
    const formattedData = {
      ...data,
      variants: variants.map((variant) => ({
        color: variant.color,
        imageUrl: variant.image ? URL.createObjectURL(variant.image) : null,
        sizes: variant.sizes.map((size) => ({ size })),
      })),
    };

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      // Handle successful update 
      console.log("Product updated successfully");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Product Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input {...register("name")} placeholder="Product Name" />
          <Input {...register("description")} placeholder="Description" />
          <Input {...register("brand")} placeholder="Brand" />
          <Input {...register("price")} placeholder="Price" type="number" />
          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
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
                    variants.map((v, i) => (i === index ? { ...v, color: e.target.value } : v))
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
                    <div key={sizeIndex} className="flex items-center space-x-2">
                      <Input
                        placeholder="Size"
                        value={size}
                        onChange={(e) =>
                          handleSizeChange(index, sizeIndex, e.target.value)
                        }
                      />
                      <Button
                        variant="destructive"
                        onClick={() => removeSizeField(index, sizeIndex)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
                <Button
                  className="mt-2"
                  onClick={() => addSizeField(index)}
                >
                  Add Size
                </Button>
              </div>
              <Button
                variant="destructive"
                className="mt-4"
                onClick={() => removeVariant(index)}
              >
                Remove Variant
              </Button>
            </div>
          ))}
          <Button className="mt-4" onClick={addVariant}>
            Add Variant
          </Button>
        </CardContent>
      </Card>

      <Button type="submit">Submit</Button>
    </form>
  );
}