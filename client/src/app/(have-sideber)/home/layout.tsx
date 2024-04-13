import HomeNavBar from "@/components/HomeNavBar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-screen">
      <HomeNavBar></HomeNavBar>
      {children}
    </div>
  );
}
