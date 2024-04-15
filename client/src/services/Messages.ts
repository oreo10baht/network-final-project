export async function getMessagesByChatId(cid: string) {
    try {
      const response = await fetch(
        `${process.env.backend}/api/messages/` + cid,
        {
          method: "GET",
        }
      );
  
      if (!response.ok) {
        throw new Error("can't get messages by chat id");
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
    }
    console.log("DONE GET");
  }

  import { UserLogin } from "@/models/User";

export async function postMessage(message:any) {
  try {
    const response = await fetch(`${process.env.backend}/api/messages/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include', 
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      throw new Error("Failed to create message.");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

  
  