"use client";
import { useEffect, useState } from "react";
import { UserMe } from "@/models/User";
import { useAuthContext } from "@/context/Auth";
import Empty from "@/components/Empty";
import UserBox from "@/components/๊UserBox";
import RemoveFriendBtn from "@/components/Button/RemoveFriendBtn";
import { getUsersbyIds } from "@/utils/getUsersbyIds";
import { useMyMiddleware } from "@/hooks/useMyMiddleware";
import Header from "@/components/Header";
const Friend = () => {
  useMyMiddleware();
  const [Users, setUsers] = useState<UserMe[]>([] as UserMe[]);
  const { user } = useAuthContext();

  useEffect(() => {
    const getFriends = async () => {
      if (user) {
        const friends: UserMe[] = await getUsersbyIds(user.friends);
        if (friends) {
          setUsers(friends);
        }
      }
    };
    getFriends()
  }, []);

  return (
    <>
      {Users.length !== 0 ? (
        <div className="flex flex-col">
          <Header text="All of your friends" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 m-3">
            {Users.map((user: UserMe) => (
              <UserBox user={user} key={user.username}>
                <RemoveFriendBtn recipientName={user.username} />
              </UserBox>
            ))}
          </div>
        </div>
      ) : (
        <Empty text="no friend"></Empty>
      )}
    </>
  );
};

export default Friend;
