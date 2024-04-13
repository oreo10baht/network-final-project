
import Sidebar from "@/components/Sidebar";
export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row">
      <Sidebar></Sidebar>

      {children}
    </div>
  );
}
