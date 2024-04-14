export interface User {
  id: string;
  username: string;
  display_name: string;
  password: string;
  profileImg?: string;
  description: string;
  pendings: string[]; //arr of uid
  requests: string[]; //arr of uid
  friends: string[]; //arr of uid
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
  id: string;
  username: string;
  display_name: string;
  pendings: string[]; //arr of uid
  requests: string[]; //arr of uid
  friends: string[]; //arr of uid
}
