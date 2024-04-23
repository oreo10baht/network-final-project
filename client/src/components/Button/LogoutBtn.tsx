"use client";
import { useAuthContext } from "@/context/Auth";
import { UserMe } from "@/models/User";
import { logout } from "@/services/logout";
import { getMe } from "@/services/getMe";
import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
import { useState } from "react";
import ChatBtn from "./ChatBtn";

const LogoutBtn = () => {
  const { user, token, setUser } = useAuthContext();
  const [removed, setremoved] = useState<boolean>(false);

  const handleLogout = async (e: any) => {
    console.log("logging out");
    e.preventDefault();
    const res = await logout();
    console.log(res, "logging out");
    if (res) {
      setremoved(true);
      console.log(res, "logout");
      const currentUser: UserMe = await getMe(token.current);
      if (currentUser) {
        setUser(currentUser);
      }
    }
  };

  return (
    <div className="flex flex-row gap-4">
      <button onClick={handleLogout}>AAA</button>
      <button
        className="rounded-full bg-gray-600 p-1 size-8 flex justify-center items-center"
        onClick={handleLogout}
      >
        {removed ? (
          <CheckIcon className="size-32 text-gray-400" />
        ) : (
          <Cross2Icon className="size-32 text-gray-400" />
        )}
      </button>
    </div>
  );
};

export default LogoutBtn;
