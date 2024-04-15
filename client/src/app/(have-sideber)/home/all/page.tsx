"use client";
import { useContext, useEffect, useState } from "react";
import { UserMe } from "@/models/User";
import { getAllUsers } from "@/services/getAllUsers";
import Empty from "@/components/Empty";
import UserBox from "@/components/๊UserBox";
import AddFriendBtn from "@/components/AddFriendBtn";
import { useAuthContext } from "@/context/Auth";
import { isFriend } from "@/utils/isFriend";
import RemoveFriendBtn from "@/components/RemoveFriendBtn";
import { isPending } from "@/utils/isPending";
import AcceptFriendBtn from "@/components/AcceptFriendBtn";
import { useMyMiddleware } from "@/hooks/useMyMiddleware";
import { isMe } from "@/utils/isMe";

const All = () => {
  useMyMiddleware();
  const [Users, setUsers] = useState<UserMe[]>([] as UserMe[]);
  const { user } = useAuthContext();
  useEffect(() => {
    const fetchUser = async () => {
      const users = await getAllUsers();
      if (users) {
        setUsers(users);
      }
    };
    fetchUser();
  });
  return (
    <>
      {Users.length !== 0 ? (
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
                          <AcceptFriendBtn recipientName={userNotMe.username} />
                        ) : (
                          <AddFriendBtn recipientName={userNotMe.username} />
                        )}
                      </>
                    )}
                  </UserBox>
                </>
              ) : null}
            </>
          ))}
        </div>
      ) : (
        <Empty text="no user"></Empty>
      )}
    </>
  );
};

export default All;
