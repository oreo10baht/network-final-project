"use client";
import ChatWindow from "@/components/ChatWindow";
import DirectNavBar from "@/components/DirectNavBar";
import { useAuthContext } from "@/context/Auth";
import { useMyMiddleware } from "@/hooks/useMyMiddleware";
import { getChatbyChatId } from "@/services/Chats";
import { getUserbyId } from "@/services/getUserbyId";
import { getUserbyUsername } from "@/services/getUserbyUsername";
import { useState, useEffect } from "react";

export default function DirectMessage({ params }: { params: { id: string } }) {
  // console.log(params.id);
  // const a = getUserbyUsername(params.id);
  // console.log(a);
  useMyMiddleware();
  const { user } = useAuthContext();
  useEffect(() => {
    const getChat = async () => {
      const chat = await getChatbyChatId(params.id);
      console.log(chat)
    };
    getChat()
  }, []);
  return (
    <>
      {user ? <DirectNavBar username={user?.user_id} /> : null}
      {user ? <ChatWindow username={user?.user_id} /> : null}
    </>
  );
}
