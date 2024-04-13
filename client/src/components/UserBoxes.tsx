import { UserMe } from "@/models/User";
import UserBox from "./๊UserBox";

const UserBoxes = ({ users }: { users: UserMe[] }) => {
  return (
    <div className="grid grid-cols-3 gap-3 m-3">
      {users.map((user: UserMe) => (
        <UserBox user={user} key={user.username}></UserBox>
      ))}
    </div>
  );
};

export default UserBoxes;
