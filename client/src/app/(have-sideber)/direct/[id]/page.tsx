"use client";
import ChatWindow from "@/components/ChatWindow";
import DirectNavBar from "@/components/DirectNavBar";
import React, { useState } from "react";

export default function DirectMessage() {
  return (
    <>
      <DirectNavBar />
      <ChatWindow />
    </>
  );
}
