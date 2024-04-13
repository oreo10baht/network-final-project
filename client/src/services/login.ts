import { UserLogin } from "@/models/User";

export async function login(userInfo: UserLogin) {
  try {
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
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
