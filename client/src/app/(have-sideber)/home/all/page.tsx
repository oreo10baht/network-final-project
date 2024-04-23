"use client";
import { useContext, useEffect, useState } from "react";
import { UserMe } from "@/models/User";
import { getAllUsers } from "@/services/getAllUsers";
import Empty from "@/components/Empty";
import UserBox from "@/components/๊UserBox";
import AddFriendBtn from "@/components/AddFriendBtn";
import { useAuthContext } from "@/context/Auth";
import { isFriend } from "@/utils/isFriend";
import { isPending } from "@/utils/isPending";
import { isMe } from "@/utils/isMe";
import RemoveFriendBtn from "@/components/RemoveFriendBtn";
import AcceptFriendBtn from "@/components/AcceptFriendBtn";
import CancelFriendReqBtn from "@/components/CancelFriendReqBtn";
import { useMyMiddleware } from "@/hooks/useMyMiddleware";
import Header from "@/components/Header";
import { io } from "socket.io-client";
import { updateStatus } from "@/services/updateStatus";
const socket = io(`${process.env.backend}`);
const All = () => {
  useMyMiddleware();
  const [Users, setUsers] = useState<UserMe[]>([] as UserMe[]);
  const { user } = useAuthContext();
  useEffect(() => {
    const fetchUser = async () => {
      const users = await getAllUsers();
      if (users) {
        setUsers((prevUser) => [...users]);
        // console.log(users, user);
      }
    };
    fetchUser();
  });
  const updateUserStatus = async () => {
    if (user) {
      const res = await updateStatus(user?.username || "", 1);
    }
  };
  useEffect(() => {
    socket.emit("set-online", user?.username);
    socket.on("set-offline", (data) => {});
    updateUserStatus();
  }, [user]);
  return (
    <>
      {Users.length !== 0 ? (
        <div className="flex flex-col">
          <Header text="All users in this app" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 m-3">
            {Users.map((userNotMe: UserMe) => (
              <>
                {user && !isMe(userNotMe, user) ? (
                  <>
                    <UserBox user={userNotMe} key={userNotMe.user_id}>
                      {user?.friends &&
                      isFriend(userNotMe.user_id, user.friends) ? (
                        <RemoveFriendBtn recipientName={userNotMe.username} />
                      ) : (
                        <>
                          {user?.pendings &&
                          isPending(userNotMe.user_id, user.pendings) ? (
                            <CancelFriendReqBtn
                              requesterName={user.username}
                              recipientName={userNotMe.username}
                            />
                          ) : (
                            <>
                              {user?.requests &&
                              user.requests.includes(userNotMe.user_id) ? (
                                <AcceptFriendBtn
                                  recipientName={userNotMe.username}
                                />
                              ) : (
                                <AddFriendBtn
                                  recipientName={userNotMe.username}
                                />
                              )}
                            </>
                          )}
                        </>
                      )}
                    </UserBox>
                  </>
                ) : null}
              </>
            ))}
          </div>
        </div>
      ) : (
        <Empty text="no user"></Empty>
      )}
    </>
  );
};

export default All;
