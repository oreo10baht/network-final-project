import { User } from "@/models/User";
import Image from "next/image";

const UserBox = ({ user }: { user: User }) => {
  return (
    <div className="w-full h-16 bg-gray-700 rounded-lg items-center flex p-2">
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
          <p className="text-gray-300">{user.status}</p>
        </div>
      </div>
    </div>
  );
};
0;

export default UserBox;
