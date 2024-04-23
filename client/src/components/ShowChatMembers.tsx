import { UserMe } from "@/models/User";
import UserBox from "./๊UserBox";
import { useEffect, useState } from "react";
import { getUsersbyIds } from "@/utils/getUsersbyIds";
import HandleJoinBtn from "./Button/HandleJoinBtn";

const ShowChatMembers = ({
  userIds,
  ownerId,
  reqIds,
  chatId
}: {
  userIds: string[];
  ownerId?: string;
  reqIds?: string[];
  chatId:string;
}) => {
  const [members, setMembers] = useState<UserMe[]>();
  const [requesters, setRequesters] = useState<UserMe[]>();

  useEffect(() => {
    const getMembers = async () => {
      const mem: UserMe[] = await getUsersbyIds(userIds);
      if (mem) {
        setMembers(mem);
      }
    };
    getMembers();

    const getRequesters = async () => {
      if (reqIds) {
        const mem: UserMe[] = await getUsersbyIds(reqIds);
        if (mem) {
          setRequesters(mem);
        }
      }
    };
    getRequesters();
  }, []);
  return (
    <div className=" flex flex-col h-screen w-96 bg-gray-900 top-0 left-0 p-4 gap-2 sticky ">
      <div className="flex flex-col h-full  overflow-auto no-scrollbar ">
        {members &&
          members.map((member: UserMe) => (
            <UserBox user={member} key={member.username}>
              {ownerId === member.user_id ? (
                <p className="text-gray-400 small-text">Owner</p>
              ) : (
                <p className="text-gray-400 small-text">member</p>
              )}
            </UserBox>
          ))}
      </div>
      {ownerId ? (
        <div className="flex flex-col h-2/5  overflow-auto no-scrollbar">
          <p className="small-text text-gray-400 font-semibold">Requests</p>
          {reqIds ? (
            requesters?.map((member: UserMe) => (
              <UserBox user={member} key={member.username}>
                <HandleJoinBtn memberId={member.user_id} chatId={chatId}/>
              </UserBox>
            ))
          ) : (
            <p className="text-center m-auto text-gray-400 small-text">no requests</p>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default ShowChatMembers;
