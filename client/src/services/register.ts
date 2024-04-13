import { UserRegister } from "@/models/User";

export async function register(userInfo: UserRegister) {
  try {
    const response = await fetch("http://localhost:8080/api/users/register", {
      method: "POST",
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
