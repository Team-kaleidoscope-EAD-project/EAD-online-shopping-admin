import { useState, useEffect } from "react";
import { getUserInfoFromToken } from "@/lib/getUserInformationFromToken";

export function useUserInfo() {
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    roles: "",
  });

  useEffect(() => {
    try {
      const user = getUserInfoFromToken();
      setUserInfo(user);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  }, []);

  return userInfo;
}
