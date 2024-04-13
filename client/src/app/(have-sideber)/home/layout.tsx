import HomeNavBar from "@/components/HomeNavBar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-screen bg-gray-500">
      <HomeNavBar></HomeNavBar>
      {children}
    </div>
  );
}
