import { UserMe } from "@/models/User";
import UserBox from "./๊UserBox";
import { useAuthContext } from "@/context/Auth";
const UserBoxes = ({ users }: { users: UserMe[] }) => {
    const {user} = useAuthContext()
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 m-3">
      {users.map((user: UserMe) => (
        <UserBox user={user} key={user.username}></UserBox>
      ))}
    </div>
  );
};

export default UserBoxes;
