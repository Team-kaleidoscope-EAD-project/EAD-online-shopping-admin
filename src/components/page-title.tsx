"use client";

import React, { ReactNode } from "react";

import { usePathname } from "next/navigation";

export const PageTitle = () => {
  const paths = usePathname();
  const pathName = paths.split("/").pop();

  return (
    <div className="flex items-center">
      <h1 className="text-lg font-semibold md:text-2xl capitalize">
        {pathName}
      </h1>
    </div>
  );
};
