import { UserMe } from "@/models/User";

export function isMe(user:UserMe,me:UserMe):boolean{
    return user.user_id===me.user_id || user.username===me.username
}