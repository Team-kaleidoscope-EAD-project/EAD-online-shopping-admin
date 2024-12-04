"use client";
import { User } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getUserInfoFromToken } from "@/lib/getUserInformationFromToken";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    try {
      const user = getUserInfoFromToken();
      setUserInfo(user);
    } catch (error) {
      console.error("Failed to fetch user info", error);
    }
  }, []);

  if (!userInfo) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Welcome</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">{userInfo.username}</div>
            <Badge>Admin</Badge>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
