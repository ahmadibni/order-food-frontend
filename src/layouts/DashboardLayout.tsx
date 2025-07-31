import DashboardSidebar from "@/components/DashboardSidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router";

const DashboardLayout = () => {
  return (
    <SidebarProvider className="bg-gray-100">
      <DashboardSidebar />
      <SidebarInset>
        <main className="w-full p-2.5">
          <SidebarTrigger className="hover:bg-gray-200" />
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
