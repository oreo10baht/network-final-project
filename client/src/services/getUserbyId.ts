export async function getUserbyId(uid:string) {
    try {
      const response = await fetch("http://localhost:8080/api/users/"+uid, {
        method: "GET",
      });
  
      if (!response.ok) {
        throw new Error("can't get all users");
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
    }
  }
  