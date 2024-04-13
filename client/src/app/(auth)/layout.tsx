export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-700 flex justify-center items-center w-screen h-screen">

      {children}
    </div>
  );
}
