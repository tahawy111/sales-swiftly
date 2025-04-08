"use client";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ModeToggle } from "@/components/mode-toggle";

import NavigationItem from "@/components/navigation/navigation-item";
import UserButton from "@/components/user-button";
import LogoutButton from "../logout-button";
import { useState } from "react";
import { FileQuestion, Info, Package } from "lucide-react";
import { Icons } from "../Icons";
import Link from "next/link";

export default function NavigationSidebar() {
  const sidebar = [
    {
      title: "Inventory",
      Icon: Package,
      children: [
        {
          title: "Products & Services",
          Icon: Icons.Products,
          path: "/dashboard/products",
          children: [
            {
              title: "Add Product",
              path: "/dashboard/products/add",
            },
            {
              title: "View Products",
              path: "/dashboard/products/view",
            },
          ],
        },
        {
          title: "About",
          Icon: Info,
          path: "/about",
        },
      ],
    },
    {
      title: "Account",
      Icon: Info,
      children: [
        {
          title: "Login",
          path: "/login",
        },
        {
          title: "Register",
          path: "/register",
        },
      ],
    },
    {
      title: "Support",
      Icon: FileQuestion,
      path: "/support",
    },
  ];

  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="space-y-4 flex flex-col items-center h-full w-full bg-gray-50 dark:bg-gray-800 text-blue-900 dark:text-gray-100 py-3">
      <div className="text-3xl font-semibold text-center my-3">
        <Link href={`/dashboard`} className="hover:underline">
          <span className="text-gray-700 dark:text-gray-200">
            Sales-Swiftly
          </span>
        </Link>
      </div>
      <ScrollArea className="flex-1 w-full">
        <hr className="border-blue-300 dark:border-gray-600" />
        {sidebar.map((item, index) => (
          <NavigationItem key={index} item={item} />
        ))}
      </ScrollArea>
      <Separator className="h-[2px] bg-blue-300 dark:bg-gray-600 rounded-md w-44 mx-auto" />
      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
        <UserButton />
        <ModeToggle />
        <LogoutButton />
      </div>
    </div>
  );
}
