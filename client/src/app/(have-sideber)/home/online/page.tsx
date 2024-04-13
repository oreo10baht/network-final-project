"use client";
import { generateMockUsers } from "@/utils/mockUser";
import { useEffect, useState } from "react";
import { User } from "@/models/User";
import UserBoxes from "@/components/UserBoxes";
import Empty from "@/components/Empty";

const Online = () => {
  const [Users, setUsers] = useState<User[]>([] as User[]);
  useEffect(() => {
    const users = generateMockUsers(5);
    setUsers(users);
  }, []);
  return (
    <>
      {Users.length !== 0 ? (
        <UserBoxes users={Users}></UserBoxes>
      ) : (
        <Empty text="no online user"></Empty>
      )}
    </>
  );
};

export default Online;
