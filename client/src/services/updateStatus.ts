export async function updateStatus(
    name: string,
    status: number
  ) {
    try {
      const response = await fetch(`${process.env.backend}/api/users/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: name,
          status: status,
        }),
      });
  
      if (!response.ok) {
        throw new Error("can't update user status");
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
    }
  }