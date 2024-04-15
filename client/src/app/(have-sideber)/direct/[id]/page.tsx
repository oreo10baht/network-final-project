"use client";
import ChatWindow from "@/components/ChatWindow";
import DirectNavBar from "@/components/DirectNavBar";
import ShowChatMembers from "@/components/ShowChatMembers";
import { useAuthContext } from "@/context/Auth";
import { useMyMiddleware } from "@/hooks/useMyMiddleware";
import { GetChat } from "@/models/Chat";
import { getChatbyChatId } from "@/services/Chats";
import { getUserbyId } from "@/services/getUserbyId";
import { getUserbyUsername } from "@/services/getUserbyUsername";
import { useState, useEffect } from "react";

export default function DirectMessage({ params }: { params: { id: string } }) {
  // console.log(params.id);
  // const a = getUserbyUsername(params.id);
  // console.log(a);
  const [chat, setChat] = useState<GetChat>();
  useMyMiddleware();
  const { user } = useAuthContext();
  useEffect(() => {
    const getChat = async () => {
      const fetchedchat = await getChatbyChatId(params.id);
      console.log(fetchedchat);
      setChat(fetchedchat);
    };
    getChat();
  }, []);
  return (
    <div className="flex flex-row h-full">
      <div className="w-full">
        {user ? <DirectNavBar username={user?.user_id} /> : null}
        {user ? <ChatWindow username={user?.user_id} cid={params.id} /> : null}
      </div>
      {user && chat ? (
        <ShowChatMembers userIds={chat.members}></ShowChatMembers>
      ) : null}
    </div>
  );
}
