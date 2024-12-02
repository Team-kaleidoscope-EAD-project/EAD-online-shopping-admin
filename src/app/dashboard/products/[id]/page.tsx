"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchProductById } from "@/lib/api/products";
import { Product } from "@/types/product";

export default function Page({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const data = await fetchProductById(params.id);

        setProduct(data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, [params.id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <h3 className="font-medium">ID</h3>
            <p>{product.id}</p>
          </div>
          <div className="mb-4">
            <h3 className="font-medium">Name</h3>
            <p>{product.name}</p>
          </div>
          <div className="mb-4">
            <h3 className="font-medium">Category</h3>
            <p>{product.category}</p>
          </div>
          <div className="mb-4">
            <h3 className="font-medium">Price</h3>
            <p>{product.price}</p>
          </div>
          <div className="mb-4">
            <h3 className="font-medium">Brand</h3>
            <p>{product.brand}</p>
          </div>
          <div className="mb-4">
            <h3 className="font-medium">Colors</h3>
            <p>{product.colors}</p>
          </div>
          <div className="mb-4">
            <h3 className="font-medium">Sizes</h3>
            <p>{product.sizes}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
