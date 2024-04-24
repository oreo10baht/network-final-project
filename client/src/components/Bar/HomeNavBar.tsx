"use client";
import { useRouter } from "next/navigation";
import UserBox from "../๊UserBox";
import { UserMe } from "@/models/User";
import { useMyMiddleware } from "@/hooks/useMyMiddleware";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/Auth";
import { getMe } from "@/services/getMe";
import { getAllUsers } from "@/services/getAllUsers";
import LogoutBtn from "../Button/LogoutBtn";
import { logout } from "@/services/logout";

const HomeNavBar = () => {
  const router = useRouter();

  useMyMiddleware();
  const [Users, setUsers] = useState<UserMe[]>([] as UserMe[]);
  const { user } = useAuthContext();
  const [count, setCount] = useState<number>(0);
  useEffect(() => {
    const fetchUser = async () => {
      const users = await getAllUsers();
      if (users) {
        setUsers((prevUser) => [...users]);
        console.log(users);
      }
    };
    fetchUser();
    // setCount(prev=>prev)
    // console.log(count)
    // const intervalId = setInterval(fetchUser, 2000);
    // return () => clearInterval(intervalId);
  }, []);

  const handleLogout = async (e: any) => {
    console.log("logging out");
    e.preventDefault();
    const res = await logout();
    console.log(res, "logging out");
    router.push("/login");
  };

  return (
    <div className="flex flex-row w-full h-14 bg-gray-700 justify-center gap-5 items-center border-b-gray-950 border-b-2">
      <div
        className="flex text-gray-400 font-medium rounded-lg px-20 py-1 hover:bg-gray-500 absolute left-0"
        onClick={() => router.push("/home/all")}
      >
        Hello, {user?.display_name} (
        <div className="flex text-gray-500">{user?.username}</div>)
      </div>
      <div
        className="text-gray-400 font-medium rounded-lg px-2 py-1 hover:bg-gray-500 "
        onClick={() => router.push("/home/friend")}
      >
        Friends
      </div>
      <div
        className="text-gray-400 font-medium rounded-lg px-2 py-1 hover:bg-gray-500 "
        onClick={() => router.push("/home/online")}
      >
        Online
      </div>
      <div
        className="text-gray-400 font-medium rounded-lg px-2 py-1  hover:bg-gray-500 "
        onClick={() => router.push("/home/all")}
      >
        All
      </div>

      <div
        className="text-gray-400 font-medium rounded-lg px-2 py-1 hover:bg-gray-500 "
        onClick={() => router.push("/home/pending")}
      >
        Pending
      </div>

      <div
        className="text-gray-400 font-medium rounded-lg px-2 py-1 hover:bg-gray-500 "
        onClick={() => router.push("/home/requesting")}
      >
        Requests
      </div>
      <button
        className="text-gray-400 font-medium rounded-lg py-1 hover:bg-gray-500 absolute right-0 px-5"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default HomeNavBar;
