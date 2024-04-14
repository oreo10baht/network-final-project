"use client";
import { useRouter } from "next/navigation";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
const ChatBtn = ({ path }: { path: string }) => {
  const router = useRouter();
  return (
    <div>
      <button
        className="rounded-full bg-gray-600 p-1 size-8 flex justify-center items-center"
        onClick={() => router.push("/direct/" + path)}
      >
        <ChatBubbleIcon className="size-32 text-gray-400" />
      </button>
    </div>
  );
};

export default ChatBtn;
