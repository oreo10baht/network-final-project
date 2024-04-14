"use client";
import ChatWindow from "@/components/ChatWindow";
import DirectNavBar from "@/components/DirectNavBar";
import { getUserbyId } from "@/services/getUserbyId";
import { getUserbyUsername } from "@/services/getUserbyUsername";
import React, { useState } from "react";

export default function DirectMessage({ params }: { params: { id: string } }) {
  console.log(params.id);
  const a = getUserbyUsername(params.id);
  console.log(a);
  return (
    <>
      <DirectNavBar username={params.id} />
      <ChatWindow username={params.id} />
    </>
  );
}
