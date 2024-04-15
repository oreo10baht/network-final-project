"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

const DirectNavBar = ({ username }: { username: string }) => {
  const router = useRouter();
  return (
    <div className="fixed top-0 flex flex-row w-full h-14 bg-gray-700 gap-4 items-center border-b-gray-950 border-b-2 z-10">
      <div className="text-gray-400 font-medium rounded-lg ml-4 hover:bg-gray-500 ">
        <div>
          <Image
            src="https://picsum.photos/100"
            width={30}
            height={30}
            alt="Picture of the author"
            className="rounded-full"
          />
        </div>
      </div>
      <div className="text-gray-400 font-medium rounded-lg hover:bg-gray-500 ">
        {username}
      </div>
    </div>
  );
};

export default DirectNavBar;
