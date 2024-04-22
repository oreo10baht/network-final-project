"use client";
import { useAuthContext } from "@/context/Auth";
import { UserMe } from "@/models/User";
import { acceptFriend } from "@/services/Friend";
import { getMe } from "@/services/getMe";
import { PlusIcon, CheckIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import CancelFriendReqBtn from "./CancelFriendReqBtn";

const AcceptFriendBtn = ({ recipientName }: { recipientName: string }) => {
  const { user, token, setUser } = useAuthContext();
  const [accepted, setaccepted] = useState<boolean>(false);

  const acceptfriend = async (e: any) => {
    e.preventDefault();
    if (user) {
      const res = await acceptFriend(recipientName, user.username);
      if (res) {
        setaccepted(true);
        console.log(res);
        const currentUser: UserMe = await getMe(token.current);
        if (currentUser) {
          setUser(currentUser);
        }
      }
    }
  };
  return (
    <div className="flex flex-row gap-4">
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
      <CancelFriendReqBtn
        requesterName={recipientName}
        recipientName={user!.username}
      />
    </div>
  );
};

export default AcceptFriendBtn;
