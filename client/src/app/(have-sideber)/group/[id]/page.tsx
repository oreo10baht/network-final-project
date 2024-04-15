"use client";
import ChatWindow from "@/components/ChatWindow";
import GroupNavBar from "@/components/GroupNavBar";
import { Chat } from "@/models/Chat";
import { getChatbyChatId } from "@/services/Chats";
import { getChatById } from "@/services/getChatById";
import { useMyMiddleware } from "@/hooks/useMyMiddleware";

import { getUserbyUsername } from "@/services/getUserbyUsername";
import { get } from "http";
import { useState, useEffect } from "react";
import { useAuthContext } from "@/context/Auth";

export default function GroupChat({ params }: { params: { id: string } }) {
  const { user } = useAuthContext();
  const [chat, setChat] = useState<Chat>();
  useMyMiddleware();

  useEffect(() => {
    const fetchChat = async () => {
      const chat = await getChatbyChatId(params.id);
      if (chat) {
        setChat(chat);
      }
    };
    fetchChat();
  }, []);
  return (
    <>
      <GroupNavBar name={chat?.name} />
      {chat && user && chat?.members?.includes(user?.user_id) ? (
        <>
          <ChatWindow username={user?.user_id || ""} cid={chat?._id} />
        </>
      ) : (
        <div className="relative flex items-center h-full w-full justify-center text-white text-lg">
          You don't have access to this group!
        </div>
      )}
    </>
  );
}
