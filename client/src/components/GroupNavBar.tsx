"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

const GroupNavBar = ({ name }: { name: string | undefined }) => {
  const router = useRouter();

  if (name === undefined) {
    name = "Group Chat";
  }

  return (
    <div className="fixed top-0 flex flex-row w-full h-14 bg-gray-700 gap-4 items-center border-b-gray-950 border-b-2 z-10">
      <div className="text-gray-400 font-medium rounded-lg ml-4">#</div>
      <div className="text-gray-400 font-medium rounded-lg ">{name}</div>
    </div>
  );
};

export default GroupNavBar;
