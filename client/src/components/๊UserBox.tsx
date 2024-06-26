"use client";
import { UserMe } from "@/models/User";
import Image from "next/image";

const UserBox = ({
  user,
  children,
}: {
  user: UserMe;
  children: React.ReactNode;
}) => {
  // console.log(user);
  return (
    <div className="h-16 bg-gray-700 rounded-lg  border-gray-500 border-2 flex p-2 hover:bg-gray-500">
      <div className="flex flex-row justify-between items-center w-full">
        <div className="flex flex-row items-center gap-2">
          <div className="size-12 relative flex items-center">
            <Image
              // src={user.profileImg}
              src="/hamtaro.png"
              fill={true}
              // width={18}
              // height={18}
              alt="profile-pic"
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col ">
            <h2 className="font-medium text-white">{user.username}</h2>
            <p className="text-gray-300">{user.display_name}</p>
          </div>
          <div className="text-white">{user.status ? "online" : "offline"}</div>
        </div>
        {children}
      </div>
    </div>
  );
};
export default UserBox;
