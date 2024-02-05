import { Button } from "@/components/ui/button";
import { ChevronLeft, Save, X } from "lucide-react";
import Link from "next/link";

interface AddProductPageProps {}

export default function AddProductPage({}: AddProductPageProps) {
  return (
    <div className="">
      <div className="w-full h-14 bg-slate-200 dark:bg-slate-800/20 border-b border-b-slate-300 shadow dark:border-b-slate-800/90 flex items-center justify-between px-2">
        <Link href={`/dashboard/products`}>
          <Button className="" variant={"skyOutline"}>
            <ChevronLeft />
          </Button>
        </Link>
        <div className="flex gap-x-2">
          <Link href={`/dashboard/products`}>
            <Button className="flex gap-x-3" variant={"silver"}>
              <X />
              <span>Cancel</span>
            </Button>
          </Link>
          <Link href={`/dashboard/products`}>
            <Button className="flex gap-x-3" variant={"success"}>
              <Save />
              <span>Save</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
