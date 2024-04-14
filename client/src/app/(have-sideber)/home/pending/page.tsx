"use client";
import { useEffect, useRef, useState } from "react";
import { UserMe } from "@/models/User";
import { useAuthContext } from "@/context/Auth";
import Empty from "@/components/Empty";
import UserBoxes from "@/components/UserBoxes";
import { getUsersbyIds } from "@/utils/getUsersbyIds";
const Pending = () => {
  const { user } = useAuthContext();
  const [Users, setUsers] = useState<UserMe[]>([] as UserMe[]);
  useEffect(() => {
    const getPenUsers = async () => {
      if (user.current) {
        const penUsers: UserMe[] = await getUsersbyIds(user.current.pendings);
        if (penUsers) {

          setUsers(penUsers);
        }

      }
    };
    getPenUsers();
  }, );

  return (
    <>
      { Users.length !== 0 ? (
        <UserBoxes users={Users}></UserBoxes>
      ) : (
        <Empty text="no pending users"></Empty>
      )}
    </>
  );
};

export default Pending;
