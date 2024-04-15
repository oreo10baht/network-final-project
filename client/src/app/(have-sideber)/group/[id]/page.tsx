"use client";
import ChatWindow from "@/components/ChatWindow";
import GroupNavBar from "@/components/GroupNavBar";
import { Chat } from "@/models/Chat";
import { getChatbyChatId } from "@/services/Chats";
import { getChatById } from "@/services/getChatById";
import { getUserbyUsername } from "@/services/getUserbyUsername";
import { get } from "http";
import { useState, useEffect } from "react";
export default function GroupChat({ params }: { params: { id: string } }) {
  const [chat, setChat] = useState<Chat>();

  useEffect(() => {
    const fetchChat = async () => {
      const chat = await getChatbyChatId(params.id);
      if (chat) {
        setChat(chat);
      }
    };
    fetchChat();
  }, [params.id]);

  return (
    <>
      <GroupNavBar name={chat?.name} />
      <ChatWindow username={params.id} cid={params.id} />
    </>
  );
}
