"use client";
import { useAuthContext } from "@/context/Auth";
import { UserMe } from "@/models/User";
import { acceptFriend } from "@/services/Friend";
import { getMe } from "@/services/getMe";
import { PlusIcon, CheckIcon } from "@radix-ui/react-icons";
import { useState } from "react";

const AcceptFriendBtn = ({ recipientName }: { recipientName: string }) => {
  const { user ,token} = useAuthContext();
  const [accepted, setaccepted] = useState<boolean>(false);

  const acceptfriend = async (e: any) => {
    e.preventDefault();
    const res = await acceptFriend(user.current!.username, recipientName);
    if (res) {
      setaccepted(true);
      console.log(res);
      const currentUser:UserMe = await getMe(token.current)
      if(currentUser){
        user.current = currentUser
      }
    }
  };
  return (
    <div>
      <button
        className="rounded-full bg-gray-600 p-1 size-8 flex justify-center items-center"
        onClick={acceptfriend}
      >
        {accepted ? (
          <CheckIcon className="size-32 text-gray-400" />
        ) : (
          <PlusIcon className="size-32 text-gray-400" />
        )}
      </button>
    </div>
  );
};

export default AcceptFriendBtn;
