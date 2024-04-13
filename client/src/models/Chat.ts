type ChatType = "GROUP" | "PRIVATE"

interface Message{
    message:string,
    senderId:string,
    index:number
}

export interface Chat{
    chatId:string,
    name?:string,
    members:string[],
    type:ChatType,
    message:Message[],
    reqList:string[]
}

