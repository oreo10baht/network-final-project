"use client";
import UserBox from "@/components/๊UserBox";
import { UserMe } from "@/models/User";
import { getAllUsers } from "@/services/getAllUsers";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { addMemberToChat, getChatbyChatId } from "@/services/Chats";
import { useAuthContext } from "@/context/Auth";
import { Chat } from "@/models/Chat";

const AddMemberToGroup = ({
  chatId,
  setIsShown,
}: {
  chatId: any;
  setIsShown: Function;
}) => {
  const { user } = useAuthContext();
  const router = useRouter();
  const [membersToAdd, setMemberToAdd] = useState<string[]>([]);
  const [chat, setChat] = useState<Chat>();

  useEffect(() => {
    const fetchChat = async () => {
      const chat = await getChatbyChatId(chatId);
      if (chat) {
        setChat(chat);
      }
    };
    fetchChat();
  }, [user]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;
    if (checked) {
      setMemberToAdd([...membersToAdd, value]);
    } else {
      setMemberToAdd(membersToAdd.filter((item) => item !== value));
    }
  };

  const addMember = async () => {
    for (const user of membersToAdd) {
      const data = { memberId: user };
      console.log(data, chatId);
      const response = await addMemberToChat(data, chatId);
    }
    setIsShown(false);
  };

  const [Users, setUsers] = useState<UserMe[]>([] as UserMe[]);
  useEffect(() => {
    const fetchUser = async () => {
      const users = await getAllUsers();
      if (users) {
        setUsers(users);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="fixed top-0 bg-gray-600 w-full h-screen text-gray-400 flex flex-col justify-center items-center z-50">
      <h1 className="large-text font-medium my-2">Create Group</h1>
      <form>
        <div className="medium-text font-medium my-2">
          Choose Members To Add
        </div>
        <div className="text-gray-800 h-96 overflow-y-auto no-scrollbar w-96 flex gap-1 flex-col p-2 my-2">
          {Users &&
            Users.map((userNotMember: UserMe) => (
              <>
                {!chat?.members.includes(userNotMember.user_id) ? (
                  <UserBox user={userNotMember}>
                    <input
                      type="checkbox"
                      className="size-5"
                      value={userNotMember.user_id}
                      key={userNotMember.user_id}
                      onChange={(e) => {
                        handleFormChange(e);
                      }}
                    ></input>
                  </UserBox>
                ) : null}
              </>
            ))}
        </div>
        <div className="w-full flex flex-row justify-center my-5 gap-3">
          <button
            type="button"
            className="font-medium small-text bg-green-600 text-gray-200 hover:bg-green-700 rounded-md px-3 py-1"
            onClick={(e) => {
              e.preventDefault();
              addMember();
            }}
          >
            Confirm
          </button>
          <button
            className="font-medium small-text bg-gray-400 text-gray-800 hover:bg-gray-500 rounded-md px-3 py-1"
            onClick={(e) => {
              setIsShown(false);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMemberToGroup;
