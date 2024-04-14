type ChatType = "GROUP" | "PRIVATE";

interface Message {
  message: string;
  senderId: string;
  index: number;
}

export interface Chat {
  chatId: string;
  name?: string;
  members: string[];
  type: ChatType;
  message: Message[];
  reqList: string[];
}

export interface GetChat {
  chatId: string;
  name?: string;
  members: string[];
  type: ChatType;
  reqList: string[];
}

export interface CreateChat{
  firstUsername:string,
  secondUsername:string,
  type:ChatType,
  name?:string
}
