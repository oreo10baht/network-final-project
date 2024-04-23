"use client";
import { useRouter } from "next/navigation";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import {
  createChat,
  getChatbyChatId,
  getChats,
  getDirectChatByUsername,
} from "@/services/Chats";
import { useAuthContext } from "@/context/Auth";
import { CreateChat } from "@/models/Chat";
const ChatBtn = ({ friendUsername }: { friendUsername: string }) => {
  const { user } = useAuthContext();
  const router = useRouter();
  const handleChat = async () => {
    if (user) {
      console.log(friendUsername, user.username);
      const chat = await getDirectChatByUsername(
        friendUsername,
        user?.username
      );
      console.log(chat, "1");
      if (chat === undefined) {
        const chatData: CreateChat = {
          owner: user.username,
          firstUsername: user.username,
          secondUsername: friendUsername,
          type: "PRIVATE",
          members: [user.username, friendUsername],
        };
        console.log(chatData);

        const newChat = await createChat(chatData);
        console.log(newChat, "2");

        if (newChat) {
          router.push("/direct/" + newChat._id);
        } else {
          console.log("cant create chat");
        }
      } else {
        router.push("/direct/" + chat._id);
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
