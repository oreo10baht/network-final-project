"use client";

import { getGroupChats } from "@/services/Chats";
import SidebarIcon from "./SidebarIcon";
import { PlusIcon, HomeIcon } from "@radix-ui/react-icons";
import { useState, useEffect } from "react";
import { GetChat } from "@/models/Chat";

const Sidebar = () => {
  const [groupChats, setGroupChats] = useState<GetChat[]>([] as GetChat[]);
  useEffect(() => {
    const allGroupChat = async () => {
      const gcs = await getGroupChats();
      if (gcs) {
        setGroupChats(gcs);
      }
    };
    allGroupChat();
  });

  return (
    <div className="overflow-auto no-scrollbar h-screen w-16 sticky bg-gray-900 top-0 left-0">
      <div className="  flex flex-col text-white  ">
        <SidebarIcon text="Home" pathOnClicked="/home/all">
          <HomeIcon className="size-6" />
        </SidebarIcon>
        <SidebarIcon text="+" pathOnClicked="/group/create-group">
          <PlusIcon className="size-6" />
        </SidebarIcon>
        <Divider></Divider>

        {groupChats
          ? groupChats.map((groupChat: GetChat) => (
              <SidebarIcon
                text={groupChat.name!}
                pathOnClicked={"/group/" + groupChat.chatId}
              ></SidebarIcon>
            ))
          : null}
      </div>
    </div>
  );
};

const Divider = () => <hr className="sidebar-hr" />;

export default Sidebar;
