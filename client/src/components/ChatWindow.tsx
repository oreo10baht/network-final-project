import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { BsPlusCircleFill } from "react-icons/bs";
import { io } from "socket.io-client";
import { getUserbyId } from "@/services/getUserbyId";
import { getChatById } from "@/services/getChatById";
import { getTokenFromCookie } from "@/services/getTokenFromCookie";
import { getMe } from "@/services/getMe";
import { postMessage, getMessagesByChatId } from "@/services/Messages";
import { Message } from "./Message";

interface Message {
  chatId: string;
  sender: string;
  text: string;
  createdAt: string;
}

const socket = io(`${process.env.backend}`);
const cid = "661bf32263b462f2bd389207";

const ChatWindow = ({ username }: { username: string }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const messageListRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    const messageList = messageListRef.current;
    if (messageList && messageList.lastElementChild) {
      messageList.lastElementChild.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };
  function getCurrentTimestamp() {
    const date = new Date();
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const seconds = String(date.getUTCSeconds()).padStart(2, "0");
    const milliseconds = String(date.getUTCMilliseconds()).padStart(3, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
  }
  const formatTime = (time: string) => {
    const formattedTime = new Date(time);
    const options = {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const formattedDateTime = new Intl.DateTimeFormat("en-US", options).format(
      formattedTime
    );
    return formattedDateTime;
  };

  const handleSendMessage = (key: string) => {
    if (key == "Enter" && message != "") {
      const newMessage: Message = {
        sender: currentUser,
        text: message,
        chatId: cid,
        createdAt: getCurrentTimestamp(),
      };
      socket.emit("send-message", newMessage);
      setMessage("");
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      createMessage(newMessage);
    }
  };

  const createMessage = async (newMessage: Message) => {
    try {
      const response = await postMessage(newMessage);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchChat = async () => {
    try {
      const cookie = await getTokenFromCookie();
      const user = await getMe(cookie || "");
      const messages = await getMessagesByChatId(cid);
      console.log("fetch messages:", messages);
      setMessages(messages);
      setCurrentUser(user.user_id);
      socket.emit("join-room", cid);
      console.log(getCurrentTimestamp());
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchChat();
  }, []);
  useEffect(() => {
    socket.on("receive-message", (message: Message) => {
      console.log("message:", message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    scrollToBottom();

    return () => {
      socket.off("receive-message");
    };
  }, [socket, messages]);

  return (
    <div className="w-full relative mt-12 mb-20">
      <div>
        <div
          ref={messageListRef}
          className="content-list bg-gray-700 flex flex-col flex-grow w-full h-[calc(100% - 50px)] overflow-y-hidden z-0"
        >
          {messages.map((message) => (
            <Message
              key={message.createdAt}
              name={message.sender}
              timestamp={formatTime(message.createdAt)}
              text={message.text}
            />
          ))}
        </div>
        <BottomBar
          setMessage={setMessage}
          handleSend={handleSendMessage}
          message={message}
        />
      </div>
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

const PlusIcon = () => (
  <BsPlusCircleFill
    size="22"
    className="text-gray-400 dark:shadow-lg mx-2 dark:text-primary"
  />
);

export default ChatWindow;
