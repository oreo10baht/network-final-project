"use client";
import ChatWindow from "@/components/ChatWindow";
import GroupNavBar from "@/components/GroupNavBar";
import { getUserbyUsername } from "@/services/getUserbyUsername";
import React, { useState } from "react";

export default function GroupChat({ params }: { params: { id: string } }) {
  // params.id is the chatid
  // const name = getChat(params.id);
  const name = "Chat Name";
  return (
    <>
      <GroupNavBar name={name} />
      <ChatWindow username={params.id} />
    </>
  );
}
