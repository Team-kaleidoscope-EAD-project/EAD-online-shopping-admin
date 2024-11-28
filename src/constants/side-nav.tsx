import { Building, Home, Box } from "lucide-react";
import { type NavItem } from "@/types/nav-item";

export const NavItems: NavItem[] = [
  {
    title: "Dashboard",
    icon: Home,
    href: "/dashboard",
  },
  {
    title: "Vendors",
    icon: Building,
    href: "/vendors",
    isChidren: true,
    children: [
      {
        title: "View All Vendors",
        color: "text-red-500",
        href: "/dashboard/vendors",
      },
      {
        title: "Create New Vendor",
        color: "text-red-500",
        href: "/dashboard/vendors/create",
      },
    ],
  },
  {
    title: "Orders",
    icon: Box,
    href: "/dashboard/orders",
  }
];
