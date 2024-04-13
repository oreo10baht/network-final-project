"use client";

import Sidebar from "@/components/Sidebar";
import { useAuthContext } from "@/context/Auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getMe } from "@/services/getMe";

export default function layout({ children }: { children: React.ReactNode }) {
  const { token, user, setUser } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    const getCurrentUser = async () => {
      if (token === null) {
        router.push("/login");
      } else {
        const res = await getMe(token);
        if (res) {
          setUser(res);
          console.log(res);
        } else {
          router.push("/login");
        }
      }
    };
    getCurrentUser();
    console.log(user);
  }, []);
  return (
    <div className="flex flex-row">
      <Sidebar></Sidebar>

      {children}
    </div>
  );
}
