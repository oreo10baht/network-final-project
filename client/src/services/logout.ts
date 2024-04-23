"use server";

import { useAuthContext } from "@/context/Auth";
import { UserLogin } from "@/models/User";
import { cookies } from "next/headers";

export async function logout() {
  cookies().delete("token");

  try {
    const response = await fetch(`${process.env.backend}/api/users/logout`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("can't logout");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}
