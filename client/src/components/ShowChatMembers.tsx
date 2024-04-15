import { UserMe } from "@/models/User";
import UserBox from "./๊UserBox";
import { useEffect, useState } from "react";
import { getUsersbyIds } from "@/utils/getUsersbyIds";

const ShowChatMembers = ({ userIds }: { userIds: string[] }) => {
  const [members, setMembers] = useState<UserMe[]>();
  useEffect(() => {
    const getMembers = async () => {
      const mem: UserMe[] = await getUsersbyIds(userIds);
      if (mem) {
        setMembers(mem);
      }
    };
    getMembers();
  }, []);
  return (
    <div className=" flex flex-col overflow-auto no-scrollbar h-screen w-96 sticky bg-gray-900 top-0 left-0 p-4 gap-2">
      {members ? (
        <>
          {members.map((member: UserMe) => (
            <UserBox user={member} key={member.username}>
              <p>test</p>
            </UserBox>
            // <p className="sticky">test</p>
          ))}
        </>
      ) : null}
    </div>
  );
};

export default ShowChatMembers;
