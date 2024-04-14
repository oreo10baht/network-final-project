"use client";
import { useEffect, useState } from "react";
import { UserMe } from "@/models/User";
import { useAuthContext } from "@/context/Auth";
import { getUserbyId } from "@/services/getUserbyId";
import Empty from "@/components/Empty";
import UserBox from "@/components/๊UserBox";
import RemoveFriendBtn from "@/components/RemoveFriendBtn";
const Friend = () => {
  const [Users, setUsers] = useState<UserMe[]>([] as UserMe[]);
  const { user } = useAuthContext();

  useEffect(() => {
    if (user.current) {
      user.current.friends.forEach(async (pid: string) => {
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 m-3">
          {Users.map((user: UserMe) => (
            <UserBox user={user} key={user.username}>
              <RemoveFriendBtn recipientName={user.username} />
            </UserBox>
          ))}
        </div>
      ) : (
        <Empty text="no friend"></Empty>
      )}
    </>
  );
};

export default Friend;
