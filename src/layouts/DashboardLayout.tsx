import DashboardSidebar from "@/components/DashboardSidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, Settings, SunMoon, UserRound } from "lucide-react";
import { Link, Outlet } from "react-router";

const DashboardLayout = () => {
  return (
    <SidebarProvider className="bg-gray-100">
      <DashboardSidebar />

      <main className="w-full">
        <div className="flex justify-between p-4 bg-white rounded-3xl my-2 me-2 shadow-sm items-center">
          <SidebarTrigger className="hover:bg-gray-200" />
          <div className="flex items-center space-x-3">
            <SunMoon />
            <Bell className="size-5" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback>
                    <UserRound className="size-5" />
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48" align="end">
                <DropdownMenuItem asChild>
                  <Link to="#">
                    <UserRound />
                    <p>Profile</p>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="#">
                    <Settings />
                    <p>Settings</p>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div>
              <h1 className="text-slate-800 font-semibold text-sm">
                Hello, <span>Ibni</span>
              </h1>
            </div>
          </div>
        </div>
        <div className="bg-white mb-2 rounded-3xl shadow-md">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
