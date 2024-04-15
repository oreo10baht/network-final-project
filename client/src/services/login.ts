import { UserLogin } from "@/models/User";

export async function login(userInfo: UserLogin) {
  try {
    const response = await fetch(`${process.env.backend}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include', 
      body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
      throw new Error("can't login");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}
