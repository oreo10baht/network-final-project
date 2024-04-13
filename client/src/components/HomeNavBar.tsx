"use client";
import { useRouter } from "next/navigation";

const HomeNavBar = () => {
  const router = useRouter();
  return (
    <div className="flex flex-row w-full h-14 bg-gray-700 justify-around items-center border-b-gray-950 border-b-2">
      <div
        className="text-gray-400 font-medium rounded-lg px-2 py-1  hover:bg-gray-500 "
        onClick={() => router.push("/home/all")}
      >
        All
      </div>
      <div
        className="text-gray-400 font-medium rounded-lg px-2 py-1 hover:bg-gray-500 "
        onClick={() => router.push("/home/online")}
      >
        Online
      </div>
      <div
        className="text-gray-400 font-medium rounded-lg px-2 py-1 hover:bg-gray-500 "
        onClick={() => router.push("/home/pending")}
      >
        Pending
      </div>
    </div>
  );
};

export default HomeNavBar;
