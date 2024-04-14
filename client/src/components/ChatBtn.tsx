"use client";
import { useRouter } from "next/navigation";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import {
  createChat,
  getChatbyChatId,
  getDirectChatByUsername,
} from "@/services/Chats";
import { useAuthContext } from "@/context/Auth";
import { CreateChat } from "@/models/Chat";
const ChatBtn = ({ path }: { path: string }) => {
  const { user } = useAuthContext();
  const router = useRouter();
  const handleChat = async () => {
    if (user.current) {
      const chat = await getDirectChatByUsername(path, user.current?.username);
      console.log(chat, "1");
      if (chat===undefined) {
        const chatData: CreateChat = {
          firstUsername: user.current.username,
          secondUsername: path,
          type: "PRIVATE",
          name:""
        };
        const newChat = await createChat(chatData);
        console.log(newChat, "2");

        if (newChat) {
          router.push("/direct/" + newChat.id);
        }
        console.log("cant create chat");
      } else {
        router.push("/direct/" + chat.id);
      }
    }
  };

  return (
    <div>
      <button
        className="rounded-full bg-gray-600 p-1 size-8 flex justify-center items-center"
        onClick={handleChat}
      >
        <ChatBubbleIcon className="size-32 text-gray-400" />
      </button>
    </div>
  );
};

export default ChatBtn;
