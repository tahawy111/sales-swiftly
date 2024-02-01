"use client";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ModeToggle } from "@/components/mode-toggle";

import NavigationAction from "@/components/navigation/navigation-action";
import NavigationItem from "@/components/navigation/navigation-item";
import UserButton from "@/components/user-button";
import LogoutButton from "../logout-button";
import { useState } from "react";
export default function NavigationSidebar() {
  const sidebar = [
    {
      title: "General",
      icon: "fa-solid fa-gear",
      children: [
        {
          title: "Home",
          icon: "fa-solid fa-house",
          path: "/",
        },
        {
          title: "About",
          icon: "fa-solid fa-circle-info",
          path: "/about",
        },
        {
          title: "Contact",
          icon: "fa-solid fa-phone",
          children: [
            {
              title: "Facebook",
              icon: "fa-brands fa-facebook",
            },
            {
              title: "Twitter",
              icon: "fa-brands fa-twitter",
            },
            {
              title: "Instagram",
              icon: "fa-brands fa-instagram",
            },
          ],
        },
        {
          title: "FAQ",
          icon: "fa-solid fa-question",
        },
      ],
    },
    {
      title: "Account",
      icon: "fa-solid fa-circle-info",
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
      icon: "fa-solid fa-circle-user",
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
      icon: "fa-solid fa-list",
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
      icon: "fa-solid fa-question",
      path: "/support",
    },
    {
      title: "Report Bug",
      icon: "fa-solid fa-bug",
      path: "/report-bug",
    },
  ];

  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1e1f22] bg-[#e3e5e8] py-3">
      <ScrollArea className="flex-1 w-full">
        <div className="text-3xl font-bold text-center my-3 flex justify-evenly items-center">
          Sidebar
        </div>
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
