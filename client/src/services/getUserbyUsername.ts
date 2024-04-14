export async function getUserbyUsername(username: string) {
  try {
    const bdata = { username: username };
    const response = await fetch(
      `${process.env.backend}/api/users/name/` + username,
      {
        method: "GET",
      }
    );

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
