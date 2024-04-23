"use server"

import { revalidateTag } from "next/cache";

export async function getChats() {
  try {
    const response = await fetch(`${process.env.backend}/api/chats/all`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("can't get all chats");
    }
    return response.json();
  } catch (err) {
    console.log(err);
  }
}

export async function getGroupChats() {
  try {
    const response = await fetch(`${process.env.backend}/api/chats/allgroup` ,{next:{tags:['group']}});

    if (!response.ok) {
      throw new Error("can't get all group chats");
    }
    return response.json();
  } catch (err) {
    console.log(err);
  }
}

export async function getDirectChatByUsername(
  firstUsername: string,
  secondUsername: string
) {
  try {
    const response = await fetch(
      `${process.env.backend}/api/chats/${firstUsername}/${secondUsername}`,
      {
        method: "GET",
      }
    );

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
    const response = await fetch(`${process.env.backend}/api/chats/${chatId}`, {
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

export async function createChat(chat:any) {
  try {
    const response = await fetch(`${process.env.backend}/api/chats/`, {
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

export async function reqJoinChat(chatId:string,memberId:string) {
  try {
    const response = await fetch(`${process.env.backend}/api/chats/req/${chatId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        memberId:memberId
      }),
    });
    
    if (!response.ok) {
      throw new Error("can't req join");
    }
    return response.json();
  } catch (err) {
    console.log(err);
  }
}