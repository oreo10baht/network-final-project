"use client"
import { useRouter } from "next/navigation";

const JoinGroup = () => {
  const router = useRouter()
  return (
    <div className="bg-gray-600 w-full h-screen text-gray-400 flex flex-col justify-center items-center gap-4">
      <h1 className="large-text font-semibold">
        You are not a member of this group
      </h1>
      <h2 className="medium-text font-semibold">Request to join here</h2>
      <button className="font-medium medium-text bg-green-600 text-gray-200 hover:bg-green-700 rounded-md px-3 py-1"
      onClick={(e)=>router.push("/home/all")}>
        Join Group
      </button>
    </div>
  );
};
export default JoinGroup;
