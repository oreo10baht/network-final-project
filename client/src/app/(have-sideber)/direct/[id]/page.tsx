"use client";
import ChatWindow from "@/components/ChatWindow";
import DirectNavBar from "@/components/DirectNavBar";
import ShowChatMembers from "@/components/ShowChatMembers";
import { useAuthContext } from "@/context/Auth";
import { useMyMiddleware } from "@/hooks/useMyMiddleware";
import { GetChat } from "@/models/Chat";
import { getChatbyChatId } from "@/services/Chats";
import { useState, useEffect } from "react";

export default function DirectMessage({ params }: { params: { id: string } }) {
  const [chat, setChat] = useState<GetChat>();
  useMyMiddleware();
  const { user } = useAuthContext();
  useEffect(() => {
    const getChat = async () => {
      const fetchedchat = await getChatbyChatId(params.id);
      setChat(fetchedchat);
    };
    getChat();
  }, []);
  return (
    <div className="flex flex-row h-full">
      <div className="w-full">
        {user ? <DirectNavBar username={user?.username} /> : null}
        {user ? <ChatWindow username={user?.user_id} cid={params.id} /> : null}
      </div>
      {user && chat ? (
        <ShowChatMembers userIds={chat.members}></ShowChatMembers>
      ) : null}
    </div>
  );
}
