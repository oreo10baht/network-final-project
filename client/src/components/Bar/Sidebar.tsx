"use client";

import { getGroupChats } from "@/services/Chats";
import SidebarIcon from "./SidebarIcon";
import { PlusIcon, HomeIcon, DotFilledIcon } from "@radix-ui/react-icons";
import { useState, useEffect } from "react";
import { GetChat } from "@/models/Chat";
import { useAuthContext } from "@/context/Auth";
import { io } from "socket.io-client";
import { updateStatus } from "@/services/updateStatus";
const socket = io(`${process.env.backend}`);
const Sidebar = () => {
  const { user } = useAuthContext();
  const [groupChats, setGroupChats] = useState<GetChat[]>([] as GetChat[]);
  useEffect(() => {
    const allGroupChat = async () => {
      const gcs = await getGroupChats();
      if (gcs) {
        setGroupChats(gcs);
      }
    };
    const intervalId = setInterval(allGroupChat, 2000);
    return () => clearInterval(intervalId);
  }, []);
  const updateUserStatus = async () => {
    if (user) {
      const res = await updateStatus(user?.username || "", 1);
    }
  };
  useEffect(() => {
    socket.emit("set-online", user?.username);
    socket.on("set-offline", (data) => {});
    updateUserStatus();
  }, [user]);

  window.onbeforeunload = function (e) {
    socket.emit("set-offline", user?.username);
  };

  return (
    <div className="overflow-auto no-scrollbar h-screen w-16 sticky bg-gray-900 top-0 left-0">
      <div className="  flex flex-col text-white  ">
        <SidebarIcon pathOnClicked="/home/all">
          <HomeIcon className="size-6" />
        </SidebarIcon>
        <SidebarIcon pathOnClicked="/group/create-group">
          <PlusIcon className="size-6" />
        </SidebarIcon>
        <Divider></Divider>

        {groupChats
          ? groupChats.map((groupChat: GetChat) => (
              <SidebarIcon
                key={groupChat._id}
                text={groupChat.name!}
                pathOnClicked={"/group/" + groupChat._id}
              >
                {user && groupChat.members.includes(user?.user_id) ? (
                  <DotFilledIcon className="absolute top-0 right-0 size-4 m-0 p-0" />
                ) : null}
              </SidebarIcon>
            ))
          : null}
      </div>
    </div>
  );
};

const Divider = () => <hr className="sidebar-hr" />;

export default Sidebar;
