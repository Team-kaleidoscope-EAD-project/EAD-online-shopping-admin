import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PUBLIC_ROUTES = ["/auth/login", "/auth/register"];

export function useAuth() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentPath = window.location.pathname;

    if (PUBLIC_ROUTES.includes(currentPath)) {
      setIsLoading(false);
      return;
    }

    if (!isAuthenticated()) {
      window.location.href = "/auth/login";
    } else {
      setIsLoading(false);
    }
  }, [router]);

  return { isLoading };
}

export function isAuthenticated() {
  const token = localStorage.getItem("access_token");

  if (!token) return false;

  try {
    const decodedToken = jwt.decode(token);

    // Check if the token is expired
    if (decodedToken && typeof decodedToken === "object" && decodedToken.exp) {
      const currentTime = Math.floor(Date.now() / 1000);
      return decodedToken.exp > currentTime;
    }

    return false;
  } catch (error) {
    console.error("Invalid token:", error);
    return false;
  }
}
