export async function getChatById(cid: string) {
    try {
      const response = await fetch(
        "http://localhost:8080/api/chats/" + cid,
        {
          method: "GET",
        }
      );
  
      if (!response.ok) {
        throw new Error("can't get chat by id");
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
    }
    console.log("DONE GET");
  }
  
  