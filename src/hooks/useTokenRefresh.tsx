import { refreshToken } from "@/lib/api/refreshToken";
import { useEffect } from "react";

export function useTokenRefresh() {
  useEffect(() => {
    const interval = setInterval(async () => {
      const expires_at = localStorage.getItem("expires_at");

      if (expires_at && Date.now() > parseInt(expires_at) - 60 * 1000) {
        try {
          await refreshToken();
          console.log("Token refreshed successfully");
        } catch (error) {
          console.error("Failed to refresh token:", error);
        }
      }
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, []);
}
