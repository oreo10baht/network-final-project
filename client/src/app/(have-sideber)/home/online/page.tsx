"use client";
import { useEffect, useState } from "react";
import { UserMe } from "@/models/User";
import Empty from "@/components/Empty";
import UserBox from "@/components/๊UserBox";
import AddFriendBtn from "@/components/AddFriendBtn";
import { getAllUsers } from "@/services/getAllUsers";
import { useAuthContext } from "@/context/Auth";
import { isFriend } from "@/utils/isFriend";
import { isPending } from "@/utils/isPending";
import { isMe } from "@/utils/isMe";
import RemoveFriendBtn from "@/components/RemoveFriendBtn";
import AcceptFriendBtn from "@/components/AcceptFriendBtn";
import CancelFriendReqBtn from "@/components/CancelFriendReqBtn";
import { useMyMiddleware } from "@/hooks/useMyMiddleware";
import Header from "@/components/Header";

const Online = () => {
  useMyMiddleware();
  const [Users, setUsers] = useState<UserMe[]>([] as UserMe[]);
  const { user } = useAuthContext();

  const fetchUsers = async () => {
    const res = await getAllUsers();
    if (res) {
      setUsers(res);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <>
      {Users.length !== 0 ? (
        <div className="flex flex-col">
          <Header text="All users in this app that are currently online" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 m-3">
            {Users.map((userNotMe: UserMe) => (
              <>
                {user && userNotMe.status == 1 && !isMe(userNotMe, user) ? (
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
        <Empty text="no online user"></Empty>
      )}
    </>
  );
};

export default Online;
