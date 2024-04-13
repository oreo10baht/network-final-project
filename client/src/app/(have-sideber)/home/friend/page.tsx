"use client";
import { useEffect, useState } from "react";
import { User } from "@/models/User";
import { useAuthContext } from "@/context/Auth";
import { getUserbyId } from "@/services/getUserbyId";
import UserBoxes from "@/components/UserBoxes";
import Empty from "@/components/Empty";
const Friend = () => {
  const [Users, setUsers] = useState<User[]>([] as User[]);
  const {user} = useAuthContext()

  useEffect(() => {

    if(user){
      user.friends.forEach(async(pid:string)=>{
          const penUser = await getUserbyId(pid)
          if(penUser){
            setUsers([...Users,penUser])
          }
      })
    }

  }, []);

  return (
    <>
    {Users.length !== 0 ? (
      <UserBoxes users={Users}></UserBoxes>
    ) : (
      <Empty text="no friend"></Empty>
    )}
  </>
  );
};

export default Friend;
