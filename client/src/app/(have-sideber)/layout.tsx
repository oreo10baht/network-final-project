"use client"

import Sidebar from "@/components/Sidebar";
import { useAuthContext } from "@/context/Auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getMe } from "@/services/getMe";

export default function layout({ children }: { children: React.ReactNode }) {
  // const {user,setUser} = useAuthContext()
  // const router = useRouter()
  // // if(user===null){
  // //   router.push("/login")
  // // }
  // useEffect(()=>{
  //   const getCurrentUser = async ()=>{
  //     const res = await getMe()
  //     if(res){
  //       co
  //       setUser(res)
  //     }

  //   }
  //   getCurrentUser()
  // }

  // ,[])

  return (
    <div className="flex flex-row">
      <Sidebar></Sidebar>

      {children}
    </div>
  );
}
