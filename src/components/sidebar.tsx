"use client";

import React, { useState } from "react";
import { SideNav } from "@/components/side-nav";
import { NavItems } from "@/constants/side-nav";

import { cn } from "@/lib/utils";
import { Settings, User } from "lucide-react";
import Link from "next/link";
import { NavItem } from "./nav-item";

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
  return (
    <nav
      className={cn(
        `relative flex flex-col h-screen border-r bg-muted/20`,
        className
      )}
    >
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 font-semibold"
        >
          <span className="">Acme Inc</span>
        </Link>
      </div>
      <div className="px-3 py-2">
        <div className="mt-3 space-y-1">
          <SideNav
            className="text-background opacity-0 transition-all duration-300 group-hover:z-50 group-hover:ml-4 group-hover:rounded group-hover:bg-foreground group-hover:p-2 group-hover:opacity-100"
            items={NavItems}
          />
        </div>
      </div>
      <div className="mt-auto p-4">
        <nav className="grid items-start text-sm font-medium gap-2">
          <NavItem href="/dashboard/settings">
            <Settings className="h-4 w-4" />
            Settings
          </NavItem>
          <hr className="my-1" />
          <NavItem href="/dashboard/account">
            <User className="h-4 w-4" />
            Dale Watson
          </NavItem>
        </nav>
      </div>
    </nav>
  );
}
