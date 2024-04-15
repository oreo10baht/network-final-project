"use client";
import { useEffect, useRef, useState } from "react";
import { UserMe } from "@/models/User";
import { useAuthContext } from "@/context/Auth";
import Empty from "@/components/Empty";
import { getUsersbyIds } from "@/utils/getUsersbyIds";
import UserBox from "@/components/๊UserBox";
import { useMyMiddleware } from "@/hooks/useMyMiddleware";
import AcceptFriendBtn from "@/components/AcceptFriendBtn";

const Requesting = () => {
  useMyMiddleware();

  const { user } = useAuthContext();
  const [Users, setUsers] = useState<UserMe[]>([] as UserMe[]);
  useEffect(() => {
    const getReqUsers = async () => {
      if (user) {
        const reqUsers: UserMe[] = await getUsersbyIds(user.requests);
        if (reqUsers) {
          setUsers(reqUsers);
        }
      }
    };
    getReqUsers();
  });
  return (
    <>
      {Users.length !== 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 m-3">
          {Users.map((user: UserMe) => (
            <UserBox user={user} key={user.username}>
              <AcceptFriendBtn recipientName={user.username} />
            </UserBox>
          ))}
        </div>
      ) : (
        <Empty text="no requests"></Empty>
      )}
    </>
  );
};

export default Requesting;
