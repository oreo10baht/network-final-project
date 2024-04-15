"use client";
import { useAuthContext } from "@/context/Auth";
import { UserMe } from "@/models/User";
import { removeFriend } from "@/services/Friend";
import { getMe } from "@/services/getMe";
import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
import { useState } from "react";
import ChatBtn from "./ChatBtn";

const RemoveFriendBtn = ({ recipientName }: { recipientName: string }) => {
  const { user, token ,setUser} = useAuthContext();
  const [removed, setremoved] = useState<boolean>(false);

  const removefriend = async (e: any) => {
    e.preventDefault();
    const res = await removeFriend(user!.username, recipientName);
    if (res) {
      setremoved(true);
      console.log(res, "friend removed");
      const currentUser: UserMe = await getMe(token.current);
      if (currentUser) {
        setUser(currentUser)
      }
    }
  };

  return (
    <div className="flex flex-row gap-4">
      <ChatBtn friendUsername={recipientName}></ChatBtn>
      <button
        className="rounded-full bg-gray-600 p-1 size-8 flex justify-center items-center"
        onClick={removefriend}
      >
        {removed ? (
          <CheckIcon className="size-32 text-gray-400" />
        ) : (
          <Cross2Icon className="size-32 text-gray-400" />
        )}
      </button>
    </div>
  );
};

export default RemoveFriendBtn;
