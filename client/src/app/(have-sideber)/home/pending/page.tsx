"use client";
import { useEffect, useState } from "react";
import { User } from "@/models/User";
import { useAuthContext } from "@/context/Auth";
import { getUserbyId } from "@/services/getUserbyId";
import Empty from "@/components/Empty";
import UserBoxes from "@/components/UserBoxes";
const Pending = () => {
  const [Users, setUsers] = useState<User[]>([] as User[]);
  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      user.pendings.forEach(async (pid: string) => {
        const penUser = await getUserbyId(pid);
        if (penUser) {
          setUsers([...Users, penUser]);
        }
      });
    }
  }, []);

  return (
    <>
      {Users.length !== 0 ? (
        <UserBoxes users={Users}></UserBoxes>
      ) : (
        <Empty text="no pending users"></Empty>
      )}
    </>
  );
};

export default Pending;
