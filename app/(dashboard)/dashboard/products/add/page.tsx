"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Save, UploadCloud, X } from "lucide-react";
import Link from "next/link";
import AddProductHeader from "./components/header";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Image from "next/image";

interface AddProductPageProps {}

export default function AddProductPage({}: AddProductPageProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    const newPreviews = files.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise<string>((resolve) => {
        reader.onload = () => resolve(reader.result as string);
      });
    });

    Promise.all(newPreviews).then((images) => {
      setPreviewImages((prev) => [...prev, ...images]);
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      handleFiles(Array.from(files));
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 min-h-screen">
      <AddProductHeader />
      <form className="">
        <div className="flex justify-center gap-x-5 m-3 flex-wrap">
          <div className="flex-1 min-w-[500px] my-3">
            <div className="bg-gray-200 dark:bg-gray-800 p-4 font-bold text-gray-800 dark:text-gray-300 text-xl">
              Product Details
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-3">
              <label
                className="text-gray-800 dark:text-gray-300 font-bold"
                htmlFor="Name"
              >
                Name <span className="text-red-500 text-lg">*</span>
              </label>
              <Input
                id="Name"
                className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
              />
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-3">
              <label
                className="text-gray-800 dark:text-gray-300 font-bold"
                htmlFor="Description"
              >
                Description
              </label>
              <Input
                id="Description"
                className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
              />
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-3">
              <label
                className="text-gray-800 dark:text-gray-300 font-bold"
                htmlFor="Images"
              >
                Images
              </label>
              <div
                className={`border-2 border-dashed ${
                  isDragging ? "border-blue-500" : "border-gray-400"
                } p-4 rounded-md`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <p className="text-gray-600 dark:text-gray-400">
                  Drag and drop files here, or click to select files
                </p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  id="fileInput"
                  onChange={handleInputChange}
                />
                <label
                  htmlFor="fileInput"
                  className="cursor-pointer text-blue-500 hover:underline"
                >
                  Browse Files
                </label>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4">
                {previewImages.map((src, index) => (
                  <Image
                    key={index}
                    src={src}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-32 object-cover rounded-md"
                    width={128}
                    height={128}
                    unoptimized={true}
                  />
                ))}
              </div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-3">
              <label
                className="text-gray-800 dark:text-gray-300 font-bold"
                htmlFor="Category"
              >
                Category
              </label>
              <Input
                id="Category"
                className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
              />
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-3">
              <label
                className="text-gray-800 dark:text-gray-300 font-bold"
                htmlFor="Brand"
              >
                Brand
              </label>
              <Input
                id="Brand"
                className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
              />
            </div>
          </div>
          <div className="flex-1 min-w-[500px] my-3">
            <div className="bg-gray-200 dark:bg-gray-800 p-4 font-bold text-gray-800 dark:text-gray-300 text-xl">
              Price Details
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-3">
              <label
                className="text-gray-800 dark:text-gray-300 font-bold"
                htmlFor="BuyingPrice"
              >
                Buying Price
              </label>
              <Input
                id="BuyingPrice"
                className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
              />
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-3">
              <label
                className="text-gray-800 dark:text-gray-300 font-bold"
                htmlFor="SellingPrice"
              >
                Selling Price
              </label>
              <Input
                id="SellingPrice"
                className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
              />
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-3">
              <label
                className="text-gray-800 dark:text-gray-300 font-bold"
                htmlFor="DealerPrice"
              >
                Dealer Price
              </label>
              <Input
                id="DealerPrice"
                className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
