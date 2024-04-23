"use client";
import { useEffect, useRef, useState } from "react";
import { UserMe } from "@/models/User";
import { useAuthContext } from "@/context/Auth";
import Empty from "@/components/Empty";
import { getUsersbyIds } from "@/utils/getUsersbyIds";
import UserBox from "@/components/๊UserBox";
import { useMyMiddleware } from "@/hooks/useMyMiddleware";
import CancelFriendReqBtn from "@/components/Button/CancelFriendReqBtn";
import Header from "@/components/Header";

const Pending = () => {
  useMyMiddleware();

  const { user } = useAuthContext();
  const [Users, setUsers] = useState<UserMe[]>([] as UserMe[]);
  useEffect(() => {
    const getPenUsers = async () => {
      if (user) {
        const penUsers: UserMe[] = await getUsersbyIds(user.pendings);
        if (penUsers) {
          setUsers(penUsers);
        }
      }
    };
    // const intervalId = setInterval(getPenUsers, 2000);
    // return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      {Users.length !== 0 ? (
        <div className="flex flex-col">
          <Header text="All users that you send friend request" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 m-3">
            {Users.map((userNotme: UserMe) => (
              <UserBox user={userNotme} key={userNotme.username}>
                <CancelFriendReqBtn
                  requesterName={user!.username}
                  recipientName={userNotme.username}
                />
              </UserBox>
            ))}
          </div>
        </div>
      ) : (
        <Empty text="no pending users"></Empty>
      )}
    </>
  );
};

export default Pending;
