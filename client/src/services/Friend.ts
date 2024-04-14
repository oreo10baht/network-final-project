export async function addFriend(requesterName: string, recipientName: string) {
  try {
    const response = await fetch("http://localhost:8080/api/friends/add", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        requesterName: requesterName,
        recipientName: recipientName
      }),
    });

    if (!response.ok) {
      throw new Error("can't add friend");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

export async function acceptFriend(requesterName: string, recipientName: string) {
  try {
    const response = await fetch("http://localhost:8080/api/friends/accept", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        requesterName: requesterName,
        recipientName: recipientName
      }),
    });

    if (!response.ok) {
      throw new Error("can't accept friend");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

export async function removeFriend(requesterName: string, recipientName: string) {
  try {
    const response = await fetch("http://localhost:8080/api/friends/remove", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        requesterName: requesterName,
        recipientName: recipientName
      }),
    });

    if (!response.ok) {
      throw new Error("can't remove friend");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

