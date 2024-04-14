"use client";
import { useAuthContext } from "@/context/Auth";
import { addFriend } from "@/services/addFriend";
import { PlusIcon, CheckIcon } from "@radix-ui/react-icons";
import { useState } from "react";
const AddFriendBtn = ({ recipientName }: { recipientName: string }) => {
  const { user } = useAuthContext();
  const [added, setAdded] = useState<boolean>(false);

  const addfriend = async (e: any) => {
    e.preventDefault();
    const res = await addFriend(user!.username, recipientName);
    if (res) {
      setAdded(true);
      console.log(res);
    }
  };
  return (
    <div>
      <button
        className="rounded-full bg-gray-600 p-1 size-8 flex justify-center items-center"
        onClick={addfriend}
      >
        {added ? <CheckIcon className="size-32 text-gray-400" /> : <PlusIcon className="size-32 text-gray-400"/>}
      </button>
    </div>
  );
};

export default AddFriendBtn;
