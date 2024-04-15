type ChatType = "GROUP" | "PRIVATE";

interface Message {
  message: string;
  senderId: string;
  index: number;
}

export interface Chat {
  _id: string;
  name?: string;
  members: string[];
  type: ChatType;
  message: Message[];
  reqList: string[];
}

export interface GetChat {
  _id: string;
  name?: string;
  members: string[];
  type: ChatType;
  requests: string[];
}

export interface CreateChat {
  firstUsername: string;
  secondUsername: string;
  type: ChatType;
  name?: string;
  members:string[];
}
