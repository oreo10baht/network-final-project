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

  // const users = getAllUsers();
  // console.log(users);
  console.log("Users");
  console.log(Users[0]);
  // console.log(Users[0].user_id);
  const handleLogout = async (e: any) => {
    console.log("logging out");
    e.preventDefault();
    const res = await logout();
    console.log(res, "logging out");
    router.push("/login");
    // if (res) {
    //   setremoved(true);
    //   console.log(res, "logout");
    //   const currentUser: UserMe = await getMe(token.current);
    //   if (currentUser) {
    //     setUser(currentUser);
    //   }
    // }
  };

  return (
    <div className="flex flex-row w-full h-14 bg-gray-700 justify-center gap-5 items-center border-b-gray-950 border-b-2">
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
        className="text-gray-400 font-medium rounded-lg px-2 py-1 hover:bg-gray-500 absolute right-0 px-5"
        onClick={handleLogout}
      >
        Logout
      </button>
      {/* <UserBox user={Users[0]} key={Users[0].user_id} /> */}
      {/* <UserBox
        user={Users[0]}
        key={Users[0].user_id}
        children={<LogoutBtn />}
      /> */}
    </div>
  );
};

export default HomeNavBar;
