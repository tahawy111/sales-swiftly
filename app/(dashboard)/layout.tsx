import NavigationSidebar from "@/components/navigation/navigation-sidebar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({children}: DashboardLayoutProps) {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect("/login");
  }

  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-[250px] z-30 flex-col fixed inset-y-0">
        <NavigationSidebar />
      </div>
      <main className="md:pl-[250px] h-full">{children}</main>
    </div>
  );
}
