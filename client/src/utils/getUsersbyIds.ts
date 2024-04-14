import { UserMe } from "@/models/User";
import { getUserbyId } from "@/services/getUserbyId";

export async function getUsersbyIds(ids: string[]) {
  const users: UserMe[] = new Array<UserMe>();
  for (const id of ids) {
    const user = await getUserbyId(id);
    if (user) {
      users.push(user);
    }
  }
  return users;
}
