"use client";
import { generateMockUsers } from "@/utils/mockUser";
import { useEffect, useState } from "react";
import { UserMe } from "@/models/User";
import Empty from "@/components/Empty";
import UserBox from "@/components/๊UserBox";
import AddFriendBtn from "@/components/AddFriendBtn";

const Online = () => {
  const [Users, setUsers] = useState<UserMe[]>([] as UserMe[]);
  useEffect(() => {
    const users = generateMockUsers(5);
    setUsers(users);
  }, []);
  return (
    <>
      {Users.length !== 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 m-3">
          {Users.map((user: UserMe) => (
            <UserBox user={user} key={user.username}>
              <AddFriendBtn recipientName={user.username} />
            </UserBox>
          ))}
        </div>
      ) : (
        <Empty text="no online user"></Empty>
      )}
    </>
  );
};

export default Online;
