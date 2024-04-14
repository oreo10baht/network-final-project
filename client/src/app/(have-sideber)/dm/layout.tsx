import DirectNavBar from "@/components/DirectNavBar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-screen bg-gray-700">
      <DirectNavBar></DirectNavBar>
      {children}
    </div>
  );
}
