"use client";

import { useAuth } from "@/hooks/useAuth";
import { useTokenRefresh } from "@/hooks/useTokenRefresh";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  useTokenRefresh();
  const { isLoading } = useAuth();

  if (isLoading)
    return (
      <div
        style={{ backgroundColor: "black", color: "white", height: "100vh" }}
      >
        Loading...
      </div>
    );
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
