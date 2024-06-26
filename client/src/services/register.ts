import { UserRegister } from "@/models/User";

export async function register(userInfo: UserRegister) {
  try {
    const response = await fetch(`${process.env.backend}/api/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
      throw new Error("can't register");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}
