import React, { useState } from "react";
import { BsPlusCircleFill } from "react-icons/bs";

interface Message {
  user: string;
  message: string;
  timestamp: number;
}

const ChatWindow = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = (message: string) => {
    // TODO: Implement sending message
    // For now, we just add it to our local state
    const newMessage: Message = {
      user: "Current User",
      message,
      timestamp: Date.now(),
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  return (
    <div>
      <BottomBar />
      {messages.map((message, index) => (
        <div key={index}>
          <p>{message.user}</p>
          <p>{message.message}</p>
          <p>{new Date(message.timestamp).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

const BottomBar = () => (
  <div
    className="flex flex-row items-center justify-between 
    fixed left-88 right-8 bottom-2 
    rounded-lg shadow-lg 
    bg-gray-400 dark:bg-gray-600 px-2
    h-12;"
  >
    <PlusIcon />
    <input
      type="text"
      placeholder="Enter message..."
      className="font-semibold w-full
    bg-transparent outline-none 
    ml-0 mr-auto
    text-gray-500  dark:text-gray-400 placeholder-gray-500
    cursor-text"
    />
  </div>
);

const PlusIcon = () => (
  <BsPlusCircleFill
    size="22"
    className="text-gray-400 dark:shadow-lg mx-2 dark:text-primary"
  />
);

export default ChatWindow;
