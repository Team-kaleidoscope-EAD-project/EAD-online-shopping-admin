"use client";
import Link from "next/link";
import { CircleUser, Home, LineChart, Menu, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeMode } from "@/components/theme-mode";
import BreadcrumbCustom from "@/components/breadcrumb-custom";
import Sidebar from "@/components/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PageTitle } from "@/components/page-title";
import LogoutButton from "@/components/ui/logOutButton";
import { getUserInfoFromToken } from "@/lib/getUserInformationFromToken";
import { useUserInfo } from "@/lib/userInfo";

// export const metadata: Metadata = {
//   title: "Kalei clothing shop",
//   description: "Generated by create next app",
// };

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userData = useUserInfo();

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Users className="h-5 w-5" />
                  Customers
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <LineChart className="h-5 w-5" />
                  Analytics
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1"></div>
          {/* <div>
            <ThemeMode />
          </div> */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {userData.username}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {userData.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {/* <Link href="/dashboard/account">
                <DropdownMenuItem>Account</DropdownMenuItem>
              </Link> */}
              <DropdownMenuSeparator />
              <Link href="#">
                <LogoutButton />
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="p-8">
          <div className="pb-5">
            <BreadcrumbCustom
              separator={<span> / </span>}
              activeClasses="dark:text-slate-900 text-slate-900"
              containerClasses="flex gap-2"
              listClasses="dark:text-slate-600 text-slate-400 hover:underline font-medium"
              capitalizeLinks
            />
            <div className="mt-2">
              <PageTitle />
            </div>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
