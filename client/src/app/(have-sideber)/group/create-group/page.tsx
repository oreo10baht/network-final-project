"use client";
import UserBox from "@/components/๊UserBox";
import { CreateChat } from "@/models/Chat";
import { UserMe } from "@/models/User";
import { getAllUsers } from "@/services/getAllUsers";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
const CreateGroupPage = () => {
  const router = useRouter();
  const [groupChat, setGroupChat] = useState<CreateChat>({} as CreateChat);
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroupChat({
      ...groupChat,
      [e.target.name]: e.target.value,
    });
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
  });
  return (
    <div className="bg-gray-600 w-full h-screen text-gray-400 flex flex-col justify-center items-center ">
      <h1 className="large-text font-medium my-2">Create Group</h1>
      <form>
        <div className="my-2">
          <label htmlFor="name" className="medium-text font-medium ">
            Group Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            required
            className="flex rounded-lg p-1 text-gray-900"
            onChange={handleFormChange}
          ></input>
        </div>

        <div className="medium-text font-medium my-2">Choose Members</div>
        <div className="text-gray-800 h-96 overflow-y-auto no-scrollbar w-96 flex gap-1 flex-col p-2 my-2">
          {Users.map((user: UserMe) => (
            <UserBox user={user}>
              <input
                type="checkbox"
                className="size-5"
                value={user.user_id}
              ></input>
            </UserBox>
          ))}
        </div>
        <div className="w-full flex flex-row justify-center my-5 gap-3">
          <button
            type="submit"
            className="font-medium small-text bg-green-600 text-gray-200 hover:bg-green-700 rounded-md px-3 py-1"
          >
            Confirm
          </button>
          <button
            className="font-medium small-text bg-gray-400 text-gray-800 hover:bg-gray-500 rounded-md px-3 py-1"
            onClick={(e) =>{
                e.preventDefault()
                router.push("/home/all")
            } }
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateGroupPage;
