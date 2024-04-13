"use client";
import { generateMockUsers } from "@/utils/mockUser";
import { useEffect, useState } from "react";
import { UserMe } from "@/models/User";
import UserBox from "@/components/๊UserBox";
import { getAllUsers } from "@/services/getAllUsers";
const All = () => {
  const [Users, setUsers] = useState<UserMe[]>([] as UserMe[]);
  useEffect(() => {
    const fetchUser = async () => {
      const users = await getAllUsers();
      if (users) {
        setUsers(users);
      }
    };
    fetchUser()
  }, []);
  return (
    <div className="grid grid-cols-3 gap-3 m-3 ">
      {Users.length !== 0
        ? Users.map((user: UserMe) => (
            <UserBox user={user} key={user.username}></UserBox>
          ))
        : null}
    </div>
  );
};

export default All;
