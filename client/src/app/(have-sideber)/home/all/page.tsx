"use client";
import { useEffect, useState } from "react";
import { UserMe } from "@/models/User";
import { getAllUsers } from "@/services/getAllUsers";
import Empty from "@/components/Empty";
import UserBox from "@/components/๊UserBox";
import AddFriendBtn from "@/components/AddFriendBtn";

const All = () => {
  const [Users, setUsers] = useState<UserMe[]>([] as UserMe[]);
  useEffect(() => {
    const fetchUser = async () => {
      const users = await getAllUsers();
      if (users) {
        setUsers(users);
        console.log(Users, "page all");
      }
    };
    fetchUser();
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
        <Empty text="no user"></Empty>
      )}
    </>
  );
};

export default All;
