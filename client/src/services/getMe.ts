export async function getMe() {
  try {
    const response = await fetch("http://localhost:8080/api/users/auth/me", {
      method: "GET",
      credentials:"include"
    });

    if (!response.ok) {
      throw new Error("can't get me");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}
