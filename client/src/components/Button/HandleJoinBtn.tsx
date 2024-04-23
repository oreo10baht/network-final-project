"use client";

import { PlusIcon, CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
import { useState } from "react";
import { addMemberToChat, removeReq } from "@/services/Chats";
const HandleJoinBtn = ({
  memberId,
  chatId,
}: {
  memberId: string;
  chatId: string;
}) => {
  const [accepted, setaccepted] = useState<boolean>(false);
  const [canceled, setcanceled] = useState<boolean>(false);

  const addMember = async (e: any) => {
    e.preventDefault();
    const res = await addMemberToChat(memberId, chatId);
    if (res) {
      setaccepted(true);
    }
  };

  const rejectMember = async (e: any) => {
    e.preventDefault();
    const res = await removeReq(memberId, chatId);
    if (res) {
      setcanceled(true);
    }
  };
  return (
    <div className="flex flex-row gap-4">
      <button
        className="rounded-full bg-gray-600 p-1 size-8 flex justify-center items-center"
        onClick={addMember}
      >
        {accepted ? (
          <CheckIcon className="size-32 text-gray-400" />
        ) : (
          <PlusIcon className="size-32 text-gray-400" />
        )}
      </button>

      <button
        className="rounded-full bg-gray-600 p-1 size-8 flex justify-center items-center"
        onClick={addMember}
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

export default HandleJoinBtn;
