"use client";
import { useAuthContext } from "@/context/Auth";
import { removeFriend } from "@/services/Friend";
import {  CheckIcon , Cross1Icon } from "@radix-ui/react-icons";
import { useState } from "react";

const RemoveFriendBtn = ({ recipientName }: { recipientName: string }) => {
  const { user } = useAuthContext();
  const [removed, setremoved] = useState<boolean>(false);

  const removefriend = async (e: any) => {
    e.preventDefault();
    const res = await removeFriend(user.current!.username, recipientName);
    if (res) {
      setremoved(true);
      console.log(res);
    }
  };
  return (
    <div>
      <button
        className="rounded-full bg-gray-600 p-1 size-8 flex justify-center items-center"
        onClick={removefriend}
      >
        {removed ? (
          <CheckIcon className="size-32 text-gray-400" />
        ) : (
          <Cross1Icon className="size-32 text-gray-400" />
        )}
      </button>
    </div>
  );
};

export default RemoveFriendBtn;
