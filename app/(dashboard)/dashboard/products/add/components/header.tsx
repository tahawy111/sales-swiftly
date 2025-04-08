import { Button } from "@/components/ui/button";
import { ChevronLeft, Save, X } from "lucide-react";
import Link from "next/link";

interface AddProductHeaderProps {}

export default function AddProductHeader({}: AddProductHeaderProps) {
  return (
    <div className="w-full h-14 border-b bg-gray-100 dark:bg-gray-800 shadow dark:border-b-gray-700 flex items-center justify-between px-2 text-gray-800 dark:text-gray-100">
      <Link href={`/dashboard/products`}>
        <Button className="text-gray-800 dark:text-gray-100 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">
          <ChevronLeft />
        </Button>
      </Link>
      <div className="flex gap-x-2">
        <Link href={`/dashboard/products`}>
          <Button className="flex gap-x-3 text-gray-800 dark:text-gray-100 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">
            <X />
            <span>Cancel</span>
          </Button>
        </Link>
        <Link href={`/dashboard/products`}>
          <Button className="flex gap-x-3 text-gray-100 bg-green-500 dark:bg-green-600 hover:bg-green-400 dark:hover:bg-green-500">
            <Save />
            <span>Save</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
