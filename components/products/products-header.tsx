import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

interface ProductsHeaderProps {}

export default function ProductsHeader({}: ProductsHeaderProps) {
  return (
    <div className="w-full h-14 bg-white dark:bg-slate-800/20 border-b border-b-slate-300 shadow dark:border-b-slate-800/90">
      <Button className="m-2" variant={"success"}>
        <Link className="flex items-center" href={"/dashboard/products/add"}>
          <span>Add New Product</span> <Plus />
        </Link>
      </Button>
    </div>
  );
}
