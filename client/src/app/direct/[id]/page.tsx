"use client";
import ChatWindow from "@/components/ChatWindow";
import React, { useState } from "react";

export default function DirectMessage({ params }: { params: { id: string } }) {
  return (
    <>
      <ChatWindow />
    </>
  );
}
