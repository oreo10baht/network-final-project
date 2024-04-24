"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useAuthContext } from "@/context/Auth";
import { Chat } from "@/models/Chat";
import { getChatbyChatId } from "@/services/Chats";
import AddMemberToGroup from "../AddMemberToGroup";

const GroupNavBar = ({
  name,
  chatId,
}: {
  name: string | undefined;
  chatId: string;
}) => {
  const router = useRouter();
  const { user } = useAuthContext();
  const [chat, setChat] = useState<Chat>();
  const [isOwner, setIsOwner] = useState(true);
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    const fetchChat = async () => {
      const chat = await getChatbyChatId(chatId);
      if (chat) {
        setChat(chat);
      }
      if (chat?.owner !== user?.user_id) {
        setIsOwner(false);
      }
      console.log(chat);
      console.log(user);
    };
    fetchChat();
  }, []);

  if (name === undefined) {
    name = "Group Chat";
  }

  return (
    <div className="sticky top-0 flex flex-row w-full h-14 bg-gray-700 gap-4 items-center border-b-gray-950 border-b-2 z-10 justify-between">
      <div className="flex flex-row gap-4">
        <div className="text-gray-400 font-medium rounded-lg ml-4">#</div>
        <div className="text-gray-400 font-medium rounded-lg">{name}</div>
      </div>
      {isOwner && (
        <div>
          <button
            className="bg-[#5865f2] p-2 rounded-lg text-gray-400 font-medium mr-8 hover:bg-[#4752C4]"
            onClick={() => {
              setIsShown(true);
            }}
          >
            Add member
          </button>
        </div>
      )}
      {isShown && (
        <AddMemberToGroup chatId={chat?._id} setIsShown={setIsShown} />
      )}
    </div>
  );
};

export default GroupNavBar;
