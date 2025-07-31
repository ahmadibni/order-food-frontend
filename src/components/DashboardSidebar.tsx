import clsx from "clsx";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";
import {
  Gift,
  IdCardLanyard,
  Percent,
  ReceiptText,
  Settings,
  Users,
  Utensils,
} from "lucide-react";
import { useLocation } from "react-router";

const DashboardSidebar = () => {
  const { open } = useSidebar();
  const location = useLocation();

  const group1 = [
    {
      title: "Products",
      url: "/admin/products",
      icon: Utensils,
    },
    {
      title: "Orders",
      url: "/admin/orders",
      icon: ReceiptText,
    },
    {
      title: "Customers",
      url: "#",
      icon: Users,
    },
  ];

  const group2 = [
    {
      title: "Promotions",
      url: "#",
      icon: Gift,
    },
    {
      title: "Tax",
      url: "#",
      icon: Percent,
    },
  ];

  const group3 = [
    {
      title: "Staff Management",
      url: "#",
      icon: IdCardLanyard,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
  ];

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader className="bg-white">
        <h1
          className={clsx(
            "text-2xl font-bold text-orange-500",
            !open && "hidden"
          )}
        >
          Makan<span className="font-extrabold text-red-500">Ki'</span>
        </h1>
        <h1
          className={clsx(
            "text-2xl font-bold text-orange-500 text-center",
            open ? "hidden" : "visible"
          )}
        >
          M
        </h1>
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarGroupLabel>Sales & Orders</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {group1.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === `${item.url}`}
                  >
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Marketing & Finance</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {group2.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === `${item.url}`}
                  >
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Team & Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {group3.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === `${item.url}`}
                  >
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSidebar;
