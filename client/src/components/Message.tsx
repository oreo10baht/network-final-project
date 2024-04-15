import ProfileImage from "./ProfileImage";
import { useState, useEffect } from "react";
import { getUserbyId } from "@/services/getUserbyId";
export const Message = ({
  name,
  timestamp,
  text,
}: {
  name: string;
  timestamp: string;
  text: string;
}) => {
  const [displayName, setDisplayName] = useState("");
  const fetchUser = async () => {
    const response = await getUserbyId(name);
    setDisplayName(response.display_name);
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div className="post mt-5">
      <div className="avatar-wrapper flex ml-4 gap-4">
        <div className="w-12 h-12">
          <ProfileImage src={`https://picsum.photos/200`} />
        </div>
        <div className="post-content text-white">
          <p className="post-owner">
            {displayName}
            <small className="timestamp ml-2 text-gray-400">{timestamp}</small>
          </p>
          <p className="post-text">{text}</p>
        </div>
      </div>
    </div>
  );
};
