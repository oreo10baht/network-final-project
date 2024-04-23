"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useAuthContext } from "@/context/Auth";
import { Chat } from "@/models/Chat";
import { getChatbyChatId } from "@/services/Chats";
import { truncate } from "fs";

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
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const fetchChat = async () => {
      const chat = await getChatbyChatId(chatId);
      if (chat) {
        setChat(chat);
        console.log(user?.username);
        console.log(chat);
        if (chat.owner === user?.user_id) {
          setIsOwner(true);
        }
      }
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
            className="bg-[#5865f2] p-2 rounded-lg text-gray-400 font-medium mr-32 hover:bg-[#4752C4]"
            onClick={() => {
              console.log(isOwner);
            }}
          >
            Add member
          </button>
        </div>
      )}
    </div>
  );
};

export default GroupNavBar;
