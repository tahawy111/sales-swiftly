import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
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
            <Button className="" variant={"skyOutline"}>
              <ChevronLeft />
            </Button>
          </Link>
          <Link href={`/dashboard/products`}>
            <Button className="" variant={"skyOutline"}>
              <ChevronLeft />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
