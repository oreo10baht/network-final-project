export interface User {
  uid: string;
  username: string;
  name: string;
  password: string;
  profileImg?: string;
  description: string;
  pendingList: string[]; //arr of uid
  reqList: string[]; //arr of uid
  friendList: string[]; //arr of uid
  status: string;
}

export interface UserRegister {
  username: string;
  name: string;
  password: string;
  profileImg?: string;
  description: string;
}

export interface UserLogin {
  username: string;
  password: string;
}
