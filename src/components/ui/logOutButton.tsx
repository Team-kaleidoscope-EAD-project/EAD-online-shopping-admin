"use client"; // Mark this component as client-side

import React from "react";

import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { logoutUser } from "@/lib/api/auth";

export default function LogoutButton() {
  return (
    <DropdownMenuItem
      onClick={logoutUser}
      style={{
        padding: "6px 8px",
        fontSize: "14px",

        cursor: "default",
      }}
    >
      Logout
    </DropdownMenuItem>
  );
}
