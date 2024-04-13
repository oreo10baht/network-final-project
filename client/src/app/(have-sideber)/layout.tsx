"use client"

import Sidebar from "@/components/Sidebar";
import { useAuthContext } from "@/context/Auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  const {user} = useAuthContext()
  const router = useRouter()
  if(user===null){
    router.push("/login")
  }
  // useEffect(()=>[

  // ],[])

  return (
    <div className="flex flex-row">
      <Sidebar></Sidebar>

      {children}
    </div>
  );
}
