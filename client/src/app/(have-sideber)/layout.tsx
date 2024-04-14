"use client";
import { useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { useAuthContext } from "@/context/Auth";
import { getMe } from "@/services/getMe";
import { useRouter } from "next/navigation";
export default function layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { token, setUser } = useAuthContext();
  useEffect(() => {
    const getCurrentUser = async () => {
      if(token.current===""){
        router.push("/login")
      }
      const user = await getMe(token.current);
      if (user) {
        console.log(user,"from 2nd layout")
        setUser(user);
      }
      else{
        router.push("/login")
      }
    };
    getCurrentUser();
    
  },[]);
  return (
    <div className="flex flex-row">
      <Sidebar></Sidebar>

      {children}
    </div>
  );
}
