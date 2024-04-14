"use client";
import { io } from "socket.io-client";
import React, { useEffect, useState } from "react";
const socket = io(`${process.env.backend}`);
function index() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  const sendMessage = () => {
    socket.emit("send", message);
    setMessage("");
  };
  useEffect(() => {
    socket.on("message", (message: string) => {
      messages.push(message);
      setMessages([...messages]);
      console.log(messages);
    });
    return () => {
      socket.off("message");
    };
  }, [socket]);
  return (
    <div className=" text-white bg-black h-full absolute w-full">
      <div>
        <label htmlFor="username" className="small-text">
          Message
        </label>
        <input
          id="message"
          type="text"
          name="username"
          className="flex rounded-lg p-1 text-black"
          placeholder="text"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        ></input>
      </div>
      <button
        onClick={sendMessage}
        className="p-3 rounded-lg bg-white text-black"
      >
        send
      </button>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
    </div>
  );
}
export default index;
