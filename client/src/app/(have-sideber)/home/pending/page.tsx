"use client";
import { generateMockUsers } from "@/utils/mockUser";
import { useEffect, useState } from "react";
import { User } from "@/models/User";
import UserBox from "@/components/๊UserBox";
const Pending = () => {
  const [Users, setUsers] = useState<User[]>([] as User[]);
  useEffect(() => {
    const users = generateMockUsers(3);
    setUsers(users);
  }, []);
  return (
    <div className="grid grid-cols-3 gap-3 m-3 ">
      {Users.length !== 0
        ? Users.map((user: User) => (
            <UserBox user={user} key={user.uid}></UserBox>
          ))
        : null}
    </div>
  );
};

export default Pending;
