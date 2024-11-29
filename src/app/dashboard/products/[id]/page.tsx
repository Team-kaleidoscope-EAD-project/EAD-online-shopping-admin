"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Product {
  id: string;
  name: string;
  organization: string;
  email: string;
}

export default function Page({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(`/api/products/${params.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product data");
        }
        const data: Product = await response.json();
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
            <h3 className="font-medium">Organization</h3>
            <p>{product.organization}</p>
          </div>
          <div className="mb-4">
            <h3 className="font-medium">Email</h3>
            <p>{product.email}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}