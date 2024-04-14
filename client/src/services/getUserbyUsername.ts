export async function getUserbyUsername(username: string) {
  try {
    console.log("sent:" + username);
    const bdata = { username: username };
    console.log(bdata);
    const response = await fetch("http://localhost:8080/api/users/name", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bdata),
      redirect: "follow",
    });

    if (!response.ok) {
      throw new Error("can't get user by username");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
  console.log("DONE GET");
}
