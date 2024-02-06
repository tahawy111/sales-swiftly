"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Save, UploadCloud, X } from "lucide-react";
import Link from "next/link";
import AddProductHeader from "./components/header";
import { Input } from "@/components/ui/input";
import { useId, useState } from "react";

interface AddProductPageProps {}

export default function AddProductPage({}: AddProductPageProps) {
  const [isDragging, setIsDragging] = useState(false);

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
    handleFiles(files as any);
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    // Handle the dropped files here
    console.log(files);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    handleFiles(files);
  };

  return (
    <div className="">
      <AddProductHeader />

      <form className="">
        <div className="flex justify-center gap-x-5 m-3 flex-wrap">
          <div className="flex-1 min-w-[500px] my-3">
            <div className="bg-slate-100 p-4 font-bold text-slate-600/80 text-xl">
              Product Details
            </div>
            <div className="bg-white p-3">
              <label className="text-slate-600/80 font-bold" htmlFor="Name">
                Name <span className="text-red-500 text-lg">*</span>
              </label>
              <Input id="Name" />
            </div>
            <div className="bg-white p-3">
              <label
                className="text-slate-600/80 font-bold"
                htmlFor="Description"
              >
                Description
              </label>
            </div>
            <div className="bg-white p-3 relative">
              <label className="text-slate-600/80 font-bold">Images</label>
              <div
                className={`drop-area ${isDragging ? "dragging" : ""}`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  id="fileInput"
                  className="file-input"
                  multiple
                  onChange={handleInputChange}
                />
                <label htmlFor="fileInput">
                  {isDragging
                    ? "Drop files here"
                    : "Drag and drop files here or click to browse"}
                </label>
              </div>
            </div>
            <div className="bg-white p-3">
              <label className="text-slate-600/80 font-bold" htmlFor="Category">
                Category
              </label>
              <Input id="Category" />
            </div>
            <div className="bg-white p-3">
              <label className="text-slate-600/80 font-bold" htmlFor="Brand">
                Brand
              </label>
              <Input id="Brand" />
            </div>
          </div>
          <div className="flex-1 min-w-[500px] my-3">
            <div className="bg-slate-100 p-4 font-bold text-slate-600/80 text-xl">
              Price Details
            </div>
            <div className="flex">
              <div className="bg-white p-3 flex-1">
                <label
                  className="text-slate-600/80 font-bold"
                  htmlFor="BuyingPrice"
                >
                  Buying price <span className="text-red-500 text-lg"></span>
                </label>
                <Input id="BuyingPrice" />
              </div>
              <div className="bg-white p-3 flex-1">
                <label
                  className="text-slate-600/80 font-bold"
                  htmlFor="SellingPrice"
                >
                  Selling Price <span className="text-red-500 text-lg">*</span>
                </label>
                <Input id="SellingPrice" />
              </div>
              <div className="bg-white p-3 flex-1">
                <label
                  className="text-slate-600/80 font-bold"
                  htmlFor="DealerPrice"
                >
                  Dealer Price <span className="text-red-500 text-lg">*</span>
                </label>
                <Input id="DealerPrice" />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
