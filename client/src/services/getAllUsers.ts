export async function getAllUsers() {
  try {
    const response = await fetch(`${process.env.backend}/api/users/`, {
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
