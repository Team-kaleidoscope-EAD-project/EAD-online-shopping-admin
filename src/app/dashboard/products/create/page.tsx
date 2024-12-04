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
import AWS from "aws-sdk";
import { toast } from "react-toastify";

interface Variant {
  color: string;
  image: string | null;
  sizes: string[];
}

interface Stock {
  sizeStocks: number[];
}

//AWS Configuration

// AWS.config.update({
//   accessKeyId: "AKIASBGQK5ZFBFOCLGG4", // Access Key ID from .env file
//   secretAccessKey: "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", // Secret Access Key from .env file
//   region: "eu-north-1", // AWS region from .env file
// });

const s3 = new AWS.S3({
  params: { Bucket: process.env.AWS_BUCKET_NAME },
  region: process.env.AWS_REGION,
});

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

  const uploadImageToS3 = async (file: File) => {
    const params = {
      Bucket: "eadadmins3bucket", // S3 Bucket Name from .env
      Key: file.name, // Unique file name
      Body: file,
      ContentType: file.type,
      ACL: "public-read", // Make the file publicly accessible
    };
    console.log("Uploading file to S3:", params);
    try {
      const upload = s3
        .upload(params)
        .on("httpUploadProgress", (evt) => {
          if (evt.total) {
            console.log(
              `Uploading: ${Math.round((evt.loaded * 100) / evt.total)}%`
            );
          }
        })
        .promise();

      const response = await upload;
      console.log("File uploaded to S3:", response.Location);
      return response.Location;
      // const fileUrl = `https://eadadmins3bucket.s3.eu-north-1.amazonaws.com/${file.name}`;
      // Generate the signed URL for downloading
      // const downloadUrl = s3.getSignedUrl("getObject", {
      //   Bucket: params.Bucket,
      //   Key: params.Key,
      //   Expires: 60 * 60, // URL expiration time in seconds (1 hour in this case)
      // });
      // console.log("File uploaded to S3:", fileUrl);
      // alert("File uploaded successfully.");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("File upload failed.");
    }
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

  const handleImageChange = async (index: number, file: File) => {
    const updatedVariants = [...variants];

    try {
      const imageUrl = await uploadImageToS3(file); // Upload image to S3 and get URL
      updatedVariants[index].image = imageUrl; // Store the image URL
      setVariants(updatedVariants);
    } catch (error) {
      console.error("Error handling image upload:", error);
    }
  };

  const onSubmit = async (data: any) => {
    const formattedData = {
      ...data,
      variants: variants.map((variant) => ({
        color: variant.color,
        imageUrl: variant.image, // Use the image URL from the S3 upload
        sizes: variant.sizes.map((size, index) => ({
          size,
          stock: stocks[index].sizeStocks[index], // Assuming stocks data is also managed properly
        })),
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
      toast.success("Product added successfully!");
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
                  <SelectItem value="Cap">OVERSIZED</SelectItem>
                  <SelectItem value="T-Shirt">JACKETS</SelectItem>
                  <SelectItem value="Men's Wear">MEN&apos;S WEAR</SelectItem>
                  <SelectItem value="Women's Wear">
                    WOMEN&apos;S WEAR
                  </SelectItem>
                  <SelectItem value="Denims">DENIMS</SelectItem>
                  <SelectItem value="Foot wear">FOOT WEAR</SelectItem>
                  <SelectItem value="Sports Wear">SPORTS WEAR</SelectItem>
                  <SelectItem value="Watches">WATCHES</SelectItem>
                  <SelectItem value="Head Wear">HEAD WEAR</SelectItem>
                  <SelectItem value="Glasses">GLASSES</SelectItem>
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
                      <Controller
                        control={control}
                        name={`variants[${index}].sizes[${sizeIndex}]`} // Dynamic binding
                        render={({ field }) => (
                          <Select
                            onValueChange={(value) => {
                              field.onChange(value);
                              handleSizeChange(index, sizeIndex, value); // Update size dynamically
                            }}
                            value={field.value || ""}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Size" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="FREE">FREE</SelectItem>
                              <SelectItem value="XXS">XXS</SelectItem>
                              <SelectItem value="XS">XS</SelectItem>
                              <SelectItem value="S">S</SelectItem>
                              <SelectItem value="M">M</SelectItem>
                              <SelectItem value="L">L</SelectItem>
                              <SelectItem value="XL">XL</SelectItem>
                              <SelectItem value="XXL">XXL</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      <Input
                        placeholder="Stock"
                        type="number"
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
