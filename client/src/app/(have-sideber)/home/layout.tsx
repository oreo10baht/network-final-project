import HomeNavBar from "@/components/Bar/HomeNavBar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-screen bg-gray-700">
      <HomeNavBar></HomeNavBar>
      {children}
    </div>
  );
}
