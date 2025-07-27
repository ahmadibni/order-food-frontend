import DashboardSidebar from "@/components/DashboardSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="w-full bg-gray-100 p-4">
        <SidebarTrigger className="hover:bg-gray-200" />
        <h1>Halo Admin</h1>
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
