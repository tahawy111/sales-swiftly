"use client";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ModeToggle } from "@/components/mode-toggle";

import NavigationItem from "@/components/navigation/navigation-item";
import UserButton from "@/components/user-button";
import LogoutButton from "../logout-button";
import { useState } from "react";
import {
  Bug,
  FileQuestion,
  Home,
  Info,
  List,
  Package,
  Phone,
  Settings,
  User,
} from "lucide-react";
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
        },
        {
          title: "About",
          Icon: Info,
          path: "/about",
        },
        {
          title: "Contact",
          Icon: Phone,
          children: [
            {
              title: "Facebook",
            },
            {
              title: "Twitter",
            },
            {
              title: "Instagram",
            },
          ],
        },
        {
          title: "FAQ",
          Icon: FileQuestion,
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
        {
          title: "Forgot Password",
          path: "/forgot-password",
        },
        {
          title: "Reset Password",
          path: "/reset-password",
        },
      ],
    },
    {
      title: "Profile",
      Icon: User,
      children: [
        {
          title: "Profile",
          path: "/profile",
        },
        {
          title: "Settings",
          children: [
            {
              title: "Account",
              path: "/settings/account",
            },
            {
              title: "Billing",
              children: [
                {
                  title: "Payment",
                  path: "/settings/billing/payment",
                },
                {
                  title: "Subscription",
                  path: "/settings/billing/subscription",
                },
              ],
            },
            {
              title: "Notifications",
              path: "/settings/notifications",
            },
          ],
        },
        {
          title: "Logout",
          path: "/logout",
        },
      ],
    },
    {
      title: "Advance",
      Icon: List,
      children: [
        {
          title: "Search",
          path: "/search",
        },
        {
          title: "History",
          path: "/history",
        },
      ],
    },
    {
      title: "Support",
      Icon: FileQuestion,
      path: "/support",
    },
    {
      title: "Report Bug",
      Icon: Bug,
      path: "/report-bug",
    },
  ];

  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1e1f22] bg-white py-3">
      <div className="text-3xl font-semibold text-center my-3 flex justify-evenly items-center text-neutral-700/80 dark:text-neutral-100">
        <Link href={`/dashboard`}>Sales-Swiftly</Link>
      </div>
      <ScrollArea className="flex-1 w-full">
        <hr />
        {sidebar.map((item: any, index: number) => (
          <NavigationItem key={index} item={item} />
        ))}
      </ScrollArea>

      <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-44 mx-auto" />

      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
        <UserButton />
        <ModeToggle />
        <LogoutButton />
      </div>
    </div>
  );
}
