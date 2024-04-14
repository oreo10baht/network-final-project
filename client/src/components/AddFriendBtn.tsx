"use client";
import { useAuthContext } from "@/context/Auth";
import { addFriend } from "@/services/Friend";
import { PlusIcon, CheckIcon } from "@radix-ui/react-icons";
import { useState } from "react";
const AddFriendBtn = ({ recipientName }: { recipientName: string }) => {
  const { user } = useAuthContext();
  const [added, setAdded] = useState<boolean>(false);

  const addfriend = async (e: any) => {
    e.preventDefault();
    const res = await addFriend(user.current!.username, recipientName);
    if (res) {
      setAdded(true);
      console.log(res);
    }
  };
  return (
    <div>
      <button
        className=" bg-green-700 rounded-md p-1 h-8 w-24 flex justify-center items-center"
        onClick={addfriend}
      >
        {added ? (
          <CheckIcon className="size-32 text-gray-400" />
        ) : (
          // <PlusIcon className="size-8 text-gray-400" />
          <div className="small-text text-gray-100">Add Friend</div>
        )}
      </button>
    </div>
  );
};

export default AddFriendBtn;
