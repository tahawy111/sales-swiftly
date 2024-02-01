"use client";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import ActionTooltip from "./action-tooltip";

interface LogoutButtonProps {}

export default function LogoutButton({}: LogoutButtonProps) {
  const logout = () => {
    signOut().then(() => {
      return redirect("/login");
    });
  };

  return (
    <Button className="flex gap-3" onClick={logout} variant={"ghost"}>
      <LogOut className="w-4 h-4" /> <p>Logout</p>
    </Button>
  );
}
