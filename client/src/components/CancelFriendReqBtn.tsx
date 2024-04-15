"use client";
import { useAuthContext } from "@/context/Auth";
import { UserMe } from "@/models/User";
import { cancelFriend } from "@/services/Friend";
import { getMe } from "@/services/getMe";
import { Cross2Icon, CheckIcon } from "@radix-ui/react-icons";
import { useState } from "react";
const CancelFriendReqBtn = ({requesterName, recipientName }: {requesterName:string, recipientName: string }) => {
  const { user, token, setUser } = useAuthContext();
  const [canceled, setcanceled] = useState<boolean>(false);

  const cancelfriend = async (e: any) => {
    e.preventDefault();
    if (user) {
      const res = await cancelFriend(requesterName, recipientName);
      if (res) {
        setcanceled(true);
        console.log(res);
        const currentUser: UserMe = await getMe(token.current);
        if (currentUser) {
          setUser(currentUser);
        }
      }
    }
  };
  return (
    <div>
      <button
        className="rounded-full bg-gray-600 p-1 size-8 flex justify-center items-center"
        onClick={cancelfriend}
      >
        {canceled ? (
          <CheckIcon className="size-32 text-gray-400" />
        ) : (
          <Cross2Icon className="size-32 text-gray-400" />
        )}
      </button>
    </div>
  );
};

export default CancelFriendReqBtn;
