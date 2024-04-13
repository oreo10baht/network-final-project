export interface User {
  uid: string;
  username: string;
  name: string;
  password: string;
  // pic:
  description: string;
  pendingList: string[];
  reqList: string[];
  friendList: string[];
}
