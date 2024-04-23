import { UserMe } from "@/models/User";
import UserBox from "./๊UserBox";
import { useEffect, useState } from "react";
import { getUsersbyIds } from "@/utils/getUsersbyIds";

const ShowChatMembers = ({
  userIds,
  ownerId,
}: {
  userIds: string[];
  ownerId?: string;
}) => {
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
              {ownerId === member.user_id ? (
                <p className="text-gray-400 small-text">Owner</p>
              ) : (
                <p className="text-gray-400 small-text">member</p>
              )}
            </UserBox>
          ))}
        </>
      ) : null}
    </div>
  );
};

export default ShowChatMembers;
