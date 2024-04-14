"use client";
import Sidebar from "@/components/Sidebar";
import { useMyMiddleware } from "@/hooks/useMyMiddleware";

export default function layout({ children }: { children: React.ReactNode }) {
  useMyMiddleware();
  return (
    <div className="bg-gray-900 flex flex-row">
      <Sidebar></Sidebar>
      {children}
    </div>
  );
}
