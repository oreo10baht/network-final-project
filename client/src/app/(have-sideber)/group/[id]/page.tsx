"use client";
import ChatWindow from "@/components/ChatWindow";
import GroupNavBar from "@/components/Bar/GroupNavBar";
import { Chat } from "@/models/Chat";
import { getChatbyChatId } from "@/services/Chats";
import { useMyMiddleware } from "@/hooks/useMyMiddleware";
import { useState, useEffect } from "react";
import { useAuthContext } from "@/context/Auth";
import ShowChatMembers from "@/components/ShowChatMembers";

export default function GroupChat({ params }: { params: { id: string } }) {
  const { user } = useAuthContext();
  const [chat, setChat] = useState<Chat>();
  useMyMiddleware();

  useEffect(() => {
    const fetchChat = async () => {
      const chat = await getChatbyChatId(params.id);
      if (chat) {
        setChat(chat);
        console.log(chat,"g c")
      }
    };
    fetchChat();
  }, []);
  return (
    <div className="flex flex-row h-full">
      <div className="w-full">
        <GroupNavBar name={chat?.name} chatId={params.id} />
        {chat && user && chat?.members?.includes(user?.user_id) ? (
          <ChatWindow username={user?.user_id || ""} cid={chat?._id} />
        ) : (
          <div className="relative flex items-center h-full w-full justify-center text-white text-lg">
            You don&apos;t have access to this group!
          </div>
        )}
      </div>

      {chat ? <ShowChatMembers userIds={chat.members} ownerId={chat.owner}/> : null}
    </div>
  );
}
