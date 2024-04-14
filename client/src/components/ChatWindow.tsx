import React, { useState, useEffect } from "react";
import Image from "next/image";
import { BsPlusCircleFill } from "react-icons/bs";
import { io } from "socket.io-client";
import { getUserbyId } from "@/services/getUserbyId";
import { getChatById } from "@/services/getChatById";
import { getTokenFromCookie } from "@/services/getTokenFromCookie";

interface Message {
  user: string;
  message: string;
  timestamp: number;
  cid: string;
}

const socket = io(`${process.env.backend}`);
const cid = "661bf32263b462f2bd389207";

const ChatWindow = ({ username }: { username: string }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [room, setRoom] = useState("");

  const handleSendMessage = (key: string) => {
    if (key == "Enter" && message != "") {
      const newMessage: Message = {
        user: currentUser,
        message: message,
        timestamp: Date.now(),
        cid: cid,
      };
      socket.emit("send-message", newMessage);
      setMessage("");
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      console.log(newMessage);
    }
  };

  const fetchChat = async () => {
    try {
      const cookie = await getTokenFromCookie();
      console.log(cookie);
      const chat = await getChatById(cid);
      const u1 = await getUserbyId(chat.members[0]);
      const u2 = await getUserbyId(chat.members[1]);
      setRoom(cid);
      setCurrentUser(u1.user_id);
      console.log(u1);
      console.log(u2);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchChat();
    socket.emit("join-room", cid);
  }, []);
  useEffect(() => {
    socket.on("receive-message", (message: Message) => {
      messages.push(message);
      setMessages([...messages]);
      console.log("message:", message);
    });

    return () => {
      socket.off("receive-message");
    };
  }, [socket]);

  return (
    <div className="w-full relative">
      <div className="content-list bg-gray-700 mb-20 flex flex-col flex-grow w-full h-full overflow-y-auto"></div>
      <BottomBar
        setMessage={setMessage}
        handleSend={handleSendMessage}
        message={message}
      />
    </div>
  );
};

const BottomBar = ({
  setMessage,
  handleSend,
  message,
}: {
  setMessage: Function;
  handleSend: Function;
  message: string;
}) => (
  <div
    className="flex flex-row items-center justify-between 
        
         fixed bottom-6 left-20 right-14
        rounded-lg shadow-lg
        bg-gray-600 dark:bg-gray-600 px-2
        h-12"
  >
    <PlusIcon />
    <input
      type="text"
      placeholder="Enter message..."
      className="font-semibold w-full
            bg-transparent outline-none 
            ml-0 mr-auto
            text-gray-400  dark:text-gray-400 placeholder-gray-400
            cursor-text"
      value={message}
      // onSubmit={(e) => {
      //   e.preventDefault();
      //   console.log(e.target.value);
      // }}
      onChange={(e) => {
        setMessage(e.target.value);
      }}
      onKeyDown={(e) => {
        handleSend(e.key);
      }}
    />
  </div>
);

const Message = ({
  name,
  timestamp,
  text,
}: {
  name: string;
  timestamp: string;
  text: string;
}) => {
  const seed = Math.round(Math.random() * 100);
  return (
    <div className="post mt-5">
      <div className="avatar-wrapper flex ml-4 gap-4">
        <Image
          src={`https://picsum.photos/200`}
          alt=""
          width={40}
          height={40}
          className="avatar rounded-full"
        />
        <div className="post-content text-white">
          <p className="post-owner">
            {name}
            <small className="timestamp ml-2 text-gray-400">{timestamp}</small>
          </p>
          <p className="post-text">{text}</p>
        </div>
      </div>
    </div>
  );
};

const PlusIcon = () => (
  <BsPlusCircleFill
    size="22"
    className="text-gray-400 dark:shadow-lg mx-2 dark:text-primary"
  />
);

export default ChatWindow;
