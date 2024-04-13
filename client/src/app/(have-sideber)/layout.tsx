import Sidebar from "@/components/Sidebar";
import { AuthContextProvider } from "@/context/Auth";
export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthContextProvider>
      <div className="flex flex-row">
        <Sidebar></Sidebar>

        {children}
      </div>
    </AuthContextProvider>
  );
}
