export async function getMe(token: string) {
  try {
    const response = await fetch(`${process.env.backend}/api/users/auth/me`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
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
