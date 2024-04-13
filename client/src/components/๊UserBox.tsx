import { User } from "@/models/User";
import Image from "next/image";

const UserBox = ({ user }: { user: User }) => {
  return <div className="w-full h-20 bg-gray-700">

    <div className="flex flex-row">
        <div className="size-18 rounded-lg">
            <Image 
            // src={user.profileImg}
            src="./hamtaro.png"
            fill={true}
            alt="profile-pic"
            />
        </div>
        <div className="flex flex-col">
            <h2>{user.username}</h2>
            <p>{user.status}</p>
        </div>
    </div>
  </div>;
};0

export default UserBox;
