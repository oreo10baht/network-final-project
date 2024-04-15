export interface User {
  user_id: string;
  username: string;
  display_name: string;
  password: string;
  profileImg?: string;
  description: string;
  pendings: string[]; //arr of uuser_id
  requests: string[]; //arr of uuser_id
  friends: string[]; //arr of uuser_id
  status: string;
}

export interface UserRegister {
  username: string;
  display_name: string;
  password: string;
  // profileImg?: string;
  description: string;
}

export interface UserLogin {
  username: string;
  password: string;
}

export interface UserMe {
  user_id: string;
  username: string;
  display_name: string;
  pendings: string[]; //arr of uuser_id
  requests: string[]; //arr of uuser_id
  friends: string[]; //arr of uuser_id
}

export interface CheckUser{
  user:UserMe;
  token:string
}
