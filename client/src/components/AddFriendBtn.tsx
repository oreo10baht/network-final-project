"use client";
import { useAuthContext } from "@/context/Auth";
import { UserMe } from "@/models/User";
import { addFriend } from "@/services/Friend";
import { getMe } from "@/services/getMe";
import { useState } from "react";

const AddFriendBtn = ({ recipientName }: { recipientName: string }) => {
  const { user ,token,setUser} = useAuthContext();
  const [added, setAdded] = useState<boolean>(false);

  const addfriend = async (e: any) => {
    e.preventDefault();

    const res = await addFriend(user!.username, recipientName);
    if (res) {
      setAdded(true);
      console.log(res);
      const currentUser:UserMe = await getMe(token.current)
      if(currentUser){
        setUser(currentUser)
      }
    }
  };
  return (
    <div>
      <button
        className=" bg-green-700 rounded-md p-1 h-8 w-24 flex justify-center items-center"
        onClick={addfriend}
      >
        {added ? (
          <div className="small-text text-gray-100">Requested</div>
        ) : (
          // <PlusIcon className="size-8 text-gray-400" />
          <div className="small-text text-gray-100">Add Friend</div>
        )}
      </button>
    </div>
  );
};

export default AddFriendBtn;
