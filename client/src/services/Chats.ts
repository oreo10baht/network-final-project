import { CreateChat } from "@/models/Chat";

// export async function getAllUserChats(params:type) {

// }

export async function getDirectChatByUsername(
  firstUsername: string,
  secondUsername: string
) {
  try {
    const response = await fetch("http://localhost:8080/api/chats/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstUsername: firstUsername,
        secondUsername: secondUsername,
      }),
    });

    if (!response.ok) {
      throw new Error("can't get chat");
    }
    return response.json();
  } catch (err) {
    console.log(err);
  }
}

export async function getChatbyChatId(chatId: string) {
  try {
    const response = await fetch("http://localhost:8080/api/chats/" + chatId, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("can't get chat");
    }
    return response.json();
  } catch (err) {
    console.log(err);
  }
}

export async function createChat(chat:CreateChat) {
  try {
    const response = await fetch("http://localhost:8080/api/chats/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(chat),
    });

    if (!response.ok) {
      throw new Error("can't create chat");
    }
    return response.json();
  } catch (err) {
    console.log(err);
  }
}
