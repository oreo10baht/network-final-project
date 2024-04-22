"use client";
import Sidebar from "@/components/Sidebar";
import { useMyMiddleware } from "@/hooks/useMyMiddleware";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { useAuthContext } from "@/context/Auth";
import { updateStatus } from "@/services/updateStatus";
const socket = io(`${process.env.backend}`);

export default function Layout({ children }: { children: React.ReactNode }) {
  // useMyMiddleware();
  const { user } = useAuthContext();
  const updateUserStatus = async () => {
    if (user) {
      const res = await updateStatus(user?.username || "", 1);
    }
  };
  useEffect(() => {
    if (user) {
      socket.emit("set-online", user?.username);
      socket.on("set-offline", (data) => {});
      updateUserStatus();
    }
  }, [user]);
  useEffect(() => {
    if (user) {
      window.onbeforeunload = function (e) {
        socket.emit("set-offline", user?.username);
      };
    }
  }, [socket]);
  return (
    <div className="bg-gray-900 flex flex-row ">
      <Sidebar></Sidebar>
      {children}
    </div>
  );
}
