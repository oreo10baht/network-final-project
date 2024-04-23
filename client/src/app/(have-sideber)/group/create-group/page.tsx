"use client";
import UserBox from "@/components/๊UserBox";
import { UserMe } from "@/models/User";
import { getAllUsers } from "@/services/getAllUsers";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createChat } from "@/services/Chats";
import { useAuthContext } from "@/context/Auth";
const CreateGroupPage = () => {
  const { user } = useAuthContext();
  const router = useRouter();
  const [members, setMember] = useState<string[]>([]);
  const [name, setName] = useState("");
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;
    if (checked) {
      setMember([...members, value]);
    } else {
      setMember(members.filter((item) => item !== value));
    }
  };
  const handleNameChange = (e: any) => {
    setName(e.target.value);
  };
  const createGroupChat = async () => {
    if (user) {
      const req = {
        members: members,
        type: "GROUP",
        name: name,
        owner: user.username,
      };
      const response = createChat(req);
    }
  };

  const [Users, setUsers] = useState<UserMe[]>([] as UserMe[]);
  useEffect(() => {
    if (user) {
      setMember([user.username]);
    }
    const fetchUser = async () => {
      const users = await getAllUsers();
      if (users) {
        setUsers(users);
      }
    };
    fetchUser();
  }, []);
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
            onChange={handleNameChange}
          ></input>
        </div>

        <div className="medium-text font-medium my-2">Choose Members</div>
        <div className="text-gray-800 h-96 overflow-y-auto no-scrollbar w-96 flex gap-1 flex-col p-2 my-2">
          {Users &&
            Users.map((userNotMe: UserMe) => (
              <>
                {userNotMe.user_id !== user?.user_id ? (
                  <UserBox user={userNotMe}>
                    <input
                      type="checkbox"
                      className="size-5"
                      value={userNotMe.username}
                      key={userNotMe.user_id}
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
              createGroupChat();
            }}
          >
            Confirm
          </button>
          <button
            className="font-medium small-text bg-gray-400 text-gray-800 hover:bg-gray-500 rounded-md px-3 py-1"
            onClick={(e) => {
              e.preventDefault();
              router.push("/home/all");
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateGroupPage;
