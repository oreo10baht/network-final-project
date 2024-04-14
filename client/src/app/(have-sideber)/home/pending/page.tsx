"use client";
import { useEffect, useRef, useState } from "react";
import { UserMe } from "@/models/User";
import { useAuthContext } from "@/context/Auth";
import Empty from "@/components/Empty";
import { getUsersbyIds } from "@/utils/getUsersbyIds";
import UserBox from "@/components/๊UserBox";
import AcceptFriendBtn from "@/components/AcceptFriendBtn";

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
  });

  return (
    <>
      {Users.length !== 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 m-3">
          {Users.map((user: UserMe) => (
            <UserBox user={user} key={user.username}>
              <AcceptFriendBtn recipientName={user.username}/>
            </UserBox>
          ))}
        </div>
      ) : (
        <Empty text="no pending users"></Empty>
      )}
    </>
  );
};

export default Pending;
