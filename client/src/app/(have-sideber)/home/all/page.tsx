"use client";
import { useEffect, useState } from "react";
import { UserMe } from "@/models/User";
import { getAllUsers } from "@/services/getAllUsers";
import UserBoxes from "@/components/UserBoxes";
import Empty from "@/components/Empty";
const All = () => {
  const [Users, setUsers] = useState<UserMe[]>([] as UserMe[]);
  useEffect(() => {
    const fetchUser = async () => {
      const users = await getAllUsers();
      if (users) {
        setUsers(users);
        console.log(Users,"page all")
      }
    };
    fetchUser();
  }, []);
  return (
    <>
      {Users.length !== 0 ? (
        <UserBoxes users={Users}></UserBoxes>
      ) : (
        <Empty text="no user"></Empty>
      )}
    </>
  );
};

export default All;
